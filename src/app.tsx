import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import RightContent from '@/components/RightContent';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { fetchCurrentUser as queryCurrentUser } from './services/digital/api';
import React from 'react';
// import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import { IconMap } from '@/components/Icons/MenuIcon';
import Icon, { ToTopOutlined } from '@ant-design/icons';
import portrait from '@/assets/header/portrait.png';
import setModel from './utils/setModel';
import { BreadcrumbProps } from 'antd';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * 页面刷新的时候执行。
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const { success, data } = await queryCurrentUser();
        if (success) {
          return data;
        }
        history.push(loginPath);
      } catch (error) {
        history.push(loginPath);
      }
      // const userData = JSON.parse(sessionStorage.getItem('userData'))
      // return userData
    }
    return undefined;
  };

  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}
// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    // actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    // avatarProps: {
    //   src: portrait,
    //   // src: initialState?.currentUser?.avatar || portrait  ,
    //   // title: <AvatarName />,
    //   render: (_, avatarChildren) => {
    //     return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
    //   },
    // },
    // 面包屑数据
    breadcrumbRender: (routes: BreadcrumbProps['routes']) => {
      let routeArr = []
      const sRouterArr = JSON.parse(sessionStorage.getItem('routerArr'))
      if (sRouterArr && Object.keys(sRouterArr).length !== 0) {
        routeArr = sRouterArr
      }
      if (routes?.length) {
        if (routes?.[0].path !== '/user/login') {
          routeArr.push(routes[1])
        }
      }
      changeOutData(routeArr)
      return;
    },
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      };
    },
    collapsed: false,
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // 右侧切换主题的按钮
    // childrenRender: false,
    childrenRender: (children: any, props: any) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {/* {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )} */}
        </>
      );
    },
    menuDataRender: (menuData) => {
      return menuData.map((item) => {
        return {
          ...item,
          // icon:<Icon component={'user'}></Icon>
          // icon:<ToTopOutlined />
          // icon:<Icon component={IconMap[item.icon]} style={{ fontSize: 16 }} />
          icon: typeof item.icon === 'string' && item.icon.indexOf('|svg') > -1 ? (
            <Icon component={IconMap[item.icon.replace('|svg', '')]} style={{ fontSize: 16 }} />
          ) : (
            item.icon
          ),
        };
      });
    },
    pageTitleRender: (route) => {
      const routeList: any = route.breadcrumb;
      let metaTitle: any = '';
      for (let key in routeList) {
        if (key === route?.pathname) {
          metaTitle = routeList[key];
        };
      };
      return metaTitle?.name == undefined ? '华西证券' : metaTitle?.name;
    },
    ...initialState?.settings,
  };
};
//改造数据
const changeOutData = (data: any[]) => {
  let newObj: any = {}
  let newArr: any = []
  for (let i = 0; i < data.length; i++) {
    if (data[i]) {
      let temp = data[i]
      if (newObj && !newObj[temp['path']]) {
        newObj[temp['path']] = newArr.push(temp)
      }
    }
  }
  sessionStorage.setItem('routerArr', JSON.stringify(newArr));
  //路由数据存入全局model
  setModel(newArr)
  return;
}
/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
