
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
import Icon from '@ant-design/icons';
import { ReactComponent as Nosave } from '@/assets/icons/button/unsave.svg';
import { ReactComponent as Edit } from '@/assets/icons/button/edit.svg';

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
  const [pageSize, setPageSize] = useState(5);
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
    },
    {
      title: '信息名称',
      dataIndex: 'readonly',
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
    },
    {
      title: '信息名称',
      dataIndex: 'readonly',
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
        <div className='primaryTitle' style={{ position: 'absolute', fontWeight:'600', zIndex: '999', margin: '24px 0 0 20px' }}>信息分类表 {isModify ? <span style={{ fontSize: '13px',  color: '#DE2930' }}><span style={{  padding: '1px 6px', backgroundColor: '#fbe4e5',  }} >编辑中</span></span> : ''}</div>
        <EditableProTable
          className='tableStyle'
          // name='table'//这个属性要看源码
          rowKey='id'
          // key='id'
          scroll={{
            x: 960,
            y: 370
          }}
          editableFormRef={editableFormRef}
          actionRef={actionRef}
          columns={columns}
          dataSource={dataSource}
          value={dataSource}
          toolBarRender={() => {
            return [
              <>{isModify ? '' : <Button type="primary" onClick={() => {
                history.push('/information-collection/configuration/classMaintenance')
              }}>类别维护</Button>}
                {isModify ? <div style={{position:'relative',color:'#DE2930',fontSize:"14px"}}><span style={{position:"absolute",top:'1px',left:'-18px'}}><Nosave/></span>数据变动，未保存</div> : ''}
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
                  <Icon component={Edit}></Icon>
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