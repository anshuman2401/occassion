let occassion = ["Wedding", "Reception", "Marriage", "Festival", "Office", "Beach", "Dining", "Romantic", "Sports"];

let cartDiv = document.createElement("div");
cartDiv.style = "display: inline-flex;width: -webkit-fill-available;overflow: scroll;height: 110px;";

for (let i = 0; i < 9; i++) {
  let slide = document.createElement("div");
  slide.id = "slide_" + i;

  let image = document.createElement("img");
  image.id = "slide_image_" + i;
  image.style = "width: 140px;padding: 10px;filter: blur(1px);";
  image.src = chrome.extension.getURL("images/static_image_" + i + ".jpg");

  let ratings = document.createElement("div");
  ratings.style = "position: relative;top: -35px;left: 20px;font-size: 15px;color: white;text-shadow: 1px 1px black;";
  ratings.innerHTML = occassion[i];

  slide.appendChild(image);
  slide.appendChild(ratings);

  slide.addEventListener("click", () => slideClicked(i));

  cartDiv.appendChild(slide);
}

function slideClicked(i) {
  document.getElementById("slide_image_" + i).style = "width: 140px;padding: 10px;filter: blur(0px);border: 2px solid #555;";
  for (let j = 0; j < 9; j++) {
    if (j != i) document.getElementById("slide_image_" + j).style = "width: 140px;padding: 10px;filter: blur(1px);";
  }
  console.log(i);
}

let buyingForText = document.createElement("div");
buyingForText.innerHTML = "Buying for occasion:";
document.getElementsByClassName("itemContainer-base-details")[0].appendChild(buyingForText);

document.getElementsByClassName("itemContainer-base-details")[0].appendChild(cartDiv);
