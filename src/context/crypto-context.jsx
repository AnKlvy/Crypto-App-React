import {createContext, useState, useEffect, useContext} from "react";
import {fakeFetchCrypto, fetchAssets} from "../api.js";
import {percentDifference} from "../utils.js";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    isLoading: false,
    isMobile: false,
    addAsset: () => {},
});


export function CryptoContextProvider({children}) {
    const [isLoading, setIsLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

    function mapAssets(assets, result) {
        return assets.map(asset => {
            const coin = result.find((c) => c.id === asset.id);
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset,
            };
        })
    }

    useEffect(() => {
        async function preload() {
            setIsLoading(true);
            const {result} = await fakeFetchCrypto();
            const assets = await fetchAssets();
            setAssets(mapAssets(assets, result));
            setCrypto(result);
            setIsLoading(false);
        }

        preload();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 900);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function addAsset(newAsset) {
        setAssets((prev) => mapAssets([...prev, newAsset], crypto));

    }

    return (
        <CryptoContext.Provider value={{assets, crypto, isLoading, addAsset, isMobile}}>
            {children}
        </CryptoContext.Provider>
    );
}

export default CryptoContext;

export function useCrypto() {
    return useContext(CryptoContext);
}