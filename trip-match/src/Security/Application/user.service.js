import axios from 'axios'

//const AUTH_API = import.meta.env.VITE_AUTH_URL || 'https://trip-match-hfaqachdend9amey.canadacentral-01.azurewebsites.net/api/v1'
const AUTH_API = import.meta.env.VITE_AUTH_URL || 'http://localhost:5000/api/v1'
export class UserService {
    /**
     * POST /auth/signin
     */
    async login({ email, password }) {
        const resp = await axios.post(`${AUTH_API}/auth/signin`, {
            email: email.trim(),
            password: password.trim()
        });

        const token = resp.data.token;
        const emailFromApi = resp.data.email;
        const rol = resp.data.rol;
        const userId = resp.data.id;
        console.log('Respuesta cruda del login:', resp);
        return {
            status: resp.status,
            data: {
                accessToken: token,
                email: emailFromApi,
                rol: rol,
                userId: userId,
                name: '',
                avatar: '',
            }
        };
    }

    /**
     * POST /auth/signup
     */
    async register({ name, email, password, number, isAgency }) {
        const [firstName, ...lastNameParts] = name.trim().split(' ');
        const lastName = lastNameParts.join(' ') || 'Apellido';
        const rol = isAgency ? 'agencia' : 'turista';

        const body = {
            firstName,
            lastName,
            number: number.trim(),
            email: email.trim(),
            password: password.trim(),
            rol,
            agencyName: isAgency ? name.trim() : null,
            ruc: isAgency ? "12345678901" : null,
            avatarUrl: isAgency ? null : (rol === 'turista' ? "https://example.com/default-tourist-avatar.png" : null)
        };

        const resp = await axios.post(`${AUTH_API}/auth/signup`, body);
        return resp;
    }

    async getAgencyProfile(userId) {
        const response = await fetch(`${AUTH_API}/agencias/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch agency profile: HTTP status ${response.status}`);
        }
        return response.json();
    }

    getTouristProfile(userId) {
        return fetch(`${AUTH_API}/turistas/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => res.json());
    }
    async getUserProfile(userId) {
        const response = await fetch(`${AUTH_API}/users/${userId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

}