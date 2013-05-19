define(['config'], function (config) {
    var entityNames = {
        department: 'Department',
        employee: 'Employee'
    };

    var orderBy = {
        department: 'id, name'
    };

    function createNullos(manager) {
        var unchanged = breeze.EntityState.Unchanged;

        
        createNullo(entityNames.department);
        createNullo('Category');
       

        function createNullo(entityName, values) {
            var initialValues = values
              || { name: ' [Select a ' + entityName.toLowerCase() + ']' };

            manager.createEntity(entityName, initialValues, unchanged);
        }
    }

    var model = {
        configureMetadataStore: configureMetadataStore,
        entityNames: entityNames,
        orderBy: orderBy,
        createNullos: createNullos

    };


    return model;
    //#region Internal Methods
    function configureMetadataStore(metadataStore) {
        metadataStore.registerEntityTypeCtor(
        'UserProfile', function () { this.isPartial = false; }, userprofileInitializer);

    }
    function userprofileInitializer(user) {
       

        user.imageName = ko.computed(function () {
            return makeImageName(user.photo());
        });
    };
    
    function makeImageName(source) {
        return config.imageSettings.imageBasePath +
            (source || imageSettings.unknownPersonImageSource);
    };

    //#endregion
}
  );
