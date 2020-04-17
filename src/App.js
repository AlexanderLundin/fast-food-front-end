import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import OrderList from './OrderList';
import OrderEdit from './OrderEdit';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/orders' exact={true} component={OrderList}/>
                    <Route path='/orders/:id' component={OrderEdit}/>
                </Switch>
            </Router>
        )
    }
}

export default App;