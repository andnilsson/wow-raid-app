import * as React from 'react'
import { BoardMessage } from '../domain/boardMessage';
import { getImgUrl, getClassColor } from '../domain/classes';
import * as moment from 'moment'
import anchorme from "anchorme"

interface props {
    message: BoardMessage,
    isAdmin: boolean
    deleteMessage: () => void
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

    confirmDelete() {
        if (!confirm(`Är du säker på att du vill ta bort inlägget från ${this.props.message.from.ownername}?`)) return;
        this.props.deleteMessage()
    }

    render() {
        return <div>
            <div className="board-message-wrapper">
                <div className="message-header" style={{
                    backgroundColor: getClassColor(this.props.message.from.class).backgroundColor
                }}>
                    <img src={getImgUrl(this.props.message.from.class)} />
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                        marginLeft: "10px"
                    }}>
                        <h5 style={{
                            color: getClassColor(this.props.message.from.class).textColor
                        }}>{this.props.message.from._id ? <a href={`/characters/${this.props.message.from._id}`}>{this.props.message.from.ownername}</a> : this.props.message.from.ownername}</h5>
                        {this.props.isAdmin && <button onClick={() => this.confirmDelete()}>delete</button>}
                        <span>{moment(this.props.message.createdOn).format('YYYY-MM-DD HH:mm')}</span>
                    </div>
                </div>
                <div className="message-body" dangerouslySetInnerHTML={{ __html: this.userFriendlyFormattedText() }} />

            </div>
        </div>
    }
}