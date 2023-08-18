// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

type RoleParams = {
    // 角色id
    id?: number;
    // 角色编号
    name?: string;
    // 角色名称
    brief?: string;
    current?: number;
    pageSize?: number;
};

type UpdateMenu = {
    // 用户id
    roleId?: number;
    menuIds?: number[];
};

/**获取所有角色菜单 */
export async function fetchMenuList(body: RoleParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/role/menu/list', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 获取所有菜单tree */
export async function fetchAllMenuTree(options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/permission/list', {
        method: 'GET',
        ...(options || {}),
    });
}

//ok
/** 获取角色菜单tree */
export async function fetchMenuTree(body: [], options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/rolePermission/list', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

//ok
/** 获取角色列表 */
export async function fetchList(body: RoleParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/role/page', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

//ok
/** 新增角色 */
export async function create(body: RoleParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/role/create', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 更新角色菜单tree */
export async function updateMenu(body: UpdateMenu, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/rolePermission/update', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

//ok
/** 删除角色 */
export async function deleteRole(body: RoleParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/role/delete', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

//ok
/**更改角色名字 */
export async function setRoleName(body: RoleParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/v1/role/update`, {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

export const APIRole = {
    fetchMenuList,
    fetchAllMenuTree,
    fetchMenuTree,
    fetchList,
    create,
    deleteRole,
    updateMenu,
    setRoleName
};
