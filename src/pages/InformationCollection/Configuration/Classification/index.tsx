
import { CommonHeader } from '@/components/SearchBar';
import type { ActionType, EditableFormInstance, ProColumns } from '@ant-design/pro-components';
import styles from './index.less';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components';
import { Button, Form, Pagination, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
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
    infoName: true,
    infoCategory: true,
  };
  const actionRef = useRef<ActionType>();
  const editableFormRef = useRef<EditableFormInstance>();
  const [isModify, setIsModify] = useState<boolean>(false);
  const [tableForm] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState();
  const [pageSize, setPageSize] = useState(2);
  const [position, setPosition] = useState('hidden');
  const [total, setTotal] = useState<number>()
  const [pagination, setPagination] = useState(false);
  const [current, setCurrent] = useState(1);
  const b_columns: ProColumns<DataSourceType>[] = [
    {
      title: '操作',
      className: 'textCenter deleteBtn',
      valueType: 'option',
      width: 80,
      render: () => {
        return false;
      },
    },
    {
      title: '信息ID',
      dataIndex: 'title',
      readonly: true,
      width: '15%',
    },
    {
      title: '信息名称',
      dataIndex: 'readonly',
      width: '15%',
    },
    {
      title: '信息类别',
      key: 'state',
      dataIndex: 'state',
    },
    {
      title: '备注',
      dataIndex: 'decs',
    },
  ];
  const n_columns: ProColumns<DataSourceType>[] = [
    {
      title: '信息ID',
      dataIndex: 'title',
      readonly: true,
      width: '15%',
    },
    {
      title: '信息名称',
      dataIndex: 'readonly',
      width: '15%',
    },
    {
      title: '信息类别',
      key: 'state',
      dataIndex: 'state',
    },
    {
      title: '备注',
      dataIndex: 'decs',
    },
  ];
  const [columns, setColumns] = useState<ProColumns<DataSourceType>[]>(n_columns)
  const fetInfoClass = (x, y) => {
    APIInfocollection.fetInfoClass({ current: x, pageSize: y, }).then((res) => {
      setDataSource(res.data)
      setTotal(res.total)
    })
  }
  const onChange = (x: number, y: number) => {
    setCurrent(x)
    setPageSize(y)
    APIInfocollection.fetInfoClass({ current: x, pageSize: y, }).then((res) => {
      setDataSource(res.data)
      setTotal(res.total)
    })
  }

  const onSave = () => {
    APIInfocollection.saveInfoClass({ current: current, pageSize: pageSize, dataSource: dataSource }).then((res) => {
      // setDataSource(res.data)
      // setTotal(res.total)
    })
  }


  useEffect(() => {
    fetInfoClass(current, pageSize)
  }, []);


  return (
    <>
      <CommonHeader.Header searchItem={searchItem} ></CommonHeader.Header>
      <div className={styles.rightItem}>
        <div className='primaryTitle' style={{ position: 'absolute', zIndex: '999', margin: '30px 0 0 20px' }}>信息分类表</div>
        <EditableProTable
          className='tableStyle'
          // name='table'//这个属性要看源码
          rowKey='id'
          // key='id'
          scroll={{
            x: 960,
          }}
          editableFormRef={editableFormRef}
          actionRef={actionRef}
          columns={columns}
          dataSource={dataSource}
          value={dataSource}
          toolBarRender={() => {
            return [
              <>
                <Button type="primary" onClick={() => {
                  history.push('/information-collection/configuration/classMaintenance')
                }}>类别维护</Button>
                <Button
                  type="primary"
                  key="save"
                  onClick={() => {
                    if (isModify == false) {
                      setEditableRowKeys(() => dataSource?.map((item: any) => item.id));
                      setIsModify(true);
                      setPosition('show');
                      setPagination(true)
                      setColumns(b_columns)
                    } else {
                      // 保存按钮
                      onSave()
                      setEditableRowKeys([]);
                      setIsModify(false);
                      setPagination(false)
                      setPosition('hidden');
                      setColumns(n_columns)
                      setCurrent(1)
                      fetInfoClass(1, pageSize)
                    }
                  }}
                >
                  {isModify ? '保存' : '编辑'}
                </Button>
                {isModify ? <Button type="primary" htmlType="submit" size="middle" onClick={() => {
                  // props.onCancel();
                  setEditableRowKeys([]);
                  setIsModify(false);
                  setPosition('hidden');
                  setPagination(false)
                  setColumns(n_columns)
                  fetInfoClass(current, pageSize)
                }}>
                  取消
                </Button> : ''}
              </>
            ];
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
          debounceTime={500}
          // loading={false}
          // onChange={setDataSource}
          editable={{
            // form: tableForm,
            type: 'multiple',
            editableKeys,
            onlyOneLineEditorAlertMessage: false,
            onValuesChange: (record, recordList: any) => {
              //数据改变时重新渲染列表
              console.log(record, 555);
              // recordList?.forEach((item: any) => {
              // item.componentType = getSelectLabel(item?.componentType);
              // item.componentBrand = getSelectLabel(item?.componentBrand);
              // item.componentVersion = getSelectLabel(item?.componentVersion);
              // });
              setDataSource(recordList);
              console.log(recordList);
              // setCurrentRow(record);
            },
            actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
            },
            onChange: setEditableRowKeys,
            deleteText: '—',
            deletePopconfirmMessage: false,
          }}
        // pagination={{
        //   disabled: pagination,
        //   // current,
        //   pageSize,
        //   showSizeChanger: false,

        //   onChange: (val) => {
        //     // setCurrent(val);
        //     setIsModify(false);
        //     setEditableRowKeys([]);
        //   }
        // }}
        />
        <Pagination className={styles.pagination} disabled={pagination} current={current} onChange={onChange} defaultCurrent={1} total={total} showSizeChanger showQuickJumper defaultPageSize={pageSize} />
      </div>
    </>
  );
};