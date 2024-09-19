import { useState, useEffect } from "react";
import {updateDoc, doc, collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase/firebaseConfig';
import { useNavigate } from "react-router-dom";


const VotingScreen = ({employeeDoc}) =>{
    const [selectedOption, setSelectedOption] = useState('');
    const [votingOptions, setVotingOptions] = useState([]);
    const navigate = useNavigate();
    
    // Funcion para obtener las opciones de votacion desde firebase
    useEffect(() =>{
        const fetchVotingOptions = async () =>{
            const querySnapshot = await getDocs(collection(db, 'votingOptions'));
            const optionList = querySnapshot.docs.map((docSnapshot) => ({
                id: docSnapshot.id,
                ...docSnapshot.data()
            }));
            setVotingOptions(optionList);
        };
        fetchVotingOptions();
    }, []);

    // Funcion para registrar el voto
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

    return (
        <div className="min-h-screen max-w-full mx-auto rounded-xl bg-blue-400  ">
          <h2 className="text-center font-bold text-2xl md:text-3xl xl:text-5xl">Bienvenido {employeeDoc.data().name}</h2>
          
          <div className="" >
            <div className="flex flex-wrap place-content-center">
                {votingOptions.map(option => (
                <div className="w-60 xl:w-96  p-2 bg-white rounded-xl m-3" key={option.id}>
                    <img className="h-40 w-60 xl:w-96 object-cover  rounded-xl" src={option.image} alt={option.name} width="150" />
                    <h2 className="text-center font-bold text-lg">{option.name}</h2>
                    <div className="flex items-center">
                        <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        type="radio"
                        value={option.name}
                        checked={selectedOption === option.name}
                        onChange={() => setSelectedOption(option.name)}
                        />
                    <p className="text-center font-bold ml-4">{option.singer}</p>
                    </div>
                </div>
                ))}
            </div>
          </div>

          <button 
            className="transition duration-200 block m-auto bg-blue-900 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-3/4 lg:w-2/3 xl:w-3/5 py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center"
            onClick={handleVote}>Enviar voto
          </button>
        </div>
      );
};

export default VotingScreen;