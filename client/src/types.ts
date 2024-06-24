import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options
{
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

export interface ItemTag
{
    id: number,
    label: string
}
export interface Item
{
    id: number,
    tagsIds: number[]
}
export interface Drawer
{
    id: number,
    x: number,
    y: number,
    itemId: number,
    itemCount: number
}