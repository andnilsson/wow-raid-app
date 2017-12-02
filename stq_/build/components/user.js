"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const reducer_1 = require("../store/reducer");
var PulseLoader = require('halogenium').PulseLoader;
var Button = require('muicss/react').Button;
class User extends React.Component {
    componentDidMount() {
        if (!this.props.currentUser)
            this.props.fetchCurrentUser();
    }
    render() {
        if (this.props.isLoadingUser)
            return (React.createElement(PulseLoader, { color: "#26A65B", size: "16px", margin: "4px" }));
        return (React.createElement("div", null, this.props.currentUser ? (React.createElement("div", null, `hello ${this.props.currentUser.battletag}`)) : (React.createElement("div", null,
            React.createElement(Button, { variant: "raised", color: "primary", onClick: () => this.props.authenticate() }, "logga in"),
            React.createElement("span", null, "Logga in med ditt Bnet konto f\u00F6r att registrera dig f\u00F6r WoW classic resan och v\u00E5r Guild")))));
    }
}
exports.default = react_redux_1.connect((state) => state, reducer_1.ActionCreators)(User);
//# sourceMappingURL=user.js.map