// ./assets/js/components/Home.js

import React, {Component} from 'react';
import {Route, Redirect, Switch, Link} from 'react-router-dom';
import PageHome from './home.page'
import PageSetupCheck from "./setupCheck.page";
import PageExchangeRates from "./exchangeRates.page";
import Layout from '../components/Layout/Layout.component'
import Header from '../components/Header/Header.component'

class Pages extends Component {

    render() {
        return (
            <div>
				<Header />
				<Layout>
					<Switch>
						<Route exact path="/" component={ PageHome } />
						<Route path="/setup-check" component={ PageSetupCheck } />
						<Route path="/exchange-rates" component={ PageExchangeRates } />
					</Switch>
				</Layout>
            </div>
        )
    }
}

export default Pages;
