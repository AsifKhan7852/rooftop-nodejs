import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  theme: 'dark' | 'light'
  notifications: Notification[]
  authModal: {
    isOpen: boolean
    mode: 'login' | 'signup'
  }
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  read: boolean
  createdAt: string
}

const initialState: UIState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
  theme: 'dark',
  notifications: [],
  authModal: {
    isOpen: false,
    mode: 'login',
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    toggleSidebarCollapse: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload)
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification) {
        notification.read = true
      }
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
    openAuthModal: (state, action: PayloadAction<'login' | 'signup'>) => {
      state.authModal = {
        isOpen: true,
        mode: action.payload,
      }
    },
    closeAuthModal: (state) => {
      state.authModal.isOpen = false
    },
    switchAuthMode: (state) => {
      state.authModal.mode = state.authModal.mode === 'login' ? 'signup' : 'login'
    },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleSidebarCollapse,
  setTheme,
  addNotification,
  markNotificationRead,
  clearNotifications,
  openAuthModal,
  closeAuthModal,
  switchAuthMode
} = uiSlice.actions

export default uiSlice.reducer
