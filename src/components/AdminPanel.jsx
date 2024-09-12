import { useState } from "react";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';
import VotingResults from './VotingResults';
import * as XLSX from 'xlsx';

const AdminPanel = () => {
    const [loading, setLoading] = useState(false);

    // Función para procesar el archivo de Excel
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert('Por favor, selecciona un archivo.');
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
                alert('Empleados agregados exitosamente.');
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
            alert('Votación reiniciada.');
        } catch (error) {
            console.error('Error al cerrar la votación: ', error);
        }
    };

    return (
        <div>
            <h2>Panel de Administrador</h2>

            <div>
                <h3>Agregar empleados desde archivo Excel</h3>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    disabled={loading}
                />
            </div>

            <div>
                <h3>Resultado de la Votación</h3>
                <VotingResults />
            </div>

            <div>
                <h3>Acciones de Votación</h3>
                <button onClick={closeVoting} disabled={loading}>
                    Reiniciar Votación
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;
