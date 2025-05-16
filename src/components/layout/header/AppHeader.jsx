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
    
    // Функция для удаления фокуса со всех элементов
    const clearAllFocus = () => {
        // Убираем фокус с селекта
        if (selectRef.current) {
            selectRef.current.blur();
        }
        
        // Убираем фокус с инпута селекта
        const selectInput = document.querySelector('.ant-select-selector input');
        if (selectInput) {
            selectInput.blur();
        }
        
        // Убираем фокус с активного элемента
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
        
        // Дополнительно можно попробовать установить фокус на body и затем убрать его
        document.body.focus();
        document.body.blur();
    };

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
                        clearAllFocus();
                    }
                    return next;
                });
            } else if (event.key === 'Escape') {
                setSelect(false);
                clearAllFocus();
            }
        };

        const handleClickOutside = (event) => {
            const selectElement = document.querySelector('.ant-select-dropdown');
            const selectInput = document.querySelector('.ant-select-selector');

            if (selectElement && !selectElement.contains(event.target) &&
                selectInput && !selectInput.contains(event.target)) {
                setSelect(false);
                clearAllFocus();
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
        setSelect(false);
        clearAllFocus();
    }

    function handleSelectClick() {
        setSelect((prev) => {
            const next = !prev;
            if (!next) {
                clearAllFocus();
            }
            return next;
        });
    }

    // Обработчик закрытия модального окна
    useEffect(() => {
        const handleModalEscape = (event) => {
            if (event.key === 'Escape' && modal) {
                setModal(false);
                clearAllFocus();
            }
        };

        document.addEventListener('keydown', handleModalEscape);
        
        return () => {
            document.removeEventListener('keydown', handleModalEscape);
        };
    }, [modal]);

    return (
        <Layout.Header style={headerStyle}>
            <Select
                ref={selectRef}
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
            <Modal 
                open={modal} 
                onCancel={() => {
                    setModal(false);
                    clearAllFocus();
                }} 
                afterClose={clearAllFocus}
                footer={null}
            >
                <CryptoInfoModal coin={coin}/>
            </Modal>
            <Drawer
                width={600}
                title='Add Asset'
                open={drawer}
                onClose={() => {
                    setDrawer(false);
                    clearAllFocus();
                }}
                afterVisibleChange={(visible) => {
                    if (!visible) {
                        clearAllFocus();
                    }
                }}
                destroyOnClose
            >
                <AddAssetForm
                    onClose={() => {
                        setDrawer(false);
                        clearAllFocus();
                    }}
                />
            </Drawer>
        </Layout.Header>
    )
}