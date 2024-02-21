import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import Spinner from 'react-bootstrap/Spinner';


function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loader, loaderOn] = useState("Log in");

    const [state, setState] = useState({
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',
        },
    });

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
            errors: {
                ...prevState.errors,
                [field]: '',
            }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            email: state.email,
            password: state.password
        }

        loaderOn("Logging in...");

        login(credentials).then((isLoggedIn) => {
            if (isLoggedIn === true) {
                navigate("/home", { replace: true });
                loaderOn("Log in");
            }
        }).catch((error) => {
            loaderOn("Log in");
            toast.error("Login error!\n", {
                autoClose: 3000,
                pauseOnHover: true,
            });
        });


    };

    return (
        <>
            {/* <Modal /> */}
            <div className="App">
                <ToastContainer />

                <h1 className='text-center'>THREEL</h1>
                <div className="registerContainer mx-auto my-auto">
                    <h2 className='text-center'>LOGIN</h2>
                    <form className='form-group'>

                        <input
                            name='email'
                            type='email'
                            id='email'
                            placeholder='Email'
                            value={state.email}
                            onChange={handleChange}
                            required
                        />
                        {state.errors.email && (
                            <div className="error-message">{state.errors.email[0]}</div>
                        )}
                        <input
                            name='password'
                            id='password'
                            type='password'
                            placeholder='Password'
                            value={state.password}
                            onChange={handleChange}
                            required
                        />
                        {state.errors.password && (
                            <div className="error-message">{state.errors.password[0]}</div>
                        )}

                        <p className='mx-auto'>Don't have an Account?  <Link to="/register">Register Here!</Link></p>

                        <div className='mx-auto'>
                            <button type="submit" className="registerButton" onClick={handleSubmit} disabled={loader === "Logging in..."}>
                                <h6 className='my-auto'>{loader}</h6>
                                {loader === "Logging in..." && <Spinner animation="border" size='sm' />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;