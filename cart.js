function createCartDiv(cartId) {
  let cartDiv = document.createElement("div");
  cartDiv.id = "cart_div_" + cartId;
  cartDiv.style = "display: inline-flex;width: -webkit-fill-available;overflow: scroll;height: 110px;";

  for (let i = 0; i < 9; i++) {
    let slide = document.createElement("div");
    slide.id = "slide_" + i;

    let image = document.createElement("img");
    image.id = "cart_" + cartId + "_slide_image_" + i;
    image.style = "width: 140px;padding: 10px;filter: blur(1px);";
    image.src = chrome.extension.getURL("images/static_image_" + i + ".jpg");

    let ratings = document.createElement("div");
    ratings.style = "position: relative;top: -35px;left: 20px;font-size: 15px;color: white;text-shadow: 1px 1px black;";
    ratings.innerHTML = occasion[i];

    slide.appendChild(image);
    slide.appendChild(ratings);

    slide.addEventListener("click", () => slideClicked(cartId, i));

    cartDiv.appendChild(slide);
  }
  return cartDiv;
}

function slideClicked(cartId, i) {
  document.getElementById("cart_" + cartId + "_slide_image_" + i).style =
    "width: 140px;padding: 10px;filter: blur(0px);border: 2px solid #555;";
  for (let j = 0; j < 9; j++) {
    if (j != i)
      document.getElementById("cart_" + cartId + "_slide_image_" + j).style =
        "width: 140px;padding: 10px;filter: blur(1px);";
  }
  let urlString = document.getElementsByClassName("itemContainer-base-itemLink")[cartId].href;

  const request = {
    type: 'boughtOccasion',
    styleId: getStyleId(urlString),
    uid: userid,
    occasion: occasion[i]
  }
  sendMessage(request);
}

function buyingForText(bId) {
  let buyingForText = document.createElement("div");
  buyingForText.id = "buyingForText_" + bId;
  buyingForText.innerHTML = "Buying for occasion:";
  return buyingForText;
}

let itemsNo = document.getElementsByClassName("itemContainer-base-details").length;
for (let i = 0; i < itemsNo; i++) {
  document.getElementsByClassName("itemContainer-base-details")[i].appendChild(buyingForText(i));
  document.getElementsByClassName("itemContainer-base-details")[i].appendChild(createCartDiv(i));
}
