import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Nav from './Nav';
import Movie from './Movie';
import HallPage from './HallPage';
import Admin from './Admin';
import Payment from "./Payment";
import Ticket from "./Ticket";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/hall" component={HallPage} />
                        <Route path="/payment" component={Payment} />
                        <Route path="/ticket" component={Ticket} />
                        <Route path="/admin" component={Admin} />
                        <Route path="/">
                            <Nav />
                            <main>
                                <Movie />
                                <Movie />
                                <Movie />
                            </main>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
