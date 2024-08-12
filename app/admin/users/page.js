'use client';
import React, { useState, useEffect } from 'react';
import UserEditModal from '@/components/userEditModal';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    console.log(storedUser);
    if (storedUser) {
      setToken(storedUser.token);
      fetchUsers(storedUser.token);
    }
  }, []);

  const fetchUsers = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.length);
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        fetchUsers(token);
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.accountNumber.toString().includes(searchTerm) || user.email.includes(searchTerm)
  );
  if (loading) {
    return <div>Loading ...</div>
  }
  return (
    <main className=" max-md:w-screen min-h-screen p-5">
      <div className="flex justify-between items-center mb-5 flex-wrap text-center">
        <h1 className="text-2xl font-bold">Admin Dashboard - Users</h1>
        <button onClick={() => handleEdit(null)} className="bg-blue-500 text-white py-2 px-4 rounded">Add User</button>
        <input
          type="text"
          placeholder="Search by account or Email"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>
      <table className=" bg-white overflow-x-scroll min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Serial</th>
            <th className="py-2 px-4 border-b text-center">Account Number</th>
            <th className="py-2 px-4 border-b text-center">Username</th>
            <th className="py-2 px-4 border-b text-center">Email</th>
            <th className="py-2 px-4 border-b text-center">Role</th>
            <th className="py-2 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => {
            if (user.email == "admin@admin.com") return null;
            return (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                {/* <td className="py-2 px-4 border-b text-center">{user.accountNumber}</td> */}
                <td className="py-2 px-4 border-b text-center">{user.name}</td>
                <td className="py-2 px-4 border-b text-center">{user.email}</td>
                <td className="py-2 px-4 border-b text-center">{user.role}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button onClick={() => handleEdit(user)} className="text-blue-500 mr-2">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {isModalOpen && (
        <UserEditModal
          user={editUser}
          isOpen={isModalOpen}
          onClose={() => { setIsModalOpen(false); setEditUser(null); }}
          onSave={() => fetchUsers(token)}
          token={token}
          isEdit={!!editUser}
        />
      )}
    </main>
  );
};

export default AdminUsersPage;
