import './auth.css';
import { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaUser, FaLock } from "react-icons/fa";
import ShinyText from "../components/ShinyText/ShinyText";
import { RegisterUser } from '../services/authService';
import Login from './Login';

const Register = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleRegister = async (e: any) => {
        e.preventDefault();
        console.log('Tentative inscription avec:', { username, email, password });

        try {
            const resp = await RegisterUser(username, email, password);
            console.log('Réponse RegisterUser:', resp);

            if (!resp) {
                console.log(resp);
                return;
            }
            setFormSubmit(true);
        } catch (err) {
            console.log(err);
            return err; // il faut loger les erreurs
        }
    };
    
    return (
        <>
        {formSubmit ? (
            <>
            <Login />
            </>
        ) : (

            <div className="container">
            <form action="" onSubmit={handleRegister}>
                <ShinyText text="Register" className="title" />

                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Pseudo"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required 
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <MdEmail className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <FaLock className="icon" />
                </div>

                <button type="submit" className="btn">Register</button>
            </form>
        </div>
            )}
        </>
    );
};

export default Register;