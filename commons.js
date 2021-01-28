let occasion = ["Wedding", "Reception", "Marriage", "Festival", "Office", "Beach", "Dining", "Romantic", "Sports"];
let userid;

function sendMessage(request, sendResponse) {
    chrome.runtime.sendMessage(request, sendResponse)
}

function getStyleId(url) {
    return url.match(/\d+/)[0].replaceAll('/', '');
}

function getRandomToken() {
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    return hex;
}

chrome.storage.sync.get('userid', function(items) {
    userid = items.userid;
    if (userid) {
        // user Id found
    } else {
        userid = getRandomToken();
        chrome.storage.sync.set({userid: userid}, function() {});
    }
});