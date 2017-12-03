import * as React from 'react'
import { ActionCreators, IApplicationState } from '../store/reducer';
import { connect } from 'react-redux';
import { error } from 'util';
var PulseLoader = require('halogenium').PulseLoader;
type props = IApplicationState & typeof ActionCreators
import anchorme from "anchorme"
import * as moment from 'moment'

class ShowCharacter extends React.Component<props, {}>{
    getUnsafeText(text: string): string{
        if(!text || text === "") return "";
        var str = text;
        str = str.replace(/\n/g, "<br />");
        str = anchorme(str, {
            attributes: [
                { name: "target", value: "blank" }
            ]
        });
        return str;
    }
    componentDidMount(){
        this.props.getAPlayer(this.getId())
    }
    getId() {
        try {
            return (this.props as any).match.params.id + (this.props as any).location.hash
        } catch (e) { return "could not read parameter"; }
    }
    render() {  
        if (this.props.isFetchingPlayers) return <PulseLoader color="#26A65B" size="16px" margin="4px" />
        if(!this.props.selectedPlayer) return this.props.error || "player not found";

        return <div>
            <h1>{this.props.selectedPlayer.ownername}</h1>
            <b>Faction:</b> {this.props.selectedPlayer.faction}<br />
            <b>Class:</b> {this.props.selectedPlayer.class}<br />
            <b>Spec:</b> {this.props.selectedPlayer.spec}<br />
            <b>Pvp Enabled servers:</b> {this.props.selectedPlayer.pvpEnabled ? "Ja" : "Nej"}<br />
            <b>Rank:</b> {this.props.selectedPlayer.rank}<br />
            <b>Status:</b> {this.props.selectedPlayer.status}<br />
            <b>Typ:</b> {this.props.selectedPlayer.type}<br />

            <b>Om</b> <div dangerouslySetInnerHTML={{__html: this.getUnsafeText(this.props.selectedPlayer.about)}}/>
        </div>
    }
}

export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(ShowCharacter)
