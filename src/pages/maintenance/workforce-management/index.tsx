import DepartmentTree from '@/components/DepartmenTree';
import { Button, Form, Input, Space, Table, } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from './style.less'

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



const App: React.FC = () => {
  return <>
    <div className={style.layout}>
      <div className={style.right}>
        {/* 下侧表格栏 */}
        <div className={style.right_dowm}>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </div>
  </>;
};
export default App;