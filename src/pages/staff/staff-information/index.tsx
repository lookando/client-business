
import { CommonHeader } from '@/components/SearchBar';
import Tree from '@/components/Tree';
import { Button, Form, Input, Table, } from 'antd';
import { DataNode } from 'antd/es/tree';
import { ColumnsType } from 'antd/lib/table';
import styles from './style.less'

interface DataType {
  id: string;
  name: string;
  account: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: '人员ID',
    dataIndex: 'id',
    key: 'id',
    align:'center'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    align:'center'
  },
  {
    title: 'OA账号',
    dataIndex: 'account',
    key: 'account',
    align:'center'
  },
  {
    title: '工号',
    dataIndex: 'account',
    key: 'account',
    align:'center'
  },
  {
    title: '部门',
    dataIndex: 'account',
    key: 'account',
    align:'center'
  },
  {
    title: '考勤地',
    dataIndex: 'account',
    key: 'account',
    align:'center'
  },
  {
    title: '考勤地名称',
    dataIndex: 'account',
    key: 'account',
    align:'center'
  },
  {
    title: '是否参与考勤',
    dataIndex: 'account',
    key: 'account',
    align:'center'
  },
  {
    title: '排班',
    dataIndex: 'account',
    key: 'account',
    align:'center'
  },
  {
    title: '考勤员',
    dataIndex: 'account',
    key: 'account',
    align:'center'
  },
  {
    title: '入职日期',
    dataIndex: 'account',
    key: 'account',
    align:'center'
  },
  {
    title: '岗位',
    dataIndex: 'account',
    key: 'account',
    align:'center'

  },
  {
    title: '在岗状态',
    dataIndex: 'account',
    key: 'account',
    align:'center'
  },
];

const data: DataType[] = [
  {
    id: '1',
    name: 'John Brown',
    account: 32,
  },
  {
    id: '2',
    name: 'Jim Green',
    account: 42,
  },
  {
    id: '3',
    name: 'Joe Black',
    account: 32,
  },
];

const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1677ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];
//搜索表单项
const searchItem = {
  departmentName: true,
  name: true,
  account: true,
};

const App: React.FC = () => {
  return <>
    <div className={styles.layout}>
      {/* 左侧部门树 */}
      <Tree setComponentIndex={undefined} treeData={treeData}></Tree>
      {/* 右侧 */}
      <div className={styles.right}>
        {/* 右侧搜索栏 */}
        <CommonHeader.Header  searchItem={searchItem}></CommonHeader.Header>
        {/* 右侧表格栏 */}
        <div className={styles.right_dowm}>
          <Table columns={columns} dataSource={data}  />
        </div>
      </div>
    </div>
  </>;
};
export default App;