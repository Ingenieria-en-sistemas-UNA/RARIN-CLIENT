export interface User {
    id:       number;
    name:     string;
    lastName: string;
    role: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toUser(json: string): User {
        return JSON.parse(json);
    }

    public static UserToJson(value: User): string {
        return JSON.stringify(value);
    }
}