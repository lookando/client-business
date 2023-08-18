// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

type UserParams = {
    current?: number,
    dto?: {
        checkPassword?: string,
        id?: number,
        password?: string,
        realName?: string,
        roleIds?: [],
        status?: number | string,
        username?: string,
    },
    pageSize?: number,
    sort?: {}
};

type UpdateRole = {
    // 用户id
    id?: number;
    roleIds?: number[]
};

type ResetPassword = {
    // 用户id
    id?: number;
    oldPassword?: string;
    password?: string;
    password1?: string;
};

//ok
/** 获取部门树 */
export async function fetchDepTree(options?: { [key: string]: any }) {
    return request<{
        success?: boolean;
        data: API.DepTree;
    }>('/api/v1/dept/tree', {
        method: 'GET',
        ...(options || {}),
    });
}

/** 获取部门列表 */
export async function fetchDepList(options?: { [key: string]: any }) {
    return request<{
        success?: boolean;
        data?: string;
    }>('/api/v1/user/depList', {
        method: 'GET',
        ...(options || {}),
    });
}

//ok
/** 获取用户列表 */
export async function fetchList(body: UserParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/user/page', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
/** 获取用户下拉列表 */
export async function userList(body: UserParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/user/searchUser', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

//ok
/** 新增用户 */
export async function create(body: UserParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/user/create', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

//ok
/** 更新状态 */
export async function update(body: UserParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/user/update', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
export async function updatePassword(body: UserParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/user/update/password', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
export async function updateFreeze(body: {}, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/user/update/freeze', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
export async function updateThaw(body: {}, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/user/update/thaw', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
export async function updateResetPassword(body: UserParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/user/update/resetPassword', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 更新角色 */
export async function updateRole(body: UpdateRole, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/user/updateRole', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 重置密码 */
export async function resetPassword(body: ResetPassword, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/v1/user/password/modify', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

//ok
/**已授权未授权角色 */
export async function getAuthRoleList(id: string, options?: { [key: string]: any }) {
    return request<{
        success?: boolean;
        data?: string;
    }>(`/api/v1/userRole/list?id=${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}


export const APIUser = {
    fetchDepTree,
    fetchDepList,
    fetchList,
    create,
    update,
    userList,
    updatePassword,
    updateFreeze,
    updateThaw,
    updateResetPassword,
    updateRole,
    resetPassword,
    getAuthRoleList
};


