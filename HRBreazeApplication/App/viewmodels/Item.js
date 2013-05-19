//Items.js
define([
  'services/datacontext',
   'durandal/app',
  'durandal/plugins/router'],
  function (datacontext, app, router) {

     



      //ko.bindingHandlers.date = {
      //    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
      //        ko.utils.registerEventHandler(element, 'change', function (event) {
      //            valueAccessor().demandDate($(element).val());
      //        })
      //        },
      //    update: function (element, valueAccessor, allBindingsAccessor) {
      //        var value = valueAccessor();  // 'Mon Sep 10 2012 02:00:00 GMT+0200 (Paris, Madrid (heure d’été))'; 
      //        var date = moment(value());
      //        $(element).val((date.format('DD/MM/YYYY')));
      //    }
      //};

      var entities = ko.observableArray();

      //#region Internal methods for paging;
      var currentPage = ko.observable();
      var totalPages = ko.observable();
      var totalrecords = ko.observable();
      var isBusy = ko.observable(false);

      var orderby = ko.observable('Id');
      var sortOrder = ko.observable('asc');
      var filterBy = [];
      var entity = 'Item';

      var columns = [{ name: 'Id', index: 'Id', sortable: true, width: '10%' },
                     { name: 'Name', index: 'Name', sortable: true, width: '20%' },
                     { name: 'Price', index: 'Price', sortable: true, width: '20%' },
                     { name: 'Category', index: 'CategoryId', sortable: true, width: '20%' },
                     { name: 'Date Created', index: 'Date_Created', sortable: true, width: '20%' },
                     { name: 'Created By', index: 'Created_By', sortable: true, width: '20%' }
      ];
      var categories = ko.observableArray();

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
              var url = "#/ItemDetails/" + selectedRecord.id();
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
          var url = "#/ItemDetails/0";
          router.navigateTo(url);

          //app.showModal('viewmodels/ItemDetails/:id');

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
          var CategoryId = $('#dropdownCategoryId').val();
          var op = breeze.FilterQueryOp;
          var preds = [];
          var p = new breeze.Predicate('id', op.NotEquals, null);
          filterBy = [];

          if (Name != null && Name != '' && Name != ' ') {
              var p1 = new breeze.Predicate("Name", op.Contains, Name);
              preds.push(p1);
          }

          if (CategoryId != null && CategoryId != '' && CategoryId != 0) {
              var p1 = new breeze.Predicate("CategoryId", "==", parseInt(CategoryId));
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
          $('#dropdownCategoryId').val('');
          $('#txtName').focus();

          search();
      };
      var initLookups = function () {
          categories(datacontext.lookups.categories);
      };

      //#endregion

      var initialized = false;
      var vm = {
          activate: activate,
          title: 'Items',
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
          categories: categories
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