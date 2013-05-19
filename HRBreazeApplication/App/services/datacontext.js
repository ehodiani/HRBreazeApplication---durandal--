define(['services/logger',
    'durandal/system',
    'config',
    'services/model',
    'services/breeze.partial-entities'],
    function (logger, system, config, model, partialMapper) {

        ko.bindingHandlers.date = {
            update: function (element, valueAccessor) {
                var value = valueAccessor();
                var date = moment(value());
                var strDate = date.format('DD-MM-YYYY');
                $(element).text(strDate);
                //alert($(element).val(strDate));
            }
        };

        var EntityQuery = breeze.EntityQuery;
        var entityNames = model.entityNames;

        var orderBy = model.orderBy;
        var manager = configureBreezeManager();
        
        var getdepartments = function (departmentsObservable) {
            var query = EntityQuery
               .from('Department')

            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);
            
            function querySucceeded(data) {
                //var list = partialMapper.mapDtosToEntities(
                //    manager, data.results, entityNames.department, 'id'
                //    );
                if (departmentsObservable) {
                    departmentsObservable(data.results);
                }

               
            }

        };

        var getCurrentUser = function (CurrentUserObservable, userIdObservable) {
            var query = EntityQuery
               .from('getUser')

            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);

            function querySucceeded(data) {
              
                if (CurrentUserObservable) {
                    

                    CurrentUserObservable(data.results[0].userName);
                    userIdObservable(data.results[0].userId);
                    //alert(data.results[0].userId);
                }

                
            }

        };

        var isAdmin = function (isAdminObservable) {
            var query = EntityQuery
               .from('IsAdmin')

            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);

            function querySucceeded(data) {

                if (isAdminObservable) {
                    if (data.results == "true")
                        isAdminObservable(true);
                    else
                        isAdminObservable(false);
                }


            }

        };

        var getavailable_roles = function (available_rolesObservable, userid) {
            var query = EntityQuery
               .from('available_roles')
             
            .withParameters({ 'userid': userid })
            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);

            function querySucceeded(data) {

                if (available_rolesObservable) {
                    available_rolesObservable(data.results);
                   
                }


            }

        };
        var getroles = function (available_rolesObservable) {
            var query = EntityQuery
               .from('getroles')

            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);

            function querySucceeded(data) {

                if (available_rolesObservable) {
                    available_rolesObservable(data.results);

                }


            }

        };

        
        var getassigned_roles = function (assigned_rolesObservable, userid) {
            var query = EntityQuery
               .from('assigned_roles')

            .withParameters({ 'userid': userid })
            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);

            function querySucceeded(data) {

                if (assigned_rolesObservable) {
                    assigned_rolesObservable(data.results);

                }


            }

        };


        var ManageRoles = function (roles, userid, op) {
            var query = EntityQuery
               .from('ManageRoles')

            .withParameters({'roles': roles, 'userid': userid, 'op':op })
            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);

            function querySucceeded(data) {
                if (op == 1) {
                    log('Role(s) has been added', data, true);
                }
                else {
                    log('Role(s) has been removed', data, true);
                }
            }

        };
        
        
        var getdata = function (enititiesObservable, totalpages, currentPage, totalrecords, orderby, sortOrder, entity, isBusy) {
            
            isBusy(true);
            var query = EntityQuery
            .from(entity)
            .skip(currentPage * 10).take(10)
            .orderBy(orderby() + " " + sortOrder())
            .inlineCount(true);

            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);

            function querySucceeded(data) {
                //var list = partialMapper.mapDtosToEntities(
                //    manager, data.results, entityNames.department, 'id'
                //    );
                if (enititiesObservable) {
                    enititiesObservable(data.results);
                    totalpages(Math.ceil(data.inlineCount / 10));
                    totalrecords(data.inlineCount);
                    isBusy(false);
                }

                //log('Retireved Employees  from remote datasource', data, true);

               
            }

        };

        var getFilterBy = function (enititiesObservable, totalpages, currentPage, totalrecords, orderby, sortOrder, entity, isBusy, predicate, forceLocally, resourceName) {

            if (forceLocally) {
                //alert(forceLocally);
                var s = getLocally(resourceName, orderby(), currentPage, sortOrder(), predicate);
                if (s.length > 0) {
                    // Edge case
                    // We need this check because we may have 1 entity already.
                    // If we start on a specific person, this may happen. So we check for > 2, really
                    enititiesObservable(s);
                    return Q.resolve();
                }
            }
            if (predicate == '') {
                return getdata(enititiesObservable, totalpages, currentPage, totalrecords, orderby, sortOrder, entity, isBusy);
            }
            isBusy(true);

          
            var query = EntityQuery
            .from(entity)
            .where(predicate)
            .skip(currentPage * 10).take(10)
            .orderBy(orderby() + " " + sortOrder())
            .inlineCount(true);

           
            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);

            function querySucceeded(data) {
                
                if (enititiesObservable) {
                    enititiesObservable(data.results);
                    totalpages(Math.ceil(data.inlineCount / 10));
                    totalrecords(data.inlineCount);
                    isBusy(false);
                }

                //log('Retireved Employees  from remote datasource', data, true);


            }

        };

        
        var getUserById = function (Id, entityObservable, entityname) {
            var query = EntityQuery
            .from(entityname)
            .where('userId', '==', Id)

            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);

            function querySucceeded(data) {

                if (entityObservable) {
                    entityObservable(data.results[0]);

                }

            }
        };

        var getDataById = function (Id, entityObservable,entityname) {
            var query = EntityQuery
            .from(entityname)
            .where('id', '==', Id)

            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);

            function querySucceeded(data) {
                
                if (entityObservable) {
                    entityObservable(data.results[0]);
                   
                }

            }
        };

        var cancelChanges = function () {
            manager.rejectChanges();
            log('Canceled changes', null, true);
        };

        var saveChanges = function () {
            return manager.saveChanges()
                .then(saveSucceeded)
                .fail(saveFailed);

            function saveSucceeded(saveResult) {
                log('Saved data successfully', saveResult, true);
            }

            function saveFailed(error) {
                var msg = 'Save failed: ' + getErrorMessages(error);
                logger.logError(msg, error);
                error.message = msg;
                throw error;
            }
        };

        var createEntity = function (entityname) {
            return manager.createEntity(entityname);
        };

        var primeData = function () {
            var promise = Q.all([getLookups()]);

            return promise.then(success);

            function success() {
                datacontext.lookups = {
                    departments: getLocal('Departmants', 'name', true),
                    categories: getLocal('Categories', 'name', true)
                   
                };
                log('Primed data', datacontext.lookups);
            }
        };

        var hasChanges = ko.observable(false);

        manager.hasChangesChanged.subscribe(function (eventArgs) {
            hasChanges(eventArgs.hasChanges);
        });


        var newuser = function (username, pass, email, name, phone, roles) {
            var query = EntityQuery
               .from('registerUser')

            .withParameters({ 'username': username, 'pass': pass, 'name': name, 'phone': phone,'roles' : roles})
            return manager.executeQuery(query)
                    .then(querySucceeded)
                    .fail(queryFailed);

            function querySucceeded(data) {
                log(data.results, data, true);
            }
        };

        var datacontext = {
            getdepartments: getdepartments,
            getdata: getdata,
            getFilterBy:getFilterBy,
            primeData: primeData,
            getCurrentUser: getCurrentUser,
            isAdmin:isAdmin,
            getDataById: getDataById,
            getUserById:getUserById,
            hasChanges: hasChanges,
            cancelChanges: cancelChanges,
            getavailable_roles: getavailable_roles,
            getassigned_roles: getassigned_roles,
            ManageRoles: ManageRoles,
            createEntity: createEntity,
            newuser: newuser,
            getroles:getroles,
            saveChanges: saveChanges
        };
        return datacontext;

        //#region Internal methods

        function queryFailed(error) {
            var message = 'Error getting data. ' + error.message;
            logger.logError(message, error, system.getModuleId(datacontext), true);
        }

        function configureBreezeManager() {
            breeze.NamingConvention.camelCase.setAsDefault();
            var mgr = new breeze.EntityManager(config.remoteServiceName);
            model.configureMetadataStore(mgr.metadataStore);
            return mgr;

        }
        function log(message, data, showToast) {
            logger.log(message,
              data,
              system.getModuleId(datacontext),
              showToast);
        }

        function getLookups() {
            return EntityQuery.from("Lookups")
              .using(manager).execute()
              .then(processLookups)
              .fail(queryFailed);
        }

        function processLookups() {
            model.createNullos(manager);
        }

        function getLocally(resource, ordering, currentPage, sortOrder, predicate) {
            //alert(resource);
            if (predicate == '') {
                var query = EntityQuery
                  .from(resource)
                  .skip(currentPage * 10).take(10)
                  .orderBy(ordering + " " + sortOrder);

                return manager.executeQueryLocally(query);
            }
            else {
                var query = EntityQuery
                 .from(resource)
                 .where(predicate)
                .skip(currentPage * 10).take(10)
                 .orderBy(ordering + " " + sortOrder);

                return manager.executeQueryLocally(query);
            }
        }

        function getLocal(resource, ordering, includeNullos) {
            var query = EntityQuery
              .from(resource)
              .orderBy(ordering);
            
            if (!includeNullos) { query = query.where('id', '!=', 0) };

            return manager.executeQueryLocally(query);
        }

        function getErrorMessages(error) {
            var msg = error.message;
            if (msg.match(/validation error/i)) {
                return getValidationMessages(error);
            }
            return msg;
        }

        //#endregion

    }
    );
