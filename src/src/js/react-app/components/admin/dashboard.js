import React from 'react';
import Sidebar from './sidebar';
import RequireAuth from './auth/require_auth';

export default RequireAuth(() => {

        return (
                <div className="admin-main">
                        <div className="row">
                                <Sidebar/>
                                <div className="main-window columns small-12 large-9">
                                        <h1 className="margin-bottom">Dashboard</h1>
                                        Admin Area. <br/>
                                        If you're seeing this, you must be logged in.
                                </div>
                        </div>
                </div>
                );
})
