import { useState } from "react";
import { collection, addDoc, getDoc, updateDoc, doc } from "firebase/firestore";
import {db} from '../firebase/firebaseConfig';
import VotingResults from './VotingResults';

const AdminPanel = () => {
    const [employeeNumber, setEmployeeNumer ] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState('');

    // Add employees
    const addEmployees = async () =>{
        if(employeeNumber && name){
            setLoading(true);
            try{
                await addDoc(collection(db, 'employees'),{
                    employeeNumber,
                    name,
                    hasVoted: false,
                });
                alert('Empleado agregado');
            }catch(error){
                console.error('Error agregando empleado: ', error);
            }
            setLoading(false);
        }else{
            alert('Por favor completa todos los campos.');
        }
    };

    // Close poll
    const closeVoting = async () =>{
        const querySnapshot = await getDoc(collection(db, 'employees'));
        querySnapshot.forEach(async (docSnapshot) => {
            await updateDoc(doc(db, 'employees', docSnapshot.id), {
                hasVoted: false,
                vote: null,
            });
        });
        alert('Votacion reiniciada.');
    };

    return(
        <div>
            <h2>Panel de Administrador</h2>
            <div>
                <h3>Agregar empleado</h3>
                <input
                    type="text"
                    value={employeeNumber}
                    onChange={(e)=>setEmployeeNumer(e.target.value)}
                    placeholder="Numero de empleado"
                />
                <input
                    type="text"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="Nombre"
                />
                <button onClick={addEmployees}
                        disabled={loading}>
                        {loading ? 'Agregando...': 'Agregar empleado'}
                </button>
            </div>
            <div>
                <h3>Resultado de la Votacion</h3>
                <VotingResults/>
            </div>
            <div>
                <h3>Acciones de Votacion</h3>
                <button onClick={closeVoting}>Reiniciar Votacion</button>
            </div>
        </div>
    );
};

export default AdminPanel;
