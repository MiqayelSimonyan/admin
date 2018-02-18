import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';

import AddDeviceComponent from './add.device.component';

const DeviceToggleComponent = props => {
    const { user, addDeviceToggle, isOpen, devices,
        addNewDevice, permissions, permissions_state,
        permissionHandleChange, newDevice, updateUser, style, color } = props;

    const PlusIcon = (props) => (
        <SvgIcon {...props}>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </SvgIcon>
    );

    const MinusIcon = (props) => (
        <SvgIcon {...props}>
            <path d="M19 13H5v-2h14v2z" />
        </SvgIcon>
    );

    return <div>
        <div className="add_new_device" onClick={addDeviceToggle.bind(null, user._id)}>
            <span style={{ cursor: 'pointer' }}>Add new device</span>
            {isOpen && isOpen[user._id] && isOpen[user._id].isOpen ?
                <MinusIcon
                    className="minus_icon"
                    style={style}
                    color={color}
                />
                :
                <PlusIcon
                    className="plus_icon"
                    style={style}
                    color={color}
                />
            }
        </div>
        <div>
            {
                isOpen && isOpen[user._id] && isOpen[user._id].isOpen ? <div className="new_device_wrapper">
                    <AddDeviceComponent
                        user={user}
                        devices={devices}
                        permissions={permissions}
                        newDevice={newDevice}
                        addNewDevice={addNewDevice}
                        updateUser={updateUser}
                        permissions_state={permissions_state}
                        permissionHandleChange={permissionHandleChange}
                        style={style}
                    />
                </div> : ''
            }
        </div>
    </div>
}

export default DeviceToggleComponent;