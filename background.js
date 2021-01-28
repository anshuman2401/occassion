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
                toggleLikes(request.styleId, request.uid, request.occasion);
                break;
            case 'updateDislike':
                toggleDislikes(request.styleId, request.uid, request.occasion);
                break;
            case 'getLike':
                getLikes(request.styleId, request.occasion, sendResponse);
                break;
            case 'getDislike':
                getDislikes(request.styleId, request.occasion, sendResponse);
                break;
            case 'boughtOccasion':
                updateBoughtOccasion(request.styleId, request.uid, request.occasion, request.allOccasions);
                break;
        }
    }
});


function updateBoughtOccasion(styleId, uid, occasion, allOccasions) {
    database.ref(styleId).transaction((update) => {
        if (!update)
            update = {};
        if (!update[occasion])
            update[occasion] = {};

        for (let i = 0; i < allOccasions.length; i++) {
            let occ = update[occasion];
            if (allOccasions[i] === occasion) {
                if (!occ.bought)
                    occ.bought = {};
                if (!occ.bought[uid]) {
                    occ.bought[uid] = true;
                    if (!occ.boughtCount)
                        occ.boughtCount = 1;
                    else
                        occ.boughtCount++;
                }
            } else if (occ && occ.bought && occ.bought[uid]) {
                occ.bought[uid] = null;
                occ.boughtCount--;
            }
        }
        return update;
    });
}

function toggleLikes(styleId, uid, occasion) {
    toggle(database.ref(styleId + '/' + occasion), uid, 'likes', 'likeCount', true)
    toggle(database.ref(styleId + '/' + occasion), uid, 'dislikes', 'dislikeCount', false)
}

function toggleDislikes(styleId, uid, occasion) {
    toggle(database.ref(styleId + '/' + occasion), uid, 'dislikes', 'dislikeCount', true)
    toggle(database.ref(styleId + '/' + occasion), uid, 'likes', 'likeCount', false)
}

function toggle(occasionRef, uid, type, count, clicked) {
    occasionRef.transaction((update) => {
        if (!update)
            update = {};

        if (update[type] && update[type][uid]) {
            update[count]--;
            update[type][uid] = null;
        } else if (clicked) {
            if (!update[count])
                update[count] = 1;
            else
                update[count]++;

            if (!update[type])
                update[type] = {};
            update[type][uid] = true;
        }
        return update;
    });
}

function getLikes(styleId, occasion, callback) {
    getValue(database.ref(styleId + '/' + occasion + '/likeCount'), callback);
}

function getDislikes(styleId, occasion, callback) {
    getValue(database.ref(styleId + '/' + occasion + '/dislikeCount'), callback);
}

function getValue(countRef, callback) {
    countRef.on('value', snapshot => {
       callback({
           count: snapshot.val()
       });
    });
}
