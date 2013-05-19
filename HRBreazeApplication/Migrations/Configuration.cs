namespace HRBreazeApplication.Migrations
{
    using HRBreazeApplication.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using WebMatrix.WebData;

    internal sealed class Configuration : DbMigrationsConfiguration<HRBreazeApplication.Models.HRDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }


        protected override void Seed(HRBreazeApplication.Models.HRDbContext context)
        {
           
            
            //context.Departmants.AddOrUpdate(
            //    p => p.Name,
            //    new Department { Name = "Services" },
            //    new Department { Name = "Marketing" },
            //    new Department { Name = "Human Resources" },
            //    new Department { Name = "Financial" },
            //    new Department { Name = "Purchasing" },
            //    new Department { Name = "Sales" },
            //    new Department { Name = "IT" },
            //    new Department { Name = "Inventory" },
            //    new Department { Name = "Quality Asurance" },
            //    new Department { Name = "Insurance" },
            //    new Department { Name = "Licenses" },
            //    new Department { Name = "Operational" },
            //    new Department { Name = "Customers" },
            //    new Department { Name = "Staff" },
            //    new Department { Name = "Customer Service" },
            //    new Department { Name = "Organizational" }
            //    );

            //context.SaveChanges();
            //string[] fNames = { "Joycelyn", "Krystle", "Breana", "Lekisha", "Sherlene", "Rosanne", "Max", "Mireille", "Hallie", "Ryann", "Arletta", "Vernie", "Frances", "Shon", "Deb", "Madelaine", "Junko", "Onita", "Coleman", "Adelia", "Ignacia", "Joesph", "Elsa", "Sandy", "Antoinette", "Antoinette", "Barbie", "Luciana", "Kiesha", "Lesa", "Gene", "Myrtice", "Jacquelin", "Hunter" };
            //string[] lNames = { "Show", "Curtin", "Palacio", "Loyd", "Larrick", "Fish", "Vina", "Stlaurent", "Fountaine", "Seddon", "Yeaman", "Lenhart", "Ramsier", "Blewett", "Deady", "Stacks", "Rentas", "Mulvaney", "Mcnaught", "Hazlett", "Auston", "Auston", "Stillings", "Nadeau", "Sandrock", "Weeks", "Mullane", "Hullinger", "Beveridge", "Clara", "Daub", "Rondon", "Snedeker" };

            //Random rnd = new Random();
            //for (int i = 0; i < 100; i++)
            //{
            //    //context.Employees.AddOrUpdate(
            //    //    p => p.Name, new Employee { Name = fNames[rnd.Next(0, fNames.Length)] + " " + lNames[rnd.Next(0, lNames.Length)], Email = fNames[rnd.Next(0, fNames.Length)] + "@" + lNames[rnd.Next(0, lNames.Length)] + ".com", Phone = "" + rnd.Next(1245, 587554).ToString() + "", Salary = rnd.Next(100, 1000), DepartmentId = rnd.Next(0, 16) }
            //    //    );
            //    Employee emp = new Employee();
            //    emp.Name = fNames[rnd.Next(0, fNames.Length)] + " " + lNames[rnd.Next(0, lNames.Length)];
            //    emp.Email = fNames[rnd.Next(0, fNames.Length)] + "@" + lNames[rnd.Next(0, lNames.Length)] + ".com";
            //    emp.Phone = rnd.Next(1245, 587554).ToString();
            //    emp.DepartmentId = rnd.Next(1, 16);
            //    emp.Salary = rnd.Next(100, 1000);

            //    context.Employees.Add(emp);
            //}
            //context.SaveChanges();


            //WebSecurity.InitializeDatabaseConnection("HRBreeze",
            //"UserProfile", "UserId", "UserName", autoCreateTables: true);
            //WebMatrix.WebData.WebSecurity.InitializeDatabaseConnection("HRBreeze", "UserProfile", "UserId", "UserName", autoCreateTables: true);
                
        }
    }
}
