/* eslint-disable */
import { APIUser } from '@/services/megrez/user';
import { Button, message, Modal, Space, Table, Tree, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import AuthorIzation from './components/authorization';
import UserHeader from './components/userHeader';
import styles from './less/user.less';
import { ReactComponent as PlusIcon } from '@/assets/icons/button/plus.svg';
import { ReactComponent as FreezeIcon } from '@/assets/icons/button/freeze.svg';
import { ReactComponent as UnfrozenIcon } from '@/assets/icons/button/unfrozen.svg';
import { ReactComponent as ResetIcon } from '@/assets/icons/button/reset.svg';
import { commonAPI } from '@/pages/common';
import debounce from 'lodash/debounce';
import { DataNode } from 'antd/es/tree';

interface DataType {
  key: React.Key;
  realName: string;
  username: string;
  branchId: string;
  status: number | string;
  operation: any;
  id: string;
}

const User: React.FC = () => {
  //md5
  const md5 = require('md5');

  const [treeData, setTreeData] = useState<any>([]);
  const [tbleData, setTableData] = useState([]);
  const [TableSomeData, setTableSomeData] = useState<any>({});
  const [authorIzationShow, setAuthorIzationShow] = useState(false);
  const [auth, setAuth] = useState([]);
  const [unAuth, setUnAuth] = useState([]);
  const [someAuth, setSomeAuth] = useState<any>({});
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState({ current: 1, pageSize: 15 });
  const [branchId, setBranchId] = useState('');
  const [closeAdd, setCloseAdd] = useState(false);
  const [selStatus, setSelStatus] = useState('');
  const [selType, setSelectType] = useState('');
  const [inpUser, setInpUser] = useState('');
  const [inpReal, setInpReal] = useState('');
  const [addModal, setaddModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>();
  const [username, setUsername] = useState('');
  const [searchParams, setSearchParams] = useState({});
  useEffect(() => {
    // 获取部门树
    setTreeData(commonAPI.requestDepartment());
    DidFetchList({
      current: 1,
      dto: {},
      pageSize: 15,
      sort: {},
    });
  }, []);
  const DidFetchList = (data: object) => {
    //获取用户列表 需自行传参
    APIUser.fetchList(data).then((res) => {
      setTotal(res.data.total);
      setTableData(res.data.data);
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: '用户编号',
      dataIndex: 'username',
      align: 'center',
      width: 250,
    },
    {
      title: '用户名称',
      dataIndex: 'realName',
      align: 'center',
    },
    {
      title: '所属组织',
      dataIndex: 'departmentName',
      align: 'center',
    },
    // {
    //   title: '用户类型',
    //   dataIndex: 'userType',
    //   render: (dom: string) => <span>{dom == 'SY' ? '系统用户' : dom == 'OA' ? '内部员工' : dom == 'OS' ? '外包商' : dom == 'ST' ? '外包员工' : ''}</span>,
    //   align: 'center',
    // },
    {
      title: '用户状态',
      dataIndex: 'status',
      render: (flag: number) => <span>{flag == 0 ? <Tag color="#FFE9EA" style={{ color: '#DE2930' }}>正常</Tag> : flag == 1 ? <Tag color="#F0F2F5" style={{ color: '#606266' }}>冻结</Tag> : <Tag color="#F0F2F5" style={{ color: '#606266' }}>注销</Tag>}</span>,
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      render: (_, record) => (
        <a
          style={{
            color: '#DE2930',
          }}
          onClick={() => {
            authorIzation(record);
            setUsername(record?.realName);
          }}
        >
          {!record.operation ? '授权' : ''}
        </a>
      ),
    },
  ];
  //用户查询
  const Finish = async (values: any) => {
    const body: any = {
      current: 1,
      dto: {
        realName: values.realName,
        status: values.status >= 0 ? values.status : '',
        username: values.username,
        userType: values.userType,
        department: branchId,
      },
      pageSize: 15,
      sort: {},
    };
    setSearchParams(body);
    const res = await APIUser.fetchList(body);
    setTotal(res.data.total);
    setTableData(res.data.data);
    setPages({ current: 1, pageSize: 15 });
    setTableSomeData({});
    setSelectedRow('');
  };
  //选中某项
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedRow(selectedRowKeys.length === 2 ? selectedRowKeys[1] : selectedRowKeys[0]);
      if (selectedRows.length < 1) {
        setTableSomeData({});
      }
    },
    onSelect: (selectedRows: any) => {
      setTableSomeData(selectedRows);
    },
  };

  //授权
  const authorIzation = async (record: any) => {
    setSomeAuth(record);
    const res: any = await APIUser.getAuthRoleList(record.id);
    setAuth(res?.data?.auth);
    setUnAuth(res?.data?.unauth);
    setAuthorIzationShow(true);
  };
  //授权确认
  const authorIzationOK = async (fval: any, aval: any) => {
    let roleIds: any = [];
    if (fval.length > 0) {
      fval.map((item: any) => {
        roleIds.push(item.id);
      });
    }
    const body: any = {
      id: someAuth.id,
      roleIds: roleIds,
    };
    const res = await APIUser.update(body);
    setAuthorIzationShow(false);
  };
  //授权取消
  const authorIzationCancel = () => {
    setAuthorIzationShow(false);
  };
  //创建用户
  const createUser = async (values: any) => {
    try {
      await APIUser.create(values);
      const res = await APIUser.fetchList({
        current: 1,
        pageSize: 15,
        dto: { status: selStatus },
        sort: {},
      });
      setTotal(res.data.total);
      setTableData(res.data.data);
      message.info('账号添加成功');
      setCloseAdd(true);
    } catch (err) {
      setCloseAdd(true);
      setaddModal(true);
    }
  };
  //修改密码
  const setPwd = async (values: any) => {
    if (!values.password1 || !values.password2) {
      return;
    }

    const body: any = {
      id: TableSomeData.id,
      password: md5(values.password1),
      checkPassword: md5(values.password2),
    };
    const res = await APIUser.updateResetPassword(body);
    if (res.success) {
      message.info('密码修改成功');
    }
  };
  //冻结或解冻
  const Freeze = async (values: any) => {
    if (values === '解冻') {
      await APIUser.updateThaw({
        id: TableSomeData.id,
        status: 0,
      });
    } else {
      await APIUser.updateFreeze({
        id: TableSomeData.id,
        status: 1,
      });
    }
    const data: any = {
      current: pages.current,
      pageSize: pages.pageSize,
      dto: {
        status: selStatus,
        userType: selType,
        realName: inpReal,
        username: inpUser,
        department: branchId,
      },
      sort: {},
    };
    const res = await APIUser.fetchList(data);
    setTableData(res.data.data);
    res.data.data.map((item: any) => {
      if (item.username === TableSomeData.username) {
        setTableSomeData(item);
      }
    });
  };
  //左侧树的点击
  const onSelect = async (selectedKeys: React.Key[], info: any) => {
    if (info.selectedNodes.length > 0) {
      setBranchId(info.node.id);
      let body = {};
      body = {
        current: 1,
        dto: {
          department: info.node.id,
          status: selStatus !== '' ? Number(selStatus) : '',
          userType: selType,
          realName: inpReal,
          username: inpUser,
        }
      };
      const res = await APIUser.fetchList(body);
      setTotal(res.data.total);
      setTableData(res.data.data);
      setPages({ current: 1, pageSize: 15 });
      setTableSomeData({});
      setSelectedRow('');
    } else {
      setBranchId('');
      let body = {};
      body = {
        current: 1,
        dto: {
          department: '',
          status: selStatus !== '' ? Number(selStatus) : '',
          userType: selType,
          realName: inpReal,
          username: inpUser,
        }
      };
      const res = await APIUser.fetchList(body);
      setTotal(res.data.total);
      setTableData(res.data.data);
      setPages({ current: 1, pageSize: 15 });
      setTableSomeData({});
      setSelectedRow('');
    }
  };

  //分页
  const onsetPage = async (page: number, pageSize: number) => {
    const body = {
      current: page,
      pageSize: pageSize,
      dto: {
        department: branchId,
        status: selStatus !== '' ? Number(selStatus) : '',
        realName: inpReal,
        username: inpUser,
        userType: selType,
      }
    };
    const res = await APIUser.fetchList(body);
    setTotal(res.data.total);
    setTableData(res.data.data);
    setTableSomeData({});
    setSelectedRow('');
  };
  //关闭创建弹窗的回调
  const onCloseAddMOdal = () => {
    setCloseAdd(false);
  };
  //改变状态
  const selectStatus = (value: string) => {
    setSelStatus(value);
  };
  //改变类型
  const selectType = (value: string) => {
    setSelectType(value);
  };
  //用户编号
  const inpUserName = (value: string) => {
    setInpUser(value);
  };
  //用户名称
  const inpRealName = (value: string) => {
    setInpReal(value);
  };
  //取消添加
  const addCancel = () => {
    setaddModal(false);
  };
  //重置
  const onReset = () => {
    DidFetchList({
      current: 1,
      dto: {},
      pageSize: 15,
      sort: {},
    });
    setPages({ current: 1, pageSize: 15 });
    setTableSomeData({});
    setSelectedRow('');
    setBranchId('');
  };

  //将头部space转到table中来
  const [dsab, setDsab] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [PwdmodalShow, setPwdModalShow] = useState(false);
  const [open, setOpen] = useState(true);

  //添加按钮
  const onAdd = () => {
    setIsModalOpen(true);
    onCloseAddMOdal();
  }
  //冻结按钮
  const onFreeze = () => {
    setModalTitle('冻结')
    setModalShow(true)
  }
  //解冻按钮
  const unFrozen = () => {
    setModalTitle('解冻')
    setModalShow(true)
  }
  //重置密码
  const onResetPwd = () => {
    setPwdModalShow(true)
  };
  return (
    <div className={styles.userBox}>
      <div className={styles.userLeft}>
        <Tree
          showLine
          onSelect={onSelect}
          defaultExpandedKeys={[]}
          treeData={treeData}
          fieldNames={{
            title: 'titleabbr',
            key: 'id',
            children: 'children',
          }}
        />
      </div>
      <div className={styles.userRight}>
        <div className={styles.rightTop}>
          <UserHeader
            onfinish={debounce(Finish, 500)}
            someData={TableSomeData}
            addSub={debounce(createUser, 500)}
            setPwd={setPwd}
            freeze={Freeze}
            depList={treeData}
            closeAdd={closeAdd}
            onCloseAdd={onCloseAddMOdal}
            selectStatus={selectStatus}
            selectType={selectType}
            inpUserName={inpUserName}
            inpRealName={inpRealName}
            onReset={debounce(onReset, 500)}
            setDsab={setDsab}
            modalShow={modalShow}
            setModalShow={setModalShow}
            modalTitle={modalTitle}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            PwdmodalShow={PwdmodalShow}
            setPwdModalShow={setPwdModalShow}
            open={open}
            setOpen={setOpen}
          ></UserHeader>
        </div>
        <div className={styles.rightBottom}>
          <Space className={styles.user_header_right}>
            <Button type="primary" size='middle' icon={<PlusIcon />} onClick={onAdd}
            >
              新增
            </Button>
            <Button type="default" size='middle' icon={<FreezeIcon />} onClick={onFreeze} disabled={dsab ? true : !open}
            >
              冻结
            </Button>
            <Button type="default" size='middle' icon={<UnfrozenIcon />} onClick={unFrozen} disabled={dsab ? true : open}
            >
              解冻
            </Button>
            <Button type="default" size='middle' icon={<ResetIcon />} onClick={onResetPwd} disabled={dsab}
            >
              重置密码
            </Button>
          </Space>
          <Table
            className={styles.userTable}
            size="middle"
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: [selectedRow],
              columnTitle: ' ', // 去掉全选
              ...rowSelection,
            }}
            scroll={{ y: '350px' }}
            columns={columns}
            dataSource={tbleData}
            rowKey={(record) => record.id}
            pagination={{
              total: total, //数据的总条数
              current: pages ? pages.current : 1,
              pageSize: pages ? pages.pageSize : 15,
              showSizeChanger: false,
              onChange: (page, pageSize) => {
                let data = { current: page, pageSize: pageSize };
                //保存当前页和条数
                setPages(data);
                //调用分页接口
                onsetPage(page, pageSize);
              },
              showTotal: (total) =>
                `第${pages.current === 1 ? 1 : (pages.current - 1) * pages.pageSize + 1}-${pages.current * pages.pageSize > total ? total : pages.current * pages.pageSize
                }条/共${total}条数据`,
            }}
          />
        </div>
        <Modal title={'新增错误'} open={addModal} onCancel={addCancel} width={410} footer={false}>
          <p>用户已存在,无法添加</p>
          <Space style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button
              type="primary"
              onClick={() => {
                setaddModal(false);
              }}
            >
              确认
            </Button>
          </Space>
        </Modal>
      </div>
      <AuthorIzation
        show={authorIzationShow}
        handleok={authorIzationOK}
        handlecancel={authorIzationCancel}
        auth={auth}
        unAuth={unAuth}
        username={username}
      ></AuthorIzation>
    </div>
  );
};

export default User;
