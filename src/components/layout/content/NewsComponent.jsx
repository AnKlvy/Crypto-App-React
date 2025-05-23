import {Card, Typography, List, Tag} from 'antd';
import styles from './NewsComponent.module.css';
import MyTag from "../../shared/MyTag/MyTag.jsx";

const {Title, Text} = Typography;

// Sample news data - would be fetched from API in production
const newsItems = [
    {
        id: 1,
        title: 'Bitcoin Surges Past $45,000',
        date: '2 hours ago',
        source: 'CryptoNews'
    },
    {
        id: 2,
        title: 'Ethereum Upgrade Scheduled Next Month',
        date: '5 hours ago',
        source: 'BlockchainToday'
    },
    {
        id: 3,
        title: 'New Regulations Impact Crypto Markets',
        date: '1 day ago',
        source: 'CoinDesk'
    }
];

export default function NewsComponent() {
    return (
        <div className={styles.newsContainer}>
            <MyTag style={{marginTop: '-0.1rem'}}>Latest Crypto News</MyTag>
            <Card className={styles.newsCard}>
                <List
                    itemLayout="horizontal"
                    dataSource={newsItems}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.title}
                                description={
                                    <Text type="secondary">
                                        {item.date} • {item.source}
                                    </Text>
                                }
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
}