import { useState } from "react";
import {collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';

const EmployeeLogin = ({ onValidated}) => {
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let modifiedEmployeeId = employeeNumber;
        if(modifiedEmployeeId.startsWith('0') && modifiedEmployeeId.endsWith('A')){
            modifiedEmployeeId = modifiedEmployeeId.slice(1,-1);
        }
        const q = query(collection(db, 'employees'), where('employeeId','==', modifiedEmployeeId));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty){
            const employee = querySnapshot.docs[0];
            if(employee.data().hasVoted){
                setErrorMessage(Swal.fire({
                    title: 'Error',
                    text: 'Ya tienes un voto registrado.',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#3b82f6'
                }));
            }else{
                onValidated(employee);
            }
        }else{
            setErrorMessage(Swal.fire({
                title: 'Error',
                text: 'Numero de empleado no valido.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6'
            }));
        }
    };

    return(
        <div className="flex flex-col w-4/5 md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto mt-10 p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
            <div className="flex flex-row gap-3 pb-4">
                <div className="bg-white w-full px-5 py-5">
                    
                    <img className="mx-auto mb-10" src="https://res.cloudinary.com/dskio3msp/image/upload/v1727733258/new_logoVozFlex_b6noq1.png" alt="La Voz Flex" width="250" />
                    <label className="block mt-4 text-sm font-bold text[#111827]">Numero de empleado</label>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="border rounded-lg px-3 py-4 mt-4 mb-6 text-sm w-full"
                                type="text"
                                value={employeeNumber}
                                onChange={(e) => setEmployeeNumber(e.target.value)}
                                placeholder="Ingresa tu numero de empleado"/>
                            <button 
                                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2 md:py-4 rounded-lg text-xl shadow-md hover:shadow-md font-semibold text-center inline-block"
                                type="submit">Votar
                            </button>
                        </form>
                </div>
            </div>
        </div>      
    );
};

export default EmployeeLogin;

