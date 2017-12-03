import * as React from 'react'
import Clan from './components/clan'
import Home from './components/home'
import Header from './components/header'
import Characters from './components/characters'
import Rules from './components/rules'
import Board from './components/board'
import { Switch, Route } from 'react-router-dom'
import Chat from './components/chat'
import ShowCharacter from './components/showCharacter'

class Main extends React.Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <div className="main">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/characters' component={Characters} />
                        <Route path='/characters/:id' component={ShowCharacter} />                        
                        <Route path='/members' component={Clan} />
                        <Route path='/rules' component={Rules} />
                        <Route path='/board' component={Board} />
                    </Switch>
                </div>
                <Chat />
            </div>
        )
    }
}

export default Main