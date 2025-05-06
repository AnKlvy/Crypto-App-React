import {useState} from "react";
import {Flex, Typography, Select, Space, Divider, Form, Button, InputNumber, DatePicker, Result} from "antd";
import {useCrypto} from "../context/crypto-context.jsx";
import CoinInfo from "./CoinInfo.jsx";

export default function AddAssetForm({onClose}) {
    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = useState(null)
    const [form] = Form.useForm()
    const [submitted, setSubmitted] = useState(false)

    function onFinish(values) {
        console.log('finish:', values);
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date() ,
        }
        addAsset(newAsset)
        setSubmitted(true)
    }

    function handleAmountChange(value){
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2),
        })
    }

    function handlePriceChange(value){
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2),
        })
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not valid number!',
        },
        number: {
            range: '${label} must be between ${min}-${max}!'
        }
    }

    if(submitted){
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${form.getFieldValue('amount')} of ${coin.name} by price ${form.getFieldValue('price')}`}
                extra={[
                    <Button type="primary" key="close" onClick={onClose}>
                        Close
                    </Button>,
                ]}
            />
        )
    }

    if (!coin) {
        return (
            <Select
                style={{width: "100%"}}
                placeholder="Select a coin"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                onSelect={(v) => setCoin(crypto.find(coin => coin.id === v))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon} alt={option.data.label}/>
                        {option.data.label}
                    </Space>
                )}/>
        )
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{span: 4}}
            wrapperCol={{span: 10}}
            style={{maxWidth: 600}}
            initialValues={{price: +(coin.price.toFixed(2))}}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <CoinInfo coin={coin}/>
            <Divider/>
            <Form.Item
                label="Amount"
                name="amount"
                rules={[{
                    required: true,
                    type: 'number',
                    min: 0,
                }]}
            >
                <InputNumber
                    placeholder={'Enter coin amount'}
                    style={{width: '100%'}}
                    onChange={handleAmountChange}
                />
            </Form.Item>

            <Form.Item
                label="Price"
                name="price"
                type="number"
            >
                <InputNumber
                    onChange={handlePriceChange}
                    style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item
                label="Date & Time"
                name="date"
            >
                <DatePicker showTime/>
            </Form.Item>

            <Form.Item
                label="Total"
                name="total"
                type="number"
            >
                <InputNumber
                    disabled
                    style={{width: '100%'}}/>
            </Form.Item>

            <Form.Item>
                <Button type="primary"
                        htmlType="submit">
                    Add Asset
                </Button>
            </Form.Item>
        </Form>
    )
}