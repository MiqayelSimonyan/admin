import React from 'react';
import { NavLink } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import '../assets/styles/navigation.scss';

const style = {
    margin: 12,
};

const NavigationComponent = () => {
    return (
        <nav className="navigation">
            <ul>
                <RaisedButton style={style}><NavLink exact to="/" activeClassName="navigation_active">Home</NavLink></RaisedButton>
                <RaisedButton style={style}><NavLink to="/users" activeClassName="navigation_active">Users</NavLink></RaisedButton>
                <RaisedButton style={style}><NavLink to="/devices" activeClassName="navigation_active">Devices</NavLink></RaisedButton>
                <RaisedButton style={style}><NavLink to="/permissions" activeClassName="navigation_active">Permissions</NavLink></RaisedButton>
            </ul>
        </nav>
    )
}

export default NavigationComponent;