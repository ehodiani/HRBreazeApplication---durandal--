//Category.js
define([
  'services/datacontext',
  'durandal/plugins/router'],
  function (datacontext, router) {
      var entities = ko.observableArray();

      //#region Internal methods for paging;
      var currentPage = ko.observable();
      var totalPages = ko.observable();
      var totalrecords = ko.observable();
      var isBusy = ko.observable(false);

      var orderby = ko.observable('Id');
      var sortOrder = ko.observable('asc');
      var filterBy = [];
      var entity = 'Category';

      var columns = [{ name: 'Id', index: 'Id', sortable: true, width: '10%' },
                     { name: 'Name', index: 'Name', sortable: true, width: '20%' },
                     { name: 'Date Created', index: 'Date_Created', sortable: true, width: '20%' },
                     { name: 'Created By', index: 'Created_By', sortable: true, width: '20%' }
      ];

      canPrev = ko.computed(function () {
          return currentPage() > 1;
      });

      canNext = ko.computed(function () {
          return currentPage() < totalPages();
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
          if (selectedRecord && selectedRecord.id()) {
              var url = "#/CategoryDetails/" + selectedRecord.id();
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
          var url = "#/CategoryDetails/0";
          router.navigateTo(url);
      };

      var sort = function (column) {
          orderby(column.index);
          sortOrder(sortOrder() === 'asc' ? 'desc' : 'asc');
          return getdata();
      };

      var viewSearch = function () {
          $('#advancedSearch').slideToggle();
      };

      var search = function () {
          currentPage(1);
          var Name = $('#txtName').val();
          var op = breeze.FilterQueryOp;
          var preds = [];
          var p = new breeze.Predicate('id', op.NotEquals, null);
          filterBy = [];

          if (Name != null && Name != '' && Name != ' ') {
              var p1 = new breeze.Predicate("Name", op.Contains, Name);
              preds.push(p1);
          }

          if (preds != null && preds != '') {
              filterBy = p.and(preds);
          } else {
              filterBy = p;
          }
          getdata();
          viewSearch();
      };


      var clear = function () {
          $('#txtName').val('');
          $('#txtName').focus();

          search();
      };
      var initLookups = function () {
      };

      //#endregion

      var initialized = false;
      var vm = {
          activate: activate,
          title: 'Categories',
          entities: entities,
          columns: columns,
          refresh: refresh,
          orderby: orderby,
          sortOrder: sortOrder,
          sort: sort,
          currentPage: currentPage,
          totalPages: totalPages,
          canPrev: canPrev,
          canNext: canNext,
          nextPage: nextPage,
          previousPage: previousPage,
          firstPage: firstPage,
          lastPage: lastPage,
          totalrecords: totalrecords,
          isBusy: isBusy,
          gotoAddNew: gotoAddNew,
          viewAttached: viewAttached,
          viewSearch: viewSearch,
          search: search,
          clear: clear,
      };
      return vm;

      //#region Internal Methods
      function activate() {
          if (initialized) {
              return;
          }
          initialized = true;
          initLookups();
          return getintdata();
      }

      function getintdata() {
          currentPage(1);
          return datacontext.getdata(entities, totalPages, currentPage() - 1, totalrecords, orderby, sortOrder, entity, isBusy);
      }


      function getdata() {
          return datacontext.getFilterBy(entities, totalPages, currentPage() - 1, totalrecords, orderby, sortOrder, entity, isBusy, filterBy);
      }

      function refresh() {
          clear();
          viewSearch();
      }

      //#endregion
  });