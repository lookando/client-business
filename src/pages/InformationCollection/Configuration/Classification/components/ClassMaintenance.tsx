import type { ProColumns } from '@ant-design/pro-components';
import styles from './index.less';
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio,
} from '@ant-design/pro-components';
import { history } from 'umi';
import { Breadcrumb, Button, Form } from 'antd';
import React, { useState } from 'react';

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
  const [isModify, setIsModify] = useState<boolean>(false);
  const [tableForm] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);
  const [position, setPosition] = useState('hidden');
  const [pagination, setPagination] = useState(false);
  const breadcrumb: any = history.location;
  const columns: ProColumns<DataSourceType>[] = [
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
      tooltip: '只读，使用form.getFieldValue可以获取到值',
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

  console.log(breadcrumb, 'breadcrumb');


  return (
    <>
      <div className={styles.mainItem}>
        <div className={styles.topItem} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Breadcrumb
            style={{ marginLeft: '15px' }}
            items={[
              {
                title: <a onClick={()=>{history.push('/information-collection/configuration/classification')}}>信息分类表</a>,
              },
              {
                title: <span onClick={()=>{history.push('/information-collection/configuration/classMaintenance')}}>类别维护</span>,
              }
            ]}
          />
          <Button type='default' onClick={() => {
            history.push('/information-collection/configuration/classification')
          }} style={{ marginRight: '20px' }}>返回</Button>
        </div>
      </div>
      <div className={styles.rightItem}>
        <div className='primaryTitle' style={{ position: 'absolute', zIndex: '999', margin: '30px 0 0 20px' }}>类别维护</div>
        <EditableProTable<DataSourceType>
          className='tableStyle'
          name='table'
          rowKey="id"
          scroll={{
            x: 960,
          }}
          toolBarRender={() => {
            return [
              <>
                <Button
                  type="primary"
                  key="save"
                  onClick={() => {
                    setEditableRowKeys(() => dataSource?.map((item: any) => item.id));
                    setIsModify(true);
                    setPosition('show')
                    setPagination(true)
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
                }}>
                  取消
                </Button> : ''}


              </>

            ];
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
              setIsModify(false);
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