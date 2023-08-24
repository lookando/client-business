// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

type UserParams = {
    current?: number,
    checkPassword?: string,
    id?: number,
    password?: string,
    realName?: string,
    roleIds?: [],
    status?: number | string,
    username?: string,
    pageSize?: number,
    deptId?: string
};

type UpdateRole = {
    appId: string,
    userId: string;
    roleIds: any[]
};

type ResetPassword = {
    // 用户id
    id?: number;
    oldPassword?: string;
    password?: string;
    password1?: string;
};

/** 获取部门树 */
export async function fetchDepTree() {
    return request<API.CommonResponse>('/api/auth/dept/depTree', {
        method: 'GET',
    });
}
/** 获取用户列表 */
export async function fetchList(params: UserParams) {
    return request<API.CommonResponse>('/api/auth/user/page', {
        method: 'GET',
        params
    });
}

/** 新增用户 */
export async function create(body: UserParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/auth/user/save', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
//更新密码
export async function updatePassword(body: UserParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/auth/user/password/update', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
//修改密码
export async function updateResetPassword(body: UserParams, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/auth/user/password/update', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

//冻结解冻
export async function updateStatus(body: { id: string, status: number }, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/auth/user/status/update', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}


/** 更新角色 */
export async function updateRole(body: UpdateRole, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/auth/user/updateUserRole', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/** 重置密码 */
export async function resetPassword(body: ResetPassword, options?: { [key: string]: any }) {
    return request<API.CommonResponse>('/api/auth/user/password/update', {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}

/**已授权未授权角色 */
export async function getAuthRoleList(params: { appId: string, userId: string }) {
    return request<API.CommonResponse>('/api/auth/user/listUserRole', {
        method: 'GET',
        params
    });
}
/**获取所有的树 */
export async function getListAllTree(params: { appId: string }) {
    return request<API.CommonResponse>('/api/auth/menu/listAllTree', {
        method: 'GET',
        params
    });
}

export const APIUser = {
    updateRole,
    updateStatus,
    create,
    resetPassword,
    fetchList,
    getAuthRoleList,
    fetchDepTree,
    getListAllTree,
    updatePassword,
    updateResetPassword,
    

};


