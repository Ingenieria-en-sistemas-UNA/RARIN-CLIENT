import decode from 'jwt-decode'
import { BaseProvider } from './BaseProvider';
import { User, Convert } from '../Models/User';

export class AuthProvider extends BaseProvider {

    
    login = async(email: string, password: string) : Promise<User | null> => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/users/login`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ email, password })
            })

            if(response.status >= 200 && response.status < 300){
                const json: any = await response.json();
                this.setToken(json.data.token);
                const user: User = { ...json.data.person, role: this.getRole() }; 
                this.setUser(user);
                return user;
            }
            throw new Error('Erro API');
        } catch (error) {
            return null;
        }
    }


    setUser = ( User: User): void => localStorage.setItem('User', Convert.UserToJson(User));

    getUser = (): User | null => {
        const userString = localStorage.getItem('User') || '';
        if(userString !== ''){
            const user: User = Convert.toUser(userString);
            return user;
        }
        return null;
    }

    getRole = () : string | null  => {
        if(this.loggedIn()){
            const { role } = decode(this.getToken());
            return role;
        }
        return null;
    }

    setToken = ( token: string): void => localStorage.setItem('id_token', token);

    getToken = (): string => localStorage.getItem('id_token') || '';

    logout = (): void => {
        localStorage.removeItem('id_token');
        localStorage.removeItem('User');
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

}