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
import InputInt from './InputInt';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const environmentalReportOptions = {
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "Reporte Huella Ambiental",
    },
  },
};

const orderReportOptions = {
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: "Reporte General De Ordenes Anuales",
    },
  },
};

const Reportes = () => {
  const monthLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const [environmentalReport, setEnvironmentalReport] = useState({});
  const [ordersReport, setOrdersReport] = useState({});
  const [year, setYear] = useState(2022);

  const handleYear = (event) => {
    const input = event.target.value;
    if (input >= 2022) {
      setYear(input);
    }
  }

  useEffect(() => {
    const getReport = async () => {
      const response = await fetch(`api/reporte/GetAnnualEnvironmentalReport/${year}`);
      if (response.ok) {
        const report = await response.json();
        setEnvironmentalReport({
          labels: monthLabels,
          datasets: [
            {
              label: 'Gramos',
              data: report,
              backgroundColor: 'rgba(255, 44, 44, 1)',
              borderColor: 'rgba(84, 74, 221, 0.5)'
            },
          ],

        });
      }
      const responseOrders = await fetch(`api/reporte/GetAnnualOrderReport/${year}`);
      if (responseOrders.ok) {
        const report = await responseOrders.json();
        setOrdersReport({
          labels: monthLabels,
          datasets: [
            {
              label: 'Cantidad',
              data: report,
              backgroundColor: 'rgba(255, 44, 44, 1)',
              borderColor: 'rgba(84, 74, 221, 0.5)'
            },
          ],

        });
      }
    }
    getReport();
  }, [year]);

  return (
    <div className="container h-75">
      <div className="row">
        <div className="col-4 px-0">
          <InputInt text="Año" default="2022" handler={handleYear} />
        </div>
      </div>
      <div className="row">
        <div className="col p-0 mb-4">
          <div className="bg-light m-0">
            {
              environmentalReport.datasets ?
                <div>
                  <Line options={environmentalReportOptions} data={environmentalReport} />
                </div>
                :
                <p>Cargando datos...</p>
            }
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col p-0 mb-4">
          <div className="bg-light m-0">
            {
              ordersReport.datasets ?
                <div>
                  <Line options={orderReportOptions} data={ordersReport} />
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