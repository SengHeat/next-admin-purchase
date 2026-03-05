import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

/**
 * Notification store with Zustand
 */
export const useNotificationStore = create<NotificationStore>()(
  devtools((set) => ({
    notifications: [],

    addNotification: (notification) => {
      const id = `${Date.now()}_${Math.random()}`
      set((state) => ({
        notifications: [...state.notifications, { ...notification, id }],
      }))

      // Auto-remove after duration
      if (notification.duration !== Infinity) {
        const duration = notification.duration || 5000
        setTimeout(() => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }))
        }, duration)
      }
    },

    removeNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }))
    },

    clearAll: () => {
      set({ notifications: [] })
    },
  })),
)
