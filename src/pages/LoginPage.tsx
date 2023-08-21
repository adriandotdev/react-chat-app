import { useState, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import '../css/form.css';
import { ChatContext } from '../App';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ILoginInput {
    username: string,
    password: string
}

function LoginPage() {

    const { register, handleSubmit, setError, formState: { errors }, getValues } = useForm<ILoginInput>();

    const { setLoggedInUser } = useContext(ChatContext);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(() => false);

    const submit: SubmitHandler<ILoginInput> = async (data) => {

        setIsLoading(() => true);

        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', data, {
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
                    <h1 className='login-heading text-center'>Humble</h1>
                    <form onSubmit={handleSubmit(submit)} className='d-flex flex-column gap-3'>
                        <div>
                            <label className='form-label' htmlFor="username">Username</label>
                            <input {...register('username', {
                                required: 'Please provide a username',
                                onBlur: (e) => {
                                    if (e.currentTarget.value !== '') setError('username', { type: 'validate', message: '' });
                                    else setError('username', { type: 'validate', message: 'Please provide your username' });

                                    console.log(errors)
                                },
                                onChange: (e) => {
                                    if (e.currentTarget.value !== '') setError('username', { type: 'validate', message: '' });
                                    else setError('username', { type: 'validate', message: 'Please provide your username' });
                                }
                            })} className={`form-control ${errors.username?.message ? 'is-invalid' : getValues().username ? 'is-valid' : ''}`} type="text" name="username" id="username" />
                        </div>
                        <div>
                            <label className='form-label' htmlFor="password">Password</label>
                            <input {...register('password', {

                                required: 'Please provide a password',
                                onBlur: (e) => {
                                    if (e.currentTarget.value !== '') setError('password', { type: 'validate', message: '' });
                                    else setError('password', { type: 'validate', message: 'Please provide your password' });

                                    console.log(errors)
                                },
                                onChange: (e) => {
                                    if (e.currentTarget.value !== '') setError('password', { type: 'validate', message: '' });
                                    else setError('password', { type: 'validate', message: 'Please provide your password' });
                                }
                            })} className={`form-control ${errors.password?.message ? 'is-invalid' : getValues().password ? 'is-valid' : ''}`} type="password" name="password" id="password" />
                        </div>
                        <button className='btn-login btn mt-3'>
                            {isLoading ? <div className="spinner-grow spinner-grow-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : <span>Login</span>}
                        </button>

                    </form>
                    <p className="text-center mt-3 fw-bold"><small>Don't have an account? <span className="text-primary">
                        <NavLink className='btn-signup-route' to="/signup">Sign Up</NavLink>
                    </span></small></p>
                </div>
            </div>
        </main>
    )
}

export default LoginPage