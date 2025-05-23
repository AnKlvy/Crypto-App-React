import {Card, Layout, Statistic, List, Typography, Tag, Divider} from "antd";
import {ArrowUpOutlined, ArrowDownOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {capitalize} from "../../../utils.js";
import CryptoContext from "../../../context/crypto-context.jsx";
import styles from './AppSider.module.css';
import MyTag from "../../shared/MyTag/MyTag.jsx";


const siderStyle = {
    padding: "1rem",
    marginBottom:0,
    minHeight: "calc(100vh - 60px)",
};

export default function AppSider() {
    const {assets} = useContext(CryptoContext)

    return (
        <Layout.Sider
            width="25%"
            style={siderStyle}
            className={styles.siderHide}
            breakpoint="lg"
            collapsedWidth={0}
            trigger={null}
        >
            <MyTag style={{color: "#00a568", backgroundColor: "#e8fff2", borderColor: "#69ffa5"}}>History</MyTag>
            <div className={styles.scrollBox}>
                {assets.map((asset) => (
                    <Card key={asset.id} style={{
                        marginBottom: "1rem",
                        userSelect: "none",
                        cursor: "default",
                    }}
                          className={`bg-antd-elements ${styles.card}`}
                    >
                        <Statistic
                            title={capitalize(asset.name)}
                            value={asset.totalAmount}
                            precision={2}
                            valueStyle={{color: asset.grow ? "#5da41e" : "#f73b4a"}}
                            prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                            suffix="$"
                        />
                        <List
                            size="small"
                            dataSource={[{
                                title: 'Total Profit', value: asset.totalProfit, withTag: true
                            }, {title: 'Asset Amount', value: asset.amount, isPlain: true},]}
                            renderItem={(item) => (<List.Item>
                                <span>{item.title}</span>
                                <span>
                        {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                                    {item.isPlain && item.value}
                                    {!item.isPlain && (
                                        <Typography.Text type={asset.grow ? "success" : "danger"}>
                                            {item.value.toFixed(2)}$
                                        </Typography.Text>)}
                                </span>
                            </List.Item>)}
                        />
                    </Card>
                ))}
            </div>
        </Layout.Sider>);
}
