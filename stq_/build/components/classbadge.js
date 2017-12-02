"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classes_1 = require("../domain/classes");
class ClassBadge extends React.Component {
    render() {
        return (React.createElement("div", { onClick: () => this.props.onClick && this.props.onClick(), className: this.props.hideBorder ? "classBadge-noborder" : "classBadge" },
            React.createElement("img", { src: classes_1.getImgUrl(this.props.classname) }),
            React.createElement("span", { style: { color: classes_1.getClassColor(this.props.classname) } }, this.props.classname)));
    }
}
exports.default = ClassBadge;
//# sourceMappingURL=classbadge.js.map