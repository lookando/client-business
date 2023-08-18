import React, { useEffect, useState } from 'react';
import { Form, Button } from 'antd';
import { ProFormText, ProFormSelect, ProFormDatePicker, ProFormTreeSelect, ProFormDateRangePicker } from '@ant-design/pro-components';
import styles from './index.less';

interface HeaderType {
    getHeaderVal?: (value: any, type: any, stage: any) => void,
    resetBtn?: (value: any) => void,
    searchItem?: object,
    typeOptions?: any,
    brandOptions?: any,
    productTypeOptions?: [],
    selectedData?: any,
    componentIndex?: string,
    type?: string,
    stage?: string,
    className?: string,
}

const Header: React.FC<HeaderType> = (props: any) => {
    const [searchForm] = Form.useForm();
    const onFinish = (val: any) => {
        props.getHeaderVal(val, typeSelectVal, stageSelectVal);
    };
    const [typeSelectVal, setTypeSelectVal]: any = useState();
    const [stageSelectVal, setStageSelectVal]: any = useState();
    const isDocument = props.searchItem?.isDocument;

    return (
        <>
            <Form
                layout="inline"
                form={searchForm}
                onFinish={onFinish}
                className={
                    props.className == 'searchBarProcurement' ? styles.searchBarProcurement :
                        styles.searchBar}
            >
                <div className={styles.searchWrap}>
                    {props.searchItem?.time ? <ProFormText
                        name="time"
                        label="时间"
                        width={200}
                        placeholder={'请输入'}
                        fieldProps={{ autoComplete: 'off' }}
                        colon={false}
                    /> : <></>}
                    {props.searchItem?.yihutong ? <ProFormText
                        name="yihutong"
                        label="一户通"
                        width={200}
                        placeholder={'请输入'}
                        fieldProps={{ autoComplete: 'off' }}
                        colon={false}
                    /> : <></>}
                    {props.searchItem?.clientNumber ? <ProFormText
                        name="clientNumber"
                        label="客户号"
                        width={isDocument ? 220 : 200}
                        placeholder={'请输入'}
                        fieldProps={{ autoComplete: 'off' }}
                        colon={false}
                    /> : <></>}
                    {props.searchItem?.collectInfo ? <ProFormSelect
                        showSearch
                        name="collectInfo"
                        label="采集信息"
                        width={200}
                        placeholder={'请选择'}
                        options={props.productTypeOptions}
                        colon={false}
                    /> : <></>}
                    {props.searchItem?.scene ? <ProFormSelect
                        showSearch
                        name="scene"
                        label="场景"
                        width={200}
                        placeholder={'请选择'}
                        options={props.contractTypeOptions}
                        colon={false}
                    /> : <></>}
                    {props.searchItem?.infoName ? <ProFormSelect
                        showSearch
                        name="infoName"
                        label="信息名称"
                        width={200}
                        placeholder={'请选择'}
                        options={props.contractTypeOptions}
                        colon={false}
                    /> : <></>}
                    {props.searchItem?.infoCategory ? <ProFormSelect
                        showSearch
                        name="infoCategory"
                        label="信息类别"
                        width={200}
                        placeholder={'请选择'}
                        options={props.contractTypeOptions}
                        colon={false}
                    /> : <></>}
                   
                    <div className={styles.searchBtnWrap}>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" size="middle">
                                查询
                            </Button>
                        </Form.Item>
                        <Form.Item style={{ marginInlineEnd: 0, marginLeft: 10 }}>
                            <Button type="default" htmlType="reset" size="middle" onClick={() => {
                                props.resetBtn();
                                setStageSelectVal('');
                                setTypeSelectVal('');
                                searchForm.resetFields();
                            }}>
                                重置
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </>
    );
};

export const CommonHeader = { Header };
