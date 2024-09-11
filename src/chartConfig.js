// src/chartConfig.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Registrar los componentes necesarios
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  