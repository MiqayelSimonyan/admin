import React from 'react';
import ChipInput from 'material-ui-chip-input';
import RaisedButton from 'material-ui/RaisedButton';

const PermissionCreateComponent = props => {
    const { handleChange, permissions_state, createPermission } = props;

    const style = {
        margin: '12px 0'
    };

    const containersStyles = {
        margin: 5,
        width: '100%'
    };

    return (
        <div style={containersStyles}>
            <div className="add_permission_wrapper">
                <span>press enter after you have add permission</span><br />
                <ChipInput className="device_permissions" floatingLabelText="add permissions"
                    onChange={(chips) => handleChange(chips)}
                />
            </div>
            <RaisedButton
                label="Add permission"
                primary={true}
                style={style}
                disabled={!permissions_state}
                onClick={createPermission}
            />
        </div>
    );
};

export default PermissionCreateComponent;
