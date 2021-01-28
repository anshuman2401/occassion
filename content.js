var posTop = ["230px", "100px", "230px", "130px", "95px", "180px", "140px", "200px", "80px"];
var posLeft = ["240px", "370px", "455px", "464px", "390px", "280px", "465px", "310px", "304px"];
var width = ["250px", "330px", "180px", "320px", "365px", "290px", "280px", "200px", "380px"];
var height = ["380px", "500px", "270px", "490px", "550px", "420px", "430px", "300px", "570px"];
var currentIndex = 0;

if(document.getElementsByClassName("pdp-action-container pdp-fixed")[0]) {
    var theButton = createOccasionButton()
    
    theButton.addEventListener('click', function() {
        createModal()
        createModalContainer()
        createSlideShow()
    
        $(document).ready(function(){$('.your-class').slick();});
        
        addCanvas(modalContainer)
        addLikesDislikes()
        fillCountData(0, true);

        document.getElementsByClassName("slick-prev slick-arrow")[0].addEventListener("click", sliderClick);
        document.getElementsByClassName("slick-next slick-arrow")[0].addEventListener("click", sliderClick);

        function sliderClick() {
            currentIndex = document.getElementsByClassName("slick-slide slick-current slick-active")[0].attributes.getNamedItem("data-slick-index").value;
            document.getElementById("canvasId").style = "position:absolute; z-index:1; top:" + posTop[currentIndex] + ";left:" + posLeft[currentIndex] + ";";
            document.getElementById("canvasId").style.width = width[currentIndex];
            document.getElementById("canvasId").style.height = height[currentIndex];
            document.getElementById("occasionName").innerText = occasion[currentIndex] + " Occasion"
            fillCountData(currentIndex, true);
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
    closeBtn.style = "font-size:20px;color:gray;background:#FCEDED;position:absolute;font-weight:bold;z-index:31;left:790px;top:-14px;cursor:pointer;padding:5px 10px 5px 10px;opacity:0.7;border:5px black;border-radius:20px;"
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
    modalContainer.style.padding = "8px"
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
    button.id = "occasionButton";
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

    for (let i = 0; i < occasion.length; i++) {
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
    disLikeImage.style.margin = "13px 10px 10px 18px"
    disLikeDiv.appendChild(disLikeImage)
    disLikeImage.addEventListener('click', function() {
        const request = {
            type: 'updateDislike',
            styleId: getStyleId(document.URL),
            uid: userid,
            occasion: occasion[currentIndex]
        }
        sendMessage(request)
    });


    let disLikeCounter = document.createElement("div")
    disLikeCounter.id = "dislikeCounter"
    disLikeCounter.style.float = "left"
    disLikeCounter.style.fontSize = "20px"
    disLikeCounter.style.marginTop = "15px"
    disLikeCounter.innerText = "0"

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
            styleId: getStyleId(document.URL),
            uid: userid,
            occasion: occasion[currentIndex]
        }
        sendMessage(request)
    });

    let likeCounter = document.createElement("div")
    likeCounter.id = "likeCounter"
    likeCounter.style.float = "left"
    likeCounter.style.fontSize = "20px"
    likeCounter.style.marginTop = "15px"
    likeCounter.innerText = "0"

    var boughtDiv = document.createElement("div")
    var boughtImage = document.createElement("img")
    boughtImage.src = chrome.extension.getURL("images/cart.svg");
    boughtImage.style.float = "right"
    boughtImage.style.height = "30px"
    boughtImage.style.width = "30px"
    boughtImage.style.margin = "10px"
    boughtDiv.appendChild(boughtImage)

    let boughtCounter = document.createElement("div")
    boughtCounter.id = "boughtCounter"
    boughtCounter.style.float = "right"
    boughtCounter.style.fontSize = "20px"
    boughtCounter.style.marginTop = "15px"
    boughtCounter.innerText = "0"

    likesContainer.appendChild(likeDiv)
    likesContainer.appendChild(likeCounter)

    likesContainer.appendChild(disLikeDiv)
    likesContainer.appendChild(disLikeCounter)

    likesContainer.appendChild(boughtDiv)
    likesContainer.appendChild(boughtCounter)


    var container = document.getElementById("modalContainer")

    var occasionName = document.createElement("div")
    occasionName.id = "occasionName"
    occasionName.innerText = occasion[currentIndex] + " Occasion"
    occasionName.style.fontWeight = "bold"

    container.appendChild(occasionName)
    container.appendChild(likesContainer)
}

function fillCountData(index, bought) {
    let request = {
        type: 'getLike',
        styleId: getStyleId(document.URL),
        occasion: occasion[index]
    }
    sendMessage(request, function (response) {
        likeCounter.innerHTML = response.count ? response.count : 0;
    });

    request.type = 'getDislike';
    sendMessage(request, function (response) {
        dislikeCounter.innerHTML = response.count ? response.count : 0;
    });

    if (bought) {
        request.type = 'getBoughtOccasion';
        sendMessage(request, function (response) {
            boughtCounter.innerHTML = response.count ? response.count : 0;
        });
    }
}