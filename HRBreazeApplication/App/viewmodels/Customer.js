define(['services/datacontext'], function (datacontext) {
    var departments = ko.observableArray();
    var initialized = false;
    var vm = {
        activate: activate,
        title: 'Departments',
        departments: departments,
        refresh: refresh
        
    };

    return vm;

    //#region Internal Methods
    function activate() {
        if (initialized) {
            return;
        }
        initialized = true;

        return refresh();
    }

    function refresh() {
        return datacontext.getdepartments(departments);
    }

    //#endregion
});