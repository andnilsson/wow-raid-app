"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const reducer_1 = require("../store/reducer");
const react_redux_1 = require("react-redux");
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }
    send() {
        this.props.sendMessge(this.state.message);
        this.setState({ message: '' });
    }
    messageOnChange(newvalue) {
        this.setState({ message: newvalue });
        if (newvalue !== '')
            this.props.startedTypingMessage();
        else
            this.props.stopedTypingMessage();
    }
    render() {
        // if(!this.props.currentUser) return null;
        return (React.createElement("div", { id: "live-chat" },
            React.createElement("header", { className: "clearfix" },
                React.createElement("a", { href: "#", className: "chat-close" }, "x"),
                React.createElement("h4", null, "chat"),
                React.createElement("span", { className: "chat-message-counter" }, "3")),
            React.createElement("div", { className: "chat" },
                React.createElement("div", { className: "chat-history" }, this.props.messages.map((m, i) => {
                    return React.createElement("div", { className: "chat-message clearfix" },
                        React.createElement("div", { className: "chat-message-content clearfix" },
                            React.createElement("span", { className: "chat-time" }, "13:35"),
                            React.createElement("h5", null, m.from),
                            React.createElement("p", null, m.message)),
                        React.createElement("hr", null));
                })),
                React.createElement("input", { type: "text", placeholder: "Type your message…", value: this.state.message, onChange: (e) => { this.messageOnChange(e.target.value); } }),
                React.createElement("button", { onClick: () => this.send() }, "-->"))));
    }
}
exports.default = react_redux_1.connect((state) => state, reducer_1.ActionCreators)(Chat);
//# sourceMappingURL=chat.js.map