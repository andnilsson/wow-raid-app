import * as React from 'react'
import { BoardMessage } from '../domain/boardMessage';
import { getImgUrl, getClassColor } from '../domain/classes';
import * as moment from 'moment'

interface props {
    message: BoardMessage
}

export default class BoardMessageDisplayer extends React.Component<props, {}>{
    render() {
        return <div>
            <div className="board-message-wrapper">
                <div className="message-header" style={{
                    backgroundColor: getClassColor(this.props.message.from.class)
                }}>
                    <img src={getImgUrl(this.props.message.from.class)} />
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                        marginLeft: "10px"
                    }}>
                        <h5>{this.props.message.from.ownername}</h5>
                        <span>{moment(this.props.message.createdOn).format('YYYY-MM-DD HH:mm')}</span>
                    </div>
                </div>
                <div className="message-body">
                    {this.props.message.text}
                </div>
            </div>
        </div>
    }
}