import DepartmentTree from '@/components/DepartmenTree';
import { Button, Col, Form, Input, Row, Table, } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import style from './style.less'

interface DataType {
  id: string;
  name: string;
  account: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center'
  },
  {
    title: '日期',
    dataIndex: 'data',
    key: 'data',
    align: 'center'
  },
  {
    title: '人员姓名',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '人员账号',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '部门',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '上班打卡时间',
    dataIndex: 'time',
    key: 'time',
    align: 'center'
  },
  {
    title: '下班打卡时间',
    dataIndex: 'time',
    key: 'time',
    align: 'center'
  },
  {
    title: '考勤状态',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '上班应打卡时间',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '下班应打卡时间',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '工作时长（小时）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '迟到时长（分钟）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'

  },
  {
    title: '早退时长（分钟）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '旷工时长（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '加班（小时）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '事假（小时）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '年休假（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '育儿假（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '病假（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '产假（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '出差（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '外出报备（小时）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '哺乳假（小时）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '看护假（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '婚假（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '调休（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '工伤假（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '公司特殊奖励假（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '特殊岗位强制假（天）',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
  },
  {
    title: '更新时间',
    dataIndex: 'account',
    key: 'account',
    align: 'center'
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
      {/* 左侧部门树 */}
      <div className={style.left}>
        <DepartmentTree></DepartmentTree>
      </div>
      {/* 右侧 */}
      <div className={style.right}>
        {/* 右侧搜索栏 */}
        <div className={style.right_top}>
          <Form
            layout={'inline'}
            style={{ width: '100%', padding: '20px' }}
          >
            <Row>
              <Col span={5} offset={1} style={{ display: 'flex', justifyContent: 'end' }}>
                <Form.Item
                  label="日期"
                  name="data"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input  />
                </Form.Item>
              </Col>
              <Col span={5} offset={1} style={{ display: 'flex', justifyContent: 'end' }}>
                <Form.Item
                  label="部门"
                  name="department"
                  rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={5} offset={1} style={{ display: 'flex', justifyContent: 'end' }}>
                <Form.Item
                  label="姓名"
                  name="name"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={5} offset={1} style={{ display: 'flex', justifyContent: 'end' }}>
                <Form.Item
                  label="账号"
                  name="account"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={6} style={{ display: 'flex', justifyContent: 'end' }}>
                <Form.Item
                  label="考勤类型"
                  name="type"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6} offset={12} style={{ display: 'flex', justifyContent: 'end' }}>
                <Form.Item >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Col>

            </Row>




          </Form>
        </div>
        {/* 右侧表格栏 */}
        <div className={style.right_dowm} >
          <Table columns={columns} dataSource={data}  scroll={{ x: 4000 }} />
        </div>
      </div>
    </div>
  </>;
};
export default App;