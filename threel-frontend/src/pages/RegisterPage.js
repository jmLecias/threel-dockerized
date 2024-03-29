import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [loader, loaderOn] = useState("Register");

    const [show, setShow] = useState(true);

    const [didAgree, setDidAgree] = useState(false);

    const [state, setState] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
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
            name: state.name,
            username: state.username,
            password: state.password,
            password_confirmation: state.confirmPassword
        }

        loaderOn("Registering...");

        if (didAgree) {
            register(credentials).then((isRegistered) => {
                if (isRegistered === true) {
                    navigate("/home", { replace: true });
                    loaderOn("Register");
                } else {
                    
                }
            }).catch((error) => {
                setState(prevState => ({
                    ...prevState,
                    errors: error.response.data.errors,
                }));
                loaderOn("Register");
            });
        } else {
            toast.error("Did not accept user agreement", {
                autoClose: 3000,
                pauseOnHover: true,
            });
            loaderOn("Register");
        }
    };


    return (
        <div className="App">
            <ToastContainer />
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <h1 className="modal-title">User Agreement</h1>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="modal-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam excepturi corrupti doloremque accusantium id ratione ipsa veniam eum magnam soluta molestias accusamus, maiores tenetur quae temporibus aperiam, sint expedita illum, libero error deserunt maxime omnis vero. Quis, iste. Dignissimos quidem repellat architecto expedita atque, nam fuga nihil maxime ducimus dolorem magnam in quae cum animi exercitationem et velit? Est vitae repellat, ratione, necessitatibus facilis veritatis, saepe tempore accusamus magni deleniti itaque aliquid rem! Ea laborum soluta et minima animi maiores unde aliquid modi quod quasi minus quae exercitationem earum pariatur iste, quisquam dolores magnam possimus sapiente excepturi nihil quibusdam, labore eius nam. Iure, repellendus! Voluptates eveniet, doloribus voluptatibus enim non rerum provident modi fuga possimus cumque quis.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            navigate("/login");
                        }
                        }
                    >Back</Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            setShow(false);
                            setDidAgree(true);
                        }
                        }
                    >Accept</Button>
                </Modal.Footer>
            </Modal>
            <h1 className='text-center'>THREEL</h1>
            <div className="registerContainer mx-auto my-auto">
                <h2 className='text-center'>REGISTER</h2>
                <form className='form-group'>
                    <input
                        name='name'
                        type='text'
                        id='name'
                        placeholder='Name'
                        value={state.name}
                        onChange={handleChange}
                        required
                    />
                    {state.errors.name && (
                        <div className="error-message">{state.errors.name[0]}</div>
                    )}
                    <input
                        name='username'
                        type='text'
                        id='username'
                        placeholder='Username'
                        value={state.username}
                        onChange={handleChange}
                        required
                    />
                    {state.errors.username && (
                        <div className="error-message">{state.errors.username[0]}</div>
                    )}
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
                        minLength="8"
                        required
                    />
                    {state.errors.password && (
                        <div className="error-message">{state.errors.password[0]}</div>
                    )}

                    <input
                        name='confirmPassword'
                        id='confirm-password'
                        type='password'
                        placeholder='Confirm Password'
                        value={state.confirmPassword}
                        onChange={handleChange}
                        minLength="8"
                        required
                    />
                    {state.errors.password_confirmation && (
                        <div className="error-message">
                            {state.errors.password_confirmation[0]}
                        </div>
                    )}

                    <p className='mx-auto'>Already have an Account? <Link to="/login">Login Now!</Link></p>

                    <div className='mx-auto'>
                        <button type="submit" className="registerButton" onClick={handleSubmit} disabled={loader === "Registering..."}>
                            <h6 className='my-auto'>{loader}</h6>
                            {loader === "Registering..." && <Spinner animation="border" size='sm' />}    
                        </button>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default Register;
