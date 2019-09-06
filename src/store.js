import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

/* Custom Reducers */
import buscarUsuarioReducer from "./reducers/buscarUsuarioReducer";

// Configurar firestore
const firebaseConfig = {
  apiKey: "AIzaSyCZaL-qT2h6b7h6N5WSJKMagJllnF2gmaI",
  authDomain: "bibliostorehstrejoluna.firebaseapp.com",
  databaseURL: "https://bibliostorehstrejoluna.firebaseio.com",
  projectId: "bibliostorehstrejoluna",
  storageBucket: "bibliostorehstrejoluna.appspot.com",
  messagingSenderId: "375839256110",
  appId: "1:375839256110:web:2167f9b4ac9790ad"
};

// inicializar firebase
firebase.initializeApp(firebaseConfig);

// configuración de react-redux
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

// crear el enhancer con compose de redux y firestore
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  usuario : buscarUsuarioReducer
});

// state inicial
const initialState = {};

// Crear el store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
