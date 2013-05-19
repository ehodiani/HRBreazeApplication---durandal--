require.config({
    paths: { "text": "durandal/amd/text" }
});

define(function (require) {
    var system = require('durandal/system'),
        app = require('durandal/app'),
        router = require('durandal/plugins/router'),
        viewLocator = require('durandal/viewLocator'),
        logger = require('services/logger');

    system.debug(true);
    app.start().then(function () {
        router.useConvention();
        viewLocator.useConvention();

        app.setRoot('viewmodels/shell', 'entrance');

        router.handleInvalidRoute = function (route, params) {
            logger.logError('No route found', route, 'main', true);
        };
    });

});