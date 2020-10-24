import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Nav from './Nav';
import Movies from './Movies';
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
                                <Movies />
                            </main>
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Main;

const headers = Array.from(document.querySelectorAll('.conf-step__header'));
headers.forEach(header => header.addEventListener('click', () => {
    header.classList.toggle('conf-step__header_closed');
    header.classList.toggle('conf-step__header_opened');
}));

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
