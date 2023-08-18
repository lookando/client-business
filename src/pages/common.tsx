import { APIUser } from '@/services/megrez/user';
/* 请求树结构 */
const requestDepartment = () => {
    const treeList: any = sessionStorage.getItem('treeList');
    if (treeList) {
        return JSON.parse(treeList);
    } else {
        APIUser.fetchDepTree().then((res) => {
            sessionStorage.setItem('treeList', JSON.stringify(res.data));
            return res.data;
        });
    }
};
/* 获取树结构所选数据 */
const getTreeSelection = (val: any) => {
    return val;
}

export const commonAPI = { requestDepartment, getTreeSelection };