import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Slot {
  id: string
  rooftopId: string
  date: string
  startTime: string
  endTime: string
  price: number
  isAvailable: boolean
  isBlocked: boolean
}

export interface Booking {
  id: string
  userId: string
  userName: string
  userEmail: string
  rooftopId: string
  rooftopName: string
  slotId: string
  date: string
  startTime: string
  endTime: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  amount: number
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: string
}

interface BookingState {
  bookings: Booking[]
  slots: Slot[]
  selectedSlot: Slot | null
  isLoading: boolean
  error: string | null
}

const initialState: BookingState = {
  bookings: [],
  slots: [],
  selectedSlot: null,
  isLoading: false,
  error: null,
}

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.unshift(action.payload)
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex(b => b.id === action.payload.id)
      if (index !== -1) {
        state.bookings[index] = action.payload
      }
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const booking = state.bookings.find(b => b.id === action.payload)
      if (booking) {
        booking.status = 'cancelled'
      }
    },
    setSlots: (state, action: PayloadAction<Slot[]>) => {
      state.slots = action.payload
    },
    setSelectedSlot: (state, action: PayloadAction<Slot | null>) => {
      state.selectedSlot = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { 
  setBookings, 
  addBooking, 
  updateBooking, 
  cancelBooking, 
  setSlots, 
  setSelectedSlot, 
  setLoading 
} = bookingSlice.actions

export default bookingSlice.reducer
