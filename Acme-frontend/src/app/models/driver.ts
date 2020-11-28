export class Driver{
    constructor(
        public id: string,
        public firstName: string,
        public surnames: string,
        public address: string,
        public phone: string,
        public city: string,
        public secondName?: string
    ){}
}