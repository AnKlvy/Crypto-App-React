import AppHeader from "./header/AppHeader.jsx";
import {Layout, Spin} from "antd";
import AppSider from "./sider/AppSider.jsx";
import AppContent from "./content/AppContent.jsx";
import {useContext, useState, useEffect} from "react";
import CryptoContext from "../../context/crypto-context.jsx";

export default function AppLayout() {
    const {loading} = useContext(CryptoContext);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
    
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    if (loading) {
        return <Spin fullscreen/>;
    }
    
    return (
        <Layout>
            <AppHeader />
            <Layout>
                {!isMobile && <AppSider />}
                <AppContent />
            </Layout>
        </Layout>
    )
}