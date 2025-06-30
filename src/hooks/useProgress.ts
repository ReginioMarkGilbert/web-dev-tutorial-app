import { useAuth } from '@/contexts/AuthContext';
import type { UserProgress } from '@/types/database';
import { useEffect, useState } from 'react';

// API base URL - can be configured through environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function useProgress(tutorialId?: string) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user || !tutorialId)
    {
      setProgress(null)
      setLoading(false)
      return
    }

    async function fetchProgress() {
      try
      {
        setLoading(true)

        const token = localStorage.getItem('token')
        if (!token)
        {
          throw new Error('Not authenticated')
        }

        const response = await fetch(`${API_URL}/progress/${user.id}/tutorials/${tutorialId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        // If 404, it means no progress record exists yet
        if (response.status === 404)
        {
          setProgress(null)
          return
        }

        if (!response.ok)
        {
          throw new Error('Failed to fetch progress')
        }

        const data = await response.json()
        setProgress(data.progress)
      } catch (error)
      {
        console.error('Error fetching progress:', error)
        setError(error as Error)
      } finally
      {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [user, tutorialId])

  async function updateProgress(updates: Partial<Pick<UserProgress, 'completed' | 'progress'>>) {
    if (!user || !tutorialId) return { error: new Error('User not authenticated or tutorial not specified') }

    try
    {
      const token = localStorage.getItem('token')
      if (!token)
      {
        throw new Error('Not authenticated')
      }

      const response = await fetch(`${API_URL}/progress/${user.id}/tutorials/${tutorialId}`, {
        method: progress ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...updates,
          last_accessed: new Date().toISOString()
        })
      })

      if (!response.ok)
      {
        throw new Error('Failed to update progress')
      }

      const data = await response.json()
      setProgress(data.progress)
      return { data: data.progress, error: null }
    } catch (error)
    {
      console.error('Error updating progress:', error)
      return { data: null, error }
    }
  }

  async function getAllProgress() {
    if (!user) return { data: null, error: new Error('User not authenticated') }

    try
    {
      const token = localStorage.getItem('token')
      if (!token)
      {
        throw new Error('Not authenticated')
      }

      const response = await fetch(`${API_URL}/progress/${user.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok)
      {
        throw new Error('Failed to fetch all progress')
      }

      const data = await response.json()
      return { data: data.progress, error: null }
    } catch (error)
    {
      console.error('Error fetching all progress:', error)
      return { data: null, error }
    }
  }

  return {
    progress,
    loading,
    error,
    updateProgress,
    getAllProgress
  }
}