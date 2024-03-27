import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

function SignIn(props) {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('https://milestone-project2-seven.vercel.app/api/users', user)
            .then(res => {
                console.log(res.data);
                props.onSignIn();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <br/>
                <br/>
                <button className="sign-in" type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;