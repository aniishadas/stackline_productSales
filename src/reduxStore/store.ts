import {configureStore} from '@reduxjs/toolkit'
import dataReducer from './slice'

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        data: dataReducer,
    },
})

export default store;


