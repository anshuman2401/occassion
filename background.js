// Firebase Config Initialize
const firebaseConfig = {
    apiKey: "AIzaSyCsDrAPKLAaFRFS09-kEKk0Nitm2lWGmoc",
    authDomain: "occasionbuy.firebaseapp.com",
    projectId: "occasionbuy",
    databaseURL: 'https://occasionbuy-default-rtdb.firebaseio.com',
    storageBucket: "occasionbuy.appspot.com",
    messagingSenderId: "1093131948026",
    appId: "1:1093131948026:web:1351fe9e674fc997ac5e43"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();

function initApp() {
    database.ref('styles/' + 1234).set({
        wedding: {
            like: 10,
            dislike: 50,
            boughtFor: 56
        },
        sports: {
            like: 50,
            dislike: 20,
            boughtFor: 10
        }
    });
}

window.onload = function() {
    initApp();
};