import styles from './index.less';
import { Table, Tag, Space,Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';


const dataSource = [
  {
    key: '1',
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, dignissimos?',
    tags: ["Lorem","ipsum","dolor"],
    author: "Lam",
    createdDate: "10/17/2021"
  },
  {
    key: '2',
    title: 'Ipsum dolor sit amet consectetur adipisicing elit. Nulla, dignissimos?',
    tags: ["Lorem","ipsum","dolor"],
    author: "Nhat",
    createdDate: "10/14/2021"
  },
  {
    key: '3',
    title: 'Ipsum dolor sit amet consectetur adipisicing elit. Nulla, dignissimos?',
    tags: ["Lorem","ipsum","dolor"],
    author: "Hoang",
    createdDate: "10/13/2021"
  }
];

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags:[]) => (
      <>
        {
          tags.map(tag => {
           return(
              <Tag key={tag}>
                {tag}
              </Tag>
           )
          })
        } 
      </>
    )
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: 'Created Date',
    dataIndex: 'createdDate',
    key: 'created date'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: () => (
      <Space>
          <a>
            Edit
          </a>
          <a>
            Delete
          </a>
      </Space>
    )
  }
];

const pageHeader = {extra: [<Button key="1">Create New Article</Button>]}

export default function KnowledgeBasePage() {
  return (
    <PageContainer header={pageHeader}>
      <Table dataSource={dataSource} columns={columns} />
    </PageContainer>
  );
}
