import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { UserProgress } from '@/types/database'
import { useEffect, useState } from 'react'

export default function useProgress(tutorialId?: string) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user || !tutorialId) {
      setProgress(null)
      setLoading(false)
      return
    }

    async function fetchProgress() {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('tutorial_id', tutorialId)
          .single()

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          throw error
        }

        setProgress(data)
      } catch (error) {
        console.error('Error fetching progress:', error)
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [user, tutorialId])

  async function updateProgress(updates: Partial<Pick<UserProgress, 'completed' | 'progress'>>) {
    if (!user || !tutorialId) return { error: new Error('User not authenticated or tutorial not specified') }

    try {
      // Check if progress record exists
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('tutorial_id', tutorialId)
        .single()

      let result;

      if (existingProgress) {
        // Update existing record
        result = await supabase
          .from('user_progress')
          .update({
            ...updates,
            last_accessed: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .eq('tutorial_id', tutorialId)
          .select()
          .single()
      } else {
        // Insert new record
        result = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            tutorial_id: tutorialId,
            ...updates,
            last_accessed: new Date().toISOString()
          })
          .select()
          .single()
      }

      const { data, error } = result

      if (error) {
        throw error
      }

      setProgress(data)
      return { data, error: null }
    } catch (error) {
      console.error('Error updating progress:', error)
      return { data: null, error }
    }
  }

  async function getAllProgress() {
    if (!user) return { data: null, error: new Error('User not authenticated') }

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('last_accessed', { ascending: false })

      if (error) {
        throw error
      }

      return { data, error: null }
    } catch (error) {
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