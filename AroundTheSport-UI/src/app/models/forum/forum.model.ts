import { NumberValueAccessor } from "@angular/forms";

export class Forum{

    constructor(
        public applicationUserId: number,
        public forumId: number,
        public username: string,
        public title: string,
        public content: string,
        public publishDate: Date,
        public updateDate: Date,
        public deleteConfirm: boolean = false,
        public photoId?: number,
    ){}
}