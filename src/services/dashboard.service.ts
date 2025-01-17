import { HttpService } from '@/services/http.service';
import { ConfigService } from '@/services/config.service';
import { DashboardResponseType } from '@/types/dashboard.type';

export class DashboardService {
    public async get(): Promise<DashboardResponseType> {
        const { data } = await HttpService
            .getInstance()
            .get<DashboardResponseType>(`${ConfigService.apiUrl}/dashboard`)

        return data;
    }
}
