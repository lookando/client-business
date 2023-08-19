import { request } from 'umi';

type PageParams = {
  current?: number;
  pageSize?: number;
};

/** 获取列表 */
export async function fetInfoClass(body:PageParams, options?: { [key: string]: any }) {
  return request<API.CommonResponse>('/api/infoClassPages', {
      method: 'POST',
      data: body,
      ...(options || {}),
  });
}
/** 保存 */
export async function saveInfoClass(body:any, options?: { [key: string]: any }) {
  return request<API.CommonResponse>('/api/saveInfoClass', {
      method: 'POST',
      data: body,
      ...(options || {}),
  });
}


export const APIInfocollection = {
  fetInfoClass, //项目概况-项目查询
  saveInfoClass
}