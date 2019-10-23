export interface Person{
    id : number;
    name: string;
    lastName: string;
}

export class PersonConvert {
    public static toPerson(json: string): Person {
        return JSON.parse(json);
    }

    public static PersonToJson(value: Person): string {
        return JSON.stringify(value);
    }

}
