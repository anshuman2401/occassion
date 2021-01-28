var posTop = ["230px", "110px", "232px", "130px", "90px"];
var posLeft = ["242px", "345px", "365px", "-80px", "-20px"];
var width = ["220px", "295px", "160px", "280px", "310px"];
var height = ["330px", "420px", "220px", "400px", "450px"];
var currentIndex = 0;

if(document.getElementsByClassName("pdp-action-container pdp-fixed")[0]) {
        
    var theButton = createOccasionButton()
    
    theButton.addEventListener('click', function() {

        var modal = createModal()
        var container = document.createElement("div")
        var imagesHolder = getImageHolder()

        var slideShow = createSlideShow()
        imagesHolder.appendChild(slideShow)

        container.appendChild(imagesHolder)
    
        modal.appendChild(container);

        $(document).ready(function(){
            $('.your-class').slick();
          });
        
        addCanvas(imagesHolder)

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
    modal.style.position = 'absolute'
    modal.style.display = "inline-block";
    modal.style.top = "150px"
    modal.style.left = "27%"
    document.getElementsByClassName("pdp-pdp-container")[0].appendChild(modal);
    return modal
}

function getImageHolder () {
    var imagesHolder = document.createElement("div");
    imagesHolder.style.width = "800px";
    imagesHolder.style.height = "600px"
    imagesHolder.style.textAlign = "center"
    imagesHolder.style.color = "#000"
    imagesHolder.style.borderRadius = "20px"
    imagesHolder.style.padding = "8px 0px"
    imagesHolder.style.position = "absolute"
    imagesHolder.style.zIndex = "30";
    imagesHolder.style.backgroundColor = "rgb(154 154 154)"
    // imagesHolder.style.opacity = "1"
    return imagesHolder
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

function addCanvas(imagesHolder) {
    var canvas = document.createElement("canvas")
    canvas.id = "canvasId"
    canvas.style = "position:absolute; top:" + posTop[0] + "; left:" + posLeft[0] + "; z-index:1";
    canvas.width = 400;
    canvas.height = 600;
    canvas.style.width = width[0];
    canvas.style.height = height[0];
  
    imagesHolder.appendChild(canvas)
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
    container.style.margin = "10px"
    container.style.marginTop = "20px"

    for (var i=0; i<5; i++) {
        var slide = document.createElement("div")
        var image = document.createElement("img")
        image.style.width = "100%"
        image.style.height = "100%"
        image.src = chrome.extension.getURL("images/static_image_" + i + ".jpg");
        slide.appendChild(image); 
        container.appendChild(slide)
    }
    return container
}