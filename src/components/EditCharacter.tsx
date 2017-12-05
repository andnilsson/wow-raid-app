import * as React from 'react'
import { IApplicationState, ActionCreators } from '../store/reducer';
import { Player as domainPlayer, Player } from '../domain/player';
var Option = require('muicss/lib/react/option')
var Select = require('muicss/lib/react/select')
var Button = require('muicss/react').Button
var Input = require('muicss/lib/react/input')

import ClassSelector from './classSelector'
import ClassBadge from './classbadge'
var PulseLoader = require('halogenium').PulseLoader;
import ImgButton from './imgbutton'

interface props {
    currentPlayer: Player
    currentUser: any
    isSavingPlayer: boolean
    savePlayer: (player: Player) => void
}

interface state {
    player: domainPlayer,
    classSelectorVisible: boolean
}

export default class EditCharacter extends React.Component<props, state>{
    constructor(props: props) {
        super(props);
        this.state = {
            player: {
                ownername: "A new character",
                spec: "DPS",
                faction: "Horde",
                class: "Druid",
                pvpEnabled: true,
                email: "",
                born: new Date(),
                type: "",
                about: "",
                emailNotifications: true
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
                    email: nextProps.currentPlayer.email ? nextProps.currentPlayer.email : "",
                    born: nextProps.currentPlayer.born,
                    type: nextProps.currentPlayer.type,
                    about: nextProps.currentPlayer.about,
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

    render() {
        if (!this.props.currentUser) return "Please log in join the clan!";

        return (
            <div style={{
                display: "flex"
            }}>
                <div style={{ width: "400px", }}>
                    {this.props.currentPlayer && <h1>{this.props.currentPlayer.ownername}</h1>}
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

                    <Input label="Email" floatingLabel={true} value={this.state.player.email} onChange={(e: any) => this.setState({ player: { ...this.state.player, email: e.target.value } })} />

                    <Select label="Tillåt email notiser (dvs. du får email när det händer saker här)" defaultValue={this.state.player.emailNotifications} onChange={(e: any) => { this.setState({ player: { ...this.state.player, emailNotifications: e.target.value === "true" } }) }}>
                        <Option value="true" label="Yes" />
                        <Option value="false" label="No" />
                    </Select>

                    <Select label="Typ av spelare" defaultValue={this.state.player.type} onChange={(e: any) => { this.setState({ player: { ...this.state.player, type: e.target.value } }) }}>
                        <Option value="Raid Leader" label="Raid Leader" />
                        <Option value="Class leader" label="Class leader" />
                        <Option value="Raid member" label="Raid member" />
                        <Option value="Casual member" label="Casual member" />
                    </Select>

                    About<br />
                    <textarea placeholder="Om dig, din wowkarriäar och annat av intresse..." style={{
                        width: "350px",
                        height: "100px",
                        backgroundColor: "white",
                        color: "#000"
                    }} onChange={(e) => this.setState({ player: { ...this.state.player, about: e.target.value } })} value={this.state.player.about}></textarea>

                    {this.props.isSavingPlayer ? <PulseLoader color="#26A65B" size="16px" margin="4px" /> : <Button variant="raised" color="primary" onClick={() => this.props.savePlayer(this.state.player)}>{this.state.player._id ? "Save changes" : "Create new character"}</Button>}
                </div>
                <div style={{ width: "300px", }}>
                    <ClassSelector isVisible={this.state.classSelectorVisible} classWasSelected={(c) => this.classWasSelected(c)} />
                </div>
            </div>
        )
    }
}
