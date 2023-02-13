export class ApplicationUserCreate{
    
    constructor(
        public username: string,
        public password: string,
        public email: string,
        public profession: string,
        public fullname?: string,
        public lastname?: string,
        public company?: string,       
    ){}
}