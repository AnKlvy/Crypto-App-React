import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {useCrypto} from "../../../context/crypto-context.jsx";
import styles from './PortfolioChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
    const {assets, deviceWidth} = useCrypto()
    const data = {
        labels: assets.map(a => a.name),
        datasets: [
            {
                label: '$',
                data: assets.map(a => a.price * a.amount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255,0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const leftOrTop =deviceWidth > 480 && deviceWidth <=900;
    const options = {
        plugins: {
            legend: {
                position: leftOrTop ? 'left' : 'top',
            }
        }
    };

    return (
        <div className={styles.chartContainer}>
            <Pie data={data} options={options}/>
        </div>
    );
}