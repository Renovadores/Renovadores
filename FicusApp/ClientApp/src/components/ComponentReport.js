import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "",
    },
  },
};

const ComponentReport = (props) => {
  options.plugins.title.text = props.texto;
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const [environmentalReport, setEnvironmentalReport] = useState({});
  useEffect(() => {
    const getReport = async () => {
      const response = await fetch(props.parametro);
      if (response.ok) {
        const report = await response.json();
        setEnvironmentalReport(
          {
            labels: labels,
            datasets: [
              {
                label: 'Kilogramos',
                data: report,
                backgroundColor: 'rgba(255, 44, 44, 1)',
                borderColor: 'rgba(84, 74, 221, 0.5)'
              },
            ],

          });
      }
    }
    getReport();
  }, []);
  return (
    <div className="bg-light m-0">
    {
      environmentalReport.datasets ?
        <div>
          <Line options={options} data={environmentalReport} />

        </div>
        :
        <p>Cargando datos...</p>
    }
    </div>
  )
}
export default ComponentReport;