import decode from 'jwt-decode'
import { BaseProvider } from './BaseProvider';
import { Person, Convert } from '../Models/Person';

export class AuthProvider extends BaseProvider {

    
    login = async(email: string, password: string) : Promise<Person | null> => {
        try {
            const response: Response = await fetch(`${this._baseUrl}/api/users/login`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ email, password })
            })

            if(response.status >= 200 && response.status < 300){
                const json: any = await response.json();
                const person: Person = json.data.person; 
                this.setPerson(person);
                this.setToken(json.data.token);
                return person;
            }
            throw new Error('Erro API');
        } catch (error) {
            return null;
        }
    }


    setPerson = ( person: Person): void => localStorage.setItem('person', Convert.personToJson(person));

    getPerson = (): Person | null => {
        const personString = localStorage.getItem('person') || '';
        if(personString !== ''){
            const person: Person = Convert.toPerson(personString);
            return person;
        }
        return null;
    }

    setToken = ( token: string): void => localStorage.setItem('id_token', token);

    getToken = (): string => localStorage.getItem('id_token') || '';

    logout = (): void => {
        localStorage.removeItem('id_token');
        localStorage.removeItem('person');
    }

    loggedIn = (): boolean => {
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token)
    }
    
    isTokenExpired = (token: string) => {
        try {
            const decoded: any = decode(token)
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true
            }
            else
                return false
        }
        catch (err) {
            return false
        }
    }
    _checkStatus = (response: Response) => {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            return response.json().then((json) => {
                let error: any = new Error(json.message || response.statusText)
                error.response = response
                throw error
            })
        }
    }

}