import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { axiosClient } from '../../../services/axiosClient'
import { urls } from '../../../data/custom-data/urls'

const options: any = {
    name: 'credentials',
    async authorize(credentials: any) {
        const { email, password, userType } = credentials
        let url = 'agency/login'
        if (userType === 'admin') {
            url = 'admin/jwt/login'
        }
        const response = await axiosClient.post(url, {
            email,
            password,
        }) 
        const data = response.data.data
        const user = { authToken: data.token, ...data.user }
        user.type = userType
        if (user && response.data.success) {
            return user
        } else {
            return null
        }
    },
}

export const authOptions = {
    providers: [CredentialsProvider(options)],
    callbacks: {
        async session({ session, token }: any) {
            session.authToken = token.authToken
            session.user.type = token.userType
            return session
        },
        async jwt({ token, user, account }: any) {
            if (account) {
                token.authToken = user.authToken
                token.userType = user.type
            }
            return token
        },
    },
    secret: process.env.NEXT_PUBLIC_SECRET,
    pages: {
        signIn: urls.auth.pages.login,
    },
}
export default NextAuth(authOptions)
