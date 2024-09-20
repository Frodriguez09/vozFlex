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
            Swal.fire({
                title: 'Error',
                text: 'Login fallido',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6'
            })
        }
    };

    return(
        <div className="min-h-screen bg-blue-400 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <div className="px-5 py-7">
                <h2 className="text-center font-bold py-4">Administrador</h2>
                <img className="mx-auto" src="https://flex.box.com/shared/static/2p4hyi0e5ixdk9eqaa5sr354zp7xn7kl.png" alt="La Voz Flex" width="200" />
                    <form onSubmit={handleSubmit}>
                        <input 
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            type="email"
                            placeholder="Correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />   
                        <button 
                            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            type="submit">Iniciar sesion
                        </button>
                    </form>
            </div>
            </div>
            </div>
        </div>
    );
};

export default AdminLogin;