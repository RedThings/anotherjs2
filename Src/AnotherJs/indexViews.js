/// <reference path="../packages/React.TypeScript.DefinitelyTyped.0.1.12/react.d.ts" />
(function () {
    $another.addView("MainLayout.Index", function () {
        return React.createClass({
            render: function () {
                return React.createElement("div", null, "INDEX!");
            }
        });
    });
    $another.addView("MainLayout.About", function () {
        return React.createClass({
            render: function () {
                return React.createElement("div", null, "ABOUT!");
            }
        });
    });
    $another.addLayout("MainLayout", function () {
        return React.createClass({
            render: function () {
                return (React.createElement("div", {id: "layout"}, React.createElement("header", null, "Another JS..."), React.createElement("div", null, this.state.anotherView), React.createElement("div", null, this.state.footerController)));
            }
        });
    });
})();
