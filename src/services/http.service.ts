import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpService {
    private static _instance: HttpService;
    private readonly mAxiosInstance: AxiosInstance;

    public static getInstance(): HttpService {
        if (!this._instance) {
            this._instance = new this();
        }

        return this._instance;
    }

    private constructor() {
        this.mAxiosInstance = Axios.create({
            baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            withCredentials: true,
            withXSRFToken: true,
        })
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.mAxiosInstance.get<T>(url, config);
    }
}