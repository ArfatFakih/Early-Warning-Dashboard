import React, { useState } from 'react';
import './css/UserSettings.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const UserSettings = () => {
  // Sample user data
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '555-123-4567', role: 'Role 1' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-234-5678', role: 'Role 2' },
    { id: 3, name: 'Robert Johnson', email: 'robert.j@example.com', phone: '555-345-6789', role: 'Role 3' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '555-456-7890', role: 'Role 1' },
    { id: 5, name: 'Michael Wilson', email: 'michael.w@example.com', phone: '555-567-8901', role: 'Role 4' },
    { id: 6, name: 'Sarah Thompson', email: 'sarah.t@example.com', phone: '555-678-9012', role: 'Role 2' },
    { id: 7, name: 'David Brown', email: 'david.b@example.com', phone: '555-789-0123', role: 'Role 3' },
    { id: 8, name: 'Lisa Martinez', email: 'lisa.m@example.com', phone: '555-890-1234', role: 'Role 2' },
    { id: 9, name: 'Kevin Taylor', email: 'kevin.t@example.com', phone: '555-901-2345', role: 'Role 4' },
    { id: 10, name: 'Jennifer Anderson', email: 'jennifer.a@example.com', phone: '555-012-3456', role: 'Role 1' },
    { id: 11, name: 'Thomas White', email: 'thomas.w@example.com', phone: '555-123-4567', role: 'Role 3' },
    { id: 12, name: 'Olivia Clark', email: 'olivia.c@example.com', phone: '555-234-5678', role: 'Role 2' },
    { id: 13, name: 'William Harris', email: 'william.h@example.com', phone: '555-345-6789', role: 'Role 1' },
    { id: 14, name: 'Sophia Lee', email: 'sophia.l@example.com', phone: '555-456-7890', role: 'Role 4' }
  ]);

  // Available roles
  const roles = ['Role 1', 'Role 2', 'Role 3', 'Role 4'];

  // Handle role change
  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  return (
    <>
    <div>
        <Navbar />
    </div>
    <div className="user-settings-container">
      <h1>Admin Dashboard</h1>
      <h2>Currently Active Users</h2>
      
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="role-dropdown"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div>
        <Footer />
    </div>
    </>
  );
};

export default UserSettings;