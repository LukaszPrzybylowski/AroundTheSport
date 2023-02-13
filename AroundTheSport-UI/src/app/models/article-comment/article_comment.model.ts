export class ArticleComment{

    constructor(
        public articleCommentId: number,
        public articleId: number,
        public content: string,
        public username: string,
        public applicationUserId: number,
        public publishDate: Date,
        public updateDate: Date,
        public parentArticleCommentId?: number,
    ){}
}