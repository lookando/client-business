// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

type DataManageParams = {
    resource?: string;
    field?: string;
    brief?: string;
    current?: number;
    pageSize?: number;
    paging?: string;//是否分页，默认为true

};
type setDataManage = {
    dtoList: [
        {
            id: string;
            security: string;
            sourceSys: string;
            deptId: string;
        }
    ]
}

/** 数据管理分页 */
export async function resourceField(params: DataManageParams) {
    return request<API.CommonResponse>('/api/phecda/resource_field/page', {
        method: 'GET',
        params
    });
}

/**批量修改*/
export async function batchUpdate(body: setDataManage, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/phecda/resource_field/batchUpdate`, {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
/** 资源-根据id查询 */
export async function getById(id: string) {
    return request<API.CommonResponse>(`/api/phecda/resource_field/getById/${id}`, {
        method: 'GET',
        id
    });
}
export const APIDataManage = {
    resourceField,//分页
    batchUpdate,//批量修改
    getById,//根据id查询

};
