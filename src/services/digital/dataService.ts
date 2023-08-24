// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

type DataService = {
    startDate?: string;
    endDate?: string;
    createdBy?: string;
    logType?: string;
    appId?: string;
    bizType?: string;
    pageSize?: number;
    current?: number;
    paging?: string;
};

/** 接口调用 */
export async function logPage(params: DataService) {
    return request<API.CommonResponse>('/api/phecda/sy_user_log/page', {
        method: 'GET',
        params
    });
}

export const APIDataService = {
    logPage,//接口调用


};
