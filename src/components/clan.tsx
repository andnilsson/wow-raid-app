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
                            border:`1px solid ${getClassColor(player.class)}`,
                            borderLeft: `20px solid ${getClassColor(player.class)}`,
                            paddingTop: "0px",
                            display: "flex",                            
                        }} key={i}>
                            <div>
                                <h2>{player.ownername}</h2>
                                <ClassBadge hideBorder={true} classname={player.class} />
                                Spec: <b>{player.spec}</b><br />
                                PVP enabled server: <b>{player.pvpEnabled ? "Yes" : "No"}</b><br />
                            </div>
                            <div>
                                <img src={`/img/${player.faction}.png`} style={{
                                    width: "100px", 
                                    marginLeft: "20px",
                                    marginTop: "12px"
                                    }} />
                            </div>
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
