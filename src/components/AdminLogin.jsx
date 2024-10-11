import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';

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
                title: '¡Algo salio mal!',
                text: 'Las credenciales son incorectas',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6'
            })
        }
    };

    return(
        <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto mt-10 p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
            <div className="flex flex-row gap-3 pb-4">
                <div>
                    <img src="https://res.cloudinary.com/dskio3msp/image/upload/v1727733258/new_logoVozFlex_b6noq1.png" alt="logo flex" width="100" />
                </div>
                <h1 className="text-3xl font-bold text-[#4b5563] my-auto">Administrador</h1>
            </div>    
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="pb-2">
                        <label className="block mb-2 text-sm font-medium text-[#111827]">Correo</label>
                        <div className="relative text-gray-400"><span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></span>
                            <input 
                                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                                autoComplete="off"
                                type="email"
                                placeholder="name@flex.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="pb-6">
                        <label className="block mb-2 text-sm font-medium text[#111827]">Password</label>
                        <div className="relative text-gray-400"><span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-asterisk"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M12 8v8"></path><path d="m8.5 14 7-4"></path><path d="m8.5 10 7 4"></path></svg></span>
                            <input 
                                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />  
                        </div>
                    </div>
                    <button 
                        className="w-full text-[#FFFFFF] bg-[#3b82f6] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
                        type="submit">Iniciar sesion
                    </button>
                </form>           
        </div>
    );
};

export default AdminLogin;