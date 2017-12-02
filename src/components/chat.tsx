import * as React from 'react'
import { ActionCreators, IApplicationState } from '../store/reducer';
import { connect } from 'react-redux';


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
    send() {
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
        // if(!this.props.currentUser) return null;

        return (
            <div id="live-chat">
                <header className="clearfix">
                    <a href="#" className="chat-close">x</a>
                    <h4>chat</h4>
                    <span className="chat-message-counter">3</span>
                </header>

                <div className="chat">
                    <div className="chat-history">
                        {this.props.messages.map((m, i) => {
                            return <div className="chat-message clearfix">
                                <div className="chat-message-content clearfix">
                                    <span className="chat-time">13:35</span>
                                    <h5>{m.from}</h5>
                                    <p>{m.message}</p>
                                </div>
                                <hr />
                            </div>
                        })}

                    </div>

                    <input type="text" placeholder="Type your message…" value={this.state.message} onChange={(e) => { this.messageOnChange(e.target.value) }} />
                    <button onClick={() => this.send()} >--></button>
                </div>

            </div>


        )
    }
}

export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(Chat)