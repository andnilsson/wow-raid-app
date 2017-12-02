"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const clan_1 = require("./components/clan");
const home_1 = require("./components/home");
const header_1 = require("./components/header");
const characters_1 = require("./components/characters");
const rules_1 = require("./components/rules");
const react_router_dom_1 = require("react-router-dom");
const chat_1 = require("./components/chat");
class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(header_1.default, null),
            React.createElement("div", { className: "main" },
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: home_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: '/characters', component: characters_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: '/members', component: clan_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: '/rules', component: rules_1.default }))),
            React.createElement(chat_1.default, null)));
    }
}
exports.default = Main;
//# sourceMappingURL=main.js.map