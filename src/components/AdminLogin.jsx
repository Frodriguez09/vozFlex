import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase/firebaseConfig';

const AdminLogin = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            onLogin();
        }catch (error) {
            alert('Login fallido');
        }
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                 />
                <input 
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 />
                <button type="submit">Iniciar sesion</button>
            </form>
        </div>
    );
};

export default AdminLogin;