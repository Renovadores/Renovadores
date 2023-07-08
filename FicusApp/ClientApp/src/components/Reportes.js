import React, { useEffect, useState } from 'react';
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
import { Line } from 'react-chartjs-2';

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
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

const Reportes = () => {
    const [dataLine, setDataLine] = useState({});
    const [environmentalReport, setEnvironmentalReport] = useState([]);
    useEffect(() => {
        const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Kilogramos',
                    data: [100, 50, 40, 75, 150, 200, 120], // Datos quemados para los trimestres
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
            ],
        };
        const getReport = async () => {
          const response = await fetch(`api/reporte/GetAnnualEnvironmentalReport/${2023}`);
          if (response.ok) {
            const report = await response.json();
            console.log(report);
          }
        }
        getReport();
        setDataLine(data);
    }, []);

    return (
        <div className="container vh-100">
            <div className="row d-flex justify-content-center">
                <div className="col-6">
                    <h4 className="text-center">Reporte Huella Ambiental</h4>
                </div>
            </div>
            <div className=  "row d-flex justify-content-center vh-50">
                <div className= "col-6 bg-light d-flex justify-content-center">
                    <div className="chart-container">
                        <div className="chart-background" />
                        {dataLine.datasets ? (
                            <Line options={options} data={dataLine} />
                        ) : (
                            <p>Cargando datos...</p>
                        )}
                    </div>
                </div> 
            </div>
        </div>
    );
};

export default Reportes;