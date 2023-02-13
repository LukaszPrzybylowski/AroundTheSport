export class PageResultArticle<T>{

    constructor(
        public items: Array<T>,
        public totalCount: number
    ){}
}