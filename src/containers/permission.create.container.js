import React, { Component } from 'react';
import { connect } from 'react-redux';

import PermissionCreateComponent from '../components/permission.create.component';
import { createPermission } from '../middlewars/permission.middleware';

class PermissionCreateContainer extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = chips => {
        this.setState({ permissions: chips.map(chip => ({ name: chip })) });
    }

    createPermission = event => {
        event.preventDefault();
        if (this.state && this.state.permissions) this.props.CreatePermission('/api/permission', { permissions: this.state.permissions });
    }

    render() {
        return (
            <div style={{ width: '32%' }}>
                <h2>create permission</h2>
                <PermissionCreateComponent
                    permissions_state={this.state && this.state.permissions}
                    handleChange={this.handleChange}
                    createPermission={this.createPermission}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        errors: state.Errors,
        success: state.Success
    }),
    dispatch => ({
        CreatePermission: (url, user) => {
            dispatch(createPermission(url, user));
        }
    })
)(PermissionCreateContainer);
