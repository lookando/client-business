/* eslint-disable */
import { APIUser } from '@/services/digital/user';
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
import { history } from 'umi';

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
    depTree()
    DidFetchList({
      current: 1,
      pageSize: 15,
    });
  }, []);
  const depTree = async () => {
    //获取部门树
    const res = await APIUser.fetchDepTree()
    setTreeData(res.data);
    console.log(res.data);

  }
  const DidFetchList = async (data: object) => {
    //获取用户列表 需自行传参
    const res = await APIUser.fetchList(data)
    setTotal(res.data.total);
    setTableData(res.data.data);

  };

  const columns: ColumnsType<DataType> = [
    {
      title: '用户编号',
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: '用户名称',
      dataIndex: 'realName',
      align: 'center',
    },
    {
      title: '所属组织',
      dataIndex: 'deptName',
      align: 'center',
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      render: (flag: number) => <span>{flag == 0 ? <Tag color="#FCEBEC" style={{ color: '#DC3A40' }}>正常</Tag> : flag == 1 ? <Tag color="#F2F2F2" style={{ color: '#333333' }}>冻结</Tag> : <Tag color="#F2F2F2" style={{ color: '#333333' }}>注销</Tag>}</span>,
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      render: (_, record) =>
        <>
          {
            commonAPI.btnAuthority('/auth/user/updateUserRole') ?
              <a
                onClick={() => {
                  authorIzation(record);
                  setUsername(record?.realName);
                }}
              >
                {record.status === 0 ? '授权' : ''}
              </a> : <></>
          }
        </>
    },
  ];
  //用户查询
  const Finish = async (values: any) => {
    const body: any = {
      current: 1,
      realName: values.realName,
      status: values.status >= 0 ? values.status : '',
      username: values.username,
      deptId: branchId,
      pageSize: 15,
    };
    setSearchParams(body);
    await DidFetchList(body)
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
    const res: any = await APIUser.getAuthRoleList({ appId: 'compass_auth', userId: record.id });
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
      appId: 'compass_auth',
      userId: someAuth.id,
      roleIds: roleIds,
    };
    const res = await APIUser.updateRole(body);
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
        status: selStatus,
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
      await APIUser.updateStatus({
        id: TableSomeData.id,
        status: 0,
      });
    } else {
      await APIUser.updateStatus({
        id: TableSomeData.id,
        status: 1,
      });
    }
    const data: any = {
      current: pages.current,
      pageSize: pages.pageSize,
      status: selStatus,
      realName: inpReal,
      username: inpUser,
      deptId: branchId,
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
        deptId: info.node.id,
        status: selStatus !== '' ? Number(selStatus) : '',
        realName: inpReal,
        username: inpUser,
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
        deptId: '',
        status: selStatus !== '' ? Number(selStatus) : '',
        realName: inpReal,
        username: inpUser,
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
      deptId: branchId,
      status: selStatus !== '' ? Number(selStatus) : '',
      realName: inpReal,
      username: inpUser,
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
      pageSize: 15,
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
        {/* <Tree
          treeData={treeData}
        
        /> */}

        <Tree
          showLine
          onSelect={onSelect}
          defaultExpandedKeys={[]}
          treeData={treeData}
          fieldNames={{
            title: 'titleAbbr',
            key: 'id',
            children: 'children',
          }}
        // style={{
        //   paddingLeft: '10px',
        //   // background: '#F7F9FF',
        //   overflowY: 'scroll',
        //   height: '773px',
        //   width: '300px',
        // }}
        />
      </div>
      <div className={styles.userRight}>
        <div className={styles.rightTop}>
          <UserHeader
            onfinish={Finish}
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
            onReset={onReset}
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
              style={commonAPI.btnAuthority('/auth/user/save') ? {} : { visibility: 'hidden' }}>
              新增
            </Button>
            <Button type="default" size='middle' icon={<FreezeIcon />} onClick={onFreeze} disabled={dsab ? true : !open}
              style={commonAPI.btnAuthority('/auth/user/status/update') ? {} : { visibility: 'hidden' }} >
              冻结
            </Button>
            <Button type="default" size='middle' icon={<UnfrozenIcon />} onClick={unFrozen} disabled={dsab ? true : open}
              style={commonAPI.btnAuthority('/auth/user/status/update') ? {} : { visibility: 'hidden' }} >
              解冻
            </Button>
            <Button type="default" size='middle' icon={<ResetIcon />} onClick={onResetPwd} disabled={dsab}
              style={commonAPI.btnAuthority('/auth/user/password/update') ? {} : { visibility: 'hidden' }} >
              重置密码
            </Button>
          </Space>
          <div className='primaryTitle' style={{ position: 'absolute', zIndex: '999', margin: '-26px 0 0 20px' }}>用户管理</div>
          <Table
            className={styles.userTable}
            size="middle"
            rowSelection={{
              type: 'checkbox',
              selectedRowKeys: [selectedRow],
              columnTitle: ' ', // 去掉全选
              ...rowSelection,
            }}
            scroll={{ y: '50vh' }}
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
