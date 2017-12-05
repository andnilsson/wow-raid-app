import * as React from 'react'
import { connect } from 'react-redux';
import { ActionCreators, IApplicationState } from '../store/reducer';
import ShowCharacter from './showCharacter'
import EditCharacter from './EditCharacter'
var PulseLoader = require('halogenium').PulseLoader;
import * as en from 'linq';
import { Player } from '../domain/player';

type props = IApplicationState & typeof ActionCreators
interface state {
    selectedPlayer: Player;
}
class DisplayEditCharacter extends React.Component<props, state>{
    constructor(props: props) {
        super(props)
        this.state = { selectedPlayer: null }
    }

    getId() {
        try {
            var id = (this.props as any).match.params.id + (this.props as any).location.hash
            if (id === "undefined")
                return null;
            return id;
        } catch (e) { return null; }
    }

    setPlayer() {        
        var id = this.getId();                

        if(!id){
            if(!this.props.currentUser) return;

            var player = this.props.currentPlayer || en.from(this.props.allPlayers).where(x => x.ownerid == this.props.currentUser.id).firstOrDefault();
            if(!player){
                if(!this.props.isFetchingPlayers)
                    this.props.getAllPlayers()
                return;
            }

            this.setState({selectedPlayer: player});
            return;
        }

        var player = en.from(this.props.allPlayers).where(x => x._id == id).firstOrDefault();
        if(player){
            this.setState({selectedPlayer: player})
            return;
        }

        if(!this.props.isFetchingPlayers){
            this.props.getAllPlayers()
        }

    }

    componentWillReceiveProps(nextprops: props) {
        if(!this.state.selectedPlayer)
            this.setPlayer();
    }

    componentDidMount(){
        this.setPlayer();
    }

    
    render() {
        var id = this.getId();
        if (!this.props.currentUser && !this.state.selectedPlayer) return "Du måste logga in"
        if (this.props.isFetchingPlayers || this.state.selectedPlayer == null) return <PulseLoader color="#26A65B" size="16px" margin="4px" />

        if ((this.props.currentUser && this.props.currentUser.id == this.state.selectedPlayer.ownerid) || (this.props.currentPlayer && this.props.currentPlayer.isAdmin))
            return <EditCharacter
                currentPlayer={this.state.selectedPlayer}
                currentUser={this.props.currentUser}
                isSavingPlayer={this.props.isSavingPlayer}
                savePlayer={this.props.savePlayer}
            />
        else
            return <ShowCharacter
                selectedPlayer={this.state.selectedPlayer}
                error={this.props.error}
                id={id}
            />
    }
}

export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(DisplayEditCharacter)

