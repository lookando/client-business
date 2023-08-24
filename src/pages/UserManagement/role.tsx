/**
 * 用户管理-角色管理
 */
import React, { useRef, useEffect, useState } from 'react';
import { Form, Button, Space, Modal, Input } from 'antd';
import { ProTable, ActionType, ProColumns, ProFormText, } from '@ant-design/pro-components';
import _ from 'lodash';
import { APIRole } from '@/services/digital/role';
import styles from './less/role.less';
import CardModal from './components/cardModal';
import Icon from '@ant-design/icons';
import { ReactComponent as WarningIcon } from '@/assets/icons/modal/warning.svg';
import { ReactComponent as UpdateIcon } from '@/assets/icons/modal/update.svg';

import { ReactComponent as CreateIcon } from '@/assets/icons/modal/create.svg';
import { ReactComponent as PlusIcon } from '@/assets/icons/button/plus.svg';
import { ReactComponent as DeleteIcon } from '@/assets/icons/button/delete.svg';
import debounce from 'lodash/debounce';
import { history } from 'umi';
import { commonAPI } from '@/pages/common';

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
    const [treeData, setTreeData] = useState([]);
    const [selectData, setSelectData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesize, setPagesize] = useState(15);
    const [searchName, setSearchName] = useState('');
    const [searchCode, setSearchCode] = useState('');
    const [selectedRow, setSelectedRow] = useState<any>();
    const [needRequst, setNeedRequst] = useState(true);

    //数据权限
    const [dataList, setDataList] = useState([]);
    const [selectDataVal, setSelectDataVal]: any = useState([]);
    useEffect(() => {

        APIRole.fetchAllMenuTree({ appId: 'compass_auth' }).then((res) => {
            setTreeData(res.data);
            setDataList(res.data);
        });
    }, [])
    //卡片菜单
    const [cardModal, setCardModal] = useState(false);
    const authorIzation = async (values: any) => {
        const { data } = await APIRole.fetchMenuTree({ roleIds: values.id });
        setSelectData(data);
        setSelectDataVal([data?.data?.id]);
        setCardModal(true);
    };
    const [requestId, setRequestId] = useState('');

    interface reqType {
        id?: string;
        name?: string;
        brief?: string;
        current?: number;
        pageSize?: number;
        appId?: string;
        code?: string;
        paging?: string;//是否分页，默认为true
    }
    const req: reqType = {
        brief: '',
        id: '',
        name: '',
        current: 1,
        pageSize: 15,
        appId: 'compass_auth'
    }
    const columns: ProColumns[] = [
        {
            title: '角色编号',
            dataIndex: 'code',
            align: 'center',
            width: '360px'
        },
        {
            title: '角色名称',
            dataIndex: 'name',
            align: 'center',
            width: '360px'
        },
        {
            title: '操作',
            align: 'center',
            render: (_, record) => (
                <Space>
                    {
                        commonAPI.btnAuthority('/auth/role/updateRoleMenu') ?
                            <a onClick={() => {
                                authorIzation(record);
                                setRecord(record);
                                setRequestId(record.id);
                            }}
                                style={{ marginRight: '10px' }}
                            >
                                权限分配
                            </a> : <></>

                    }
                    {
                        commonAPI.btnAuthority('/auth/role/update') ?
                            <a onClick={() => {
                                setModalOpen(true);
                                setModalTitle('修改');
                                setRecord(record);
                                form.setFieldsValue(record)
                            }}>
                                修改
                            </a> : <></>
                    }
                </Space>
            ),
        },
    ];

    //确认删除
    const onDelete = async () => {
        try {
            const res = await APIRole.deleteRole(record.id);
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
                values.appId = 'compass_auth';
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
            const res = await APIRole.updateData({ appId: 'compass_auth', name: values.name, code: values.code, id: record.id })
            if (res.success) {
                setModalOpen(false);
                form.resetFields();
                actionRef?.current?.reload();
            }
        }
    };
    return (
        <div className={styles.roleBox}>
            <div className={styles.searchBar}>
                <Form
                    style={{ border: 'none' }}
                    layout="inline"
                    form={searchForm}
                    initialValues={{}}
                >
                    <div className={styles.searchWrap}>
                        <ProFormText name="code" label="角色编号" placeholder={'请输入'} width={250} fieldProps={{ autoComplete: 'off' }} />
                        <ProFormText name="name" label="角色名称" placeholder={'请输入'} width={250} fieldProps={{ autoComplete: 'off' }} />
                    </div>
                    <div className={styles.searchBtnWrapRole}>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" size="middle" onClick={() => {
                                    const FromData = searchForm.getFieldsValue();
                                    setSearchName(FromData.name);
                                    setSearchCode(FromData.code);
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
                                    setSearchCode('');
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
            <div className='primaryTitle' style={{ position: 'absolute', zIndex: '999', margin: '29px 0 0 20px' }}>角色管理</div>
            <div className={styles.bottomContain}>
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
                    toolBarRender={() => [
                        <Button size="middle" type="primary" icon={<PlusIcon />}
                            onClick={() => {
                                setModalOpen(true);
                                setModalTitle('新增');
                            }}
                            style={commonAPI.btnAuthority('/auth/role/save') ? {} : { visibility: 'hidden' }}
                        > 新增 </Button>,
                        <Button size="middle" type="default" icon={<DeleteIcon />}
                            onClick={() => {
                                setModalShow(true);
                                setModalTitle('删除');
                            }}
                            disabled={delShow}
                            style={commonAPI.btnAuthority('/auth/role/delete/{id}') ? {} : { visibility: 'hidden' }}
                        >删除 </Button>
                    ]}
                    scroll={{ y: "49vh" }}
                    size="middle"
                    bordered={false}
                    actionRef={actionRef}
                    tableAlertOptionRender={false}
                    tableAlertRender={false}
                    rowKey="id"
                    search={false}
                    options={false}
                    params={req}
                    request={async (params: any) => {
                        params.code = searchCode;
                        params.name = searchName;
                        params.current = currentPage;
                        params.pageSize = pagesize;
                        const res = await APIRole.fetchList(params)
                        return res.data;
                    }}
                    columns={columns}
                    pagination={{
                        pageSize: pagesize,
                        current: currentPage,
                    }}
                    onChange={(pagination: any) => {
                        setPagesize(pagination.pageSize);
                        setCurrentPage(pagination.current);
                        setSelectedRow('');
                        setDelShow(true);
                        setNeedRequst(false);
                    }}
                />
            </div>

            <Modal title={
                <div style={{ marginBottom: '30px' }}>
                    <Icon component={modalTitle === '新增' ? CreateIcon : UpdateIcon} style={{ fontSize: '22px' }} />
                    <span style={{ marginLeft: '7px', fontSize: '22px', color: '#303133' }}>{modalTitle}</span>
                </div>
            } open={modalOpen} onCancel={handleCancel} width={450} footer={false} centered={true}>
                <Form name="basic" onFinish={debounce(onAddFinish, 500)} autoComplete="off" colon={false} form={form}>
                    <Form.Item label="角色编号" name="code" rules={[{ required: true }]}>
                        <Input placeholder="请输入" disabled={modalTitle === '新增' ? false : true} />
                    </Form.Item>
                    <Form.Item label="角色名称" name="name" rules={[{ required: true }]}>
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


