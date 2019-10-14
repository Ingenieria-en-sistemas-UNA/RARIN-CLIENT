import { BehaviorSubject } from 'rxjs';
import { AuthProvider } from '../Providers/AuthProvider';
import { User } from '../Models/User';

export class AuthBloc {

    private provider: AuthProvider = new AuthProvider()
    private sesionStateController = new BehaviorSubject<boolean>(false);
    private userUserController = new BehaviorSubject<User | null>(null);


    public sesionStateStream = () => this.sesionStateController.asObservable()
    public userUserStateStrem = () => this.userUserController.asObservable()

    public load = () => {
        const User: User | null = this.provider.getUser();
        if (this.provider.loggedIn() && User != null) {
            this.sesionStateController.next(true);
            this.userUserController.next(User);
        }
    }

    public login = async (email: string, password: string): Promise<void> => {
        const user: User | null = await this.provider.login(email, password);
        if (user != null) {
            this.sesionStateController.next(true);
            this.userUserController.next(user);
        } else {
            this.sesionStateController.next(false);
            this.userUserController.next(null);
        }
    }

    public isLoggedin = (): boolean => {
        return this.provider.loggedIn();
    }

    public isAdmin = () : boolean => {
        const user: User | null = this.userUserController.value;
        if(user){
            return user.role === "Admin";
        }
        return false;
    }

    public logout = async () => {
        this.provider.logout();
        this.sesionStateController.next(false);
        this.userUserController.next(null);
    }

    public dispose = () => {
        this.sesionStateController.complete();
        this.userUserController.complete();
    }

}