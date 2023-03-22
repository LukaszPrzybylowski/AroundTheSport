export class ApplicationUserUpdate{

    constructor(
        public fullname: string | null,
        public lastname: string | null,
        public company: string | null,
        public profession: string | null,
    ) {}
}