var posTop = ["230px", "100px", "230px", "130px", "95px", "180px", "140px", "200px", "80px"];
var posLeft = ["240px", "370px", "455px", "-50px", "385px", "280px", "465px", "310px", "-40px"];
var width = ["250px", "330px", "180px", "320px", "365px", "290px", "280px", "200px", "380px"];
var height = ["380px", "500px", "270px", "490px", "550px", "420px", "430px", "300px", "570px"];
var currentIndex = 0;
var userid;

if(document.getElementsByClassName("pdp-action-container pdp-fixed")[0]) {
    var theButton = createOccasionButton()
    
    theButton.addEventListener('click', function() {
        console.log("User Id: " + userid)
        createModal()
        createModalContainer()
        createSlideShow()
    
        $(document).ready(function(){$('.your-class').slick();});
        
        addCanvas(modalContainer)
        addLikesDislikes()

        document.getElementsByClassName("slick-prev slick-arrow")[0].addEventListener("click", sliderClick);
        document.getElementsByClassName("slick-next slick-arrow")[0].addEventListener("click", sliderClick);

        function sliderClick() {
            currentIndex = document.getElementsByClassName("slick-slide slick-current slick-active")[0].attributes.getNamedItem("data-slick-index").value;
            document.getElementById("canvasId").style = "position:absolute; z-index:1; top:" + posTop[currentIndex] + ";left:" + posLeft[currentIndex] + ";";
            document.getElementById("canvasId").style.width = width[currentIndex];
            document.getElementById("canvasId").style.height = height[currentIndex];
        }    
    });
}

function createModal() {
    var modal = document.createElement("div");
    modal.id = "mainModal"
    modal.style.position = 'absolute'
    modal.style.display = "inline-block";
    modal.style.top = "150px"
    modal.style.left = "27%"

    var closeBtn = document.createElement("div");
    closeBtn.style.fontSize = "25px"
    closeBtn.style.width = "40px"
    closeBtn.style.height = "40px"
    closeBtn.style.borderRadius = "20px"
    closeBtn.innerHTML = "X";
    closeBtn.style = "font-size:20px;color:gray;background:#FCEDED;position:absolute;font-weight:bold;z-index:31;left:778px;top:-14px;cursor:pointer;padding:5px 10px 5px 10px;opacity:0.7;border:5px black;border-radius:20px;"
    closeBtn.addEventListener("click", closeModal);

    function closeModal() {
        document.getElementById("mainModal").remove();
    }

    modal.appendChild(closeBtn);

    document.getElementsByClassName("pdp-pdp-container")[0].appendChild(modal);
}

function createModalContainer () {
    var modalContainer = document.createElement("div");
    modalContainer.id = "modalContainer"
    modalContainer.style.width = "800px";
    modalContainer.style.height = "600px"
    modalContainer.style.textAlign = "center"
    modalContainer.style.color = "#000"
    modalContainer.style.borderRadius = "20px"
    modalContainer.style.padding = "8px 0px"
    modalContainer.style.position = "absolute"
    modalContainer.style.zIndex = "30";
    modalContainer.style.backgroundColor = "#F2EDED"
    document.getElementById("mainModal").appendChild(modalContainer)
}

function createOccasionButton() {
    var button = document.createElement("button");
    button.innerHTML = "Choose Occasion";
    button.style.margin = "10px 10px 10px 10px"
    button.style.padding = "10px 5px 10px 5px"
    button.id = "occassionButton";
    button.type = "button";
    document.getElementsByClassName("pdp-action-container pdp-fixed")[0].appendChild(button);
    return button
}

var canvasImage = new MarvinImage();

function addCanvas(modalContainer) {
    var canvas = document.createElement("canvas")
    canvas.id = "canvasId"
    canvas.style = "position:absolute; top:" + posTop[0] + "; left:" + posLeft[0] + "; z-index:1";
    canvas.width = 520;
    canvas.height = 800;
    canvas.style.width = width[0];
    canvas.style.height = height[0];
  
    modalContainer.appendChild(canvas)
    canvasImage.load(getFirstImageFromPage(), imageLoaded);
}

function imageLoaded(){
    whiteToAlpha(canvasImage);
    Marvin.alphaBoundary(canvasImage.clone(), canvasImage, 8);
    Marvin.scale(canvasImage.clone(), canvasImage, 480);
    canvas = document.getElementById("canvasId")
    canvasImage.draw(canvas);
}

function whiteToAlpha(canvasImage){
    for(var y=0; y < canvasImage.getHeight(); y++){

        for(var x=0; x<canvasImage.getWidth(); x++){
            var r = canvasImage.getIntComponent0(x,y);
            var g = canvasImage.getIntComponent1(x,y);
            var b = canvasImage.getIntComponent2(x,y);
        
            if(r >= 220 && g >= 220 && b >= 220){
                canvasImage.setIntColor(x, y, 0);
            }
        }
    }
}

function getFirstImageFromPage() {
    return document.getElementsByClassName("image-grid-image")[0].style.backgroundImage.slice(4, -1).replace(/"/g, "")
}

function createSlideShow () {
    var container = document.createElement("div")
    container.className = "your-class"
    container.style.margin = "20px"

    for (var i=0; i<9; i++) {
        var slide = document.createElement("div")
        var image = document.createElement("img")
        image.style.width = "100%"
        image.style.height = "100%"
        image.src = chrome.extension.getURL("images/static_image_" + i + ".jpg");
        slide.appendChild(image); 
        container.appendChild(slide)
    }
    document.getElementById("modalContainer").appendChild(container)
}

function addLikesDislikes() {
    var likesContainer = document.createElement("div")
    likesContainer.style.margin = "-10px 10px 5px 10px"
    likesContainer.style.backgroundColor = "#FCEDED"

    var disLikeDiv = document.createElement("div")
    var disLikeImage = document.createElement("img")
    disLikeImage.src = chrome.extension.getURL("images/thumbs-down-solid.svg");
    disLikeImage.style.float = "left"
    disLikeImage.style.height = "30px"
    disLikeImage.style.width = "30px"
    disLikeImage.style.margin = "10px"
    disLikeDiv.appendChild(disLikeImage)
    disLikeImage.addEventListener('click', function() {
        const request = {
            type: 'updateDislike',
            styleId: getStyleId(),
            uid: userid,
            occasion: currentIndex
        }
        sendMessage(request, function(response) {
            console.log("Dislikes: " + response.count)
        })
    });


    var disLikeCounter = document.createElement("div")
    disLikeCounter.style.float = "left"
    disLikeCounter.style.fontSize = "20px"
    disLikeCounter.style.marginTop = "20px"
    disLikeCounter.innerText = "10"

    var likeDiv = document.createElement("div")
    var likeImage = document.createElement("img")
    likeImage.src = chrome.extension.getURL("images/thumbs-up-solid.svg");
    likeImage.style.float = "left"
    likeImage.style.height = "30px"
    likeImage.style.width = "30px"
    likeImage.style.margin = "10px"
    likeDiv.appendChild(likeImage)
    likeImage.addEventListener('click', function() {
        const request = {
            type: 'updateLike',
            styleId: getStyleId(),
            uid: userid,
            occasion: currentIndex
        }
        sendMessage(request, function(response) {
            console.log("Likes: " + response.count)
        })
    });

    var likeCounter = document.createElement("div")
    likeCounter.style.float = "left"
    likeCounter.style.fontSize = "20px"
    likeCounter.style.marginTop = "20px"
    likeCounter.innerText = "15"

    likesContainer.appendChild(likeDiv)
    likesContainer.appendChild(likeCounter)

    likesContainer.appendChild(disLikeDiv)
    likesContainer.appendChild(disLikeCounter)

    var container = document.getElementById("modalContainer")
    container.appendChild(likesContainer)
}

function sendMessage(request, sendResponse) {
    chrome.runtime.sendMessage(request, sendResponse)
}

function getStyleId() {
    var url = document.URL;
    pattern = '/\\d+/';
    return url.match(pattern)[0].replaceAll('/', '');
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