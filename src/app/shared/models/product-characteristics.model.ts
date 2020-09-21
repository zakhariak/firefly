import { IProdCharacter } from '../interfaces/product-characteristics.interface';


export class ProdCharacter implements IProdCharacter {
    constructor(
        // public bodyMaterial: { name: 'матеріал корпусу', char: Array<string> },
        // public plafondMaterial: Array<string> = ["-"],
        // public bodyColor: Array<string> = ["-"],
        // public plafondColor: Array<string> = ["-"],
        // public height: Array<string> = ["-"],
        // public allHeight: Array<string> = ["-"],
        // public length: Array<string> = ["-"],
        // public width: Array<string> = ["-"],
        // public diameter: Array<string> = ["-"],
        // public outside: Array<string> = ["-"],
        // public typeOfLightSource: Array<string> = ["-"],
        // public lampBase: Array<string> = ["-"],
        // public ledServiceLife: Array<string> = ["-"],
        // public lampCount: Array<string> = ["-"],
        // public lampsIncluded: Array<string> = ["-"],
        // public lampPower: Array<string> = ["-"],
        // public luminousFlux: Array<string> = ["-"],
        // public dimer: Array<string> = ["-"],
        // public remoteСontrol: Array<string> = ["-"],
        // public degreeOfProtection: Array<string> = ["-"],
        // public power: Array<string> = ["-"],
        // public powerSupply: Array<string> = ["-"]
        public id: string,
        public name: string,
        public select: Array<string>
    ) { }
}