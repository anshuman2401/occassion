var posTop = ["100px"];
var posLeft = ["355px"];

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
        // loadStaticImages(imagesHolder)
    });
}

function createModal() {
    var modal = document.createElement("div");
    modal.style.position = 'absolute'
    modal.style.display = "inline-block";
    modal.style.top = "250px"
    modal.style.left = "30%"
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
    imagesHolder.style.backgroundColor = "#FFF"
    // imagesHolder.style.opacity = "1"
    return imagesHolder
}

function loadStaticImages(imagesHolder) {
    for(i = 0 ;i < 1; i++) {
        var image = document.createElement("img")
        image.style.width = "400px"
        image.style.height = "400px"
        image.src = chrome.extension.getURL("images/static_image_" + i + ".jpg");
        imagesHolder.appendChild(image)
    }
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
    canvas.style.width = "290px";
    canvas.style.height = "420px";
  
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
    container.style.marginTop = "20px"

    var slide1 = document.createElement("div")
    var image1 = document.createElement("img")
    image1.style.width = "100%"
    image1.style.height = "100%"
    image1.src = chrome.extension.getURL("images/static_image_0.jpg");
    slide1.appendChild(image1);

    var slide2 = document.createElement("div")
    var image2 = document.createElement("img")
    image2.style.width = "100%"
    image2.style.height = "100%"
    image2.src = chrome.extension.getURL("images/static_image_1.jpg");
    slide2.appendChild(image2)

    var slide3 = document.createElement("div")
    var image3 = document.createElement("img")
    image3.style.width = "100%"
    image3.style.height = "100%"
    image3.src = chrome.extension.getURL("images/static_image_2.jpg");
    slide3.appendChild(image3)

    container.appendChild(slide1)
    container.appendChild(slide2)
    container.appendChild(slide3)
    return container
}