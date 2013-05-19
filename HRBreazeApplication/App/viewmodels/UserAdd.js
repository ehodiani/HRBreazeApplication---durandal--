define(['services/datacontext',
        'durandal/plugins/router',
        'durandal/system',
        'durandal/app',
        'services/logger'],
    function (datacontext, router, system, app, logger) {

        var entityName = 'UserProfile';
        var available_roles = ko.observableArray();
        var assigned_roles = ko.observableArray();

        var activate = function () {
            initLookups();
        };


        var initLookups = function () {

            datacontext.getroles(available_roles);

        };

        var goBack = function () {
            router.navigateBack();
        };



        var save = function () {
           

            var roles = $("#assigned_roles option").map(function () {
                return this.value;
            }).get().join(',');

           
            


            var username = $("#Username").val();
            var password = $("#Password").val();
            var phone = $("#Phone").val();
            var email = $("#Email").val();
            var name = $("#FullName").val();

            var confirmpassword = $("#ConfirmPassword").val();

            if (password == confirmpassword) {
                datacontext.newuser(username, password,  email,  name,  phone,  roles);
            }

        };

       

        var MoveToAssigned = function () {

            var selectedOpts = $('#available_roles option:selected');
            if (selectedOpts.length == 0) {
                alert("Nothing to move.");
                e.preventDefault();
            }

            $('#assigned_roles').append($(selectedOpts).clone());
            $(selectedOpts).remove();
            e.preventDefault();

        };

        var MoveToAvailable = function () {

            var selectedOpts = $('#assigned_roles option:selected');
            if (selectedOpts.length == 0) {
                alert("Nothing to move.");
                e.preventDefault();
            }

            $('#available_roles').append($(selectedOpts).clone());
            $(selectedOpts).remove();
            e.preventDefault();

        };


        var vm = {
            activate: activate,

            goBack: goBack,

            save: save,
            available_roles: available_roles,
            assigned_roles: assigned_roles,
            MoveToAssigned: MoveToAssigned,
            MoveToAvailable: MoveToAvailable,
            title: 'Add New User'
        };
        return vm;
    });