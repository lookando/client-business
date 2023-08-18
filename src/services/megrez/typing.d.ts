// @ts-ignore
/* eslint-disable */
declare namespace API {
    type CommonResponse = {
        success?: boolean;
        data?: any;

        code: string;
        message?: string;

        current?: number;
        pageSize?: number;
        total?: number;
        errorType?: string;
    };
    type DepTree = {
        id?: string;
        parentid?: string;
        titleabbr?: string;
    };
    type PageParams = {
        current?: number;
        pageSize?: number;
    };
}