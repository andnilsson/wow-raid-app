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
    render() {
        return (
            <div className="chatwrapper">
                <input value={this.state.message} onChange={(e) => { this.setState({ message: e.target.value }) }} /><button onClick={() => { this.send() }}>Send</button>
            </div>
        )
    }
}

export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(Chat)