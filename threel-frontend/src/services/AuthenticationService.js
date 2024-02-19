import threel_api from '../backend/api';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ encodingType: 'aes' });

class AuthenticationService {
    constructor() {
        this.threel_api = threel_api;
    }

    storeUser(user) {
        try {
            ls.set('user', user);
        } catch (error) {
            console.error('Error storing user:', error);
        }
    }

    getUser() {
        try {
            const user = ls.get('user');
            return user;
        } catch (error) {
            console.error('Error retrieving user:', error);
            return null;
        }
    }
    
    removeUser() {
        try {
            ls.remove('user');
        } catch (error) {
            console.error('Error removing user:', error);
        }
    }

    async logout() {
        const response = await this.threel_api.post('/logout');

        if (response.status === 200) {
            this.removeToken();
            this.removeUser();
            return true;
        } else {
            return false;
        }
    }

    async login(credentials) {
        const response = await this.threel_api.post('/login', credentials);
        
        if (response.status === 200) {
            const accessToken = response.data.access_token;
            const user = response.data.user;
    
            this.storeToken(accessToken);
            this.storeUser(JSON.stringify(user));
            this.setAuthorizationHeader(accessToken);
    
            return true;
        } else {
            return false;
        }
    }

    async register(credentials) {
        const response = await this.threel_api.post('/register', credentials);
        
        if (response.status === 200) {
            const accessToken = response.data.access_token;
            const user = response.data.user;
    
            this.storeToken(accessToken);
            this.storeUser(JSON.stringify(user));
            this.setAuthorizationHeader(accessToken);

            return true;
        } else {
            return false;
        }
    }

    setAuthorizationHeader(token) {
        if (token) {
            this.threel_api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // Handle cases where token is not available or invalid
        }
    }
    
    storeToken(token) {
        try {
            ls.set('access_token', token);
        } catch (error) {
            console.error('Error storing token:', error);
        }
    }
    
    getToken() {
        try {
            const token = ls.get('access_token');
            return token;
        } catch (error) {
            console.error('Error retrieving token:', error);
            return null;
        }
    }
    
    removeToken() {
        try {
            ls.remove('access_token');
        } catch (error) {
            console.error('Error removing token:', error);
        }
    }


}

export default AuthenticationService;
