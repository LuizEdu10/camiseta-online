let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutForm = document.getElementById('checkoutForm');
    
    // Adiciona produtos ao carrinho
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(name, price);
            updateCartUI();
        });
    });
    
    // Envia o pedido pelo WhatsApp
    checkoutForm.addEventListener('submit', checkout);

    // Atualiza o carrinho ao carregar a página
    updateCartUI();

    // Função para adicionar ao carrinho
    function addToCart(name, price) {
        const item = { name, price };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart)); // Salva no localStorage
    }

    // Função para remover do carrinho
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart)); // Atualiza no localStorage
        updateCartUI();
    }

    // Atualiza a UI do carrinho
    function updateCartUI() {
        cart = JSON.parse(localStorage.getItem('cart')) || []; // Carrega do localStorage
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => removeFromCart(index));
            li.appendChild(removeButton);
            cartItems.appendChild(li);
            total += item.price;
        });

        cartCount.textContent = cart.length;
        cartTotal.textContent = total.toFixed(2);
    }

    // Função para finalizar pedido e enviar pelo WhatsApp
    function checkout(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        const orderDetails = cart.map(item => `${item.name} - R$ ${item.price.toFixed(2)}`).join('\n');
        const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

        const message = `Olá, gostaria de fazer um pedido:\n\n${orderDetails}\n\nTotal: R$ ${total}\n\nNome: ${name}\nEndereço: ${address}\nTelefone: ${phone}`;

        const whatsappUrl = `https://wa.me/554999?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
});
