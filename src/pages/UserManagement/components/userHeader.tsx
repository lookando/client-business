import React, { useState, useEffect } from 'react';
import { Button, Select, Form, Input, Space, Row, Col, Modal, message, TreeSelect } from 'antd';
import styles from '../less/userHeader.less'
import Icon from '@ant-design/icons';
import { ReactComponent as CreateIcon } from '@/assets/icons/modal/create.svg';
import { ReactComponent as WarningIcon } from '@/assets/icons/modal/warning.svg';
import { ReactComponent as QuestionIcon } from '@/assets/icons/modal/question.svg';
import { ReactComponent as Modify } from '@/assets/icons/modal/modify.svg';

interface DataType {
    onfinish?: any;
    someData?: any;
    addSub?: any;
    setPwd?: any;
    freeze?: any;
    depList?: any;
    closeAdd?: boolean;
    onCloseAdd?: any;
    selectStatus?: any;
    selectType?: any;
    inpUserName?: any;
    inpRealName?: any;
    onReset?: any;
    setDsab?: any;
    modalShow?: any;
    setModalShow?: any;
    modalTitle?: any;
    isModalOpen?: any;
    setIsModalOpen?: any;
    PwdmodalShow?: any;
    setPwdModalShow?: any;
    open?: any;
    setOpen?: any;
}

const UserHeader: React.FC<DataType> = (props: any) => {
    const [form] = Form.useForm();
    const [addform] = Form.useForm();
    const [reform] = Form.useForm();
    const [value, setValue] = useState<string>();

    useEffect(() => {
        if (Object.keys(props.someData).length !== 0) {
            props.setDsab(false)
            if (props.someData.status) {
                props.setOpen(false)
            } else {
                props.setOpen(true)
            }
        } else {
            props.setDsab(true)
        }
    }, [props.someData])
    useEffect(() => {
        if (props.closeAdd) {
            addform.resetFields();
            props.setIsModalOpen(false)
        }
    }, [props.closeAdd])
    const onFinish = (values: any) => {
        props.onfinish(values);
        props.setDsab(true);
    };
    //弹窗隐藏
    const handleCancel = () => {
        props.setIsModalOpen(false);
        props.setModalShow(false);
        props.setPwdModalShow(false);
        addform.resetFields();
        reform.resetFields();
    };
    //添加确认
    const onAddFinish = (values: any) => {
        console.log(values)
        let data = {
            username: values.username,
            realName: values.realName,
            deptId: value
        };
        props.addSub(data)
    }
    //冻结确认||解冻确认
    const FreezeOk = () => {
        props.setModalShow(false)
        props.freeze(props.modalTitle)
    }
    //确认重置
    const resetPwd = (values: any) => {
        if (values.password1 === values.password2) {
            props.setPwdModalShow(false)
            props.setPwd(values)
            reform.resetFields();
        } else {
            message.warning('两次输入密码不一致');
        }
    }
    const onReset = () => {
        form.resetFields();
        props.selectStatus('')
        props.selectType('')
        props.inpUserName('')
        props.inpRealName('')
        props.onReset()
    };
    const onSelectStatus = (value: string) => {
        props.selectStatus(value)
    }
    const onSelectType = (value: string) => {
        props.selectType(value)
    }
    const onInpUser = (value: string) => {
        props.inpUserName(value)
    }
    const onInpReal = (value: string) => {
        props.inpRealName(value)
    }
    //树选择
    const onChange = (newValue: string) => {
        setValue(newValue);
    };
    //下拉搜索
    const filterTreeNode = (inputValue: string, treeNode: any) => {
        return treeNode.titleAbbr.indexOf(inputValue) > -1;
    }
    return (
        <>
            <div
                className={styles.user_header}
            >
                <Form
                    form={form}
                    layout="inline"
                    autoComplete="off"
                    colon={false}
                    name="control-hooks"
                    onFinish={onFinish}
                >
                    <Form.Item label="用户编号" name="username">
                        <Input placeholder="请输入" style={{ width: '180px' }} onChange={(e) => { onInpUser(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="用户名称" name="realName">
                        <Input placeholder="请输入" style={{ width: '180px' }} onChange={(e) => { onInpReal(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="用户状态" name="status">
                        <Select style={{ width: '180px' }} placeholder='请选择' onChange={onSelectStatus} >
                            <Select.Option value={0}>正常</Select.Option>
                            <Select.Option value={1}>冻结</Select.Option>
                            <Select.Option value={2}>注销</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button htmlType="button" onClick={onReset}>重置</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <Modal title={
                <div style={{ marginBottom: '30px' }}>
                    <Icon component={CreateIcon} style={{ fontSize: '22px' }} />
                    <span style={{ marginLeft: '7px', fontSize: '18px', color: '#303133' }}>新增用户</span>
                </div>
            }
                open={props.isModalOpen}
                onCancel={handleCancel}
                width={450}
                footer={false}
                centered={true}>
                <Form
                    form={addform}
                    name="basic"
                    onFinish={onAddFinish}
                    autoComplete="off"
                    colon={false}
                >
                    <Form.Item label="用户编号" name="username" rules={[{ required: true }]}>
                        <Input placeholder="请输入" />
                    </Form.Item>
                    <Form.Item label="用户名称" name="realName" style={{margin:'20px 0'}} rules={[{ required: true }]}>
                        <Input placeholder="请输入名称" />
                    </Form.Item>
                    <Form.Item label="所属组织" name="branchId" style={{margin:'20px 0'}} rules={[{ required: true }]}>
                        <TreeSelect
                            showSearch
                            filterTreeNode={filterTreeNode}
                            style={{ width: '100%' }}
                            value={value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={props.depList}
                            fieldNames={{
                                label: 'titleAbbr',
                                value: 'id',
                                children: 'children',
                            }}
                            placeholder="请选择"
                            treeDefaultExpandAll
                            onChange={onChange}
                        />
                    </Form.Item>
                    <Form.Item style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '0', marginTop: '30px' }}>
                        <Space>
                            <Button onClick={handleCancel}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title={
                <div style={{ marginBottom: '30px' }}>
                    <Icon component={props.modalTitle == '冻结' ? WarningIcon : QuestionIcon} style={{ fontSize: '22px' }} />
                    <span style={{ marginLeft: '7px', fontSize: '18px', color: '#333' }}>{props.modalTitle}</span>
                </div>
            }
                open={props.modalShow}
                onCancel={handleCancel}
                width={480}
                footer={false}
                centered={true}>
                <div style={{
                    color: '#333',
                    fontSize: '14px',
                    marginLeft:'20px',
                    marginTop: '30px',
                    marginBottom: '30px',
                }}>是否{props.modalTitle}【{props.someData?.username}】账户？
                </div>
                <Form.Item style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '0', marginTop: '30px' }}>
                    <Space>
                        <Button onClick={handleCancel}>
                            取消
                        </Button>
                        <Button type="primary" onClick={FreezeOk}>
                            确认
                        </Button>
                    </Space>
                </Form.Item>
            </Modal>
            <Modal title={
                <div style={{ marginBottom: '30px' }}>
                    <Icon component={Modify} style={{ fontSize: '22px' }} />
                    <span style={{ marginLeft: '7px', fontSize: '22px', color: '#303133' }}>重置密码</span>
                </div>
            } open={props.PwdmodalShow} onCancel={handleCancel} width={480} footer={false} centered={true}>
                <Form
                    style={{width:'380px',marginLeft:'25px'}}
                    form={reform}
                    name="setPwd"
                    onFinish={resetPwd}
                    autoComplete="off"
                    colon={false}
                >
                    <Form.Item label="密码" name="password1" validateTrigger='onBlur' labelAlign='left' rules={[{ pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/, message: '密码8-20位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符', }]}>
                        <Input.Password placeholder="请输入" autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item label="确认密码" style={{marginTop:'20px'}} name="password2" validateTrigger='onBlur' labelAlign='left' rules={[
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password1') === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject("两次密码输入不一致")
                            }
                        })
                    ]}>
                        <Input.Password placeholder="请确认" autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginBottom: '0', marginTop: '30px' }}>
                        <Space style={{ marginLeft: "190px" }}>
                            <Button onClick={handleCancel}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                确定
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default UserHeader;
