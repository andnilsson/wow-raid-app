"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class ImgButton extends React.Component {
    render() {
        return (React.createElement("div", { style: this.props.style || {}, className: this.props.isActive ? "imgbutton active" : "imgbutton", onClick: () => this.props.onClick() },
            this.props.text || null,
            React.createElement("img", { style: { width: this.props.imgWidth || "70px" }, src: this.props.imgurl })));
    }
}
exports.default = ImgButton;
//# sourceMappingURL=imgbutton.js.map