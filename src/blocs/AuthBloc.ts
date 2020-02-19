import { BehaviorSubject } from 'rxjs';
import { AuthProvider } from '../Providers/AuthProvider';
import { User } from '../Models/User';
import { ResponseUser } from '../Models/Responses';
import { Error } from '../Models/Errors';
import { Client } from '../Models/Client';

export class AuthBloc {

    private provider: AuthProvider = new AuthProvider()
    private sesionStateController = new BehaviorSubject<boolean>(false);
    private loadingController = new BehaviorSubject<boolean>(false);
    private errorsController = new BehaviorSubject<Error[]>([]);
    private userUserController = new BehaviorSubject<User | null>(null);


    public sesionStateStream = () => this.sesionStateController.asObservable()
    public userStrem = () => this.userUserController.asObservable()
    public loadingStrem = () => this.loadingController.asObservable()
    public errorsStrem = () => this.errorsController.asObservable()

    public cleanErrors = () => {
        this.errorsController.next([]);
    }

    public load = () => {
        const User: User | null = this.provider.getUser();
        if (this.provider.loggedIn() && User != null) {
            this.userUserController.next(User);
            this.sesionStateController.next(true);
        }
    }

    public getClient = (): Client => {
        return (this.userUserController.value as User)!.client;
    }

    public login = async (email: string, password: string): Promise<boolean> => {
        this.loadingController.next(true);
        const response: ResponseUser = await this.provider.login(email, password);
        return this.tryConnect(response);
    }
    
    public tryConnect = (response: ResponseUser): boolean => {
        let logged: boolean = false;
        let errors: Error[] = [];
        if(response.ok){
            if (response.user) {
                this.sesionStateController.next(true);
                this.userUserController.next(response.user);
                logged = true;
            } else {
                errors = [{ message: 'Algo ha ocurrido con el usuario'}];
            }
        } else {
            if(response.errors){
                errors = response.errors.map((message: string): Error => ({ message }));
            } else {
                errors = [{ message: 'Algo ha ocurrido'}];
            }
        }
        if(errors.length > 0){
            this.errorsController.next(errors);
        }
        this.loadingController.next(false)
        return logged
    }

    public signup = async (client: Client, email: string, password: string): Promise<boolean> => {
        this.loadingController.next(true);
        const response: ResponseUser = await this.provider.signup(client, email, password);
        return this.tryConnect(response);
    }

    public isLoggedin = (): boolean => {
        return this.provider.loggedIn();
    }

    public isAdmin = () : boolean => {
        const user: User | null = this.userUserController.value;
        if(user){
            return user.role === "Admin";
        }
        return this.provider.getRole() === "Admin";
    }

    public logout = () => {
        this.provider.logout();
        this.sesionStateController.next(false);
        this.userUserController.next(null);
    }

    public dispose = () => {
        this.sesionStateController.complete();
        this.userUserController.complete();
        this.loadingController.complete();
    }

}