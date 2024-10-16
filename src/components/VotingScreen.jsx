import { useState, useEffect } from "react";
import {updateDoc, doc, collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase/firebaseConfig';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


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
            Swal.fire({
                title: '¡Voto registrado!',
                text: 'Gracias por participar',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6'
            })
            navigate('/');
            window.location.reload();
        }else{
            Swal.fire({
                title: '¡Espera falto algo!',
                text: 'Selecciona a tu cantante favorito',
                icon: 'warning',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6'
            })
        }
        
    };

    return (
        <div className="flex flex-col w-full md:w-4/5 xl:w-3/4 2xl:w-11/12 3xl:w-1/3 mx-auto mt-10 p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
            <div>
                <img src="https://res.cloudinary.com/dskio3msp/image/upload/v1727733258/new_logoVozFlex_b6noq1.png" alt="logo flex" width="140"/>
                <h1 className="text-center font-bold text-2xl md:text-3xl xl:text-5xl">¡Bienvenido {employeeDoc.data().name}!</h1>
                <p className="font-medium text-center my-4 text-gray-700 text-xl lg:text-2xl">Selecciona a tu cantante favorito</p>
            </div>
          
          <div className="" >
            <div className="flex flex-wrap place-content-center">
                {votingOptions.map(option => (
                    <div className="shadow has-[:checked]:bg-blue-100 has-[:checked]:ring-blue-400 has-[:checked]:border-2 has-[:checked]:border-blue-500 w-60 xl:w-96  p-2 bg-white rounded-xl m-3" key={option.id}>
                        <label className="">
                            <img className="h-40 w-60 xl:w-96 object-cover  rounded-xl" src={option.image} alt={option.name} width="150" />
                            <div className="flex items-center">
                                <input
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                                type="radio"
                                value={option.name}
                                checked={selectedOption === option.name}
                                onChange={() => setSelectedOption(option.name)}
                                />
                                <h2 className="ml-4 text-center font-bold text-2xl">{option.singer}</h2>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
          </div>

          <button 
            className="transition duration-200 block m-auto bg-blue-900 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-4/5 lg:w-2/3 xl:w-3/5 py-2.5 rounded-lg text-xl shadow-sm hover:shadow-md font-semibold text-center"
            onClick={handleVote}>Enviar voto
          </button>
        </div>
      );
};

export default VotingScreen;