﻿// ReSharper disable InconsistentNaming

/// <reference path="../../packages/React.TypeScript.DefinitelyTyped.0.1.12/react.d.ts" />

/*STATIC*/
var $another = {
    addLayout: undefined,
    addView:undefined,
    layouts: {},
    views: {}
};
$another.addLayout = (name, cb) => {
    $another.layouts[name] = cb;
};
$another.addView = (name, cb) => {
    $another.views[name] = cb;
};

/*HELPERS*/
var $anotherAppsCollection = {};

/*ANOTHER*/
interface IAnother {
    $appName: string;
    $serviceProviders: ServiceProviderCollection;
    addService(name: string, provider: () => {});
    addService(name: string, provider: () => void);
    addDependency(name: string);
    getService(name: string);
    getAppService(name: string);
    render(containerId: string, layoutName: string);
}

class another implements IAnother {

    // fields
    private _dependencies = {};

    // ctor
    constructor(public $appName: string) {
        $anotherAppsCollection[$appName] = this;
    }

    // props
    $serviceProviders = new ServiceProviderCollection(this.$appName);

    // methods
    addService(name: string, provider: () => IServiceProvider) {
        this.$serviceProviders.add(name, provider);
    }
    addDependency(name: string) {
        var found = $anotherAppsCollection[name];
        if (!found) throw "Cannot find app '" + name + "'";
        this._dependencies[name] = found;
    }
    getService(name: string) {
        var appName: string;
        var svcName: string;
        var app: IAnother;
        if (name.indexOf(".") > -1) {
            var splt = name.split(".");
            appName = splt[0];
            svcName = splt[1];
            app = this._dependencies[appName];
            if (!app) throw "Cannot find app '" + appName + "'";
        } else {
            app = this;
            svcName = name;
        }
        return app.getAppService(svcName);
    }
    getAppService(name: string) {
        return this.$serviceProviders.get(name);
    }
    render(containerId: string, layoutName: string) {
        // get layout
        var found = $another.layouts[layoutName];
        if (!found) throw "Cannot find layout name '" + layoutName + "'. Make sure you add it by calling $another.addLayout";
        ReactDOM.render(React.createElement(found()), document.getElementById(containerId));
    }
}

/*SERVICE*/
interface IServiceProvider {

}
class ServiceProvider {

}
class ServiceProviderCollection {

    private _providers = {};

    constructor(private _appName: string) { }

    add(name: string, provider: IServiceProvider): void {
        this._providers[name] = provider;
    }
    get(name: string): IServiceProvider {
        var found = this._providers[name];
        if (!found) throw "Cannot find service '" + name + "' in app '" + this._appName + "'";
        return found();
    }
}


/*CONTROLLER*/
interface IController {

}
class controller implements IController {

}