import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../hooks/useAuth";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [loader, loaderOn] = useState("Register");

    const [show, setShow] = useState(false);

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
                onHide={() => setShow(!show)}
            >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1 className="modal-title">User Agreement</h1>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p className="modal-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. A ullam excepturi corrupti doloremque accusantium id ratione ipsa veniam eum magnam soluta molestias accusamus, maiores tenetur quae temporibus aperiam, sint expedita illum, libero error deserunt maxime omnis vero. Quis, iste. Dignissimos quidem repellat architecto expedita atque, nam fuga nihil maxime ducimus dolorem magnam in quae cum animi exercitationem et velit? Est vitae repellat, ratione, necessitatibus facilis veritatis, saepe tempore accusamus magni deleniti itaque aliquid rem! Ea laborum soluta et minima animi maiores unde aliquid modi quod quasi minus quae exercitationem earum pariatur iste, quisquam dolores magnam possimus sapiente excepturi nihil quibusdam, labore eius nam. Iure, repellendus! Voluptates eveniet, doloribus voluptatibus enim non rerum provident modi fuga possimus cumque quis. Ea laudantium eaque vitae, neque consequatur mollitia tempore numquam nam rerum amet porro aspernatur. Quam officiis sint atque placeat amet repudiandae corrupti totam ab vel perferendis cum dicta, sunt id autem tempore earum tenetur quas, blanditiis, dignissimos minima. Harum inventore, fuga placeat deleniti animi nulla repellat ducimus, ipsa eius mollitia magni atque sint, nesciunt deserunt iure quaerat? Doloremque earum culpa aliquid maiores. Quis odit, eius exercitationem et in praesentium obcaecati ex doloribus, nostrum dolorum totam harum, reprehenderit autem nobis vitae molestias explicabo. Id cupiditate dolore soluta, reiciendis unde doloremque perspiciatis nemo sapiente laudantium ratione impedit voluptatibus delectus, eligendi corrupti exercitationem, adipisci eum! Quae aliquid hic tempora consequatur, debitis exercitationem ut natus! A, corrupti aut. Eos tempore veniam sunt? Aliquam praesentium, unde illum laboriosam, facere numquam consectetur sint ducimus in neque distinctio fugit accusantium nisi cumque suscipit, rem beatae aliquid quas dolorum doloribus esse error ut dolores?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                    <Button 
                        variant="primary" 
                        onClick={() => {
                            setShow(false);
                            setDidAgree(true);
                        }
                        }
                    >Accept</Button>
                </Modal.Footer>
            </Modal.Dialog>
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
                        <button className="registerButton" onClick={() => setShow(!show)}>User Agreement</button>
                        <button type="submit" className="registerButton" onClick={handleSubmit} disabled={loader === "Registering..."}>{loader}</button>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default Register;
