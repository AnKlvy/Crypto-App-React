import {Table} from "antd";
import {useCrypto} from "../../../context/crypto-context.jsx";


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Price, $',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        defaultSortOrder: 'descend',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        sorter: (a, b) => a.price - b.price,
        defaultSortOrder: 'descend',
    },
];

export default function AssetsTable() {
    const {assets} = useCrypto()

    const data = assets.map((a)=>({
        key: a.id,
        name: a.name,
        price: a.price,
        amount: a.amount,
    }))
    return (
        <Table pagination={false} dataSource={data} columns={columns} />
)
}