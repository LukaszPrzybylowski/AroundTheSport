export class Avatar{

    constructor(
        public avatarId: number,
        public applicationUserId: number,
        public avatarUrl: string,
        public avatarPublicId: string,
        public deleteConfirm: boolean = false
    ){}
}

