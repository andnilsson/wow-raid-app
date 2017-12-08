import * as React from 'react'
import { ActionCreators, IApplicationState } from '../store/reducer';
import { error } from 'util';
import anchorme from "anchorme"
import * as moment from 'moment'
import { Player } from '../domain/player';

interface props {    
    selectedPlayer: Player
    error: string    
    id: string
}

export default class ShowCharacter extends React.Component<props, {}>{
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
   
    render() {       
        if(!this.props.selectedPlayer) return this.props.error || "player not found";

        return <div>
            <h1>{this.props.selectedPlayer.ownername}</h1>
            <b>Faction:</b> {this.props.selectedPlayer.faction}<br />
            <b>Class:</b> {this.props.selectedPlayer.class}<br />
            <b>Spec:</b> {this.props.selectedPlayer.spec}<br />
            <b>Pvp Enabled servers:</b> {this.props.selectedPlayer.pvpEnabled ? "Ja" : "Nej"}<br />            
            <b>Status:</b> {this.props.selectedPlayer.status}<br />
            <b>Typ:</b> {this.props.selectedPlayer.type}<br />

            <b>Om</b> <div dangerouslySetInnerHTML={{__html: this.getUnsafeText(this.props.selectedPlayer.about)}}/>
        </div>
    }
}

