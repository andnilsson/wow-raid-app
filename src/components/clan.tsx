import * as React from 'react';
import { IApplicationState, ActionCreators } from '../store/reducer';
import { connect } from 'react-redux';
import { Classes, getClassColor } from '../domain/classes';
import ClassBadge from './classbadge'
var PulseLoader = require('halogenium').PulseLoader;
var Panel = require('muicss/lib/react/panel')
type props = IApplicationState & typeof ActionCreators

class Clan extends React.Component<props, {}>{
    componentDidMount() {
        this.props.getAllPlayers();
    }

    render() {
        if (this.props.isFetchingPlayers) return <PulseLoader color="#26A65B" size="16px" margin="4px" />

        return (
            <div className="playerlist">
                Players registered so far....
                {this.props.allPlayers.map((player, i) => {
                    return (
                        <div className="panel" style={{
                            borderLeft: `20px solid ${getClassColor(player.class)}`,
                            paddingTop: "0px",                            
                        }} key={i}>
                            <h2>{player.ownername}</h2>
                            <ClassBadge hideBorder={true} classname={player.class} />
                            Faction: {player.faction}<br />
                            Spec: {player.spec}<br />
                            PVP enabled server: {player.pvpEnabled ? "Yes" : "No"}<br />
                        </div>
                    )
                })}
            </div>
        )
    }
}


export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(Clan)
