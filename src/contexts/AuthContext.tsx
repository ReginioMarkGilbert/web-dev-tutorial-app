import { supabase } from '@/lib/supabase'
import type { Session, User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
   session: Session | null
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const [session, setSession] = useState<Session | null>(null)
   const [user, setUser] = useState<User | null>(null)
   const [loading, setLoading] = useState(true)
   const [isSigningOut, setIsSigningOut] = useState(false)

   useEffect(() => {
      const setData = async () => {
         const { data: { session }, error } = await supabase.auth.getSession()
         if (error) console.log(error)
         else {
            setSession(session)
            setUser(session?.user ?? null)
         }
         setLoading(false)
      }

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
         console.log('Auth state changed:', event)
         setSession(session)
         setUser(session?.user ?? null)

         if (event === 'SIGNED_OUT') {
            // Make sure user state is cleared on sign out
            setUser(null)
            setSession(null)

            // Use a short timeout to ensure isSigningOut is still true during navigation
            // but reset it shortly afterwards to prevent issues on future auth checks
            setTimeout(() => setIsSigningOut(false), 1000)
         }
      })

      setData()

      return () => {
         subscription.unsubscribe()
      }
   }, [])

   const createProfile = async (userId: string, email: string) => {
      try {
         // We need to use the service role key for this operation to bypass RLS
         // First let's check if a profile already exists
         const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

         if (existingProfile) {
            console.log('Profile already exists, skipping creation')
            return
         }

         // Use RPC function to create profile instead of direct insert
         // This requires creating a database function with security definer privilege
         const { error } = await supabase.rpc('create_profile', {
            user_id: userId,
            user_email: email
         })

         if (error) console.error('Error creating profile:', error)
      } catch (error) {
         console.error('Error creating profile:', error)
      }
   }

   const signUp = async (email: string, password: string) => {
      const response = await supabase.auth.signUp({
         email,
         password,
         options: {
            data: {
               username: email
            }
         }
      })

      if (response.data.user && !response.error) {
         // We don't need to create a profile here as we'll set up a database trigger
         // to handle profile creation when a new user signs up
         // See migration notes below
      }

      return response
   }

   const signIn = async (email: string, password: string) => {
      return supabase.auth.signInWithPassword({ email, password })
   }

   const signOut = async () => {
      try {
         setIsSigningOut(true)
         const { error } = await supabase.auth.signOut()
         if (error) {
            console.error('Error signing out:', error)
            setIsSigningOut(false) // Reset flag if there's an error
            throw error
         }
         // The rest of the state cleanup happens in the onAuthStateChange handler
         // Don't reset isSigningOut here, let the auth state change event handle it
      } catch (error) {
         console.error('Error during sign out:', error)
         setIsSigningOut(false) // Reset flag if there's an exception
         throw error
      }
   }

   const value = {
      session,
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
   if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider')
   }
   return context
}

/*
Migration notes for Supabase:

Create this SQL function to handle profile creation with security definer privilege:

CREATE OR REPLACE FUNCTION public.create_profile(user_id UUID, user_email TEXT)
RETURNS VOID AS $$
BEGIN
   INSERT INTO public.profiles (id, username)
   VALUES (user_id, user_email)
   ON CONFLICT (id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

Or set up a trigger to automatically create profiles when users sign up:

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
   INSERT INTO public.profiles (id, username)
   VALUES (NEW.id, NEW.email)
   ON CONFLICT (id) DO NOTHING;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
   AFTER INSERT ON auth.users
   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

*/