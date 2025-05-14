import {Layout} from 'antd';
import {useCrypto} from "../../../context/crypto-context.jsx";
import PortfolioChart from "./PortfolioChart.jsx";
import AssetsTable from "./AssetsTable.jsx";
import styles from "./AppContent.module.css";

const contentStyle = {
    minHeight: "calc(100vh - 60px)",
    color: "#fff",
    padding: '1rem',
};

export default function AppContent() {
    const {assets, crypto} = useCrypto()

    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price
        return acc
    }, {})

    const totalPortfolio = assets
        .map((asset) => asset.amount * cryptoPriceMap[asset.id])
        .reduce((acc, v) => (acc += v), 0)
        .toFixed(2);

        return (<Layout.Content style={contentStyle}>
        <div style={{display: 'flex'}}>
            <h2 className={styles.contentTitle}>
                <span>Portfolio:&nbsp;</span><span>{totalPortfolio}$</span></h2>
            <PortfolioChart/>
        </div>
        <AssetsTable/>
    </Layout.Content>);
        }
