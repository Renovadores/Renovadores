﻿import React, { useEffect, useState } from 'react';

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
  },
};

const Reportes = () => {
  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const [environmentalReport, setEnvironmentalReport] = useState({});
  useEffect(() => {
    const getReport = async () => {
    const response = await fetch(`api/reporte/GetAnnualEnvironmentalReport/${2022}`);
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
    <div className="container h-75">

      <div className="row d-flex justify-content-center">
        <div className="col-6">
          <h4 className="text-center">Reporte Huella Ambiental</h4>
        </div>
      </div>
      <div className="row">
        <div className="col p-0 mb-4">
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
        </div>
      </div>

    </div>
  );
};

export default Reportes;