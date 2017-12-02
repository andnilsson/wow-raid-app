"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const user_1 = require("../components/user");
class Header extends React.Component {
    render() {
        return (React.createElement("div", { className: "header" },
            React.createElement("div", { className: "header-content" },
                React.createElement("img", { src: "https://cdn.wccftech.com/wp-content/uploads/2017/11/world-of-warcraft-classic.png", className: "header-img" }),
                React.createElement("h1", null,
                    React.createElement(react_router_dom_1.Link, { to: "/" }, "Project classic")),
                React.createElement(react_router_dom_1.Link, { to: "/characters" }, "My character"),
                React.createElement(react_router_dom_1.Link, { to: "/members" }, "Members"),
                React.createElement(react_router_dom_1.Link, { to: "/rules" }, "FAQ")),
            React.createElement("div", { className: "header-login" },
                React.createElement(user_1.default, null))));
    }
}
exports.default = Header;
//# sourceMappingURL=header.js.map