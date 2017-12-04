import * as React from 'react'
import { ActionCreators, IApplicationState } from '../store/reducer';
import { connect } from 'react-redux';
import { getImgUrl, getClassColor } from '../domain/classes';
var PulseLoader = require('halogenium').PulseLoader;
import * as moment from 'moment'
import { BoardMessage } from '../domain/boardMessage';
type props = typeof ActionCreators & IApplicationState
var Button = require('muicss/react').Button
import BoardMessageDisplayer from './BoardMessageDisplayer'
interface state {
    newtext: string
}
class Board extends React.Component<props, state>{
    constructor(props: props) {
        super(props)
        this.state = {
            newtext: ""
        }
    }
    componentDidMount() {
        this.props.getOwnPlayer();
        this.props.fetchBoardMessages();
    }
    createBoardMessage() {
        this.props.saveBoardMessage({
            text: this.state.newtext
        } as BoardMessage);
        this.setState({ newtext: "" })
    }
    render() {
        if (this.props.isFetchingBoard || this.props.isFetchingPlayers) return <PulseLoader color="#26A65B" size="16px" margin="4px" />
        if (!this.props.currentUser) return "Please log in join the clan!";
        if (!this.props.currentPlayer) return "Du måste skapa en karaktär innan du får skriva här"
        return (
            <div>
                <h1>Board</h1>

                <div className="board-message-wrapper">
                    <div className="message-header">
                        <img src={getImgUrl(this.props.currentPlayer.class)} />
                        <h5 style={{ marginLeft: "10px" }}>{this.props.currentUser.battletag}</h5>
                    </div>
                    <div className="message-body">
                        <textarea placeholder={`Skriv något, ${this.props.currentUser.battletag}!`} value={this.state.newtext} onChange={(e) => this.setState({ newtext: e.target.value })}></textarea>
                        {this.state.newtext && <Button variant="raised" color="primary" onClick={() => this.createBoardMessage()}>Skriv</Button>}
                    </div>
                </div>
                <div className="board-messages">
                    {
                        this.props.boardMessages.map((m, i) => {
                            return <BoardMessageDisplayer key={i} message={m} isAdmin={this.props.currentPlayer.isAdmin} deleteMessage={() => this.props.deleteBoardMessage(m._id)} />
                        })
                    }
                </div>
            </div >
        )
    }
}

export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(Board)
