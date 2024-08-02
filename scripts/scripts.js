let total = 0;

function addToCart(product, price) {
    const cart = document.getElementById('cart');
    const listItem = document.createElement('li');
    listItem.innerHTML = `${product} - R$ ${price.toFixed(2)} <button class="remove-button" onclick="removeFromCart(this, ${price})">Remover</button>`;
    cart.appendChild(listItem);
    updateTotal(price);
}

function addToCartCheckbox(checkbox, product, price) {
    const cart = document.getElementById('cart');
    const existingItems = Array.from(cart.getElementsByTagName('li'));
    
    if (checkbox.checked) {
        const existingItem = existingItems.find(item => item.textContent.includes(product) && item.dataset.checkbox);

        if (!existingItem) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${product} - R$ ${price.toFixed(2)} <button class="remove-button" onclick="removeFromCart(this, ${price})">Remover</button>`;
            listItem.dataset.checkbox = product; // Marca o item como adicionado via checkbox
            cart.appendChild(listItem);
            updateTotal(price);
        }
    } else {
        const itemToRemove = existingItems.find(item => item.textContent.includes(product) && item.dataset.checkbox === product);
        if (itemToRemove) {
            cart.removeChild(itemToRemove);
            updateTotal(-price);
        }
    }
}

function handleSelect(select) {
    const selectedOption = select.options[select.selectedIndex];
    const product = selectedOption.textContent;
    const price = parseFloat(selectedOption.getAttribute('data-price'));
    addToCart(product, price);
    select.selectedIndex = 0; // Reseta o select após adicionar
}

function updateTotal(amount) {
    total += amount;
    document.getElementById('total').textContent = total.toFixed(2);
}

function finalizePurchase() {
    const cart = document.getElementById('cart');
    if (cart.children.length === 0) {
        alert('O carrinho está vazio. Adicione itens ao carrinho antes de finalizar a compra.');
    } else {
        alert(`Compra finalizada! Total a pagar: R$ ${total.toFixed(2)}`);
        clearCart();
    }
}

function clearCart() {
    const cart = document.getElementById('cart');
    cart.innerHTML = '';
    total = 0;
    document.getElementById('total').textContent = total.toFixed(2);
}

function removeFromCart(button, price) {
    const cart = document.getElementById('cart');
    const item = button.parentNode;
    cart.removeChild(item);
    updateTotal(-price);
}

// Modal 
document.addEventListener('DOMContentLoaded', (event) => {
    // Adiciona evento de clique a todos os textos de gatilho
    const triggerTexts = document.querySelectorAll('.myText');
    triggerTexts.forEach(text => {
        text.addEventListener('click', function() {
            const imgId = this.getAttribute('data-img-id');
            const img = document.getElementById(imgId);
            openModal(img.src, this.textContent);
        });
    });

    // Adiciona evento de clique ao botão de fechar da modal
    const closeButton = document.querySelector('.modal .close');
    closeButton.addEventListener('click', closeModal);
});

function openModal(imgSrc, captionText) {
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('imgModal');
    const caption = document.getElementById('caption');
    
    modal.style.display = 'block';
    modalImage.src = imgSrc;
    caption.textContent = captionText;
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

// Fecha a modal
window.addEventListener('click', function(event) {
    const modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
});
