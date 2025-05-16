import AppHeader from "./header/AppHeader.jsx";
import {Layout, Spin} from "antd";
import AppSider from "./sider/AppSider.jsx";
import AppContent from "./content/AppContent.jsx";
import {useContext, useState, useEffect} from "react";
import CryptoContext, {useCrypto} from "../../context/crypto-context.jsx";

export default function AppLayout() {
    const {isLoading, isMobile} = useCrypto();

    
    if (isLoading) {
        return <Spin fullscreen/>;
    }
    
    return (
        <Layout>
            <AppHeader />
            <Layout>
                {<AppSider />}
                <AppContent />
            </Layout>
        </Layout>
    )
}