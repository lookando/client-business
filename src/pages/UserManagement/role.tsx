/**
 * 用户管理-角色管理
 */
import React, { useRef, useEffect, useState } from 'react';
import { Form, Button, Space, Modal, Input } from 'antd';
import { ProTable, ActionType, ProColumns, ProFormText, } from '@ant-design/pro-components';
import _ from 'lodash';
import { APIRole } from '@/services/megrez/role';
// import RoleAuthorlzation from './components/roleAuthorization';
// import RoleDataAuthorlzation from './components/roleDataAuthorization';
import styles from './less/role.less';
import CardModal from './components/cardModal';
import Icon from '@ant-design/icons';
import { ReactComponent as WarningIcon } from '@/assets/icons/modal/warning.svg';
import { ReactComponent as ModifyIcon } from '@/assets/icons/modal/modify.svg';
import { ReactComponent as CreateIcon } from '@/assets/icons/modal/create.svg';
import { ReactComponent as PlusIcon } from '@/assets/icons/button/plus.svg';
import { ReactComponent as DeleteIcon } from '@/assets/icons/button/delete.svg';
import debounce from 'lodash/debounce';

const Role: React.FC = () => {
    const [form] = Form.useForm();
    const actionRef = useRef<ActionType>();
    const [searchForm] = Form.useForm();
    const [delShow, setDelShow] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [record, setRecord] = useState<any>({});
    const [errorModal, setErrorModal] = useState(false);
    // const [authorIzationShow, setAuthorIzationShow] = useState(false);
    const [treeData, setTreeData] = useState([]);
    const [selectData, setSelectData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesize, setPagesize] = useState(15);
    const [searchName, setSearchName] = useState('');
    const [searchBrief, setSearchBrief] = useState('');
    const [selectedRow, setSelectedRow] = useState<any>();
    const [needRequst, setNeedRequst] = useState(true);

    //数据权限
    const [dataList, setDataList] = useState([]);
    const [selectDataVal, setSelectDataVal]: any = useState([]);
    useEffect(() => {
        APIRole.fetchAllMenuTree().then((res) => {
            setTreeData(res.data.menu);
            setDataList(res.data.data);
        });
    }, [])

    //卡片菜单
    const [cardModal, setCardModal] = useState(false);
    const authorIzation = async (values: any) => {
        const body: any = [values.id];
        const { data } = await APIRole.fetchMenuTree(body);
        setSelectData(data);
        setSelectDataVal([data?.data?.id]);
        setCardModal(true);
    };
    const [requestId, setRequestId] = useState('');

    interface reqType {
        dto: {
            brief: string,
            id: string,
            name: string,
        },
        current: number,
        pageSize: number,
        sort: {},
    }
    const req: reqType = {
        dto: {
            brief: '',
            id: '',
            name: '',
        },
        current: 1,
        pageSize: 15,
        sort: {},
    }
    //<API.CompanyItem>
    const columns: ProColumns[] = [
        {
            title: '角色编号',
            dataIndex: 'name',
            align: 'center'
        },
        {
            title: '角色名称',
            dataIndex: 'brief',
            align: 'center'
        },
        {
            title: '操作',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <a onClick={() => {
                        authorIzation(record);
                        setRecord(record);
                        setRequestId(record.id);
                    }}
                        style={{ paddingRight: '7px', color: '#DE2930', borderRight: '1px solid #E9E9E9' }}
                    >
                        权限分配
                    </a>
                    <a style={{ color: '#DE2930' }} onClick={() => {
                        setModalOpen(true);
                        setModalTitle('修改');
                        setRecord(record);
                        form.setFieldsValue(record)
                    }}>
                        修改
                    </a>
                    {/* : <span>-</span>} */}
                </Space>
            ),
        },
    ];

    //确认删除
    const onDelete = async () => {
        try {
            await APIRole.deleteRole({ id: record.id });
            actionRef.current?.reload();
            setDelShow(true);
            setModalShow(false);
            setSelectedRow('');
        } catch (err) {
            setModalShow(false);
            setErrorModal(true);
        }
    }
    //关闭弹窗
    const handleCancel = () => {
        setModalShow(false);
        setModalOpen(false);
        setErrorModal(false);
        form.resetFields();
    };
    //添加
    const onAddFinish = async (values: any) => {
        if (modalTitle === '新增') {
            try {
                const res = await APIRole.create(values);
                if (res.success) {
                    setModalOpen(false);
                    actionRef?.current?.reload();
                    form.resetFields();
                }
            } catch (err) {
                setModalOpen(false);
                setErrorModal(true)
                form.resetFields();
            }
        } else if (modalTitle === '修改') {
            const res = await APIRole.setRoleName({ name: values.name, brief: values.brief, id: record.id })
            if (res.success) {
                setModalOpen(false);
                form.resetFields();
                actionRef?.current?.reload();
            }
        }
    };
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className={styles.searchBar}>
                <Form
                    style={{ border: 'none' }}
                    layout="inline"
                    form={searchForm}
                    initialValues={{}}
                >
                    <div className={styles.searchWrap}>
                        <ProFormText name="name" label="角色编号" colon={false} placeholder={'请输入'} width={250} fieldProps={{ autoComplete: 'off' }} />
                        <ProFormText name="brief" label="角色名称" colon={false} placeholder={'请输入'} width={250} fieldProps={{ autoComplete: 'off' }} />
                    </div>
                    <div className={styles.searchBtnWrapRole}>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" size="middle" onClick={() => {
                                    const FromData = searchForm.getFieldsValue();
                                    setSearchName(FromData.name);
                                    setSearchBrief(FromData.brief);
                                    setPagesize(15);
                                    setCurrentPage(1);
                                    if (needRequst) {
                                        actionRef?.current?.reload();
                                    } else {
                                        setNeedRequst(true);
                                    }
                                }}> 查询 </Button>
                                <Button onClick={() => {
                                    searchForm.resetFields();
                                    setSearchName('');
                                    setSearchBrief('');
                                    setPagesize(15);
                                    setCurrentPage(1);
                                    if (needRequst) {
                                        actionRef?.current?.reload();
                                    } else {
                                        setNeedRequst(true);
                                    }

                                }}>重置</Button>
                            </Space>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <ProTable<API.PageParams>
                className={styles.roleTable}
                revalidateOnFocus={false}
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: [selectedRow],
                    columnTitle: ' ', // 去掉全选
                    onChange: (selectedRowKeys, selectedRows) => {
                        setSelectedRow(selectedRowKeys.length === 2 ? selectedRowKeys[1] : selectedRowKeys[0]);
                        if (selectedRows.length < 1) {
                            setDelShow(true);
                        }
                    },
                    onSelect: (selectedRows: any) => {
                        setRecord(selectedRows)
                        setDelShow(false)
                    },
                }}
                // headerTitle={
                //     <Form
                //         style={{ border: 'none' }}
                //         layout="inline"
                //         form={searchForm}
                //         initialValues={{}}
                //     >
                //         <ProFormText name="name" label="角色编号" placeholder={'请输入'} width={120} fieldProps={{ autoComplete: 'off' }} />
                //         <ProFormText name="brief" label="角色名称" placeholder={'请输入'} width={120} fieldProps={{ autoComplete: 'off' }} />
                //         <Form.Item>
                //             <Space>
                //                 <Button type="primary" htmlType="submit" size="middle" onClick={() => {
                //                     const FromData = searchForm.getFieldsValue();
                //                     setSearchName(FromData.name);
                //                     setSearchBrief(FromData.brief);
                //                     setPagesize(15);
                //                     setCurrentPage(1);
                //                     if (needRequst) {
                //                         actionRef?.current?.reload();
                //                     } else {
                //                         setNeedRequst(true);
                //                     }
                //                 }}> 查询 </Button>
                //                 <Button onClick={() => {
                //                     searchForm.resetFields();
                //                     setSearchName('');
                //                     setSearchBrief('');
                //                     setPagesize(15);
                //                     setCurrentPage(1);
                //                     if (needRequst) {
                //                         actionRef?.current?.reload();
                //                     } else {
                //                         setNeedRequst(true);
                //                     }

                //                 }}>重置</Button>
                //             </Space>
                //         </Form.Item>
                //     </Form>
                // }
                toolBarRender={() => [
                    <Button size="middle" type="primary" icon={<PlusIcon />}
                        // style={commonAPI.btnNone('新增', btnMenu) ? {} : { display: 'none' }}
                        onClick={() => {
                            setModalOpen(true);
                            setModalTitle('新增');
                        }}
                    > 新增 </Button>,
                    <Button size="middle" type="default" icon={<DeleteIcon />}
                        // style={commonAPI.btnNone('删除', btnMenu) ? {} : { display: 'none' }}
                        onClick={() => {
                            setModalShow(true);
                            setModalTitle('删除');
                        }}
                        disabled={delShow}
                    >删除 </Button>
                ]}
                scroll={{ y: "67vh" }}
                size="middle"
                bordered={false}
                actionRef={actionRef}
                tableAlertOptionRender={false}
                tableAlertRender={false}
                rowKey="id"
                search={false}
                options={false}
                params={req}
                debounceTime={500}
                request={async (params: any) => {
                    params.dto.brief = searchBrief;
                    params.dto.name = searchName;
                    params.current = currentPage;
                    params.pageSize = pagesize;
                    const res = await APIRole.fetchList(params)
                    return res.data;
                }}
                columns={columns}
                pagination={{
                    pageSize: pagesize,
                    current: currentPage,
                    showSizeChanger: false,
                }}
                onChange={(pagination: any) => {
                    setPagesize(pagination.pageSize);
                    setCurrentPage(pagination.current);
                    setSelectedRow('');
                    setDelShow(true);
                    setNeedRequst(false);
                }}
            />
            <Modal title={
                <div style={{ marginBottom: '30px' }}>
                    <Icon component={modalTitle === '新增' ? CreateIcon : ModifyIcon} style={{ fontSize: '22px' }} />
                    <span style={{ marginLeft: '7px', fontSize: '22px', color: '#303133' }}>{modalTitle}</span>
                </div>
            } open={modalOpen} onCancel={handleCancel} width={450} footer={false} centered={true}>
                <Form name="basic" onFinish={debounce(onAddFinish, 500)} autoComplete="off" colon={false} form={form}>
                    <Form.Item label="角色编号" colon={false} name="name" rules={[{ required: true }]}>
                        <Input placeholder="请输入" disabled={modalTitle === '新增' ? false : true} />
                    </Form.Item>
                    <Form.Item label="角色名称" colon={false} name="brief" rules={[{ required: true }]}>
                        <Input placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '0', marginTop: '30px' }} >
                        <Space>
                            <Button onClick={handleCancel}>取消</Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title={
                    <div style={{ marginBottom: '30px' }}>
                        <Icon component={WarningIcon} style={{ fontSize: '22px' }} />
                        <span style={{ marginLeft: '7px', fontSize: '22px', color: '#303133' }}>{modalTitle === '新增' ? '新增错误' : record['name']} </span>
                    </div>
                }
                open={errorModal}
                onCancel={handleCancel}
                width={410}
                footer={false}
                centered={true}
            >
                <div style={{
                    color: '#606266',
                    fontSize: '18px',
                    marginTop: '42px',
                    marginBottom: '29px',
                }}>{modalTitle === '新增' ? '角色已存在,无法添加！' : '该角色有分配用户使用，无法删除！'}
                </div>
                <Form.Item style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '0', marginTop: '30px' }}>
                    <Space>
                        <Button type="primary" onClick={() => { setErrorModal(false) }}>
                            确认
                        </Button>
                    </Space>
                </Form.Item>
            </Modal>
            <Modal
                title={
                    <div style={{ marginBottom: '30px' }}>
                        <Icon component={WarningIcon} style={{ fontSize: '22px' }} />
                        <span style={{ marginLeft: '7px', fontSize: '22px', color: '#303133' }}>{record['name']}</span>
                    </div>
                }
                open={modalShow} onCancel={handleCancel} width={550} footer={false} centered={true} >
                <div style={{
                    color: '#606266',
                    fontSize: '18px',
                    marginTop: '30px',
                    marginBottom: '30px',
                }}>是否注销该角色？
                </div>
                <Form.Item style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '0', marginTop: '30px' }}>
                    <Space>
                        <Button onClick={handleCancel}>取消</Button>
                        <Button type="primary" onClick={onDelete}>
                            确认
                        </Button>
                    </Space>
                </Form.Item>
            </Modal>
            <CardModal
                cardModal={cardModal}
                setCardModal={setCardModal}
                requestId={requestId}
                dataList={dataList}
                treeData={treeData}
                selectData={selectData}
                selectDataVal={selectDataVal}
                record={record}
            ></CardModal>
        </div>
    );
};
export default Role;


