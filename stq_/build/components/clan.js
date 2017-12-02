"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const reducer_1 = require("../store/reducer");
const react_redux_1 = require("react-redux");
const classes_1 = require("../domain/classes");
var Option = require('muicss/lib/react/option');
var Select = require('muicss/lib/react/select');
var PulseLoader = require('halogenium').PulseLoader;
var Panel = require('muicss/lib/react/panel');
var Button = require('muicss/react').Button;
const en = require("linq");
var Input = require('muicss/lib/react/input');
const properties = [
    { displayName: "Player", property: "ownername" },
    { displayName: "Faction", property: "faction" },
    { displayName: "Class", property: "class" },
    { displayName: "Spec", property: "spec" },
    { displayName: "Pvp Enabled", property: "pvpEnabled", transformation: (value) => { return value ? "Yes" : "No"; } },
    { displayName: "Registered", property: "createdOn" },
    { displayName: "Status", property: "status" },
];
class Clan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            sortprop: null,
            isAscending: true,
            filterProp: null,
            filterValue: "",
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ players: nextProps.allPlayers }, () => {
            this.resetSortAndFilter();
        });
    }
    componentDidMount() {
        this.props.getAllPlayers();
    }
    resetSortAndFilter() {
        this.setState({
            players: this.props.allPlayers,
            sortprop: null,
            isAscending: true,
            filterProp: "ownername",
            filterValue: "",
        });
    }
    filterTable(value) {
        var property = en.from(properties).where(x => x.property == this.state.filterProp).firstOrDefault();
        if (!property)
            return;
        var transform = property.transformation ? property.transformation : (x) => { return x; };
        var sorted = en.from(this.props.allPlayers).where(x => transform(x[this.state.filterProp]).toLowerCase().indexOf(value.toLowerCase()) > -1).toArray();
        this.setState({
            players: sorted,
            filterValue: value
        });
    }
    sortTable(property) {
        var sorted = [];
        if (property == this.state.sortprop) {
            if (this.state.isAscending)
                sorted = en.from(this.props.allPlayers).orderByDescending(x => x[property].toString().toLowerCase()).toArray();
            else
                sorted = en.from(this.props.allPlayers).orderBy(x => x[property].toString().toLowerCase()).toArray();
            this.setState({ isAscending: !this.state.isAscending });
        }
        else {
            sorted = en.from(this.props.allPlayers).orderBy(x => x[property]).toArray();
            this.setState({ isAscending: true });
        }
        this.setState({
            players: sorted,
            sortprop: property
        });
    }
    render() {
        if (this.props.isFetchingPlayers)
            return React.createElement(PulseLoader, { color: "#26A65B", size: "16px", margin: "4px" });
        return (React.createElement("div", { className: "playerlist" },
            React.createElement("h1", null, "Players registered so far...."),
            React.createElement("div", { style: {
                    display: "flex",
                } },
                React.createElement(Select, { label: "Filter", defaultValue: this.state.filterProp, onChange: (e) => { this.setState({ filterProp: e.target.value }); } }, properties.map((p, i) => {
                    return React.createElement(Option, { key: i, value: p.property, label: p.displayName });
                })),
                React.createElement(Input, { label: "Contains text", floatingLabel: true, value: this.state.filterValue, onChange: (e) => this.filterTable(e.target.value) }),
                React.createElement(Button, { variant: "raised", color: "primary", onClick: () => this.resetSortAndFilter() }, "Reset all filters")),
            React.createElement("div", { className: "divTable playertable" },
                React.createElement("div", { className: "divTableHeading" },
                    React.createElement("div", { className: "divTableRow" }, properties.map((p, i) => {
                        return React.createElement("div", { key: i, className: "divTableHead", onClick: () => this.sortTable(p.property) }, p.displayName);
                    }))),
                React.createElement("div", { className: "divTableBody" }, this.state.players.map((player, i) => {
                    return (React.createElement("div", { key: i, className: "divTableRow" }, properties.map((prop, x) => {
                        if (prop.property === "class")
                            return React.createElement("div", { style: {
                                    backgroundColor: classes_1.getClassColor(player.class),
                                }, key: x, className: "divTableCell" },
                                React.createElement("img", { style: { height: "30px" }, src: classes_1.getImgUrl(player.class) }),
                                " ",
                                player.class);
                        if (prop.transformation)
                            return React.createElement("div", { key: x, className: "divTableCell" }, prop.transformation(player[prop.property]));
                        return React.createElement("div", { key: x, className: "divTableCell" }, player[prop.property]);
                    })));
                })))));
    }
}
exports.default = react_redux_1.connect((state) => state, reducer_1.ActionCreators)(Clan);
//# sourceMappingURL=clan.js.map