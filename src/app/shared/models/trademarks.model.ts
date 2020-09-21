import { ITrademarks } from '../interfaces/trademarks.interface';

export class Trademarks implements ITrademarks {
    constructor(
        public id: string,
        public name: string,
        public country: string,
        public logo: string
    ) { }
}