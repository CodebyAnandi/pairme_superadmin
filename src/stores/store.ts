import { configureStore } from '@reduxjs/toolkit'
import styleReducer from './styleSlice'
import mainReducer from './mainSlice'
import loggedUserReducer from './adminSlice'
import reportUserReducer from './reportSlice'

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    loggedUser: loggedUserReducer,
    reportUser:reportUserReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
