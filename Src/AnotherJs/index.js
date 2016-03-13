// ReSharper disable InconsistentNaming
var assertAreEqual = function (obj1, obj2) {
    if (obj1 !== obj2) {
        console.log(obj1, obj2);
        throw "assertAreEqual failed";
    }
    console.log("assertAreEqual passed");
};
var assertIsNotNull = function (obj) {
    if (obj === undefined || obj === null)
        throw "assertIsNotNull failed";
    console.log("assertIsNotNull passed");
};
var assertIsNull = function (obj) {
    if (!(obj === undefined || obj === null))
        throw "assertIsNull failed";
    console.log("assertIsNull passed");
};
var assertThrow = function (callback) {
    var errored = false;
    try {
        callback();
    }
    catch (err) {
        errored = true;
    }
    if (errored)
        console.log("assertThrow passed");
    else
        throw "assertThrow failed";
};
window.onerror = function (err) {
    alert(err);
    console.log(err);
};
// create services app
var servicesApp = new another("servicesApp");
assertAreEqual("servicesApp", servicesApp.$appName);
// add service
var service1 = function () {
    this.init = function () {
        console.log("Service1.Init");
    };
    this.getString = function () { return "Hello world"; };
};
servicesApp.addService("Service1", function () {
    return new service1();
});
// create index app
var indexApp = new another("indexApp");
assertAreEqual("indexApp", indexApp.$appName);
// add dependencies
indexApp.addDependency("servicesApp");
var gotService1 = indexApp.getService("servicesApp.Service1");
var expected = "Hello world";
var actual = gotService1.getString();
assertAreEqual(expected, actual);
// add service which uses service
var depService = function (dep1) {
    var _dep1 = dep1;
    this.getDep = function () {
        var output = _dep1;
        return output;
    };
};
indexApp.addService("ServiceWithDep", function () {
    var s1 = indexApp.getService("servicesApp.Service1");
    var output = new depService(s1);
    return output;
});
var gotDepService = indexApp.getService("ServiceWithDep");
expected = "Hello world";
actual = gotDepService.getDep().getString();
assertAreEqual(expected, actual);
// create home controller
var homeController = (function () {
    function homeController() {
    }
    homeController.prototype.index = function () {
        console.log("in index action");
    };
    homeController.prototype.aboot = function () {
        console.log("in about action");
    };
    return homeController;
}());
indexApp.addService("homeController", function () {
    return new homeController();
});
// run spa
indexApp.render("container", "MainLayout");
