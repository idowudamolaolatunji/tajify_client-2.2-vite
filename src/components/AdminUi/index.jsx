import React from 'react';
import MainHeader from '../MainHeader'
import AdminMenu from './AdminComponents/AdminMenu';
import AdminMenuContent from './AdminComponents/AdminMenuContent'
import './main.css';



function AdminUi () {
    return (
        <div className="dashboard__section">
            {/* <MainHeader /> */}
            <div className="dashboard__container">
                <h4 className="dashboard__heading">Admin Settings</h4>
                <div className="admin__dashboard">
                    <AdminMenu />
                    <AdminMenuContent title={'Content Heading'}>{'Content body'}</AdminMenuContent>
                </div>
            </div>
        </div>
    );
}

export default AdminUi;