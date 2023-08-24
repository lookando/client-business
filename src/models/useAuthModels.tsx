import { useState } from "react";
const Model = () => {
    const [ROUTER_ARR, SET_ROUTER_ARR] = useState([])//路由
    const [ALL_DICT, SET_ALL_DICT] = useState<any>([])//所有字典数据
    const [LIST_DICT,SET_LIST_DICT]=useState<any>([])//所有字典-字段缩减
    const [LIST_APP,SET_LIST_APP]=useState<any>([])//所有应用
    const [BTN_MENU,SET_BTN_MENU]=useState<any>([])//按钮权限
    
    return {
        ROUTER_ARR,
        ALL_DICT,
        LIST_DICT,
        LIST_APP,
        BTN_MENU,
        SET_ROUTER_ARR,
        SET_ALL_DICT,
        SET_LIST_DICT,
        SET_LIST_APP,
        SET_BTN_MENU
    }
}
export default Model