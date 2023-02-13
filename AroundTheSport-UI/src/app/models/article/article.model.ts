export class Article{

    constructor(
        public articleId: number,
        public title: string,
        public content: string,
        public applicaitonUserId: number,
        public username: string,
        public publishDate: Date,
        public updateDate: Date,
        public deleteConfirm: boolean = false,
        public photoId?: number,
    ){}
}