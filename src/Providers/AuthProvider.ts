import decode from 'jwt-decode'
import { BaseProvider } from './BaseProvider';
import { User, Convert } from '../Models/User';
import { ResponseUser } from '../Models/Responses';
import { Client } from '../Models/Client';

export class AuthProvider extends BaseProvider {


    signup = async (client: Client, email: string, password: string): Promise<ResponseUser> => {
        client.vouchers = [];
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/users/signup`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ email, password, client: { ...client, shoppingCar: {} } })
            })

            if (response.status >= 200 && response.status < 300) {
                const { data: { token, client } }: any = await response.json();
                this.setToken(token);
                const user: User = { client, role: this.getRole() };
                this.setUser(user);
                return { ok: true, user };
            }
            let { ok, errors } = await response.json();
            if( errors[0].code ){
                errors = errors.map(({ description }: any): string =>  description );
            }
            return { ok, errors }
        } catch (error) {
            return { ok: false, errors: ['Algo ha ocurrido al tratar de registrarse'] };
        }
    }

    login = async (email: string, password: string): Promise<ResponseUser> => {
        try {
            const response: Response = await fetch(`${this._baseUrlApi}/api/users/login`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ email, password })
            })

            if (response.status >= 200 && response.status < 300) {
                const { data: { token, client } }: any = await response.json();
                this.setToken(token);
                const user: User = { client, role: this.getRole() };
                this.setUser(user);
                return { ok: true, user };
            }
            let { ok, errors } = await response.json();

            if( errors.code ){
                errors = [ errors.description ]
            }
            return { ok, errors }
        } catch (error) {
            return { ok: false, errors: ['Algo ha ocurrido al tratar de iniciar sesión'] };
        }
    }


    setUser = (User: User): void => localStorage.setItem('User', Convert.UserToJson(User));

    getUser = (): User | null => {
        const userString = localStorage.getItem('User') || '';
        if (userString !== '') {
            const user: User = Convert.toUser(userString);
            return user;
        }
        return null;
    }

    getRole = (): string => {
        if (this.loggedIn()) {
            const { role } = decode(this.getToken());
            return role;
        }
        return '';
    }

    setToken = (token: string): void => localStorage.setItem('id_token', token);

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