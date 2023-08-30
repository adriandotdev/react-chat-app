import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../scss/signup.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputField from '../components/InputField';
import IRegister from '../interfaces/IRegister';

function RegisterPage() {

    const { register, handleSubmit, setError, formState: { errors }, getValues } = useForm<IRegister>();

    const submit: SubmitHandler<IRegister> = async (data) => {

        if (getValues().password !== getValues().confirmPassword) {
            setError('confirmPassword', { type: 'validate', message: 'Password does not match' })
        }
    }

    console.log(errors)
    return (
        <main className='form-main-container container-fluid row justify-content-center align-items-center'>
            <div className="signup">
                <div>
                    <h1 className='mb-3'>Sign Up</h1>
                    <form onSubmit={handleSubmit(submit)} className='d-flex flex-column gap-1'>

                        <div>
                            <label className='form-label' htmlFor="givenName">Given Name</label>
                            <InputField
                                register={register}
                                id={"givenName"}
                                type={"text"}
                                options={{

                                    required: 'Please provide your given name',
                                    onBlur: (e) => {

                                        if (e.currentTarget.value)
                                            setError('givenName', { type: 'validate', message: '' });

                                        else
                                            setError('givenName', { type: 'validate', message: 'Please provide your given name' })

                                    },
                                    onChange: (e) => {
                                        if (e.currentTarget.value)
                                            setError('givenName', { type: 'validate', message: '' });

                                        else
                                            setError('givenName', { type: 'validate', message: 'Please provide your given name' })
                                    }
                                }}
                                errors={errors}
                                getValues={getValues} />
                        </div>

                        <div>
                            <label className='form-label' htmlFor="middleName">Middle Name</label>
                            <InputField
                                register={register}
                                id={"middleName"}
                                type={"text"}
                                options={{
                                    required: 'Please provide your middle name',
                                    onBlur: (e) => {

                                        if (e.currentTarget.value)
                                            setError('middleName', { type: 'validate', message: '' });

                                        else
                                            setError('middleName', { type: 'validate', message: 'Please provide your middle name' })

                                    },
                                    onChange: (e) => {
                                        if (e.currentTarget.value)
                                            setError('middleName', { type: 'validate', message: '' });

                                        else
                                            setError('middleName', { type: 'validate', message: 'Please provide your middle name' })
                                    }
                                }}
                                errors={errors}
                                getValues={getValues} />
                        </div>

                        <div>
                            <label className='form-label' htmlFor="lastName">Last Name</label>
                            <InputField
                                register={register}
                                id={"lastName"}
                                type={"text"}
                                options={{
                                    required: 'Please provide your last name',
                                    onBlur: (e) => {

                                        if (e.currentTarget.value)
                                            setError('lastName', { type: 'validate', message: '' });

                                        else
                                            setError('lastName', { type: 'validate', message: 'Please provide your last name' })

                                    },
                                    onChange: (e) => {
                                        if (e.currentTarget.value)
                                            setError('lastName', { type: 'validate', message: '' });

                                        else
                                            setError('lastName', { type: 'validate', message: 'Please provide your last name' })
                                    }
                                }}
                                errors={errors}
                                getValues={getValues} />
                        </div>

                        <div>
                            <label className='form-label' htmlFor="username">Username</label>
                            <InputField
                                register={register}
                                id={"username"}
                                type={"text"}
                                options={{
                                    required: 'Please provide your username',
                                    onBlur: (e) => {

                                        if (e.currentTarget.value)
                                            setError('username', { type: 'validate', message: '' });

                                        else
                                            setError('username', { type: 'validate', message: 'Please provide your username' })

                                    },
                                    onChange: (e) => {
                                        if (e.currentTarget.value)
                                            setError('username', { type: 'validate', message: '' });

                                        else
                                            setError('username', { type: 'validate', message: 'Please provide your username' })
                                    }
                                }}
                                errors={errors}
                                getValues={getValues} />
                        </div>

                        <div>
                            <label className='form-label' htmlFor="password">Password</label>
                            <InputField
                                register={register}
                                id={"password"}
                                type={"text"}
                                options={{
                                    required: 'Please provide your password',
                                    onBlur: (e) => {

                                        if (e.currentTarget.value) {

                                            setError('password', { type: 'validate', message: '' });
                                        }
                                        else
                                            setError('password', { type: 'validate', message: 'Please provide your password' })

                                    },
                                    onChange: (e) => {
                                        if (e.currentTarget.value) {

                                            setError('password', { type: 'validate', message: '' });
                                        }
                                        else
                                            setError('password', { type: 'validate', message: 'Please provide your password' })
                                    }
                                }}
                                errors={errors}
                                getValues={getValues} />
                        </div>

                        <div>
                            <label className='form-label' htmlFor="confirmPassword">Confirm Password</label>
                            <InputField
                                register={register}
                                id={"confirmPassword"}
                                type={"text"}
                                options={{
                                    required: 'Please provide your password',
                                    onBlur: (e) => {

                                        if (e.currentTarget.value) {
                                            if (e.currentTarget.value === getValues().password) {
                                                setError('confirmPassword', { type: 'validate', message: '' });
                                            }
                                            else
                                                setError('confirmPassword', { type: 'validate', message: 'Password does not match' })
                                        }
                                        else {
                                            setError('confirmPassword', { type: 'validate', message: 'Please confirm your passsword' })
                                        }
                                    },
                                    onChange: () => {
                                        if (getValues().confirmPassword) {

                                            if (getValues().confirmPassword === getValues().password)
                                                setError('confirmPassword', { type: 'validate', message: '' });
                                            else
                                                setError('confirmPassword', { type: 'validate', message: 'Please confirm your password' })
                                        } else {
                                            setError('confirmPassword', { type: 'validate', message: 'Please confirm your password' })
                                        }
                                    }
                                }}
                                errors={errors}
                                getValues={getValues} />
                        </div>

                        <button className='btn mt-3'>Register</button>
                    </form>
                    <p className="text-center mt-3 fw-bold"><small>Already have an account? <span className="text-primary">
                        <NavLink to="/login" className='btn-login-route'>Log In</NavLink>
                    </span></small></p>
                </div>
            </div>
        </main>
    )
}

export default RegisterPage;