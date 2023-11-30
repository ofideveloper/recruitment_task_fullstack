// ./assets/js/components/Home.js

import React, {Component} from 'react';
import { Link } from 'react-router-dom'
class Home extends Component {

    render() {
        return (
            <div className="text-center">
                <h2 className="">Welcome!</h2>
                <Link to="/exchange-rates"> Buy or sell currencies in easy way &rarr; </Link>
            </div>
        )
    }
}

export default Home;
