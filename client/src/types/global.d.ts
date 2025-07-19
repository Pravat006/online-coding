
// aurh-store interface

interface User {
    id: string
    name: string
    email: string
    avatar: string
}

interface AuthStore {
    user: User | null
    isAuthenticated: boolean
    login: (userData: User) => void
    logout: () => void
}
