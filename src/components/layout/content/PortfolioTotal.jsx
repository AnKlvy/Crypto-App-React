import styles from "./AppContent.module.css";
import {useCrypto} from "../../../context/crypto-context.jsx";


export default function PortfolioTotal() {
    const {assets, crypto} = useCrypto()

    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price
        return acc
    }, {})

    const totalPortfolio = assets
        .map((asset) => asset.amount * cryptoPriceMap[asset.id])
        .reduce((acc, v) => (acc += v), 0)
        .toFixed(2);

    return (
        <h2 className={styles.contentTitle}>
            <span>Portfolio:&nbsp;</span><span>{totalPortfolio}$</span>
        </h2>
    )
}
