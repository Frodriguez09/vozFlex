import { useState, useEffect } from "react";
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';

const VotingOptionsCreator = () => {
  const [options, setOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState('');
  const [singerName, setSingerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingOption, setEditingOption] = useState(null);

  // Función para obtener las opciones existentes
  useEffect(() => {
    const fetchOptions = async () => {
      const querySnapshot = await getDocs(collection(db, 'votingOptions'));
      const optionsList = querySnapshot.docs.map((docSnapshot) => ({
        id: docSnapshot.id,
        ...docSnapshot.data()
      }));
      setOptions(optionsList);
    };

    fetchOptions();
  }, []);

  // Agregar una nueva opción de votación
  const addOption = async () => {
    if (singerName && imageUrl) {
      const newOptionId = options.length + 1;
      const newOption = {
        name: `Opcion ${newOptionId}`,
        image: imageUrl,
        singer: singerName,
      };

      setLoading(true);
      try {
        await addDoc(collection(db, 'votingOptions'), newOption);
        setOptions([...options, { id: newOptionId, ...newOption }]);
        Swal.fire({
          title: 'Carga exitosa',
          text: 'El participante fue agregado',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3b82f6'
      });
        setImageUrl('');
        setSingerName('');
      } catch (error) {
        console.error('Error agregando la opción de votación: ', error);
      }
      setLoading(false);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todos los campos',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b82f6'
    })
    }
  };

  // Editar una opción existente
  const editOption = async (optionId) => {
    const optionToEdit = options.find(option => option.id === optionId);
    setImageUrl(optionToEdit.image);
    setSingerName(optionToEdit.singer);
    setEditingOption(optionId);
  };

  // Guardar los cambios de edición
  const saveEdit = async () => {
    try {
      await updateDoc(doc(db, 'votingOptions', editingOption), {
        image: imageUrl,
        singer: singerName,
      });
      const updatedOptions = options.map(option =>
        option.id === editingOption ? { ...option, image: imageUrl, singer: singerName } : option
      );
      setOptions(updatedOptions);
      setEditingOption(null);
      setImageUrl('');
      setSingerName('');
      Swal.fire({
        title: 'Completo',
        text: 'Opcion actualizada',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b82f6'
    })
    } catch (error) {
      console.error('Error actualizando la opción de votación: ', error);
    }
  };

  // Eliminar una opción
  const deleteOption = async (optionId) => {
    try {
      await deleteDoc(doc(db, 'votingOptions', optionId));
      setOptions(options.filter(option => option.id !== optionId));
      Swal.fire({
        title: 'Completo',
        text: 'Opcion eliminada',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b82f6'
    })
    } catch (error) {
      console.error('Error eliminando la opción de votación: ', error);
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-lg"> 
      <h3 className="font-semibold">Agregar cantante</h3>
      <input
        className="border rounded-lg px-3 py-3 mt-1 mb-1 text-sm w-full"
        type="text"
        value={singerName}
        onChange={(e) => setSingerName(e.target.value)}
        placeholder="Nombre del cantante"
      />
      <input
        className="border rounded-lg px-3 py-3 mt-1 mb-1 text-sm w-full"
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="URL de la imagen"
      />
      <button 
        className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 mb-3 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
        onClick={editingOption ? saveEdit : addOption} disabled={loading}>
        {loading ? 'Guardando...' : editingOption ? 'Guardar cambios' : 'Agregar opción'}
      </button>

      <h3 className="font-semibold">Lista de opciones</h3>
      
      <div>
      <table className="w-full text-sm text-center text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-5 py-3">#</th>
            <th scope="col" className="px-5 py-3">Opcion</th>
            <th scope="col" className="px-5 py-3">Cantante</th>
            <th scope="col" className="px-5 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody >
          {options.map((option, index) => (
            <tr className="bg-white border-b" key={option.id}>
              <td className="py-3">{index + 1}</td>
              <td className="py-3">{option.name}</td>
              <td className="py-3">{option.singer}</td>
              <td>
                <button 
                  className="transition duration-200 bg-blue-500  focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-1/3 py-2 my-2 rounded-l-lg text-sm shadow-sm hover:shadow-md font-semibold text-center"
                  onClick={() => editOption(option.id)}>Editar</button>
                <button 
                  className="transition duration-200 bg-red-500  focus:bg-red-700 focus:shadow-sm focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-white w-1/3 py-2 my-2 rounded-r-lg text-sm shadow-sm hover:shadow-md font-semibold text-center"
                  onClick={() => deleteOption(option.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default VotingOptionsCreator;
