import React from 'react';
import UsersTable from './UsersTable';

const ManageUsers = () => {
    return (
      <div>
        <h1 className="text-3xl font-semibold text-[#0C61A2]">Manage Users</h1>
        <UsersTable />
      </div>
    );
};

export default ManageUsers;