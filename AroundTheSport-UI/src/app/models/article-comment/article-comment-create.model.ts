export class ArticleCommentCreate{

    constructor(
        public articleCommentId: number,
        public articleId: number,
        public content: string,
        public parentArticleCommentId?: number,
    ){}
}