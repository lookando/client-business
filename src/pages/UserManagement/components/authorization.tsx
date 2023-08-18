/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Modal, Space, Card, Button, Table } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from '../less/userAuthorlzation.less';
import Icon from '@ant-design/icons';
import { ReactComponent as UpdateIcon } from '@/assets/icons/modal/update.svg';

interface PropsType {
    show: boolean;
    handleok: any;
    handlecancel: any;
    waitData?: any;
    finishData?: any;
    auth: object;
    unAuth: object;
    username?: string;
}

interface DataType {
    key: string;
    userNum: string;
    userName: string;
    operate: string;
    id: string;
}
const AuthorIzation: React.FC<PropsType> = (props: any) => {
    const [authorIzationShow, setAuthorIzationShow] = useState(false);
    const [Data, setData] = useState<any>([]);
    const [Data2, setData2] = useState<any>([]);
    const [waitData, setWaitData] = useState<any>([]);
    const [finishData, setFinishData] = useState<any>([]);

    const [selectedRowKeysLeft, setSelectedRowKeysLeft]: any = useState([]);
    const [selectedRowKeysRight, setSelectedRowKeysRight]: any = useState([]);
    useEffect(() => {
        if (props.show) {
            setAuthorIzationShow(true);
            setSelectedRowKeysLeft([]);
            setSelectedRowKeysRight([]);
            setData(props.auth);
            setData2(props.unAuth);
        }
    }, [props.show]);
    const handleCancel = () => {
        setAuthorIzationShow(false);
        props.handlecancel();
    };
    const handleOk = () => {
        setAuthorIzationShow(false);
        props.handleok(Data, Data2);
    };
    //左选中某项
    const rowSelectionLeft = {
        selectedRowKeys: selectedRowKeysLeft,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setSelectedRowKeysLeft(selectedRowKeys);
            setWaitData(selectedRows);
        },
    };
    //右选中某项
    const rowSelectionRight = {
        selectedRowKeys: selectedRowKeysRight,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setSelectedRowKeysRight(selectedRowKeys);
            setFinishData(selectedRows);
        },
    };
    //移动到到待分配
    const goToWait = () => {
        const wData = JSON.parse(JSON.stringify(Data2));
        const fData = JSON.parse(JSON.stringify(Data));
        if (finishData.length > 0) {
            finishData.map((item: any) => {
                wData.push(item);
                fData.map((it: any, i: any) => {
                    if (it.name === item.name) {
                        fData.splice(i, 1);
                    }
                });
            });
        }
        const list2 = unique(wData);
        const list = unique(fData);
        setData2(list2);
        setData(list);
        setWaitData([]);
        setSelectedRowKeysLeft([]);
        setSelectedRowKeysRight([]);
    };
    //移动到已分配
    const goToFnish = () => {
        const wData = JSON.parse(JSON.stringify(Data2));
        const fData = JSON.parse(JSON.stringify(Data));
        if (waitData.length > 0) {
            waitData.map((item: any) => {
                fData.push(item);
                wData.map((it: any, i: any) => {
                    if (it.name === item.name) {
                        wData.splice(i, 1);
                    }
                });
            });
        }
        const list2 = unique(wData);
        const list = unique(fData);
        setData2(list2);
        setData(list);
        setFinishData([]);
        setSelectedRowKeysLeft([]);
        setSelectedRowKeysRight([]);
    };
    //数组去重
    function unique(arr: any) {
        const newobj: any = {},
            newArr = [];
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (!newobj[item.name]) {
                newobj[item.name] = newArr.push(item);
            }
        }
        return newArr;
    }

    const columns: ColumnsType<DataType> = [
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
    ];
    return (
        <div>
            <Modal
                title={<div>
                    <Icon component={UpdateIcon} style={{ fontSize: '22px' }} />
                    <span style={{ marginLeft: '7px', fontSize: '22px', color: '#303133' }}>授权-用户({props.username})</span>
                </div>}
                open={authorIzationShow}
                onCancel={handleCancel}
                footer={false}
                width={800}
                centered={true}
                className='user-authorization-modal'
            >
                <Space>
                    <Card title={` 待分配角色(${Data2?.length})`} size="small"
                        className={styles.stayCard}
                    >
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelectionLeft,
                            }}
                            columns={columns}
                            dataSource={Data2}
                            pagination={false}
                            rowKey={(record) => record?.id}
                            scroll={{ y: 240 }}
                            size='small'
                        />
                    </Card>
                    <div>
                        <Button icon={<LeftOutlined />} type="primary" ghost size='small'
                            onClick={() => {
                                goToWait();
                            }}></Button>
                        <Button icon={<RightOutlined />} type="primary" ghost size='small'
                            onClick={() => {
                                goToFnish();
                            }}></Button>
                    </div>
                    <Card title={` 已分配角色(${Data?.length})`} size="small"
                        className={styles.alreadyCard}
                    >
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelectionRight,
                            }}
                            columns={columns}
                            dataSource={Data}
                            pagination={false}
                            rowKey={(record) => record?.id}
                            scroll={{ y: 240 }}
                            className={styles.alreadyRoleTable}
                            size='small'
                        />
                    </Card>
                </Space>
                <Space style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '0', marginTop: '10px' }}>
                    <Space>
                        <Button onClick={handleCancel}>取消</Button>
                        <Button type="primary" onClick={handleOk}>
                            确认
                        </Button>
                    </Space>
                </Space>
            </Modal>
        </div>
    );
};

export default AuthorIzation;
