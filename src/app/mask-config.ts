import { NgxMaskModule, IConfig } from 'ngx-mask'

export const maskConfig: () => Partial<IConfig> = () => {
    return {
        validation: true,
    };
};