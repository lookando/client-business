
import { CommonHeader } from '@/components/SearchBar';
import type { ProColumns } from '@ant-design/pro-components';
import styles from './index.less';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components';
import { Button, Form, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import { APIInfocollection } from '@/services/client/infocollection';

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

export default () => {
  const searchItem = {
    time:true,
    yihutong:true,
    clientNumber:true,
    collectInfo:true,
    scene:true
  };
  const [tableForm] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState('hidden');
  const [pagination, setPagination] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState<number>()
  const [current, setCurrent] = useState(1);
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '时间',
      dataIndex: 'time',
      readonly: true,
    },
    {
      title: '一户通',
      dataIndex: 'readonly',
      // tooltip: '只读，使用form.getFieldValue可以获取到值',
    },
    {
      title: '客户号',
      key: 'state',
      dataIndex: 'state',
    },
    {
      title: '信息',
      dataIndex: 'decs',
    },
    {
      title: '信息内容',
      dataIndex: 'decs',
    },
    {
      title: '信息类别',
      dataIndex: 'decs',
    },
    {
      title: '场景',
      dataIndex: 'decs',
    },
    {
      title: '近一天统计次数',
      dataIndex: 'decs',
    },


  ];
  
  const onChange = (x: number, y: number) => {
    setCurrent(x)
    setPageSize(y)
    APIInfocollection.fetInfoClass({ current: x, pageSize: y, }).then((res) => {
      setDataSource(res.data)
      setTotal(res.total)
    })
  }
  const fetInfoClass = (x, y) => {
    APIInfocollection.fetInfoClass({ current: x, pageSize: y, }).then((res) => {
      setDataSource(res.data)
      setTotal(res.total)
    })
  }
  useEffect(() => {
    fetInfoClass(current, pageSize)
  }, []);

  return (
    <>
      <CommonHeader.Header searchItem={searchItem} ></CommonHeader.Header>
      <div className={styles.rightItem}>   
        <div className='primaryTitle' style={{position:'absolute',fontWeight:'600',zIndex:'999',margin:'26px 0 0 20px'}}>实时统计</div>
        <EditableProTable<DataSourceType>
          className='tableStyle'
          style={{ marginTop: "66px" }}
          rowKey="id"
          scroll={{
            x: 960,
            y: 360
          }}
          recordCreatorProps={
            position !== 'hidden'
              ? {
                newRecordType: 'dataSource',
                record: () => {
                  return { id: (Math.random() * 1000000).toFixed(0) }
                },
              }
              : false
          }
          loading={false}
          columns={columns}
          value={dataSource}
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
        <Pagination className={styles.pagination} disabled={pagination} current={current} onChange={onChange} defaultCurrent={1} total={total} showSizeChanger showQuickJumper defaultPageSize={pageSize} />


      </div>
    </>
  );
};