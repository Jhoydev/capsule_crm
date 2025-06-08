import { FormData } from '@/stores/useFormStepStore';

export const formDataToApiPayload = (data: Partial<FormData>) => {
    return {
        pais: data.selectCountry?.pais || '',
        usuario: {
            nombre: data.personalData?.nombre || '',
            email: data.personalData?.email || '',
        },
        empresa: {
            nombre: data.company?.nombreEmpresa || '',
            cif: data.company?.cif || '',
        },
        facturacion: {
            direccion: data.billing?.direccionFacturacion || '',
        },
        pago: {
            metodo: data.payment?.metodoPago || '',
        },
    };
};