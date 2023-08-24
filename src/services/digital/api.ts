// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
interface loginParams {
        username:string;
        password:string;
        sessionUid: string;
        sessionCode: string;
}
/** 获取当前的用户 POST /api/v1/user/refresh*/
export async function fetchCurrentUser(options?: { [key: string]: any }) {
    return request<{
        success?: boolean;
        data: any;
    }>('/api/auth/refreshToken', {
        method: 'POST',
        ...(options || {}),
    });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
    return request<Record<string, any>>('/api/login/outLogin', {
        method: 'POST',
        ...(options || {}),
    });
}

/** 登录接口 POST /api/v1/user/login */
export async function login(body: loginParams, options?: { [key: string]: any }) {
    return request<any>('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}
