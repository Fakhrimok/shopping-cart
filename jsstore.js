if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var cartrmvbtn = document.getElementsByClassName("cartrmv");
  for (var i = 0; i < cartrmvbtn.length; i++) {
    var button = cartrmvbtn[i];
    button.addEventListener("click", function (event) {
      var buttonclicked = event.target;
      buttonclicked.parentElement.remove();
      total();
    });
  }
}

// calculate every subtotal of the cart (works)
function subtotalcart() {
  var qtybtn = document.getElementsByClassName("cartqty");
  for (var i = 0; i < qtybtn.length; i++) {
    var button = qtybtn[i];
    button.addEventListener("click", function (event) {
      var cart = document.getElementsByClassName("cart")[0];
      var order = cart.getElementsByClassName("order")[0];
      var cartitems = order.getElementsByClassName("cartitem");
      var subtotal;
      for (var i = 0; i < cartitems.length; i++) {
        var cartitem = cartitems[i];
        var unitprice = cartitem.getElementsByClassName("unitprice")[0];
        var cartqty = cartitem.getElementsByClassName("cartqty")[0];
        var price = parseFloat(unitprice.innerText.replace("$", ""));
        var qty = cartqty.value;
        subtotal = price * qty;
        document.getElementsByClassName("subtotal")[i].innerText =
          subtotal + "$";
        total();
      }
    });
  }
}

// calculate to sum of total on every click (works)
function total() {
  var subtotals = document.getElementsByClassName("subtotal");
  var total = 0;
  for (i = 0; i < subtotals.length; i++) {
    var subtotal = subtotals[i];
    total = total + parseFloat(subtotal.innerText.replace("$", ""));
  }
  document.getElementsByClassName("totalprice")[0].innerText = total + "$";
}

// find addtocart btns (works)
var addtocart = document.getElementsByClassName("addtocart");
for (var i = 0; i < addtocart.length; i++) {
  var button = addtocart[i];
  button.addEventListener("click", clickitem);
  // button.addEventListener("click", alreadyselected);
}
// find info about cartitem clicked (works)
function clickitem(event) {
  var button = event.target;
  var shopitem = button.parentElement;
  var itemname = shopitem.getElementsByClassName("itemname")[0].innerText;
  var itemprice = shopitem.getElementsByClassName("itemprice")[0].innerText;
  var itempricenum = parseFloat(itemprice.replace("$", ""));
  var portrait = shopitem.getElementsByClassName("portrait")[0];
  var imgsrc = portrait.getElementsByClassName("itemimg")[0].src;
  addrowtocart(itemname, itempricenum, imgsrc);
  
}

// check if item already selected (works funny!!!)
function alreadyselected() {
  var addtocart = document.getElementsByClassName("addtocart");

  for (var i = 0; i < addtocart.length; i++) {
    var button = addtocart[i];
    button.addEventListener("click", function (event) {
      var button = event.target;
      var shopitem = button.parentElement;
      var itemname = shopitem.getElementsByClassName("itemname")[0].innerText;
      var cartitemname = document.getElementsByClassName("cartitemname");
      for (var j = 0; j < cartitemname.length; j++) {
        if ((cartitemname[j].innerText = itemname)) {
          alert("This item is already selected");
          return;
        }
      }
    });
  }
}

// create and add the cartitem clicked to cart (works)
function addrowtocart(itemname, itempricenum, imgsrc) {
  var order = document.getElementsByClassName("order")[0];
  var cartitem = document.createElement("div");
  order.append(cartitem);

  // alreadyselected();


  // create the new elements in the cart (works)
  var infoitem = document.createElement("div");
    var infoitemcontent = `<div class="cartitem">
     <img
       src="${imgsrc}"
        class="cartimg"
     />
      <div class="infoitem">
         <div class = "cartitemname"> ${itemname} </div>
        <div class="cartitemprice">
           <div class ="unitprice">${itempricenum}$</div>
         <input type="number" value="1" min ="0" class ="cartqty" />
          <div class ="subtotal">${itempricenum}$</div>
          </div>
        </div>
        <i class="fa-solid fa-trash-can cartrmv"></i>
    </div>`;
  infoitem.innerHTML = infoitemcontent;
cartitem.append(infoitem);
  // call the functions again for
  // the new created items (necessary but not much sense)
  subtotalcart();
  total();
  ready();
}
