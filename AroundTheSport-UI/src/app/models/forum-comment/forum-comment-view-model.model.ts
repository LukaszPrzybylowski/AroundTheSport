export class ForumCommentViewModel{

    constructor(
        public parentForumCommentId: number,
        public forumCommmentId: number,
        public forumId: number,
        public content: string,
        public username: string,
        public applicationUserId: number,
        public publishDate: Date,
        public updateDate: Date, 
        public isEditable: boolean = false,
        public deleteConfirm: boolean = false,
        public isReplying: boolean = false,
        public comments: ForumCommentViewModel[]      
    ){}
}