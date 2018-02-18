import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';

const AddDeviceComponent = props => {
    const { user, devices, permissions, addNewDevice, permissions_state, permissionHandleChange } = props;

    return <div>
        <AutoComplete
            hintText="Device name"
            floatingLabelText="Search Device"
            dataSource={devices.map(device => ({ text: device.name, value: device._id }))}
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={{ text: 'text', value: 'value' }}
            onNewRequest={addNewDevice}
        />
        <div className="add_permission_wrapper">
            <SelectField
                multiple={true}
                floatingLabelText="Add Permissions"
                value={permissions_state[user._id] && permissions_state[user._id].value}
                onChange={permissionHandleChange.bind(null, user, 'permissions_state')}
            >
                {permissions &&
                    permissions.length &&
                    permissions.map(permission => {
                        return (
                            <MenuItem
                                key={permission._id}
                                value={permission._id}
                                primaryText={permission.name}
                            />
                        );
                    })}
            </SelectField>
        </div>
    </div>
}

export default AddDeviceComponent;