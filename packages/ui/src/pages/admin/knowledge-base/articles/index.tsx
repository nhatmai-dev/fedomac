import styles from './index.less';
import { Table, Tag, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];



export default function KnowledgeBasePage() {
  return (
    <PageContainer>
      <Table dataSource={dataSource} columns={columns} />
    </PageContainer>
  );
}
