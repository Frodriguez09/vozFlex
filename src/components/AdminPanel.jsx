import { useState } from "react";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import VotingResults from './VotingResults';
import * as XLSX from 'xlsx';
import VotingOptionsCreator from "./VotingOptionCreator";
import Swal from 'sweetalert2';

const AdminPanel = () => {
    const [loading, setLoading] = useState(false);

    // Función para procesar el archivo de Excel
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            Swal.fire({
                title: 'Error',
                text: 'Selecciona un archivo.',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6'
            });
            return;
        }

        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Aquí jsonData contiene los datos de la hoja de Excel
            // La primera columna debe ser "Numero empleado" y la segunda columna "Nombre"
            try {
                setLoading(true);
                for (let i = 1; i < jsonData.length; i++) {
                    const [employeeId, name] = jsonData[i];
                    if (employeeId && name) {
                        await addDoc(collection(db, 'employees'), {
                            employeeId,
                            name,
                            hasVoted: false,
                        });
                    }
                }
                Swal.fire({
                    title: 'Completado',
                    text: 'Empleados cargados exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#3b82f6'
                })
            } catch (error) {
                console.error('Error agregando empleados: ', error);
            } finally {
                setLoading(false);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    // Close poll
    const closeVoting = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'employees'));

            const updatePromises = querySnapshot.docs.map((docSnapshot) =>
                updateDoc(doc(db, 'employees', docSnapshot.id), {
                    hasVoted: false,
                    vote: null,
                })
            );
            await Promise.all(updatePromises);
            Swal.fire({
                title: 'Accion realizada',
                text: 'Votacion reiniciada.',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b82f6'
            })
        } catch (error) {
            console.error('Error al cerrar la votación: ', error);
        }
    };

    return (
        <div className="flex flex-col w-full md:w-2/3 xl:w-4/5 2xl:w-4/5 3xl:w-1/3 mx-auto mt-10 p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
            <div className="flex flex-row gap-3 pb-4">
                <img src="https://res.cloudinary.com/dskio3msp/image/upload/v1727733258/new_logoVozFlex_b6noq1.png" alt="logo flex" width="100" />
                <h1 className="text-3xl font-bold text-[#4b5563] my-auto">Panel de Administrador</h1>
            </div>

            <div className="bg-gray-100 p-5 rounded-lg shadow-md">
                <h3 className="font-semibold">Carga de empleados Excel</h3>
                <input
                    className="block w-full text-sm my-4 bg-gray-100  text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none "
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    disabled={loading}
                />
            </div>
            <div className="bg-gray-100 p-5 my-3 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-3">Participantes</h3>
                <VotingOptionsCreator/>
            </div>

            <div>
                <VotingResults />
            </div>

            <div>
                <h3 className="font-semibold text-lg mb-3 p-5">Acciones de Votación</h3>
                <button 
                    className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                    onClick={closeVoting} disabled={loading}>
                    Reiniciar Votación
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;
