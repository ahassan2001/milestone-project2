import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([
        { username: '', password: '', _id: '1' },
    ]);

    useEffect(() => {
        axios.get('https://milestone-project2.vercel.app/api/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <h2>Users</h2>
            {users.map(user => (
                <div key={user._id}>
                    <h3>{user.username}</h3>
                    <p>{user.password}</p>
                </div>
            ))}
        </div>
    );
}

export default Users;