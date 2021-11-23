import { createSlice } from "@reduxjs/toolkit"

export const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    profiles: []
  },
  reducers: {
    addProfile: (state, action) => {
      state.profiles = [...state.profiles, action.payload]
    },
    removeProfile: (state, action) => {
      const newProfiles = state.profiles.filter(n => n.id !== action.payload)
      state.profiles = newProfiles
    },
  
  }
})

export const { addProfile, removeProfile } = profileSlice.actions

export default profileSlice.reducer