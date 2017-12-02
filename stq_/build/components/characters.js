"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const reducer_1 = require("../store/reducer");
const react_redux_1 = require("react-redux");
var Option = require('muicss/lib/react/option');
var Select = require('muicss/lib/react/select');
var Button = require('muicss/react').Button;
var Input = require('muicss/lib/react/input');
const classSelector_1 = require("./classSelector");
const classbadge_1 = require("./classbadge");
var PulseLoader = require('halogenium').PulseLoader;
const imgbutton_1 = require("./imgbutton");
class Characters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: {
                spec: "DPS",
                faction: "Horde",
                class: "Druid",
                pvpEnabled: true
            },
            classSelectorVisible: false
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentPlayer) {
            this.setState({
                player: Object.assign({}, this.state.player, { spec: nextProps.currentPlayer.spec, faction: nextProps.currentPlayer.faction, class: nextProps.currentPlayer.class, pvpEnabled: nextProps.currentPlayer.pvpEnabled, _id: nextProps.currentPlayer._id })
            });
        }
    }
    classWasSelected(classname) {
        this.setState({
            player: Object.assign({}, this.state.player, { class: classname }),
            classSelectorVisible: false
        });
    }
    componentDidMount() {
        this.props.getOwnPlayer();
    }
    render() {
        if (!this.props.currentUser)
            return "Please log in join the clan!";
        if (this.props.isFetchingPlayers)
            return React.createElement(PulseLoader, { color: "#26A65B", size: "16px", margin: "4px" });
        return (React.createElement("div", { style: {
                display: "flex"
            } },
            React.createElement("div", { style: { width: "400px", } },
                React.createElement("label", null, "Faction:"),
                " ",
                this.state.player.faction,
                React.createElement("div", { style: {
                        display: "flex",
                        marginBottom: "20px"
                    } },
                    React.createElement(imgbutton_1.default, { style: {
                            width: "72px"
                        }, isActive: this.state.player.faction == "Horde", imgurl: "/img/horde.png", onClick: () => { this.setState({ player: Object.assign({}, this.state.player, { faction: "Horde" }) }); } }),
                    React.createElement(imgbutton_1.default, { style: {
                            width: "72px"
                        }, isActive: this.state.player.faction == "Alliance", imgurl: "/img/alliance.png", onClick: () => { this.setState({ player: Object.assign({}, this.state.player, { faction: "Alliance" }) }); } })),
                "Class:",
                React.createElement("br", null),
                React.createElement(classbadge_1.default, { classname: this.state.player.class, onClick: () => this.setState({ classSelectorVisible: true }) }),
                React.createElement(Select, { label: "Spec", defaultValue: this.state.player.spec, onChange: (e) => { this.setState({ player: Object.assign({}, this.state.player, { spec: e.target.value }) }); } },
                    React.createElement(Option, { value: "DPS", label: "DPS" }),
                    React.createElement(Option, { value: "Healer", label: "Healer" }),
                    React.createElement(Option, { value: "Tank", label: "Tank" })),
                React.createElement(Select, { label: "PVP Enabled server", defaultValue: this.state.player.pvpEnabled, onChange: (e) => { this.setState({ player: Object.assign({}, this.state.player, { pvpEnabled: e.target.value === "true" }) }); } },
                    React.createElement(Option, { value: "true", label: "Yes" }),
                    React.createElement(Option, { value: "false", label: "No" })),
                this.props.isSavingPlayer ? React.createElement(PulseLoader, { color: "#26A65B", size: "16px", margin: "4px" }) : React.createElement(Button, { variant: "raised", color: "primary", onClick: () => this.props.savePlayer(this.state.player) }, this.state.player._id ? "Save changes" : "Create new character")),
            React.createElement("div", { style: { width: "300px", } },
                React.createElement(classSelector_1.default, { isVisible: this.state.classSelectorVisible, classWasSelected: (c) => this.classWasSelected(c) }))));
    }
}
exports.default = react_redux_1.connect((state) => state, reducer_1.ActionCreators)(Characters);
//# sourceMappingURL=characters.js.map