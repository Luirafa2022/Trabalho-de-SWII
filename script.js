// script.js
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = [];
const cartContainer = document.querySelector('.cart-items');
const totalElement = document.getElementById('total');
const checkoutForm = document.querySelector('.checkout form');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const product = {
      name: button.parentNode.querySelector('h3').textContent,
      price: parseFloat(button.parentNode.querySelector('p').textContent.replace('R$ ', ''))
    };
    cartItems.push(product);
    updateCart();
    showAddToCartAlert(product.name);
  });
});

function updateCart() {
  cartContainer.innerHTML = '';
  let total = 0;

  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>R$ ${item.price.toFixed(2)}</p>
      </div>
      <button class="remove-from-cart"><i class="fas fa-trash"></i></button>
    `;
    cartContainer.appendChild(cartItem);
    total += item.price;
  });

  totalElement.textContent = total.toFixed(2);
}

document.querySelectorAll('.remove-from-cart').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentNode.querySelector('h3').textContent;
    const index = cartItems.findIndex(product => product.name === item);
    if (index !== -1) {
      cartItems.splice(index, 1);
      updateCart();
    }
  });
});

document.querySelector('.hero .btn').addEventListener('click', () => {
  window.location.href = 'cart.html';
});

function showAddToCartAlert(productName) {
  alert(`${productName} adicionado ao carrinho!`);
}

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const cardNumber = document.getElementById('card-number').value;
  const expirationDate = document.getElementById('expiration-date').value;
  const cvv = document.getElementById('cvv').value;

  // Processo de pagamento simulado
  const total = parseFloat(totalElement.textContent);
  alert(`Compra finalizada com sucesso!\nTotal pago: R$ ${total.toFixed(2)}`);
  window.location.href = 'index.html';
});