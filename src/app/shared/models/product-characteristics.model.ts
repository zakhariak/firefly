import { IProdCharacter } from '../interfaces/product-characteristics.interface';


export class ProdCharacter implements IProdCharacter {
    constructor(
        public id: string,
        public nameUA: string,
        public nameEN: string,
        public select: Array<string>
    ) { }
}