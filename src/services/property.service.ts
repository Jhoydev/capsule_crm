import { HttpService } from '@/services/http.service';
import { ConfigService } from '@/services/config.service';
import { PaginatedResponse } from '@/types/pagination.types';
import { ApiParamsType } from '@/types/api-params.type';
import { Property } from '@/types/property.types';
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {FileUploaderResponseType} from "@/types/file-uploader.type";

export type ApiParamsPropertyType = ApiParamsType & {
    [key: string]: string | number | boolean;
};

export class PropertyService {
    public async getProperties(aOptions: ApiParamsPropertyType): Promise<PaginatedResponse<Property>> {
        let params = {};

        if (Object.keys(aOptions).length) {
            params = Object.assign(params, aOptions);
        }

        const { data } = await HttpService.getInstance().get<PaginatedResponse<Property>>(`${ConfigService.apiUrl}/properties`, { params })

        return data;
    }

    public async getProperty(id: number): Promise<Property> {
        const { data } = await HttpService.getInstance().get<Property>(`${ConfigService.apiUrl}/properties/${id}`)

        return data;
    }

    public async upload(
        body: FormData,
        config?: AxiosRequestConfig,
        id?: number | string,
    ): Promise<AxiosResponse<FileUploaderResponseType>> {
        return HttpService
            .getInstance()
            .post<FileUploaderResponseType>(`${ConfigService.apiUrl}/images/property/${id}`, body, config)
    }

    public async statsStatus(): Promise<AxiosResponse<any>> {
        return HttpService
            .getInstance()
            .get<FileUploaderResponseType>(`${ConfigService.apiUrl}/properties/stats/status`)
    }

    public async statsTypes(): Promise<AxiosResponse<any>> {
        return HttpService
            .getInstance()
            .get<FileUploaderResponseType>(`${ConfigService.apiUrl}/properties/stats/types`)
    }
}
