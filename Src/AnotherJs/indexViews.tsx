/// <reference path="../packages/React.TypeScript.DefinitelyTyped.0.1.12/react.d.ts" />


(function () {

    $another.addView("MainLayout.Index", () => {

        return React.createClass({
            render: function () {
                return <div>INDEX!</div>;
            }
        });

    });

    $another.addView("MainLayout.About", () => {

        return React.createClass({
            render: function () {
                return <div>ABOUT!</div>;
            }
        });

    });

    $another.addLayout("MainLayout", () => {

        return React.createClass({

            render: function () {
                return (
                    <div id="layout">
                        <header>Another JS...</header>
                        <div>{this.state.anotherView}</div>
                        <div>{this.state.footerController}</div>
                    </div>
                );
            }

        });

    });

})();