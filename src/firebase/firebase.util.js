import firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDhsW_fZh5QciDatx2Sl14SGnfvaSv0-V8",
    authDomain: "crwn-db-react-learning.firebaseapp.com",
    databaseURL: "https://crwn-db-react-learning.firebaseio.com",
    projectId: "crwn-db-react-learning",
    storageBucket: "crwn-db-react-learning.appspot.com",
    messagingSenderId: "585368110183",
    appId: "1:585368110183:web:fb5ae827270b37f34c80c2",
    measurementId: "G-803QWR9LJ0"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }
    console.log(firestore.doc('users/dsadsadsasa'));
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;