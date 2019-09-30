export interface Person {
    id:       number;
    name:     string;
    lastName: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toPerson(json: string): Person {
        return JSON.parse(json);
    }

    public static personToJson(value: Person): string {
        return JSON.stringify(value);
    }
}