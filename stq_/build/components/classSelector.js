"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const classbadge_1 = require("./classbadge");
const classes_1 = require("../domain/classes");
class ClassSelector extends React.Component {
    render() {
        if (!this.props.isVisible)
            return null;
        return (React.createElement("div", null, classes_1.Classes.map((c, i) => {
            return (React.createElement(classbadge_1.default, { classname: c.name, key: i, onClick: () => this.props.classWasSelected(c.name) }));
        })));
    }
}
exports.default = ClassSelector;
//# sourceMappingURL=classSelector.js.map