import * as React from 'react'
import PieChart from './piechart'
import { connect } from 'react-redux';
import { ActionCreators, IApplicationState } from '../store/reducer';
import { Classes, getClassColor } from '../domain/classes';
var PulseLoader = require('halogenium').PulseLoader;
import * as en from 'linq';

type props = IApplicationState & typeof ActionCreators

class Home extends React.Component<props, {}>{
    componentDidMount() {
        if (this.props.allPlayers.length < 1)
            this.props.getAllPlayers();
    }

    getPercentage(needle: string, haystack: en.IEnumerable<string>): number {
        var g = haystack.where(x => x == needle);
        return (g.count() / haystack.count()) * 100;

    }

    getClassesPieChartData() {
        if (this.props.allPlayers.length == 0) return null;
        var self = this;
        var allClasses = en.from(this.props.allPlayers).distinct(x => x.class).select(x => x.class);
        var data = allClasses.toArray().map((c, index) => {
            return {
                name: c,
                y: self.getPercentage(c, en.from(this.props.allPlayers).select(x => x.class)),
                color: getClassColor(c).backgroundColor
            }
        })
        return data;
    }

    getFactionPieChartData() {
        if (this.props.allPlayers.length == 0) return null;
        var self = this;
        var allfactions = en.from(this.props.allPlayers).distinct(x => x.faction).select(x => x.faction);
        var data = allfactions.toArray().map((f, i) => {
            return {
                name: f,
                y: self.getPercentage(f, en.from(this.props.allPlayers).select(x => x.faction)),
                color: f.toLowerCase() == "horde" ? "#322222" : "#222233"
            }
        })
        return data;
    }
    render() {
        return (
            <div style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "flex-start",
                display: "flex"
            }}>

                <div className="plaintext">
                    <h1>Om</h1>
                    <p>Du har ramlat in på en fantastisk sida, en sida som efter J. Allen Brack’s uttalande om classic wow har dragit igång ett dundrande engagemang från mig, och många bekanta att starta en classic guild. Eftersom du redan är här inne, så har du antagligen själv ett roligt minne från denna tiden, då allt betydde någonting i spelet. Där ibland inte målet var det intressanta, utan resan dit. Epics…. Levde fritt i spelet med full respekt, till och med en fullt blå utrustad karaktär kunde ge en belåtande suck.</p>
                    <p>Denna sidan är till för att hålla gnistan uppe tills spelet kommer, och för att dela med oss av nyheter inför release , lära känna varandra och få en liten blick hur vi skulle kunna bygga upp den där gemenskapen som gjorde att spelet blev en fantastisk resa. Vi har få krav för att du ska få vara med, dem flesta hittar du under regler uppe i menyerna. Det viktigaste är att du är en mogen person som ser fram emot det här, även om det inte är lika mycket som oss. De flesta i detta projektet har arbeten att gå till, eller en familj som kräver tid uppmärksamhet, vilket gör speltiden lite viktigare att vara koordinerad, vilket denna community sidan skall underlätta med.  Vi kommer ha allt från hardcore raid spelare, till casual social players som bara vill vara med och snacka lite och ha chansen att lära känna nya härliga människor. Alla som blir registrerade på denna sidan är inte garanterade att få följa med, eftersom vi har givetvis en kultur som skall fungera här, och har du inte dem grundläggande sakerna som utgör en trevlig spelare och lagspelare så kommer ni inte ombord på tåget. Alla kommer att registreras med en ”rookie” stämpel tills man kört lite dungeons eller annat tillsammans.  Vi kommer ha väldigt mycket vilad exp har jag en känsla av, vilket gör att jag själv troligen kommer questa väldigt lite, och bara göra instanser. Många resonerar såhär, och kommer köra healing spec även upp till level 60, och alla kommer hjälpas åt och nöta instanser 😊</p>
                    <p>Kom ihåg att även om du spelar 3 timmar i veckan, som jag kanske själv kommer göra ibland, så är du varmt välkommen. Så logga in med ditt Bnet konto, och välj vilken karaktär du kommer vilja raida med / spela dungeons med .  Alla frågor, kommer tas upp och läggas under ”regler” länken högst upp på sidan, tex om vi kommer spela horde / alliance , teamspeak / ventrilo / discord etc.</p>
                    <p></p>
                    <p>Jag tackar för din tid av läsning, och hoppas du är ombord på tåget !!</p>
                </div>

                <div>
                    <div className="chartwrapper">
                        {this.props.isFetchingPlayers ? <PulseLoader color="#26A65B" size="16px" margin="4px" /> : <PieChart title="class distribution" data={this.getClassesPieChartData()} />}
                    </div>
                    <div className="chartwrapper">
                        {this.props.isFetchingPlayers ? <PulseLoader color="#26A65B" size="16px" margin="4px" /> : <PieChart title="faction distribution" data={this.getFactionPieChartData()} />}
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(Home)