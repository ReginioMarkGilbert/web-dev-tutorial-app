import { useAuth } from '@/contexts/AuthContext';
import type { Profile } from '@/types/database';
import { useEffect, useState } from 'react';

// API base URL - can be configured through environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      if (!user)
      {
        setProfile(null)
        setLoading(false)
        return
      }

      try
      {
        setLoading(true)

        const token = localStorage.getItem('token')
        if (!token)
        {
          throw new Error('Not authenticated')
        }

        const response = await fetch(`${API_URL}/profiles/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok)
        {
          throw new Error('Failed to fetch profile')
        }

        const data = await response.json()
        setProfile(data.profile)
      } catch (error)
      {
        console.error('Error fetching profile:', error)
        setError(error as Error)
      } finally
      {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  async function updateProfile(updates: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>) {
    if (!user) return { error: new Error('User not authenticated') }

    try
    {
      const token = localStorage.getItem('token')
      if (!token)
      {
        throw new Error('Not authenticated')
      }

      const response = await fetch(`${API_URL}/profiles/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      })

      if (!response.ok)
      {
        throw new Error('Failed to update profile')
      }

      const data = await response.json()
      setProfile(data.profile)
      return { data: data.profile, error: null }
    } catch (error)
    {
      console.error('Error updating profile:', error)
      return { data: null, error }
    }
  }

  return { profile, loading, error, updateProfile }
}