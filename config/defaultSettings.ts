import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: `  | \xa0 客户业务运营中台`,
  pwa: true,
  logo: '/logo.svg',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    header: {
      colorBgHeader: '#D93133',
      colorHeaderTitle: '#fff',
      heightLayoutHeader: 46,
    },
    sider: {
      colorMenuBackground: '#fff',
      colorTextMenu: '#333333',
      colorTextMenuSelected: '#333333',
      colorTextMenuItemHover: 'fff',
      colorTextMenuActive: '#333333',
      colorBgMenuItemSelected: '#D93133',
    },
    pageContainer: {
      paddingBlockPageContainerContent: 15,
      paddingInlinePageContainerContent: 15,
      colorBgPageContainer: 'rgb(237,237,237)',
    },
  },
  footerRender: false,
  siderWidth: 190,
};

export default Settings;
