import * as React from 'react'
import { ActionCreators, IApplicationState } from '../store/reducer';
import { connect } from 'react-redux';
import { getImgUrl, getClassColor } from '../domain/classes';
var PulseLoader = require('halogenium').PulseLoader;
import * as moment from 'moment'
type props = typeof ActionCreators & IApplicationState
var Button = require('muicss/react').Button

interface state {
    newtext: string
}
class Board extends React.Component<props, state>{
    componentDidMount() {
        this.props.fetchBoardMessages();
    }
    createBoardMessage() {

    }
    render() {
        if(!this.props.currentPlayer) return "Inte inloggad";
        if (this.props.isFetchingBoard) return <PulseLoader color="#26A65B" size="16px" margin="4px" />

        return (
            <div>
                <h1>Board</h1>

                <div className="new-board-message-wrapper">
                    <h2>Gör inlägg</h2>
                    <div>
                        <img src={getImgUrl(this.props.currentPlayer.class)} />
                        <textarea value={this.state.newtext} onChange={(e) => this.setState({ newtext: e.target.value })}></textarea>

                        <Button variant="raised" color="primary" onClick={() => this.createBoardMessage()}></Button>}
                </div>
                </div>

                {
                    this.props.boardMessages.map((m, i) => {
                        return <div key={i}>
                            <div className="board-message-header" style={{
                                backgroundColor: getClassColor(m.from.class)
                            }}>
                                <img src={getImgUrl(m.from.class)} />
                                <h5>{m.from.ownername}</h5>
                                <span>{moment(m.createdOn).format('YYYY-MM-DD HH:mm')}</span>
                            </div>
                            <p>
                                {m.text}
                            </p>
                        </div>
                    })
                }
            </div >
        )
    }
}

export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(Board)
