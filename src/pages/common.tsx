import { APIUser } from '@/services/digital/user';

//请求部门树
const requestDepartment = () => {
    const treeList: any = sessionStorage.getItem('treeList');
    // if (treeList) {
    //     return JSON.parse(treeList);
    // } else {
    //     APIUser.fetchDepTree().then((res) => {
    //         sessionStorage.setItem('treeList', JSON.stringify(res.data));
    //         return res.data;
    //     });
    // }
};

//按钮权限
const btnAuthority = (url: string) => {
    const menu = JSON.parse(sessionStorage.getItem('BTNMENU'));
    if(Object.hasOwn(menu,url)){
        if(menu[url]){
            return true;
        }else{
            return false;  
        }
    }else{
        return true;
    }   
}

//判断按钮是否隐藏
const btnNone = (str: string, list: []) => {
    // if (str) {
    //     const res = list?.includes(str);
    //     return res;
    // }
}

//判断按钮是否有权限

export const commonAPI = { requestDepartment, btnAuthority, btnNone };