using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Breeze.WebApi;
using HRBreazeApplication.Models;
using Newtonsoft.Json.Linq;
using WebMatrix.WebData;
using System.Web.Security;
using System.Threading.Tasks;
using System.Web;
using System.IO;
using System.Data;
namespace HRBreazeApplication.Controllers
{
    [Authorize]
    [BreezeController]
    public class BreezeController : ApiController
    {
        readonly EFContextProvider<HRDbContext> _contextProvider =
            new EFContextProvider<HRDbContext>();

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {
            //Roles.CreateRole("Admin");
            //Roles.AddUserToRole("eyad", "Admin");

            return _contextProvider.SaveChanges(saveBundle);
        }


        [HttpGet]
        public object ManageRoles(string roles, int userid, int op)
        {
            string[] rolesArr = roles.Split(',');
            Data.DataAccess cls = new Data.DataAccess();
            string sql, m;

            if (rolesArr.Length > 0)
            {
                for (int i = 0; i < rolesArr.Length; i++)
                {
                    if (op == 1)
                    {
                        sql = "insert into webpages_UsersInRoles (UserId,RoleId) values (" + userid.ToString() + ", " + rolesArr[i].ToString() + ")";
                        m = cls.exeQuery(sql);
                    }
                    else
                    {
                        sql = "delete from   webpages_UsersInRoles  where UserId=" + userid.ToString() + " and RoleId= " + rolesArr[i].ToString() + "";
                        m = cls.exeQuery(sql);
                    }
                }
            }

            return "done";
        }




        [HttpGet]
        public object registerUser(string username, string pass, string email, string name, string phone, string roles)
        {
            RegisterModel model = new RegisterModel();
            model.UserName = username;
            model.Password = pass;
            model.ConfirmPassword = pass;

            try
            {
                WebSecurity.CreateUserAndAccount(
                        model.UserName,
                        model.Password,
                        new { Phone = phone, Email = email, Name = name, Photo = "unknown_person.jpg" },
                        false
                    );

                //===================================================================================
                string[] rolesArr = roles.Split(',');
                Data.DataAccess cls = new Data.DataAccess();
                string sql, m;

                sql = "select max(UserId) from UserProfile";
                DataSet ds = new DataSet();
                m = cls.getData(sql, ref ds);

                int userid = Convert.ToInt32(ds.Tables[0].Rows[0][0]);

                if (rolesArr.Length > 0)
                {
                    for (int i = 0; i < rolesArr.Length; i++)
                    {
                        sql = "insert into webpages_UsersInRoles (UserId,RoleId) values (" + userid.ToString() + ", " + rolesArr[i].ToString() + ")";
                        m = cls.exeQuery(sql);
                    }
                }
                //===========================================================================================
                return "done";
            }
            catch (MembershipCreateUserException e)
            {
                return e.InnerException.ToString();
                //ModelState.AddModelError("", ErrorCodeToString(e.StatusCode));
            }

            
        }



        [HttpGet]
        public object Lookups()
        {
            var departments = _contextProvider.Context.Departmants;
            var users = _contextProvider.Context.UserProfiles;
            var categories = _contextProvider.Context.Categories;

            return new { departments, users, categories };
        }

        [HttpGet]
        public object getUser()
        {
            string userid = "Eyad";

            Data.DataAccess cls = new Data.DataAccess();
            string sql = "select * from UserProfile where UserName=N'" + User.Identity.Name + "'";
            DataSet ds = new DataSet();
            string m = cls.getData(sql, ref ds);
            if (ds.Tables[0].Rows.Count != 0)
            {
                userid = ds.Tables[0].Rows[0]["UserId"].ToString();
            }


            return new { UserName= User.Identity.Name,UserId= userid };
        }

        [HttpGet]
        public bool IsAdmin()
        {
            string username = User.Identity.Name;

            string[] roles = Roles.GetRolesForUser();

            bool isfound = false;
            for (int i = 0; i < roles.Length; i++)
            {
                if (roles[i].ToLower() == "admin")
                {
                    isfound = true;
                    break;

                }
            }

            if (isfound)
                return true;
            else
                return false;
        }

        [HttpGet]
        public IQueryable<Category> Category()
        {
            return _contextProvider.Context.Categories;
        }

        [HttpGet]
        public IQueryable<Item> Item()
        {
            return _contextProvider.Context.Items;
        }


        [HttpGet]
        public IQueryable<Department> Department()
        {
            return _contextProvider.Context.Departmants;
        }

        [HttpGet]
        public List<webpages_Roles> getroles()
        {
            List<webpages_Roles> roles = new List<webpages_Roles>();
            Data.DataAccess cls = new Data.DataAccess();
            string sql = "select * from webpages_Roles";
            DataSet ds = new DataSet();
            string m = cls.getData(sql, ref ds);

            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                roles.Add(new webpages_Roles { RoleId = Convert.ToInt32(ds.Tables[0].Rows[i]["RoleId"]), RoleName = ds.Tables[0].Rows[i]["RoleName"].ToString() });
            }

            return roles;
        }

        [HttpGet]
        public List<webpages_Roles> available_roles(int userid)
        {
            List<webpages_Roles> roles = new List<webpages_Roles>();


            Data.DataAccess cls = new Data.DataAccess();
            string sql = "select * from webpages_Roles where RoleId not in (select RoleId from webpages_UsersInRoles where UserId=" + userid + ")";
            DataSet ds = new DataSet();
            string m = cls.getData(sql, ref ds);

            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                roles.Add(new webpages_Roles { RoleId = Convert.ToInt32(ds.Tables[0].Rows[i]["RoleId"]), RoleName = ds.Tables[0].Rows[i]["RoleName"].ToString() });
            }


            return roles;
        }

        [HttpGet]
        public List<webpages_Roles> assigned_roles(int userid)
        {
            List<webpages_Roles> roles = new List<webpages_Roles>();

            Data.DataAccess cls = new Data.DataAccess();
            string sql = "select * from webpages_Roles where RoleId  in (select RoleId from webpages_UsersInRoles where UserId=" + userid + ")";
            DataSet ds = new DataSet();
            string m = cls.getData(sql, ref ds);

            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                roles.Add(new webpages_Roles { RoleId = Convert.ToInt32(ds.Tables[0].Rows[i]["RoleId"]), RoleName = ds.Tables[0].Rows[i]["RoleName"].ToString() });
            }


            return roles;
        }

        [HttpGet]
        public IQueryable<UserProfile> UserProfile()
        {
            return _contextProvider.Context.UserProfiles;
        }

        [HttpGet]
        public IQueryable<Employee> Employee()
        {
            return _contextProvider.Context.Employees;
        }

        [HttpPost]
        public Task<IEnumerable<string>> PostFile()
        {
            if (Request.Content.IsMimeMultipartContent())
            {
                string fullPath = HttpContext.Current.Server.MapPath("~/content/images/photos");
                MyMultipartFormDataStreamProvider streamProvider = new MyMultipartFormDataStreamProvider(fullPath);
                var task = Request.Content.ReadAsMultipartAsync(streamProvider).ContinueWith(t =>
                {
                    if (t.IsFaulted || t.IsCanceled)
                        throw new HttpResponseException(HttpStatusCode.InternalServerError);

                    var fileInfo = streamProvider.FileData.Select(i =>
                    {
                        var info = new FileInfo(i.LocalFileName);
                        return info.Name;
                        //return "File uploaded as " + info.FullName + " (" + info.Length + ")";
                    });
                    return fileInfo;

                });
                return task;
            }
            else
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotAcceptable, "Invalid Request!"));
            }
        }


    }

    public class MyMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public MyMultipartFormDataStreamProvider(string path)
            : base(path)
        {

        }

        public override string GetLocalFileName(System.Net.Http.Headers.HttpContentHeaders headers)
        {
            string fileName;
            if (!string.IsNullOrWhiteSpace(headers.ContentDisposition.FileName))
            {
                fileName = headers.ContentDisposition.FileName;
            }
            else
            {
                fileName = Guid.NewGuid().ToString() + ".data";
            }
            return fileName.Replace("\"", string.Empty);
        }
    }
}
