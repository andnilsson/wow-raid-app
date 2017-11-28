import * as React from 'react'
import { IApplicationState, ActionCreators } from '../store/reducer';
import { Player as domainPlayer } from '../domain/player';
import { connect } from 'react-redux';
var Option = require('muicss/lib/react/option')
var Select = require('muicss/lib/react/select')
var Button = require('muicss/react').Button
var Input = require('muicss/lib/react/input')
type props = IApplicationState & typeof ActionCreators
import ClassSelector from './classSelector'
import ClassBadge from './classbadge'
var PulseLoader = require('halogenium').PulseLoader;
import ImgButton from './imgbutton'


interface state {
    player: domainPlayer,
    classSelectorVisible: boolean
}

class Characters extends React.Component<props, state>{
    constructor(props: props) {
        super(props);
        this.state = {
            player: {
                spec: "DPS",
                faction: "Horde",
                class: "Druid",
                pvpEnabled: true
            } as domainPlayer,
            classSelectorVisible: false
        }
    }

    componentWillReceiveProps(nextProps: props) {
        if (nextProps.currentPlayer) {
            this.setState({
                player: {
                    ...this.state.player,
                    spec: nextProps.currentPlayer.spec,
                    faction: nextProps.currentPlayer.faction,
                    class: nextProps.currentPlayer.class,
                    pvpEnabled: nextProps.currentPlayer.pvpEnabled,
                    _id: nextProps.currentPlayer._id
                }
            })
        }
    }

    classWasSelected(classname: string) {
        this.setState({
            player: {
                ...this.state.player,
                class: classname
            },
            classSelectorVisible: false
        })
    }

    componentDidMount() {
        this.props.getOwnPlayer();
    }

    render() {
        if (!this.props.currentUser) return "Please log in join the clan!";
        if (this.props.isFetchingPlayers) return <PulseLoader color="#26A65B" size="16px" margin="4px" />
        return (
            <div style={{                
                display: "flex"
            }}>
                <div style={{width: "400px",}}>
                    <label>Faction:</label> {this.state.player.faction}
                    <div style={{
                        display: "flex",
                        marginBottom: "20px"
                    }}>
                        <ImgButton
                            style={{
                                width: "72px"
                            }}
                            isActive={this.state.player.faction == "Horde"}
                            imgurl="/img/horde.png"
                            onClick={() => { this.setState({ player: { ...this.state.player, faction: "Horde" } }) }}
                        />
                        <ImgButton
                            style={{
                                width: "72px"
                            }}
                            isActive={this.state.player.faction == "Alliance"}
                            imgurl="/img/alliance.png"
                            onClick={() => { this.setState({ player: { ...this.state.player, faction: "Alliance" } }) }}
                        />
                    </div>

                    Class:<br />
                    <ClassBadge classname={this.state.player.class} onClick={() => this.setState({ classSelectorVisible: true })} />

                    <Select label="Spec" defaultValue={this.state.player.spec} onChange={(e: any) => { this.setState({ player: { ...this.state.player, spec: e.target.value } }) }}>
                        <Option value="DPS" label="DPS" />
                        <Option value="Healer" label="Healer" />
                        <Option value="Tank" label="Tank" />
                    </Select>

                    <Select label="PVP Enabled server" defaultValue={this.state.player.pvpEnabled} onChange={(e: any) => { this.setState({ player: { ...this.state.player, pvpEnabled: e.target.value === "true" } }) }}>
                        <Option value="true" label="Yes" />
                        <Option value="false" label="No" />
                    </Select>

                    {this.props.isSavingPlayer ? <PulseLoader color="#26A65B" size="16px" margin="4px" /> : <Button variant="raised" color="primary" onClick={() => this.props.savePlayer(this.state.player)}>{this.state.player._id ? "Save changes" : "Create new character"}</Button>}
                </div>
                <div style={{width: "300px",}}>
                    <ClassSelector isVisible={this.state.classSelectorVisible} classWasSelected={(c) => this.classWasSelected(c)} />
                </div>
            </div>
        )
    }
}

export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(Characters)
