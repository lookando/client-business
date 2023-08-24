import { login } from '@/services/digital/api';
import { UUIDGenerator } from '@/utils/utils';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import React, { useState } from 'react';
import { FormattedMessage, history, useModel } from 'umi';
import CaptchaInput from './CaptchaInput';
import styles from './index.less';
import { APIRole } from '@/services/digital/role';
import { APIApplication } from '@/services/digital/application';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { flushSync } from 'react-dom';
import blackBg from '../../../assets/login/blackBg.png'
import redCard from '../../../assets/login/redCard.png'
import { commonAPI } from '@/pages/common';

const Login: React.FC = () => {
  const md5 = require('md5');
  const [ramdomKey, setramdomKey]: any = useState(`${Date.now()}`);

  const { setInitialState } = useModel('@@initialState');

  const { SET_ALL_DICT, SET_LIST_DICT, SET_LIST_APP,SET_BTN_MENU } = useModel('useAuthModels')
  const [sessionUid] = useState(UUIDGenerator());

  // const intl = useIntl();
  const handleSubmit = async (values: any) => {
    values.password = md5(values.password);
    const { data } = await login({ ...values });
    if (data) {
      sessionStorage.setItem('token', data?.accessToken);
      sessionStorage.setItem('userData', JSON.stringify(data));
    }
    //获取路由数据
    // const roleIds: any = [];
    // data?.roleIds.map((item: any) => {
    //   roleIds.push(item.id);
    // });
    //获取所有字典
    const allDict = await APIRole.mapAllDict()
    if (allDict.data) {
      sessionStorage.setItem('ALLDICT', JSON.stringify(allDict.data));
      SET_ALL_DICT(allDict.data)
    }
    //获取所有字典(简)
    const listDict = await APIRole.listMap()
    if (listDict.data) {
      sessionStorage.setItem('LISTDICT', JSON.stringify(listDict.data));
      SET_LIST_DICT(listDict.data)
    }
    //获取所有应用
    const listApp = await APIApplication.listAppIdName()
    if (listApp.data) {
      sessionStorage.setItem('LISTAPP', JSON.stringify(listApp.data));
      SET_LIST_APP(listApp.data)
    }
    //获取按钮权限
    const btnMenu = await APIRole.getAuthButton({appId:'compass_auth'})
    if(btnMenu.data){
      sessionStorage.setItem('BTNMENU', JSON.stringify(btnMenu.data));
      SET_BTN_MENU(btnMenu.data)
    }
    //获取路由菜单
    const routerMenu = await APIRole.listRoutes({appId:'compass_auth'})
    if(routerMenu.data){
      const tData: any = [];
      routerMenu.data.map((item: any) => {
        tData.push(item.path);
        if (item.children?.length) {
          item.children.map((i: any) => {
            tData.push(i.path);
          });
        };
      })
      sessionStorage.setItem('routerData', JSON.stringify(tData));
    }
    if (!history) return;
    history.push('/welcome');
    flushSync(() => {
      setInitialState((s) => ({
        ...s,
        currentUser: data,
      }));
    });
    return;
  };

  return (
    <div className={styles.container}>
      {/* <img src={blackBg} alt='' className={styles.bigImg}></img> */}
      <div className={styles.content}>
        <div className={styles.imgBox}>
          {/* <img src={redCard} alt="" className={styles.smallImg} /> */}
          <h1 style={{margin:'200px 110px'}}>客户业务运营中台</h1> 
        </div>
        <div className={styles.left}>
          <div className={styles.title}>
            <div className={styles.font}>用户登录</div>
          </div>
          <LoginForm
            // logo={<img alt="logo" src="/logo.svg" />}
            // title="Ant Design"
            // subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
            initialValues={{
              autoLogin: true,
            }}
            actions={[]}
            onFinish={async (values) => {
              await handleSubmit({ ...values, sessionUid } as any).catch(() => {
                //如果验证错误,刷新ramdomKey重新请求验证码
                setramdomKey(`${Date.now()}`);
              });
            }}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined style={{ color: '#ccc', fontSize: '18px' }} />,
                style: { borderRadius: '4px', width: '300px', height: '45px' },
              }}
              placeholder='用户名'
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入账号！"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined style={{ color: '#ccc', fontSize: '18px' }} />,
                style: { borderRadius: '4px', width: '300px', height: '45px' },
              }}
              placeholder='密码'
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
            <CaptchaInput sessionUid={sessionUid} ramdomKey={ramdomKey} />
          </LoginForm>

        </div>
      </div>
    </div>
  );
};

export default Login;
