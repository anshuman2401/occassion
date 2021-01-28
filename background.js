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

const database = firebase.database();

function toggleLikes(styleId, uid, occasion) {
    toggle(database.ref(styleId + '/' + occasion), uid, 'likes', 'likeCount', true);
    toggle(database.ref(styleId + '/' + occasion), uid, 'dislikes', 'dislikeCount', false);
}

function toggleDislikes(styleId, uid, occasion) {
    toggle(database.ref(styleId + '/' + occasion), uid, 'dislikes', 'dislikeCount', true);
    toggle(database.ref(styleId + '/' + occasion), uid, 'likes', 'likeCount', false);
}

function toggle(occasionRef, uid, type, count, clicked) {
    occasionRef.transaction((update) => {
        if  (update) {
            if (update[type] && update[type][uid]) {
                update[count]--;
                update[type][uid] = null;
            } else if (clicked) {
                update[count]++;
                if (!update[type])
                    update[type] = {};
                update[type][uid] = true;
            }
        }
        return update;
    });
}

function getLikes(styleId, callback) {
    getValue(database.ref(styleId + '/' + occasion), 'likeCount', callback);
}

function getDislikes(styleId, callback) {
    getValue(database.ref(styleId + '/' + occasion), 'dislikeCount', callback);
}

function getValue(occasionRef, count, callback) {
    occasionRef.on(count, (snapshot) => {
       callback(snapshot.val());
    });
}
