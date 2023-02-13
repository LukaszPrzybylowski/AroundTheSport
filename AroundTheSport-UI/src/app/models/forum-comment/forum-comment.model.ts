export class ForumComment{

    constructor(
        public forumId: number,
        public forumCommentId: number,
        public applicationUserId: number,
        public username: string,
        public content: string,
        public publishDate: Date,
        public updateDate: Date,
        public parentForumCommentId?: number
    ){}
}