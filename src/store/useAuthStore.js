import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('ibps_current_user') || 'null'),
  loading: false,

  setUser: (userData) => {
    localStorage.setItem('ibps_current_user', JSON.stringify(userData))
    set({ user: userData })
  },

  upgradeToPro: () => {
    const current = get().user
    if (!current) return
    const updated = { ...current, isPro: true }
    localStorage.setItem('ibps_current_user', JSON.stringify(updated))
    set({ user: updated })
  },

  logout: async () => {
    try {
      await supabase.auth.signOut()
    } catch {}
    localStorage.removeItem('ibps_current_user')
    set({ user: null })
  },

  loginAs: async (email, role, name) => {
    set({ loading: true })
    try {
      await supabase.auth.signInWithOtp({
        email,
        options: { data: { role, full_name: name } }
      })
    } catch {}

    const activeUser = {
      id: 'usr_' + Date.now(),
      email,
      name: name || email.split('@')[0],
      role: role,
      isPro: false,
      createdAt: new Date().toISOString()
    }

    localStorage.setItem('ibps_current_user', JSON.stringify(activeUser))
    set({ user: activeUser, loading: false })
    return activeUser
  }
}))