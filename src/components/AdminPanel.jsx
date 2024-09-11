import { useState } from "react";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import {db} from '../firebase/firebaseConfig';
import VotingResults from './VotingResults';

const AdminPanel = () => {
    const [employeeId, setEmployeeId ] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState('');

    // Add employees
    const addEmployees = async () =>{
        if(employeeId && name){
            setLoading(true);
            try{
                await addDoc(collection(db, 'employees'),{
                    employeeId,
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
    const closeVoting = async () => {
        try{
            const querySnapshot = await getDocs(collection(db, 'employees'));

            const updatePromises = querySnapshot.docs.map((docSnapshot) => updateDoc(doc(db, 'employees', docSnapshot.id),{
                hasVoted: false,
                vote: null,
            })
        );
        await Promise.all(updatePromises);
        alert('Votacion reiniciada.');
        }catch (error){
            console.error('Error al cerrar la votacion: ',error);
        }
    };

    return(
        <div>
            <h2>Panel de Administrador</h2>
            <div>
                <h3>Agregar empleado</h3>
                <input
                    type="text"
                    value={employeeId}
                    onChange={(e)=>setEmployeeId(e.target.value)}
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
