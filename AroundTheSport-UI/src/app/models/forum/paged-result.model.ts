export class PageResultForum<T>{

    constructor(
        public items: Array<T>,
        public totalCount: number
    ){}
}