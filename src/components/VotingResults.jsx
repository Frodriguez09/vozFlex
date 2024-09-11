import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import '../chartConfig';
import { collection, getDocs } from "firebase/firestore";
import {db} from '../firebase/firebaseConfig';

const VotingResults = () => {
    // const [voteData, setVoteData] = useState([]);
    const [chartData, setChartData] = useState({});
  
    useEffect(() => {
      // Función para obtener los resultados de la votación
      const fetchVoteResults = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'employees'));
          let results = {
            'Opcion 1': 0,
            'Opcion 2': 0,
          };
  
          // Recorre todos los empleados y cuenta los votos
          querySnapshot.forEach((doc) => {
            const vote = doc.data().vote;
            if (vote) {
              results[vote] = (results[vote] || 0) + 1;
            }
            console.log(results);
          });
  
          // Actualiza el estado con los datos de los votos
        //   setVoteData(results);
  
          // Formatea los datos para el gráfico
          setChartData({
            labels: ['Option 1', 'Option 2'], // Las etiquetas de tus opciones de voto
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
        } catch (error) {
          console.error('Error obteniendo los resultados de la votación: ', error);
        }
      };
  
      fetchVoteResults(
        // console.log(chartData)
      );
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

