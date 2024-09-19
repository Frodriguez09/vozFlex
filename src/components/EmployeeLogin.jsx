import { useState } from "react";
import {collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

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
                setErrorMessage('Ya has votado.');
            }else{
                onValidated(employee);
            }
        }else{
            setErrorMessage('Numero de empleado no valido.');
        }
    };

    return(
        <div className="min-h-screen bg-blue-400 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">
                    <img className="mx-auto" src="https://flex.box.com/shared/static/2p4hyi0e5ixdk9eqaa5sr354zp7xn7kl.png" alt="La Voz Flex" width="250" />
                        <form onSubmit={handleSubmit}>
                            <input
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                type="text"
                                value={employeeNumber}
                                onChange={(e) => setEmployeeNumber(e.target.value)}
                                placeholder="Ingresa tu numero de empleado"/>
                            <button 
                                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                                type="submit">Votar
                            </button>
                        </form>
                        {errorMessage && <p className="text-center text-red-600 py-3 font-semibold ">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>      
    );
};

export default EmployeeLogin;

