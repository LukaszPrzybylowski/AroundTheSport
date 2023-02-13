export class ForumCreate{

    constructor(
        public forumId: number,
        public title: string,
        public content: string,
        public photoId ?: number
    ){}
}