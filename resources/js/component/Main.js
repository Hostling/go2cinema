import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Nav from './Nav';
import Movie from './Movie';

class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                <Nav />
                <main>
                    <Movie />
                    <Movie />
                    <Movie />
                </main>
            </div>
        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
