import { parse } from 'querystring';
import moment from 'moment';

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/* eslint-disable no-bitwise */
export const UUIDGenerator = (len = 16, compat = false) => {
  // const { NODE_ENV } = process.env;
  // if (NODE_ENV === 'development') {
  //   return 'testUUID';
  // }

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];

  if (compat) {
    for (let i = 0; i < len; i += 1) {
      uuid[i] = chars[0 | (Math.random() * 10)];
    }
  } else {
    // rfc4122, version 4 form
    // rfc4122 requires these characters
    uuid[8] = '-';
    uuid[13] = '-';
    uuid[18] = '-';
    uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (let i = 0; i < 36; i += 1) {
      if (!uuid[i]) {
        const r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
};

export const fileExtention = (fileName: string) =>
  fileName?.split('.')?.pop()?.substring(0, 16)?.toLowerCase();

export const tLog = (() => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV !== 'development') {
    return () => {};
  }

  return Function.prototype.bind.call(console.log, console);
})();

export const localTime = (timeStr: string) => {
  return moment(timeStr).format('YYYY/MM/DD HH:mm:ss');
};

export const getOssFileName = (url?: string) => {
  if (!url) return '';

  const idx1 = url?.lastIndexOf('/');

  return url?.substring(idx1 + 1);
};

export const timeSizeFormat = (secs: number) => {
  const h = Math.round((secs / 3600) % 24);
  const m = Math.round((secs / 60) % 60);
  const sec = Math.round(secs % 60);

  let result = '';
  if (h > 0) {
    result = h + '小时' + result;
  }
  if (m > 0) {
    result = result + m + '分钟';
  }
  if (sec > 0) {
    result = result + sec + '秒';
  }

  return result;
};

export const fileSizeFormat = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`);
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
};

export const dictTranslate = (dicts: any, type: string, code: string) => {
  return dicts[`${type}`]?.find((d: any) => d.dictCode === code)?.dictValue || '-';
};

export const isAdmin = (currentUser: any) => {
  return currentUser?.role === 'ROLE_ADMIN' || currentUser?.role === 'ROLE_TECHNICIST';
};

export const omit = (obj: any, uselessKeys: string[]) =>
  Object.keys(obj).reduce((acc, key) => {
    return uselessKeys.includes(key) ? acc : { ...acc, [key]: acc[key] };
  }, {});

export const localDate = (timeStr: string) => {
  return moment(timeStr).format('YYYY/MM/DD');
};
