import { useState } from "react";
import {updateDoc, doc} from 'firebase/firestore';
import {db} from '../firebase/firebaseConfig';
import { useNavigate } from "react-router-dom";


const VotingScreen = ({employeeDoc}) =>{
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate();
    

    const handleVote = async () =>{
        if(selectedOption){
            await updateDoc(doc(db, 'employees', employeeDoc.id),{
                hasVoted: true,
                vote: selectedOption,
            });
            alert('Voto registrado');
            navigate('/');
            window.location.reload();
        }else{
            alert('Selecciona una opcion');
        }
        
    };

    return(
        <div>
            <h2>Bienvenido {employeeDoc.data().name}</h2>
            <button onClick={()=> setSelectedOption('Opcion 1')}>Opcion 1</button>
            <button onClick={()=> setSelectedOption('Opcion 2')}>Opcion 2</button>
            <button onClick={handleVote}>Enviar voto</button>
        </div>
    );
};

export default VotingScreen;