import * as React from 'react'
import { connect } from 'react-redux';
import { ActionCreators, IApplicationState } from '../store/reducer';

var PulseLoader = require('halogenium').PulseLoader;
var Button = require('muicss/react').Button;
type props = IApplicationState & typeof ActionCreators

class User extends React.Component<props, {}>{
    componentDidMount() {
        if (!this.props.currentUser)
            this.props.fetchCurrentUser()
    }

    render() {
        if (this.props.isLoadingUser) return (<PulseLoader color="#26A65B" size="16px" margin="4px" />)
        return (
            <div>
                {this.props.currentUser ? (
                    <div>
                        {`hello ${this.props.currentUser.battletag}`}                        
                    </div>
                ) : (
                        <div>
                            <Button variant="raised" color="primary" onClick={() => this.props.authenticate()}>logga in</Button>
                            <span>Logga in med ditt Bnet konto för att registrera dig för WoW classic resan och vår Guild</span>
                        </div>
                    )}
            </div>
        )
    }
}

export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(User)