import React, { useState, useEffect } from 'react';

const UserEditModal = ({ user, isOpen, onClose, onSave, token, isEdit }) => {
    const initialFormData = {
        name: isEdit && user ? user.name : '',
        email: isEdit && user ? user.email : '',
        role: isEdit && user ? user.role : 'USER',
        password: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit && user) {
            setFormData({
                name: user.name,
                email: user.email,
                role: user.role,
                password: ''
            });
        } else {
            setFormData(initialFormData);
        }
    }, [isEdit, user]);

    const handleChange = (e) => {
        setError('');
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&`^~#\-_+=<>?.,:;\\'"]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (formData.name.trim() === '' || formData.email.trim() === '') {
            setError('Name or email can\'t be empty');
            setLoading(false);
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Invalid email format');
            setLoading(false);
            return;
        }

        if (!isEdit && !validatePassword(formData.password)) {
            setError('Password must be at least 8 characters long and include letters and digits');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                isEdit
                    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`
                    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
                {
                    method: isEdit ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (response.ok) {
                onSave();
                onClose();
            } else if (response.status === 409 || response.status === 400) {
                setError('Email already exists');
            } else {
                setError('Failed to update user');
            }
        } catch (error) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed w-screen h-screen z-10 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit User' : 'Add User'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    {!isEdit && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    )}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            {isEdit ? 'Save' : 'Add'}
                        </button>
                    </div>
                </form>
                {loading && <div className="text-red-500 mt-4">Loading ...</div>}
                {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
        </div>
    );
};

export default UserEditModal;
