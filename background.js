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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request) {
        switch (request.type) {
            case 'updateLike':
                toggleLikes(request.styleId, request.uid, request.occasion, sendResponse);
                // getLikes(request.styleId, request.occasion, sendResponse);
            case 'updateDislike':
                toggleDislikes(request.styleId, request.uid, request.occasion, sendResponse);
                // getDislikes(request.styleId, request.occasion, sendResponse);
            case 'getLike':
                getLikes(request.styleId, request.occasion, sendResponse);
            case 'getDislike':
                getDislikes(request.styleId, request.occasion, sendResponse);
        }
    }
});


function toggleLikes(styleId, uid, occasion, sendResponse) {
    toggle(database.ref(styleId + '/' + occasion), uid, 'likes', 'likeCount', true, error => {
        if (!error)
            // toggle(database.ref(styleId + '/' + occasion), uid, 'dislikes', 'dislikeCount', false, error => {
            //     if (!error)
                    getLikes(styleId, occasion, sendResponse);
            // });
        });
}

function toggleDislikes(styleId, uid, occasion, sendResponse) {
    toggle(database.ref(styleId + '/' + occasion), uid, 'dislikes', 'dislikeCount', true, error => {
        // if (!error)
        //     toggle(database.ref(styleId + '/' + occasion), uid, 'likes', 'likeCount', false, error => {
                if (!error)
                    getDislikes(styleId, occasion, sendResponse);
            // });

    });
}

function toggle(occasionRef, uid, type, count, clicked, callback) {
    occasionRef.transaction((update) => {
        if (update && update[type] && update[type][uid]) {
            update[count]--;
            update[type][uid] = null;
        } else if (clicked) {
            if (!update)
                update = {};

            if (!update[count])
                update[count] = 1;
            else
                update[count]++;

            if (!update[type])
                update[type] = {};
            update[type][uid] = true;
        }
        return update;
    }, error => {
        callback(error)
    });
}

function getLikes(styleId, occasion, callback) {
    getValue(database.ref(styleId + '/' + occasion + '/likeCount'), callback);
}

function getDislikes(styleId, occasion, callback) {
    getValue(database.ref(styleId + '/' + occasion + '/dislikeCount'), callback);
}

function getValue(countRef, callback) {
    countRef.once('value').then((snapshot) => {
       callback({
           count: snapshot.val()
       });
    });
}
