//刷新时存model数据
import { useModel } from 'umi';
const setRoutersModel = (routers: any) => {
    const {
        ROUTER_ARR,
        SET_ROUTER_ARR,
        SET_ALL_DICT,
        SET_LIST_DICT,
        SET_LIST_APP,
        SET_BTN_MENU
    } = useModel('useAuthModels')
    if (routers.length >= 1 && ROUTER_ARR.length !== routers.length) {
        //保存路由tab数据
        SET_ROUTER_ARR(routers)
        //保存所有字典
        const allDict = JSON.parse(sessionStorage.getItem('ALLDICT'));
        SET_ALL_DICT(allDict)
        //保存所有字典简便版
        const listDict = JSON.parse(sessionStorage.getItem('LISTDICT'));
        SET_LIST_DICT(listDict)
        //保存所有系统
        const listApp = JSON.parse(sessionStorage.getItem('LISTAPP'));
        SET_LIST_APP(listApp)
        const btnMenu = JSON.parse(sessionStorage.getItem('BTNMENU'));
        SET_BTN_MENU(btnMenu)
    } else if (ROUTER_ARR.length !== routers.length) {
        SET_ROUTER_ARR(routers)
    }
    return;
};

export default setRoutersModel;