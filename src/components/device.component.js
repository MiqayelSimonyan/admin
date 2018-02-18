import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import Divider from 'material-ui/Divider';

const DeviceComponent = (props) => {
    const { user, item, style, color, deleteDeviceHandler, deletePermissionHandler } = props;

    const DelteIcon = (props) => (
        <SvgIcon {...props}>
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
        </SvgIcon>
    );

    return (
        <div>
            <span className="device_title">{item.device.name}</span>
            <DelteIcon
                style={style}
                color={color}
                onClick={deleteDeviceHandler.bind(null, user, item.device)}
            />
            <div>
                {item.permissions && item.permissions.length ?
                    <div className="permissions_wrapper">
                        <h3>Permissions</h3>
                        <ul>
                            {item.permissions.map(permission =>
                                <li key={permission._id}>
                                    <span className="device_title">{permission.name}</span>
                                    <DelteIcon
                                        style={style}
                                        color={color}
                                        onClick={deletePermissionHandler.bind(null, user, permission)}
                                    />
                                </li>
                            )}
                        </ul>
                    </div>
                    : ''
                }
            </div>
            <Divider />
        </div>
    )
}

export default DeviceComponent;