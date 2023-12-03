import React from 'react';

function AdminMenuContent (props) {
    return (
        <div className="dashboard--main">
            <h4 className="menu__heading">{props.title}</h4>
            <div className="dashboard__content">
                {props.children}
            </div>
        </div>
    )
}

export default AdminMenuContent;
