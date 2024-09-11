import { useState } from "react";
import {collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const EmployeeLogin = ({ onValidated}) => {
    const [employeeNumber, setEmployeeNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const q = query(collection(db, 'employees'), where('employeeId','==', employeeNumber));
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
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={employeeNumber}
                    onChange={(e) => setEmployeeNumber(e.target.value)}
                    placeholder="Ingresa tu numero de empleado"/>
                <button type="submit">Votar</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>      
    );
};

export default EmployeeLogin;

