define(['services/datacontext',
        'durandal/plugins/router',
        'durandal/system',
        'durandal/app',
        'services/logger'],
    function (datacontext, router, system, app, logger) {
        var entity = ko.observable();
       
        var entityName = 'UserProfile';
        var isSaving = ko.observable(false);
        var isDeleting = ko.observable(false);
        var available_roles = ko.observableArray();
        var assigned_roles = ko.observableArray();

        var userid;
        

        var activate = function (routeData) {
            var id = parseInt(routeData.id);
            userid = id;
            initLookups(id);
            return datacontext.getUserById(id, entity, entityName);
        };

        var initLookups = function (id) {
            
            datacontext.getavailable_roles(available_roles, id);
            datacontext.getassigned_roles(assigned_roles, id);
        };


        var goBack = function () {
            router.navigateBack();
        };

        var hasChanges = ko.computed(function () {
            return datacontext.hasChanges();
        });

        var cancel = function () {
            datacontext.cancelChanges();
        };

        var canSave = ko.computed(function () {
            return hasChanges() && !isSaving();
        });

        var save = function () {
            isSaving(true);
            
            //===============================================
            var files = $("#file1").get(0).files;
            if (files.length > 0) {
                if (window.FormData !== undefined) {
                    var data = new FormData();
                    for (i = 0; i < files.length; i++) {
                        data.append("file" + i, files[i]);
                    }
                    $.ajax({
                        type: "POST",
                        url: "api/breeze/PostFile",
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (results) {
                            for (i = 0; i < results.length; i++) {
                                //alert("Successfully uploaded " + results[i].Name + " (" + results[i].Size + " bytes)");
                                //alert(results[i]);
                                $("#photo").val(results[i]).change();
                                //$("#photo").change(function () { return true;});
                                //ko.applyBindings(vm);
                                //=====================================================
                                //alert(results[i]);
                                return datacontext.saveChanges().fin(complete);

                                function complete() {
                                    isSaving(false);
                                }
                            }
                        }
                    });
                } else {
                    alert("This browser doesn't support HTML5 multiple file uploads!");
                }
            }
            else {
                return datacontext.saveChanges().fin(complete);

                function complete() {
                    isSaving(false);
                }
            }

            
        };


        var deleteEntity = function () {
            var msg = 'Delete User "' + entity().name() + '" ?';
            var title = 'Confirm Delete';
            isDeleting(true);
            return app.showMessage(msg, title, ['Yes', 'No'])
                .then(confirmDelete);

            function confirmDelete(selectedOption) {
                if (selectedOption === 'Yes') {
                    entity().entityAspect.setDeleted();
                    save().then(success).fail(failed).fin(finish);
                }
                isDeleting(false);

                function success() {
                    router.navigateTo('#/User');
                }

                function failed(error) {
                    cancel();
                    var errorMsg = 'Error: ' + error.message;
                    logger.logError(
                        errorMsg, error, system.getModuleId(vm), true);
                }

                function finish() {
                    return selectedOption;
                }
            }

        };


        var canDeactivate = function () {
            if (isDeleting()) { return false; }

            if (hasChanges()) {
                var title = 'Do you want to leave "' +
                    entity().name() + '" ?';
                var msg = 'Navigate away and cancel your changes?';

                return app.showMessage(title, msg, ['Yes', 'No'])
                    .then(checkAnswer);
            }
            return true;

            function checkAnswer(selectedOption) {
                if (selectedOption === 'Yes') {
                    cancel();
                }
                return selectedOption;
            }
        };


        var OnUpload = function () {
            $("#photo").val("ddd").change();
            
            $("#file1").trigger("click");
        };


        var MoveToAssigned = function () {

            var result = new Array();

            $("#available_roles option:selected").each(function () {
                result.push($(this).val());
            });

            var output = result.join(",");

            if (output == "") {
                alert('Please select atleast one role');
            }
            else {

                datacontext.ManageRoles(output, userid, 1);
                initLookups(userid);
               
            }
        };

        var MoveToAvailable = function () {

            var result = new Array();

            $("#assigned_roles option:selected").each(function () {
                result.push($(this).val());
            });

            var output = result.join(",");

            if (output == "") {
                alert('Please select atleast one role');
            }
            else {

                datacontext.ManageRoles(output, userid, 2);
                initLookups(userid);
               
            }
        };

        var vm = {
            activate: activate,
            cancel: cancel,
            canDeactivate: canDeactivate,
            canSave: canSave,
            deleteEntity: deleteEntity,
            goBack: goBack,
            hasChanges: hasChanges,
            save: save,
            entity: entity,
            OnUpload: OnUpload,
            available_roles: available_roles,
            assigned_roles:assigned_roles,
            MoveToAssigned: MoveToAssigned,
            MoveToAvailable:MoveToAvailable,
            title: 'User Details'
        };
        return vm;
});