//DepartmentDetails.js
define(['services/datacontext',
        'durandal/plugins/router',
        'durandal/system',
        'durandal/app',
        'services/logger'],
    function (datacontext, router, system, app, logger) {
        var entity = ko.observable();
        var entityName = 'Department';
        var isSaving = ko.observable(false);
        var isDeleting = ko.observable(false);
        var isEdit = ko.observable(true);
        var title = ko.observable();


        var activate = function (routeData) {
            var id = parseInt(routeData.id);
            initLookups();
            if (id == 0) {
                entity(datacontext.createEntity(entityName));
                isEdit(false);
                title('Add New Department');
            }
            else {
                title('Edit Department');
                isEdit(true);
                return datacontext.getDataById(id, entity, entityName);
            }
        };

        var initLookups = function () {
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
            return datacontext.saveChanges().fin(complete);

            function complete() {
                isSaving(false);
            }
        };

        var deleteEntity = function () {
            var msg = 'Delete Department "' + entity().name() + '" ?';
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
                    router.navigateTo('#/Department');
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
            isEdit: isEdit,
            title: title,

        };
        return vm;
    });

