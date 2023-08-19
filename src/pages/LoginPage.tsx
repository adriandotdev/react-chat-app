import { useState, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import '../css/form.css';
import { ChatContext } from '../App';

function LoginPage() {

    const { setLoggedInUser } = useContext(ChatContext);

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState<object>(() => ({ username: '', password: '' }));
    const [isLoading, setIsLoading] = useState<boolean>(() => false);

    const login = async (e) => {

        e.preventDefault();

        setIsLoading(() => true);

        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', loginInfo, {
                withCredentials: true
            });

            if (response.status >= 200) {
                setIsLoading(() => false);
                setLoggedInUser(response.data.user);
                navigate('/chats', { replace: true });
            }
        }
        catch (err) {
            setIsLoading(() => false);
            console.log(err);
        }
    }

    return (
        <main className='form-main-container container-fluid row justify-content-center align-items-center'>
            <div className="login-form-container">
                <div className="">
                    <h1>Login</h1>
                    <form onSubmit={login} className='d-flex flex-column gap-3'>
                        <div>
                            <label className='form-label' htmlFor="username">Username</label>
                            <input onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })} className="form-control" type="text" name="username" id="username" />
                        </div>
                        <div>
                            <label className='form-label' htmlFor="password">Password</label>
                            <input onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })} className="form-control" type="password" name="password" id="password" />
                        </div>
                        <button className='btn btn-primary mt-3'>
                            {isLoading ? <div className="spinner-grow spinner-grow-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : <span>Login</span>}
                        </button>

                    </form>
                    <p className="text-center mt-3 fw-bold"><small>Don't have an account? <span className="text-primary">
                        <NavLink to="/signup">Sign Up </NavLink>
                    </span></small></p>
                </div>
            </div>
        </main>
    )
}

export default LoginPage