import { request } from 'umi';

/** 获取用户列表 */
export async function fetInfoClass( options?: { [key: string]: any }) {
  return request<API.CommonResponse>('/api/infoClassPages', {
      method: 'POST',
      // data: body,
      ...(options || {}),
  });
}


export const APIInfocollection = {
  fetInfoClass, //项目概况-项目查询

}