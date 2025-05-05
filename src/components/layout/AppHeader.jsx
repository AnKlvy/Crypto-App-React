import {Button, Drawer, Layout, Modal, Select, Space} from 'antd';
import {useCrypto} from "../../context/crypto-context.jsx";
import {useEffect, useState} from "react";
import CryptoInfoModal from "../CryptoInfoModal.jsx";
import AddAssetForm from "../AddAssetForm.jsx";

const headerStyle = {
    textAlign: 'center',
    width: '100%',
    color: '#fff',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export default function AppHeader() {
    const {crypto} = useCrypto();
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false);
    const [coin, setCoin] = useState(null);
    const [drawer, setDrawer] = useState(true);
    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setSelect((prev) => !prev);
            }
        };
        document.addEventListener('keypress', keypress);
        return () => document.removeEventListener('keypress', keypress);
    }, []);

    function handleSelect(value) {
        setCoin(crypto.find(c => c.id === value));
        setModal(true);
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{width: 250}}
                optionLabelProp="label"
                value="press / to open"
                open={select}
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/>
                        {option.data.label}
                    </Space>
                )}/>
            <Button type="primary" onClick={()=> setDrawer(true)}>Add asset</Button>
            <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
                <CryptoInfoModal coin={coin}/>
            </Modal>
            <Drawer
                width={600}
                title='Add Asset'
                open={drawer}
                onClose={() => setDrawer(false)}
                destroyOnClose>
                <AddAssetForm
                    onClose={() => setDrawer(false)}
                />
            </Drawer>
        </Layout.Header>
    )
}