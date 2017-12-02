"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const piechart_1 = require("./piechart");
const react_redux_1 = require("react-redux");
const reducer_1 = require("../store/reducer");
var PulseLoader = require('halogenium').PulseLoader;
const en = require("linq");
class Home extends React.Component {
    componentDidMount() {
        this.props.getAllPlayers();
    }
    getPercentage(needle, haystack) {
        var g = haystack.where(x => x == needle);
        return (g.count() / haystack.count()) * 100;
    }
    getClassesPieChartData() {
        if (this.props.allPlayers.length == 0)
            return null;
        var self = this;
        var allClasses = en.from(this.props.allPlayers).distinct(x => x.class).select(x => x.class);
        var data = allClasses.toArray().map((c, index) => {
            return {
                name: c,
                y: self.getPercentage(c, en.from(this.props.allPlayers).select(x => x.class))
            };
        });
        return data;
    }
    getFactionPieChartData() {
        if (this.props.allPlayers.length == 0)
            return null;
        var self = this;
        var allfactions = en.from(this.props.allPlayers).distinct(x => x.faction).select(x => x.faction);
        var data = allfactions.toArray().map((f, i) => {
            return {
                name: f,
                y: self.getPercentage(f, en.from(this.props.allPlayers).select(x => x.faction))
            };
        });
        return data;
    }
    render() {
        return (React.createElement("div", { style: {
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                display: "flex"
            } },
            React.createElement("div", { className: "plaintext" },
                React.createElement("h1", null, "Om"),
                React.createElement("p", null, "Du har ramlat in p\u00E5 en fantastisk sida, en sida som efter J. Allen Brack\u2019s uttalande om classic wow har dragit ig\u00E5ng ett dundrande engagemang fr\u00E5n mig, och m\u00E5nga bekanta att starta en classic guild. Eftersom du redan \u00E4r h\u00E4r inne, s\u00E5 har du antagligen sj\u00E4lv ett roligt minne fr\u00E5n denna tiden, d\u00E5 allt betydde n\u00E5gonting i spelet. D\u00E4r ibland inte m\u00E5let var det intressanta, utan resan dit. Epics\u2026. Levde fritt i spelet med full respekt, till och med en fullt bl\u00E5 utrustad karakt\u00E4r kunde ge en bel\u00E5tande suck."),
                React.createElement("p", null, "Denna sidan \u00E4r till f\u00F6r att h\u00E5lla gnistan uppe tills spelet kommer, och f\u00F6r att dela med oss av nyheter inf\u00F6r release , l\u00E4ra k\u00E4nna varandra och f\u00E5 en liten blick hur vi skulle kunna bygga upp den d\u00E4r gemenskapen som gjorde att spelet blev en fantastisk resa. Vi har f\u00E5 krav f\u00F6r att du ska f\u00E5 vara med, dem flesta hittar du under regler uppe i menyerna. Det viktigaste \u00E4r att du \u00E4r en mogen person som ser fram emot det h\u00E4r, \u00E4ven om det inte \u00E4r lika mycket som oss. De flesta i detta projektet har arbeten att g\u00E5 till, eller en familj som kr\u00E4ver tid uppm\u00E4rksamhet, vilket g\u00F6r speltiden lite viktigare att vara koordinerad, vilket denna community sidan skall underl\u00E4tta med.  Vi kommer ha allt fr\u00E5n hardcore raid spelare, till casual social players som bara vill vara med och snacka lite och ha chansen att l\u00E4ra k\u00E4nna nya h\u00E4rliga m\u00E4nniskor. Alla som blir registrerade p\u00E5 denna sidan \u00E4r inte garanterade att f\u00E5 f\u00F6lja med, eftersom vi har givetvis en kultur som skall fungera h\u00E4r, och har du inte dem grundl\u00E4ggande sakerna som utg\u00F6r en trevlig spelare och lagspelare s\u00E5 kommer ni inte ombord p\u00E5 t\u00E5get. Alla kommer att registreras med en \u201Drookie\u201D st\u00E4mpel tills man k\u00F6rt lite dungeons eller annat tillsammans.  Vi kommer ha v\u00E4ldigt mycket vilad exp har jag en k\u00E4nsla av, vilket g\u00F6r att jag sj\u00E4lv troligen kommer questa v\u00E4ldigt lite, och bara g\u00F6ra instanser. M\u00E5nga resonerar s\u00E5h\u00E4r, och kommer k\u00F6ra healing spec \u00E4ven upp till level 60, och alla kommer hj\u00E4lpas \u00E5t och n\u00F6ta instanser \uD83D\uDE0A"),
                React.createElement("p", null, "Kom ih\u00E5g att \u00E4ven om du spelar 3 timmar i veckan, som jag kanske sj\u00E4lv kommer g\u00F6ra ibland, s\u00E5 \u00E4r du varmt v\u00E4lkommen. S\u00E5 logga in med ditt Bnet konto, och v\u00E4lj vilken karakt\u00E4r du kommer vilja raida med / spela dungeons med .  Alla fr\u00E5gor, kommer tas upp och l\u00E4ggas under \u201Dregler\u201D l\u00E4nken h\u00F6gst upp p\u00E5 sidan, tex om vi kommer spela horde / alliance , teamspeak / ventrilo / discord etc."),
                React.createElement("p", null),
                React.createElement("p", null, "Jag tackar f\u00F6r din tid av l\u00E4sning, och hoppas du \u00E4r ombord p\u00E5 t\u00E5get !!")),
            React.createElement("div", null,
                React.createElement("div", { className: "chartwrapper" }, this.props.isFetchingPlayers ? React.createElement(PulseLoader, { color: "#26A65B", size: "16px", margin: "4px" }) : React.createElement(piechart_1.default, { title: "class distribution", data: this.getClassesPieChartData() })),
                React.createElement("div", { className: "chartwrapper" }, this.props.isFetchingPlayers ? React.createElement(PulseLoader, { color: "#26A65B", size: "16px", margin: "4px" }) : React.createElement(piechart_1.default, { title: "faction distribution", data: this.getFactionPieChartData() })))));
    }
}
exports.default = react_redux_1.connect((state) => state, reducer_1.ActionCreators)(Home);
//# sourceMappingURL=home.js.map