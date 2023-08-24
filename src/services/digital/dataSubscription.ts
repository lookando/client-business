// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

type SubscriptionParams = {
    startDate?: string;
    endDate?: string;
    appId?: string;
    applyUserName?: string;
    developerName?:string;
    status?: string;
    current?: number;
    pageSize?: number;
    paging?: string;//是否分页，默认为true

};
type setSubscription = {
    id?: string;
    appId: string;
    serverTypes?: Array<any>
    fieldIds: Array<any>
}

/** 订阅申请分页 */
export async function subscriptionPage(params: SubscriptionParams) {
    return request<API.CommonResponse>('/api/phecda/subscription/page', {
        method: 'GET',
        params,
    });
}
/** 订阅详情分页 */
export async function subscriptionDetailsPage(params: SubscriptionParams) {
    return request<API.CommonResponse>('/api/phecda/subscription_details/page', {
        method: 'GET',
        params
    });
}

/**申请删除*/
export async function subscriptionDelete(id: string, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/phecda/subscription/delete/${id}`, {
        method: 'POST',
        data: id,
        ...(options || {}),
    });
}
/**审批不通过*/
export async function subscriptionNoPass(id: string, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/phecda/subscription/no_pass/${id}`, {
        method: 'POST',
        data: id,
        ...(options || {}),
    });
}
/**审批通过*/
export async function subscriptionPass(id: string, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/phecda/subscription/pass/${id}`, {
        method: 'POST',
        data: id,
        ...(options || {}),
    });
}
/**新增*/
export async function subscriptionAdd(body: setSubscription, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/phecda/subscription/save`, {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
/**修改*/
export async function subscriptionUpdate(body: setSubscription, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/phecda/subscription/update`, {
        method: 'POST',
        data: body,
        ...(options || {}),
    });
}
/**作废*/
export async function detailsDiscard(id: string, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/phecda/subscription_details/discard/${id}`, {
        method: 'POST',
        data: id,
        ...(options || {}),
    });
}
/**生效*/
export async function detailsRun(id: string, options?: { [key: string]: any }) {
    return request<API.CommonResponse>(`/api/phecda/subscription_details/run/${id}`, {
        method: 'POST',
        data: id,
        ...(options || {}),
    });
}
/**订阅详情-根据id查询*/
export async function getDetails(id: string, options?: { [key: string]: any }) {
    // return request<API.CommonResponse>(`/phecda/subscription_details/details/${id}`, {
    return request<API.CommonResponse>(`/api/phecda/subscription/details/${id}`, {
        method: 'GET',
        // params: id,
        // ...(options || {}),
    });
}
/**申请详情-根据id查询*/
export async function getDetailsDetail(id: string, options?: { [key: string]: any }) {
    // return request<API.CommonResponse>(`/phecda/subscription/details/${id}`, {
    return request<API.CommonResponse>(`/api/phecda/subscription_details/details/${id}`, {
        method: 'GET',
        // params: id,
        // ...(options || {}),
    });
}

export const APISubscription = {
    subscriptionPage,//分页
    subscriptionDetailsPage,//详情分页
    subscriptionDelete,//删除
    subscriptionNoPass,//审批不通过
    subscriptionPass,//审批通过
    subscriptionAdd,//新增
    subscriptionUpdate,//修改
    detailsDiscard,//作废
    detailsRun,//生效
    getDetails,//获取订阅详情
    getDetailsDetail,//获取申请详情
};
