import * as React from 'react'
import { BoardMessage } from '../domain/boardMessage';
import { getImgUrl, getClassColor } from '../domain/classes';
import * as moment from 'moment'
import anchorme from "anchorme"

interface props {
    message: BoardMessage
}

export default class BoardMessageDisplayer extends React.Component<props, {}>{
    userFriendlyFormattedText(): string {
        var str = this.props.message.text;
        str = str.replace(/\n/g, "<br />");
        str = anchorme(str, {
            attributes: [
                { name: "target", value: "blank" }
            ]
        });
        return str;
    }

    render() {
        return <div>
            <div className="board-message-wrapper">
                <div className="message-header">
                    <img src={getImgUrl(this.props.message.from.class)} />
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                        marginLeft: "10px"
                    }}>
                        <h5 style={{
                            color: getClassColor(this.props.message.from.class)
                        }}>{this.props.message.from.ownername}</h5>
                        <span>{moment(this.props.message.createdOn).format('YYYY-MM-DD HH:mm')}</span>
                    </div>
                </div>
                <div className="message-body" dangerouslySetInnerHTML={{ __html: this.userFriendlyFormattedText() }} />

            </div>
        </div>
    }
}