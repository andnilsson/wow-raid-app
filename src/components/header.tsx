import * as React from 'react'
import { Link } from 'react-router-dom';
import User from '../components/user'

class Header extends React.Component<{}, {}>{
    render() {
        return (
            <div className="header">
                <div className="header-content">
                    <img src="https://cdn.wccftech.com/wp-content/uploads/2017/11/world-of-warcraft-classic.png" className="header-img" />
                    <h1>
                        <Link to="/">Project classic</Link>
                    </h1>
                    <Link to="/characters">Min character</Link>
                    <Link to="/members">Spelare</Link>
                    <Link to="/rules">FAQ</Link>                    
                </div>

                <div className="header-login">
                    <User />
                </div>
            </div>
        )
    }
}

export default Header