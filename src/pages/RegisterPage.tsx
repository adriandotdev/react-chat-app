import axios from 'axios';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/form.css';

function RegisterPage() {

    const [userInfo, setUserInfo] = useState({ givenName: '', middleName: '', lastName: '', username: '', password: '' });

    const submit = async (e) => {

        e.preventDefault();

        await axios.post('http://localhost:3001/api/auth/register', userInfo);
    }

    return (
        <main className='form-main-container container-fluid row justify-content-center align-items-center'>
            <div className="signup-form-container">
                <div className="">
                    <h1>Sign Up</h1>
                    <form onSubmit={submit} className='d-flex flex-column gap-3' action="">

                        <div>
                            <label className='form-label' htmlFor="username">Given Name</label>
                            <input onChange={(e) => setUserInfo({ ...userInfo, givenName: e.target.value })} className="form-control" type="text" name="givenName" id="givenName" />
                        </div>

                        <div>
                            <label className='form-label' htmlFor="middleName">Middle Name</label>
                            <input onChange={(e) => setUserInfo({ ...userInfo, middleName: e.target.value })} className="form-control" type="text" name="middleName" id="middleName" />
                        </div>

                        <div>
                            <label className='form-label' htmlFor="lastName">Last Name</label>
                            <input onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })} className="form-control" type="text" name="lastName" id="lastName" />
                        </div>

                        <div>
                            <label className='form-label' htmlFor="username">Username</label>
                            <input onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })} className="form-control" type="text" name="username" id="username" />
                        </div>

                        <div>
                            <label className='form-label' htmlFor="username">Password</label>
                            <input onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} className="form-control" type="text" name="password" id="password" />
                        </div>

                        <button className='btn btn-primary mt-3'>Register</button>
                    </form>
                    <p className="text-center mt-3 fw-bold"><small>Already have an account? <span className="text-primary">
                        <NavLink to="/login">Log In</NavLink>
                    </span></small></p>
                </div>
            </div>
        </main>
    )
}

export default RegisterPage;