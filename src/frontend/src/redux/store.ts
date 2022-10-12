import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import reducers from "./reducers";

const composeEnhancers = (typeof window !== "undefined" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);


