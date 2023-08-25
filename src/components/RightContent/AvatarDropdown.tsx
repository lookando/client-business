// import { outLogin } from '@/services/digital/api';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Avatar, Spin } from 'antd';
// import { setAlpha } from '@ant-design/pro-components';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useState } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import portrait from '@/assets/header/portrait.png';
import Icon from '@ant-design/icons';
import { Modal, Form, Input, Space, Button, message } from 'antd';
import { ReactComponent as UpdateIcon } from '@/assets/icons/modal/update.svg';
import { APIUser } from '@/services/digital/user';
import avt from '@/assets/icons/avt.svg'

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const Name = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser }: any = initialState || {};

  const nameClassName = useEmotionCss(({ token }) => {
    return {
      width: '85px',
      height: '46px',
      overflow: 'hidden',
      lineHeight: '48px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        display: 'none',
      },
    };
  });

  return <span style={{ color: '#fff' }} className={`${nameClassName} anticon`}>{currentUser?.realName}</span>;
};

// const AvatarLogo = () => {
//   const { initialState } = useModel('@@initialState');
//   const { currentUser } = initialState || {};

//   const avatarClassName = useEmotionCss(({ token }) => {
//     return {
//       marginRight: '8px',
//       color: token.colorPrimary,
//       verticalAlign: 'top',
//       // background: setAlpha(token.colorBgContainer, 0.85),
//       // [`@media only screen and (max-width: ${token.screenMD}px)`]: {
//       //   margin: 0,
//       // },
//       background: `${headPortrait} no-repeat`,
//     };
//   });

//   return <Avatar size="small" className={avatarClassName} src={currentUser?.avatar} alt="avatar" />;
// };

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    // await outLogin();
    window.sessionStorage.clear();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const { initialState, setInitialState } = useModel('@@initialState');
  /* 修改密码 */
  //md5
  const md5 = require('md5');
  const [PwdmodalShow, setPwdModalShow] = useState(false);
  const [reform] = Form.useForm();
  //确认重置
  const resetPwd = (values: any) => {
    if (values.password1 === values.password2) {
      setPwdModalShow(false)
      setPwd(values)
      reform.resetFields();
    } else {
      message.warning('两次输入密码不一致');
    }
  }
  //弹窗隐藏
  const handleCancel = () => {
    setPwdModalShow(false);
    reform.resetFields();
  };
  //修改密码
  const setPwd = async (values: any) => {
    if (!values.password1 || !values.password2) {
      return;
    }
    const userData = sessionStorage.getItem('userData');
    const id = JSON.parse(userData)?.id;
    const body: any = {
      id,
      password: md5(values.password1),
      checkPassword: md5(values.password2),
    };
    const res = await APIUser.updatePassword(body);
    if (res.success) {
      message.success('密码修改成功');
    }
  };

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        loginOut();
        return;
      }
      // history.push(`/account/${key}`);
      if (key === 'resetPwd') {
        setPwdModalShow(true);
      }
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser }: any = initialState;

  if (!currentUser || !currentUser?.realName) {
    return loading;
  }

  const menuItems = [
    ...([]),
    {
      key: 'resetPwd',
      icon: <SettingOutlined />,
      label: '修改密码',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
      >
        <span className={actionClassName}>
          {/* <AvatarLogo /> */}
          {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar ? currentUser.avatar : portrait} alt="avatar" /> */}
          <Avatar size="small" className={styles.avatar} src={avt} alt="avatar" />
          <Name />
        </span>
      </HeaderDropdown>
      <Modal title={
        <div style={{ marginBottom: '30px' }}>
          <Icon component={UpdateIcon} style={{ fontSize: '22px' }} />
          <span style={{ marginLeft: '7px', fontSize: '18px', color: '#303133' }}>重置密码</span>
        </div>
      } open={PwdmodalShow} onCancel={handleCancel} width={480} footer={false} centered={true}>
        <Form
          style={{ margin: '0 20px' }}
          form={reform}
          name="setPwd"
          onFinish={resetPwd}
          autoComplete="off"
          colon={false}
        >
          <Form.Item label="密码" name="password1" validateTrigger='onBlur' rules={[{ pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/, message: '密码8-20位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符', }]} labelAlign='left'>
            <Input.Password placeholder="请输入" autoComplete="new-password" />
          </Form.Item>
          <Form.Item label="确认密码" name="password2" style={{ marginTop: '20px' }} validateTrigger='onBlur' labelAlign='left' rules={[
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

export default AvatarDropdown;
