import { IBlog } from '../interfaces/blog.interface';


export class Blog implements IBlog {
    constructor(
        public id: any,
        public title: string,
        public text: string,
        public date: string,
        public image: string
    ) { }
}