import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Rooftop {
  id: string
  name: string
  location: string
  address: string
  description: string
  images: string[]
  rating: number
  reviewCount: number
  pricePerHour: number
  amenities: string[]
  openTime: string
  closeTime: string
  ownerId: string
  ownerName: string
  isActive: boolean
}

interface RooftopState {
  rooftops: Rooftop[]
  selectedRooftop: Rooftop | null
  isLoading: boolean
  error: string | null
  filters: {
    location: string
    priceRange: [number, number]
    rating: number
    amenities: string[]
  }
}

const initialState: RooftopState = {
  rooftops: [],
  selectedRooftop: null,
  isLoading: false,
  error: null,
  filters: {
    location: '',
    priceRange: [0, 5000],
    rating: 0,
    amenities: [],
  },
}

const rooftopSlice = createSlice({
  name: 'rooftops',
  initialState,
  reducers: {
    setRooftops: (state, action: PayloadAction<Rooftop[]>) => {
      state.rooftops = action.payload
      state.isLoading = false
    },
    setSelectedRooftop: (state, action: PayloadAction<Rooftop | null>) => {
      state.selectedRooftop = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setFilters: (state, action: PayloadAction<Partial<RooftopState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const { setRooftops, setSelectedRooftop, setLoading, setFilters, clearFilters } = rooftopSlice.actions
export default rooftopSlice.reducer
