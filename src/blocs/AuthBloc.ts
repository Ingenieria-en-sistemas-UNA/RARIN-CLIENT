import { BehaviorSubject } from 'rxjs';
import { AuthProvider } from '../Providers/AuthProvider';
import { Person } from '../Models/Person';

export class AuthBloc {

    private provider: AuthProvider = new AuthProvider()
    private sesionStateController = new BehaviorSubject<Boolean>(false);
    private userPersonController = new BehaviorSubject<Person | null>(null);


    public sesionStateStream = () => this.sesionStateController.asObservable()
    public userPersonStateStrem = () => this.userPersonController.asObservable()

    public load = () => {
        const person: Person | null = this.provider.getPerson();
        if (this.provider.loggedIn() && person != null) {
            this.sesionStateController.next(true);
            this.userPersonController.next(person);
        }
    }

    public login = async (email: string, password: string): Promise<void> => {
        const user: Person | null = await this.provider.login(email, password);
        if (user != null) {
            this.sesionStateController.next(true);
            this.userPersonController.next(user);
        } else {
            this.sesionStateController.next(false);
            this.userPersonController.next(null);
        }
    }

    public logout = async () => {
        this.provider.logout();
        this.sesionStateController.next(false);
        this.userPersonController.next(null);
    }

    public dispose = () => {
        this.sesionStateController.complete();
        this.userPersonController.complete();
    }

}