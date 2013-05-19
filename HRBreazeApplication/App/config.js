define(function () {
    toastr.options.timeout = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    var imageSettings = {
        imageBasePath: '../content/images/photos/',
        unknownPersonImageSource: 'unknown_person.jpg'
    };

    var remoteServiceName = 'api/breeze';

    var routes = [
        
        {
        url: 'Department',
        moduleId: 'viewmodels/Department',
        name: "Departments",
        visible: true
        }
         ,
         {
             url: 'DepartmentDetails/:id',
             moduleId: 'viewmodels/DepartmentDetails',
             name: 'Edit Department',
             visible: false
         }
        ,
        {
            url: 'Employee',
            moduleId: 'viewmodels/Employee',
            name: "Employees",
            visible: true
        }
        ,
        {
            url: 'Customer',
            moduleId: 'viewmodels/Customer',
            name: "Customers",
            visible: true
        }
        ,
         {
             url: 'EmployeeDetails/:id',
             moduleId: 'viewmodels/EmployeeDetails',
             name: 'Edit Employee',
             visible: false
         }
          ,
         {
            url: 'Category',
            moduleId: 'viewmodels/Category',
            name: "Categories",
            visible: true
         }
        ,
        {
             url: 'CategoryDetails/:id',
             moduleId: 'viewmodels/CategoryDetails',
             name: 'Edit Category',
             visible: false
        }
        ,
        {
            url: 'Item',
            moduleId: 'viewmodels/Item',
            name: "Items",
            visible: true
        }
        ,
         {
             url: 'ItemDetails/:id',
             moduleId: 'viewmodels/ItemDetails',
             name: 'Edit Item',
             visible: false
         }

         ,
         {
             url: 'User',
             moduleId: 'viewmodels/User',
             name: 'Users',
             visible: false,
             caption: 'Manage Users',
             settings: { admin: true }

         }
         ,
         {
             url: 'Role',
             moduleId: 'viewmodels/Role',
             name: 'Roles',
             visible: false,
             caption: 'Manage Roles',
             settings: { admin: true }

         }
         ,
         {
             url: 'UserDetails/:id',
             moduleId: 'viewmodels/UserDetails',
             name: 'Edit User',
             visible: false,
           
         }
         ,
         {
             url: 'UserAdd',
             moduleId: 'viewmodels/UserAdd',
             name: 'Add New User',
             visible: false,

         }


    ];


    var startModule = 'Department';

    return {
        imageSettings: imageSettings,
        routes: routes,
        startModule: startModule,
        remoteServiceName: remoteServiceName
    };


});