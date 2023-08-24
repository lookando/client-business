// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

type ApplicationParams = {
    title?: string;
    developerName?: string;
    developerOaAccount?: string;
    current?: number;
    pageSize?: number;
    paging?: string;//是否分页，默认为true

};
type setApplication = {
    id: string;
    title: string;
    brief: string;
    deptId: string;
    developerName: string;
    developerOaAccount: string;
    comment?: string
}

/** 应用管理分页 */
export async function appPage(params: ApplicationParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/phecda/app/page', {
        method: 'GET',
        params,
        ...(options || {}),
    });
}

/**应用管理修改*/
export async function appUpdate(body: setApplication, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/phecda/app/update`, {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/**应用管理新增*/
export async function appSave(body: setApplication, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/phecda/app/save`, {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
/**应用-鉴权KEY重置*/
export async function authKeyReset(data: { id: string }, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/phecda/app/auth_key/reset`, {
        method: 'POST',
        data,
        ...(options || {}),
    });
}
/** 应用-根据id查询 */
export async function getById(id: string) {
    return request<API.CommonResponse>(`/api/phecda/app/getById/${id}`, {
        method: 'GET',
        id
    });
}
/** 应用-系统名称列表 */
export async function listAppIdName() {
    return request<API.CommonResponse>(`/api/phecda/app/listAppIdName`, {
        method: 'GET',
    });
}

export const APIApplication = {
    appPage,//分页
    appUpdate,//修改
    appSave,//新增
    authKeyReset,//应用-鉴权KEY重置
    getById,//根据id查询应用
    listAppIdName,//应用-系统名称列表

};
