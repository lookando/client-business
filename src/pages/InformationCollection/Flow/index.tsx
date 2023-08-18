
import { CommonHeader } from '@/components/SearchBar';
import type { ProColumns } from '@ant-design/pro-components';
import styles from './index.less';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

type DataSourceType = {
  id: React.Key;
  title?: string;
  readonly?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '活动名称一',
    readonly: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '1590486176000',
    update_at: '1590486176000',
  },
  {
    id: 624691229,
    title: '活动名称二',
    readonly: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: '1590481162000',
    update_at: '1590481162000',
  },
];

export default () => {
  const searchItem = {
    time:true,
    yihutong:true,
    clientNumber:true,
    collectInfo:true
  };
  const [tableForm] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState('hidden');
  const [pagination, setPagination] = useState(false);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '时间',
      dataIndex: 'time',
      readonly: true,
      width: '15%',
    },
    {
      title: '一户通',
      dataIndex: 'readonly',
      // tooltip: '只读，使用form.getFieldValue可以获取到值',
      width: '15%',
    },
    {
      title: '客户号',
      key: 'state',
      dataIndex: 'state',
    },
    {
      title: '场景',
      dataIndex: 'decs',
    },
    {
      title: '集结信息',
      dataIndex: 'decs',
    },
    {
      title: '备注',
      dataIndex: 'decs',
    },


  ];

  return (
    <>
      <CommonHeader.Header searchItem={searchItem} ></CommonHeader.Header>
      <div className={styles.rightItem}>   
        <div className='primaryTitle' style={{position:'absolute',zIndex:'999',margin:'24px 0 0 20px'}}>收集流水</div>
        <EditableProTable<DataSourceType>
          className='tableStyle'
          style={{marginTop:"70px"}}
          name='table'
          rowKey="id"
          scroll={{
            x: 960,
          }}
          recordCreatorProps={
            position !== 'hidden'
              ? {
                position: position as 'top',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
              }
              : false
          }
          loading={false}
          columns={columns}
          request={async () => ({
            data: defaultData,
            total: 3,
            success: true,
          })}
          value={dataSource}
          pagination={{
            disabled: pagination,
            // current,
            // pageSize,
            showSizeChanger: false,

            onChange: (val) => {
              // setCurrent(val);
    
              setEditableRowKeys([]);
            }
          }}
          onChange={setDataSource}
          editable={{
            form: tableForm,
            type: 'multiple',
            editableKeys,
            onlyOneLineEditorAlertMessage: false,
            onValuesChange: (record, recordList: any) => {
              //数据改变时重新渲染列表

              // recordList?.forEach((item: any) => {
              // item.componentType = getSelectLabel(item?.componentType);
              // item.componentBrand = getSelectLabel(item?.componentBrand);
              // item.componentVersion = getSelectLabel(item?.componentVersion);
              // });
              setDataSource(recordList);
              // setCurrentRow(record);
            },
            actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
            },

            onChange: setEditableRowKeys,
            deleteText: '—',
            deletePopconfirmMessage: false,
          }}
        />

      </div>
    </>
  );
};