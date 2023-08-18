import DepartmentTree from '@/components/DepartmenTree';
import { Button, Form, Input, Space, Table, Tabs, TabsProps, } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from './style.less'


const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `考勤地维护`,
    children: `Content of Tab Pane 1`,
  },
  {
    key: '2',
    label: `考勤员维护`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `排班信息维护`,
    children: `Content of Tab Pane 3`,
  },
];


const App: React.FC = () => {
  return <>
    <div className={style.layout}>
      {/* 左侧部门树 */}
      <div className={style.left}>
        <DepartmentTree></DepartmentTree>
      </div>
      {/* 右侧 */}
      <div className={style.right}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  </>;
};
export default App;