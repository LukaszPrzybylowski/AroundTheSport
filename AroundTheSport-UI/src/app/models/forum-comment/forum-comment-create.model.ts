export class ForumCommentCreate{

    constructor(
        public forumId: number,
        public forumCommentId: number,
        public content: string,
        public parentForumCommentId?: number    
    ){
    }
}