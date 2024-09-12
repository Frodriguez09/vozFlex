import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import '../chartConfig';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

const VotingResults = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        // Escuchar los resultados en tiempo real
        const unsubscribe = onSnapshot(collection(db, 'employees'), (snapshot) => {
            let results = {
                'Opcion 1': 0,
                'Opcion 2': 0,
            };

            // Recorre todos los empleados y cuenta los votos en tiempo real
            snapshot.forEach((doc) => {
                const vote = doc.data().vote;
                if (vote) {
                    results[vote] = (results[vote] || 0) + 1;
                }
            });

            // Formatea los datos para el gráfico
            setChartData({
                labels: ['Opción 1', 'Opción 2'], // Las etiquetas de tus opciones de voto
                datasets: [
                    {
                        label: 'Resultados de la votación',
                        data: [results['Opcion 1'], results['Opcion 2']], // Los datos de los votos
                        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
                        borderWidth: 1,
                    },
                ],
            });
        });

        // Limpia el listener cuando el componente se desmonta
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h2>Resultados de la Votación</h2>
            {Object.keys(chartData).length > 0 ? (
                <Bar data={chartData} options={{ responsive: true }} />
            ) : (
                <p>Cargando resultados...</p>
            )}
        </div>
    );
};

export default VotingResults;
