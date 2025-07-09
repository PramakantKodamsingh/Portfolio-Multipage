"use client"
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import blogsReducer from './features/blogSlice';    
import aboutReducer from './features/aboutSlice';
import projectReducer from './features/projectSlice';
import adminReducer from './features/adminslice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, _value: any) {
            return Promise.resolve();
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storageEngine =
    typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage: storageEngine,
    whitelist: ['admin', 'blogs', 'about', 'projects'],
};

const appReducer = combineReducers({
    admin: adminReducer,
    blogs: blogsReducer,
    about: aboutReducer,
    projects: projectReducer,
});    

const rootReducer = (state: any, action: any) => {
    if (action.type === 'RESET_STORE') {
        state = undefined;
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const handleLogout = async () => {
    await resetReduxStore();
};

export const resetReduxStore = async () => {
    await persistor.purge();
    store.dispatch({ type: 'RESET_STORE' });
};

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppselector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
