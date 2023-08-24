// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

type RoleParams = {
    id?: string;
    name?: string;
    brief?: string;
    current?: number;
    pageSize?: number;
    appId?: string;
    code?: string;
    paging?: string;//是否分页，默认为true

};

type UpdateMenu = {
    // 用户id
    roleId?: number;
    menuIds?: number[];
};

/** 获取所有菜单tree */
export async function fetchAllMenuTree(params: { appId: string }, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/auth/menu/listAllTree', {
        method: 'GET',
        params,
        ...(options || {}),
    });
}

/** 获取角色菜单tree */
export async function fetchMenuTree(params: {roleIds: string }) {
    return request<API.CommonResponse>('/api/auth/menu/listTree', {
        method: 'GET',
        params,
    });
}

/** 获取角色列表 */
export async function fetchList(params: RoleParams) {
    return request<API.CommonResponse>('/api/auth/role/page', {
        method: 'GET',
        params
    });
}

/** 新增角色 */
export async function create(data: RoleParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/auth/role/save', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}

/** 更新角色菜单tree */
export async function updateMenu(data: UpdateMenu, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/auth/role/updateRoleMenu', {
        method: 'POST',
        data,
        ...(options || {}),
    });
}

/** 删除角色 */
export async function deleteRole(id: string, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/auth/role/delete/${id}`, {
        method: 'POST',
        data: id,
        ...(options || {}),
    });
}

/**更改角色名字 */
export async function updateData(body: RoleParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/auth/role/update`, {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 查询字典 */
export async function mapAllDict(params?: {types: string }) {
    return request<API.CommonResponse>('/api/phecda/sy_dict/mapAllDict', {
        method: 'GET',
        params,
    });
}
/** 查询字典简便版 */
export async function listMap(params?: {types: string }) {
    return request<API.CommonResponse>('/api/phecda/sy_dict/listMap', {
        method: 'GET',
        params,
    });
}
/**菜单-获取当前登录人页面按钮权限 */
export async function getAuthButton(params: { appId: string }) {
    return request<API.CommonResponse>('/api/auth/menu/getAuthButton', {
        method: 'GET',
        params
    });
}
/**菜单-获取页面路由菜单 */
export async function listRoutes(params: { appId: string }) {
    return request<API.CommonResponse>('/api/auth/menu/listRoutes', {
        method: 'GET',
        params
    });
}
export const APIRole = {
    fetchList,
    create,
    deleteRole,
    updateData,
    fetchAllMenuTree,
    fetchMenuTree,
    updateMenu,
    mapAllDict,
    listMap,
    getAuthButton,
    listRoutes
};
