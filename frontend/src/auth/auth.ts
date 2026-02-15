// const function  useAuthContext() = () => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//
//     const login = () => {
//         // Simulate a login process
//         setIsLoggedIn(true);
//     };
//
//     const logout = () => {
//         // Simulate a logout process
//         setIsLoggedIn(false);
//     };
//
//     return {
//         isLoggedIn,
//         login,
//         logout,
//     };
// }
//

class AuthContext {
    isLoggedIn: boolean;

    constructor() {
        this.isLoggedIn = false;
    }

    login() {
        this.isLoggedIn = true;
    }

    logout() {
        this.isLoggedIn = false;
    }

    public static instance: AuthContext;

    public static getInstance(): AuthContext {
        if (!AuthContext.instance) {
            AuthContext.instance = new AuthContext();
        }
        return AuthContext.instance;
    }

    private AddItem(): void {}
}
