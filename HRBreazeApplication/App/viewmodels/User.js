define([
  'services/datacontext',
  'durandal/plugins/router'],

  function (datacontext, router) {
    var entities = ko.observableArray();

    //#region Internal methods for paging;
    var currentPage = ko.observable();
    var totalPages = ko.observable();
    var totalrecords = ko.observable();
    var isBusy = ko.observable();

 

    var orderby = ko.observable('UserId');
    var sortOrder = ko.observable('asc');

    var entity = 'UserProfile';

    var columns = [{ name: 'ID', index: 'Id', sortable: true, width: '10%' },
                   { name: 'Name', index: 'Name', sortable: true, width: '20%' }

    ];


    canPrev = ko.computed(function () {
        return currentPage() > 1;
    });

    canNext = ko.computed(function () {
        return currentPage() < totalPages();
        //return true;
    });

    nextPage = function () {
        currentPage(currentPage() + 1);
        return getdata();
    };
    previousPage = function () {
        currentPage(currentPage() - 1);
        return getdata();
    };

    firstPage = function () {
        currentPage(1);
        return getdata();
    };
    lastPage = function () {
        currentPage(totalPages());
        return getdata();
    };


    var viewAttached = function (view) {
        bindEventToList(view, '.session-brief', gotoDetails);
    };

    var gotoDetails = function (selectedRecord) {
        if (selectedRecord && selectedRecord.userId()) {
            var url = "#/UserDetails/" + selectedRecord.userId();
            router.navigateTo(url); 
        }
    }

    var bindEventToList = function (rootSelector, selector, callback, eventName) {
        var eName = eventName || 'click';
        $(rootSelector).on(eName, selector, function () {
            var entity = ko.dataFor(this);
            callback(entity);
        });
    };

    var gotoAddNew = function () {
        var url = "#/UserAdd";
        router.navigateTo(url);
    };

    var sort = function (column) {
        orderby(column.index);
        sortOrder(sortOrder() === 'asc' ? 'desc' : 'asc');

        return getdata();
    };

    //#endregion


    var initialized = false;
    var vm = {
        activate: activate,
        title: 'Users Management',
        entities: entities,
        refresh: refresh,
       
        columns: columns,
        sortOrder: sortOrder,
        orderby: orderby,
        sort: sort,

        currentPage: currentPage,
        totalPages: totalPages,
        canPrev: canPrev,
        canNext: canNext,
        nextPage: nextPage,
        previousPage: previousPage,
        firstPage: firstPage,
        lastPage: lastPage,
        viewAttached: viewAttached,
        isBusy:isBusy,
        totalrecords: totalrecords,
        gotoAddNew: gotoAddNew
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



    function getdata() {
        return datacontext.getdata(entities, totalPages, currentPage() - 1, totalrecords, orderby, sortOrder, entity, isBusy);

    }

    function refresh() {
        currentPage(1);
        return datacontext.getdata(entities, totalPages, currentPage() - 1, totalrecords, orderby, sortOrder, entity, isBusy);
    }

    //#endregion
});