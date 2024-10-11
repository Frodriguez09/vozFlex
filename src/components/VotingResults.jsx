import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import '../chartConfig';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebaseConfig';

// Función para generar colores aleatorios
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const VotingResults = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        // Escuchar los resultados en tiempo real
        const unsubscribe = onSnapshot(collection(db, 'votingOptions'), (snapshot) => {
            let results = {};
            let optionLabels = [];
            let voteCounts = [];
            let singers = [];

            // Recorre todas las opciones de votación y establece los contadores en 0
            snapshot.forEach((doc) => {
                const option = doc.data();
                optionLabels.push(option.name);
                singers.push(option.singer);
                results[option.name] = 0;
            });

            // Escucha la colección de empleados para contar los votos en tiempo real
            onSnapshot(collection(db, 'employees'), (employeeSnapshot) => {
                employeeSnapshot.forEach((doc) => {
                    const vote = doc.data().vote;
                    if (vote && results[vote] !== undefined) {
                        results[vote] = (results[vote] || 0) + 1;
                    }
                });

                // Formatea los datos para el gráfico
                voteCounts = optionLabels.map(label => results[label]);

                const colors = optionLabels.map(() => generateRandomColor());
                const backgroundColors = colors.map(color => color + '33'); // Opacidad 0.2
                const borderColors = colors.map(color => color); // Sin opacidad

                setChartData({
                    labels: singers,
                    datasets: [
                        {
                            label: 'Resultados de la votación',
                            data: voteCounts,
                            backgroundColor: backgroundColors, // Colores con opacidad
                            borderColor: borderColors, // Colores sólidos
                            borderWidth: 1,
                        },
                    ],
                });
            });
        });

        // Limpia el listener cuando el componente se desmonta
        return () => unsubscribe();
    }, []);

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-5">Resultados de la Votación</h2>
            </div>
            <div className="w-4/5 md:w-full md:mx-auto">
                {Object.keys(chartData).length > 0 ? (
                    <div className="relative">
                    <Bar data={chartData} 
                        options={{ responsive: true
                        }}
                        className="" />
                    </div>
                ) : (
                    <p className="text-gray-500">Cargando resultados...</p>
                )}
            </div>
        </div>
    );
};

export default VotingResults;
