// ReSharper disable InconsistentNaming
/*HELPERS*/
var $anotherAppsCollection = {};
var another = (function () {
    // ctor
    function another($appName) {
        this.$appName = $appName;
        // fields
        this._dependencies = {};
        // props
        this.$serviceProviders = new ServiceProviderCollection(this.$appName);
        $anotherAppsCollection[$appName] = this;
    }
    // methods
    another.prototype.addService = function (name, provider) {
        this.$serviceProviders.add(name, provider);
    };
    another.prototype.addDependency = function (name) {
        var found = $anotherAppsCollection[name];
        if (!found)
            throw "Cannot find app '" + name + "'";
        this._dependencies[name] = found;
    };
    another.prototype.getService = function (name) {
        var appName;
        var svcName;
        var app;
        if (name.indexOf(".") > -1) {
            var splt = name.split(".");
            appName = splt[0];
            svcName = splt[1];
            app = this._dependencies[appName];
            if (!app)
                throw "Cannot find app '" + appName + "'";
        }
        else {
            app = this;
            svcName = name;
        }
        return app.getAppService(svcName);
    };
    another.prototype.getAppService = function (name) {
        return this.$serviceProviders.get(name);
    };
    return another;
}());
var ServiceProvider = (function () {
    function ServiceProvider() {
    }
    return ServiceProvider;
}());
var ServiceProviderCollection = (function () {
    function ServiceProviderCollection(_appName) {
        this._appName = _appName;
        this._providers = {};
    }
    ServiceProviderCollection.prototype.add = function (name, provider) {
        this._providers[name] = provider;
    };
    ServiceProviderCollection.prototype.get = function (name) {
        var found = this._providers[name];
        if (!found)
            throw "Cannot find service '" + name + "' in app '" + this._appName + "'";
        return found();
    };
    return ServiceProviderCollection;
}());
var controller = (function () {
    function controller() {
    }
    return controller;
}());
