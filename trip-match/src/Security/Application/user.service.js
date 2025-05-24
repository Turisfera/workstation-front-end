import axios from 'axios'

const AUTH_API = import.meta.env.VITE_AUTH_URL
if (!AUTH_API) console.warn('VITE_AUTH_URL no está definida en tu .env')

export class UserService {
    /**
     * GET /users y filtra localmente
     */
    async login({ email, password }) {
        const resp = await axios.get(`${AUTH_API}/users`)
        const user = resp.data.find(
            u => u.email === email.trim() && u.password === password.trim()
        )
        if (!user) {
            const err = new Error('Credenciales incorrectas')
            err.status = 401
            throw err
        }
        return {
            status: 200,
            data: {
                accessToken: user.id,
                id:          user.id,
                email:       user.email,
                name:        user.name,
                avatar:      user.avatar,
                isAgency:    Boolean(user.isAgency)
            }
        }
    }
    /**
     * POST /users para registrar
     */
    async register({ name, email, password, isAgency }) {
        const resp = await axios.post(`${AUTH_API}/users`, {
            name:     name.trim(),
            email:    email.trim(),
            password,
            isAgency: Boolean(isAgency),
            avatar:   `https://i.pravatar.cc/150?u=${Date.now()}`
        })
        return resp
    }
}
