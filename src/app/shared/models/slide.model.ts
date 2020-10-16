import { ISlide } from '../interfaces/slide.interface';


export class Slide implements ISlide {
    constructor(
        public id: string,
        public link: string
    ) { }
}