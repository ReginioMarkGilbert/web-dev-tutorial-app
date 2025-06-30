import { createContext, useContext, useEffect, useState } from 'react'

// Define User type without relying on Supabase
export type User = {
   id: string
   email: string | null
}

type AuthContextType = {
   user: User | null
   loading: boolean
   isSigningOut: boolean
   signUp: (email: string, password: string) => Promise<{
      error: any | null
      data: any | null
   }>
   signIn: (email: string, password: string) => Promise<{
      error: any | null
      data: any | null
   }>
   signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// API base URL - can be configured through environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [user, setUser] = useState<User | null>(null)
   const [loading, setLoading] = useState(true)
   const [isSigningOut, setIsSigningOut] = useState(false)

   // Check if user is authenticated on initial load
   useEffect(() => {
      const fetchCurrentUser = async () => {
         const token = localStorage.getItem('token')

         if (!token)
         {
            setLoading(false)
            return
         }

         try
         {
            const response = await fetch(`${API_URL}/auth/me`, {
               headers: {
                  'Authorization': `Bearer ${token}`
               }
            })

            if (response.ok)
            {
               const data = await response.json()
               setUser({
                  id: data.user.id,
                  email: data.user.email
               })
            } else
            {
               // Token might be invalid or expired
               localStorage.removeItem('token')
            }
         } catch (error)
         {
            console.error('Error fetching current user:', error)
            localStorage.removeItem('token')
         } finally
         {
            setLoading(false)
         }
      }

      fetchCurrentUser()
   }, [])

   const signUp = async (email: string, password: string) => {
      try
      {
         const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
         })

         const data = await response.json()

         if (!response.ok)
         {
            return { data: null, error: data.message || 'Signup failed' }
         }

         // Store token and set user
         localStorage.setItem('token', data.token)
         setUser({
            id: data.user.id,
            email: data.user.email
         })

         return { data, error: null }
      } catch (error)
      {
         console.error('Signup error:', error)
         return { data: null, error: 'An unexpected error occurred' }
      }
   }

   const signIn = async (email: string, password: string) => {
      try
      {
         const response = await fetch(`${API_URL}/auth/signin`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
         })

         const data = await response.json()

         if (!response.ok)
         {
            return { data: null, error: data.message || 'Login failed' }
         }

         // Store token and set user
         localStorage.setItem('token', data.token)
         setUser({
            id: data.user.id,
            email: data.user.email
         })

         return { data, error: null }
      } catch (error)
      {
         console.error('Login error:', error)
         return { data: null, error: 'An unexpected error occurred' }
      }
   }

   const signOut = async () => {
      try
      {
         setIsSigningOut(true)

         // Clear token and user state
         localStorage.removeItem('token')
         setUser(null)

         // Use a short timeout to ensure isSigningOut is still true during navigation
         setTimeout(() => setIsSigningOut(false), 1000)
      } catch (error)
      {
         console.error('Error during sign out:', error)
         setIsSigningOut(false)
         throw error
      }
   }

   const value = {
      user,
      loading,
      isSigningOut,
      signUp,
      signIn,
      signOut
   }

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
   const context = useContext(AuthContext)
   if (context === undefined)
   {
      throw new Error('useAuth must be used within an AuthProvider')
   }
   return context
}