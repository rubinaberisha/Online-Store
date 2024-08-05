const itemsData = [

];



if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}


function ready() {
  var addToCartButtons = document.getElementsByClassName('shop-item-button');
  for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i];
      button.addEventListener('click', addToCartClicked);
  }


  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
  
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;


var title = shopItem.dataset.title; // Extract title from data attribute
var price = shopItem.dataset.price;


var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  addItemToCart(title, price, imageSrc);

  var cartContainer = document.querySelector('.cart-container');
  cartContainer.classList.remove('hidden');

  updateCartTotal();
  updateCartDot();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  var cartItems = document.getElementsByClassName('cart-itemss')[0];
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
  for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('This item is already added to the cart');
          return;
      }
  }
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="1" min="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.appendChild(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();

  updateCartDot();

}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
  }
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-itemss')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = cartRow.getElementsByClassName('cart-price')[0];
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
      var price = parseFloat(priceElement.innerText.replace('$', ''));
      var quantity = quantityElement.value;
      total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  


  document.querySelector('.cart-total-price').innerText = '$' + total;

  // Hide the cart if it has no items
  var cartContainer = document.querySelector('.cart-container');
  if (total === 0) {
      cartContainer.classList.add('hidden');
  }

}

function purchaseClicked(event) {
  event.stopPropagation();
  alert('Thank you for your purchase');
  var cartItems = document.getElementsByClassName('cart-itemss')[0];
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
 
  updateCartDot();
  
} 
// if we want to not close the cart drawer until the user clicck on purchase button:
// document.getElementById('purchase-btn').addEventListener('click', purchaseClicked);

// Add an event listener to the shopping bag logo
document.getElementById('shopping-bag-logo').addEventListener('click', function() {
  var cartContainer = document.querySelector('.cart-container');
  cartContainer.classList.toggle('hidden');
});

// Add an event listener to the whole page to close the cart when clicking outside the cart
document.addEventListener('click', function(event) {
  var cartContainer = document.querySelector('.cart-container');
  var shoppingBagLogo = document.getElementById('shopping-bag-logo');

  // Check if the clicked element is inside the cart or the shopping bag logo
  if (!cartContainer.contains(event.target) && event.target !== shoppingBagLogo) {
      cartContainer.classList.add('hidden');
  }
});


function updateCartDot() {
  var cartItems = document.getElementsByClassName('cart-item');
  var cartDot = document.querySelector('.cart-dot');

  // If there are items in the cart, show the red dot; otherwise, hide it
 cartDot.style.display = cartItems.length > 0 ? 'block' : 'none';

}

