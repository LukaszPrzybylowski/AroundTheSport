export class ArticleCreate{

    constructor(
        public articleId: number,
        public title: string,
        public content: string,
        public photoId?: number,
    ){}
}