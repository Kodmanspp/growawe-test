import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import countriesSlice from "./countriesSlice";
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import statisticsSlice from "./statisticsSlice";

export const store = configureStore({
    reducer:{
        countryList: persistReducer({
            key: 'countries',
            storage
        }, countriesSlice),
        statistics: statisticsSlice,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                'persist/PERSIST',
                'persist/REHYDRATE',
                'pause/PAUSE',
                '/purge/PURGE',
                '/register/REGISTER',
            ],
        },
    }),
})
export const persistor = persistStore(store)