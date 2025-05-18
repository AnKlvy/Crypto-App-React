import {Layout} from 'antd';
import {useCrypto} from "../../../context/crypto-context.jsx";
import PortfolioChart from "./PortfolioChart.jsx";
import AssetsTable from "./AssetsTable.jsx";
import styles from "./AppContent.module.css";
import PortfolioTotal from "./PortfolioTotal.jsx";
import NewsComponent from "./NewsComponent.jsx";

const contentStyle = {
    minHeight: "calc(100vh - 60px)",
    color: "#fff",
    padding: '1rem',
};

export default function AppContent() {
    const {deviceWidth}=useCrypto()
    return (<Layout.Content style={contentStyle}>
        <div className={styles.titleAndChart}>
            {deviceWidth>900 && <NewsComponent />}
            {(deviceWidth < 900) && <PortfolioTotal/>}
            <PortfolioChart/>
        </div>
        <AssetsTable/>
    </Layout.Content>);
}
