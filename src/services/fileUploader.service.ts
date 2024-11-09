import { HttpService } from '@/services/http.service';
import { ConfigService } from '@/services/config.service';
import { Property } from '@/types/property.types';
import { FileUploaderResponseType } from '@/types/file-uploader.type';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export class FileUploaderService {
    public async upload(
        body: FormData,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<FileUploaderResponseType>> {
        return HttpService
            .getInstance()
            .post<FileUploaderResponseType>(`${ConfigService.apiUrl}/images/user`, body, config)
    }

    public async getProperty(id: number): Promise<Property> {
        const { data } = await HttpService.getInstance().get<Property>(`${ConfigService.apiUrl}/properties/${id}`)

        return data;
    }
}
