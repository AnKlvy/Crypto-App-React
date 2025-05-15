import {Button, Drawer, Layout, Modal, Select, Space} from 'antd';
import {useCrypto} from "../../../context/crypto-context.jsx";
import {useEffect, useRef, useState} from "react";
import CryptoInfoModal from "./CryptoInfoModal.jsx";
import AddAssetForm from "./AddAssetForm.jsx";

import styles from "./AppHeader.module.css";

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
    const [drawer, setDrawer] = useState(false);
    const selectRef = useRef(null);
    let selectInput = document.querySelector('.ant-select-selector input');
    useEffect(() => {
        const handleKeydown = (event) => {
            if (event.code === 'Slash') {
                setSelect((prev) => {
                    const next = !prev;
                    if (next) {
                        setTimeout(() => {
                            const input = document.querySelector('.ant-select-selector input');
                            input?.focus();
                        }, 0);
                    }
                    else {
                        // При закрытии через / убираем фокус
                        selectInput?.blur();
                    }
                    return next;
                });
            } else if (event.key === 'ESC') {
                setSelect(false);
            }
        };

        const handleClickOutside = (event) => {
            const selectElement = document.querySelector('.ant-select-dropdown');
            const selectInput = document.querySelector('.ant-select-selector');

            if (selectElement && !selectElement.contains(event.target) &&
                selectInput && !selectInput.contains(event.target)) {
                setSelect(false);
            }
        };

        document.addEventListener('keydown', handleKeydown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function handleSelect(value) {
        setCoin(crypto.find(c => c.id === value));
        setModal(true);
    }

    function handleSelectClick() {
        setSelect((prev) => {
            const next = !prev;
            if (!next) {
                // При закрытии убираем фокус
                setTimeout(() => {
                    const input = document.querySelector('.ant-select-selector input');
                    input?.blur();
                }, 0);
            }
            return next;
        });
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                ref={selectRef}
                style={{width: 250}}
                className={`${styles.custom_select} ${select ? styles.select_open : ''}`}
                popupClassName={'bg-antd-elements'}
                optionLabelProp="label"
                value="press / to open"
                open={select}
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                onSelect={handleSelect}
                onClick={handleSelectClick}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/>
                        {option.data.label}
                    </Space>
                )}/>
            <Button type="primary" onClick={() => setDrawer(true)}>Add asset</Button>
            <Modal open={modal} onCancel={() => {
                setModal(false);
                selectInput = document.querySelector('.ant-select-selector input');
                selectInput?.blur()
            }} footer={null}>
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