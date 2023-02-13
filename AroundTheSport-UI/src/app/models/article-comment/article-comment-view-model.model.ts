export class ArticleCommentViewModel{

    constructor(
        public parentArticleCommentId: number | null,
        public articleCommentId: number,
        public articleId: number,
        public content: string,
        public username: string,
        public publishDate: Date | null,
        public updateDate: Date| null, 
        public isEditable: boolean = false,
        public deleteConfirm: boolean = false,
        public isReplying: boolean = false,
        public comments: ArticleCommentViewModel[]      
    ){}
}