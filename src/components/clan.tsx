import * as React from 'react';
import { IApplicationState, ActionCreators } from '../store/reducer';
import { connect } from 'react-redux';
import { Classes, getClassColor } from '../domain/classes';
import ClassBadge from './classbadge'
import { Player } from '../domain/player';
var PulseLoader = require('halogenium').PulseLoader;
var Panel = require('muicss/lib/react/panel')
type props = IApplicationState & typeof ActionCreators
var Button = require('muicss/react').Button;
import * as en from 'linq';

type state = {
    players: Player[],
    sortprop?: string,
    isAscending?: boolean,
    filterProp: string,
    filterValue: string,
}
class Clan extends React.Component<props, state>{
    constructor(props: props) {
        super(props);
        this.state = {
            players: [],
            sortprop: null,
            isAscending: true,
            filterProp: null,
            filterValue: null,
        }
    }

    componentWillReceiveProps(nextProps: props) {
        this.setState({ players: nextProps.allPlayers }, () => {
            this.sortTable("ownername")
        })

    }

    componentDidMount() {
        this.props.getAllPlayers();
    }

    resetSortAndFilter() {
        this.setState({
            players: this.props.allPlayers,
            sortprop: "ownername",
            isAscending: false,
            filterProp: null,
            filterValue: null,
        })
    }

    filterTable(prop: string, value: string) {

    }

    sortTable(property: string) {
        var sorted: Player[] = [];

        if (property == this.state.sortprop) {
            if (this.state.isAscending)
                sorted = en.from(this.props.allPlayers).orderByDescending(x => (x as any)[property]).toArray();
            else
                sorted = en.from(this.props.allPlayers).orderBy(x => (x as any)[property]).toArray();
            this.setState({ isAscending: !this.state.isAscending })
        }
        else
            sorted = en.from(this.props.allPlayers).orderBy(x => (x as any)[property]).toArray();

        this.setState({
            players: sorted,
            sortprop: property
        });
    }

    render() {
        if (this.props.isFetchingPlayers) return <PulseLoader color="#26A65B" size="16px" margin="4px" />

        return (
            <div className="playerlist">
                <h1>Players registered so far....</h1>

                {/* <div style={{
                    padding: "10px",
                    margin: "10px",
                    border: "1px solid #ccc"
                }}>
                    sorting on: {this.state.sortprop}<br />
                    is ascending: {this.state.isAscending ? "yes" : "no"}<br />
                    filter: {this.state.filterProp ? this.state.filterProp + " = " : "none"}{this.state.filterValue}<br />
                    <Button variant="raised" color="primary" onClick={() => this.resetSortAndFilter()}>Reset all</Button>
                </div> */}

                <div className="divTable playertable">
                    <div className="divTableHeading">
                        <div className="divTableRow">
                            <div className="divTableHead" onClick={() => this.sortTable("ownername")}>Player</div>
                            <div className="divTableHead" onClick={() => this.sortTable("faction")}>Faction</div>
                            <div className="divTableHead" onClick={() => this.sortTable("class")}>Class</div>
                            <div className="divTableHead" onClick={() => this.sortTable("spec")}>Spec</div>
                            <div className="divTableHead" onClick={() => this.sortTable("pvpEnabled")}>Pvp Enabled</div>
                        </div>
                    </div>
                    <div className="divTableBody">
                        {this.state.players.map((player, i) => {
                            return (
                                <div key={i} className="divTableRow">
                                    <div className="divTableCell">{player.ownername}</div>
                                    <div className="divTableCell">{player.faction}</div>
                                    <div className="divTableCell">{player.class}</div>
                                    <div className="divTableCell">{player.spec}</div>
                                    <div className="divTableCell">{player.pvpEnabled ? "Yes" : "No"}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div >
        )
    }
}


export default connect(
    (state: IApplicationState) => state,
    ActionCreators
)(Clan)
