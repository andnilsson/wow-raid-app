import * as React from 'react'
import Clan from './components/clan'
import Header from './components/header'
import Characters from './components/characters'
import Schedule from './components/schedule'
import { Switch, Route } from 'react-router-dom'

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
                        <Route exact path='/' component={Clan} />
                        <Route path='/characters' component={Characters} />
                        <Route path='/schedule' component={Schedule} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Main