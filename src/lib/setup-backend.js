import axios from 'axios'

const setupBackend = async () => {
    const user = netlifyIdentity.currentUser()
    const first = !window.backend

    if (!user) {
        return
    }

    window.backend = axios.create({
        baseURL: '/.netlify/functions',
        headers: {
            common: {
                'Authorization': 'Bearer ' + await user.jwt()
            }
        }
    })

    window.backend.interceptors.response.use(response => response, async error => {
        if (error.response.status === 401) {
            await setupBackend()

            return axios(error.request)
        }

        return Promise.reject(error)
    })

    if (first) {
        const event = new Event('backendready')
        
        document.dispatchEvent(event)
    }
}

export default setupBackend