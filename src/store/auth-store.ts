import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthProvider = 'google' | 'wechat' | null

interface AuthUser {
  id: string
  name: string
  email?: string
  avatar?: string
  provider: AuthProvider
  providerData?: any
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: AuthUser | null) => void
  login: (provider: AuthProvider) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      login: async (provider) => {
        set({ isLoading: true })
        
        try {
          // This is a placeholder implementation
          // In a real implementation, we would integrate with the actual provider SDKs
          
          if (provider === 'google') {
            // Simulate Google login
            // In a real implementation, we would use Google SDK
            const mockGoogleUser = {
              id: `google-${Math.random().toString(36).substring(2, 9)}`,
              name: 'Google User',
              email: 'user@example.com',
              avatar: 'https://i.pravatar.cc/150?u=googleuser',
              provider: 'google' as AuthProvider
            }
            
            set({ 
              user: mockGoogleUser, 
              isAuthenticated: true, 
              isLoading: false 
            })
            
          } else if (provider === 'wechat') {
            // Simulate WeChat login
            // In a real implementation, we would use WeChat SDK
            const mockWeChatUser = {
              id: `wechat-${Math.random().toString(36).substring(2, 9)}`,
              name: 'WeChat User',
              avatar: 'https://i.pravatar.cc/150?u=wechatuser',
              provider: 'wechat' as AuthProvider
            }
            
            set({ 
              user: mockWeChatUser, 
              isAuthenticated: true,
              isLoading: false 
            })
          }
          
        } catch (error) {
          console.error('Login failed:', error)
          set({ isLoading: false })
          throw error
        }
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)