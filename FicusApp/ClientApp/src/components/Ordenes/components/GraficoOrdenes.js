import React from 'react';
import { Chart } from 'chart.js';

const GraficoOrdenes = ({ productosUtilizados }) => {
  const refGrafico = React.useRef(null);

    React.useEffect(() => {
        if (productosUtilizados) {
            const ctx = refGrafico.current.getContext('2d');

            const etiquetas = productosUtilizados.map((producto, indice) => `Producto ${indice + 1}`);
            const datos = productosUtilizados.map((producto) => producto.cantidad);
            const basuraEvitada = productosUtilizados.map((producto) => producto.cantidad * producto.evitarBasura);

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: etiquetas,
                    datasets: [
                        {
                            label: 'Cantidad de productos utilizados',
                            data: datos,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Basura evitada (kg)',
                            data: basuraEvitada,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
  }, [productosUtilizados]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <canvas ref={refGrafico} />
        </div>
      </div>
    </div>
  );
};

export default GraficoOrdenes;

