define(['durandal/system', 'services/logger', 'durandal/plugins/router', 'config', 'services/datacontext'],
	function (system, logger, router, config, datacontext) {

	    var adminRoutes = ko.computed(function () {
	        return router.allRoutes().filter(function (r) {
	            return r.settings.admin;
	        });
	    });

	    var currentUser = ko.observable();
	    var currentUserId = ko.observable();
	    var isAdmin = ko.observable(false);

	    var shell = {
	        currentUser: currentUser,
	        currentUserId:currentUserId,
	        activate: activate,
	        isAdmin:isAdmin,
	        adminRoutes: adminRoutes,
	        addSession: addSession,
	        token: $("input[name='__RequestVerificationToken']").val(),
	        router: router
	    };
	    return shell;



	    function activate() {

	        return datacontext.primeData()
          .then(boot)
          .fail(failedInitialization);
	    }

	    function failedInitialization(error) {
	        var msg = 'App initialization failed. ' + error.message;

	        logger.logError(msg,
                error,
                system.getModuleId(shell),
                true);
	    }
	    function boot() {

	        logger.log('HR initialization Loaded!',
               null,
               system.getModuleId(shell),
               true);
	        router.map(config.routes);

	        datacontext.getCurrentUser(currentUser, currentUserId);
	        //isAdmin(true);
	        datacontext.isAdmin(isAdmin);
	        //currentUser('Admin');
	        return router.activate(config.startModule);
	    }

	    function addSession(item) {
	        router.navigateTo(item.hash);
	    }



	}
);