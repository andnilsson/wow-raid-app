import * as React from 'react'
import { ActionCreators, IApplicationState } from '../store/reducer';
import { connect } from 'react-redux';
import * as moment from 'moment'
var PulseLoader = require('halogenium').PulseLoader;

type props = IApplicationState & typeof ActionCreators
interface state {
    message: string
}
class Chat extends React.Component<props, state>{
    constructor(props: props) {
        super(props);

        this.state = {
            message: ""
        }
    }
    scrollToBottom() {
        var el = document.getElementById("chatcontent");
        if(el)
            el.scrollTop = el.scrollHeight;
    }
    componentWillReceiveProps(nextprops: props) {
        if (nextprops.currentUser && !this.props.currentUser) {
            this.props.fetchOnlineUsers();
            this.props.fetchMessages();
        }            
    }

    componentDidUpdate(){
        this.scrollToBottom();
    }
    send(e: any) {
        e.preventDefault();
        this.props.sendMessge(this.state.message);
        this.setState({ message: '' })
    }
    messageOnChange(newvalue: string) {
        this.setState({ message: newvalue })
        if (newvalue !== '')
            this.props.startedTypingMessage()
        else
            this.props.stopedTypingMessage()
    }
    render() {
        if (!this.props.currentUser) return null;

        return (
            <div id="live-chat">
                <header className="clearfix">
                    <h4>online:</h4>                     
                    {this.props.onlineusers.map((u,i) => {
                        return <span>{u} </span>
                    })}
                </header>

                <div className="chat">
                    <div className="chat-history" id="chatcontent">
                        {this.props.isFetchingMessages && <PulseLoader color="#26A65B" size="16px" margin="4px" />}
                        {this.props.messages.map((m, i) => {
                            return <div key={i} className="chat-message">
                                <div className="chat-message-content">
                                    <span><b>{m.from}</b></span>
                                    <span className="chat-time">{moment(m.time).format('YYYY-MM-DD HH:mm')}</span>
                                </div>
                                <p>{m.message}</p>
                                <hr />
                            </div>
                        })}

                    </div>
                    <form onSubmit={(e) => this.send(e)} >
                        <input type="text" placeholder="skriv något…" value={this.state.message} onChange={(e) => { this.messageOnChange(e.target.value) }} />
                        <button>skriv</button>
                    </form>
                </div>

            </div>


        )
    }
}

export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(Chat)