document.addEventListener('DOMContentLoaded', function() {
    showContent('help');});
// Menu data structure
const menu = {
    human: {
        'burger': { 
            price: 10, 
            desc: 'Classic Earth Burger',
            ascii: `
   ,-'"---.
  /        \\
 |  {}  {}  |
 |   /--\\   |
  \\  \\__/  /
   '------'`
        },
        'pizza': { 
            price: 12, 
            desc: 'Quantum Pizza',
            ascii: `
    ____
  /      \\
 /  ○  ○  \\
|  ○  ○  ○ |
 \\  ○  ○ /
  \\____/`
        },
        'sushi': { 
            price: 15, 
            desc: 'Space Sushi',
            ascii: `
  ,_____,
 [|○|○|○|]
  '-----'`
        }
    },
    alien: {
        'zorblax': { 
            price: 20, 
            desc: 'Zorblaxian Stew',
            ascii: `
   _.---._
  (       )
   \\~~~~~/ 
    \\   /
     \\ /
      V`
        },
        'quantum-salad': { 
            price: 18, 
            desc: 'Quantum Probability Salad',
            ascii: `
    \\|/
   --*--
    /|\\`
        },
        'nebula-soup': { 
            price: 25, 
            desc: 'Nebula Cloud Soup',
            ascii: `
   (~~~)
  (     )
   \\___/`
        }
    }
};

// Cart array
let cart = [];

// Command functions
const commands = {
    help: `<div>
        <span>Available commands:</span><br>
<span>- help: Show this help</span><br>
<span>- menu: Show all menus</span><br>
<span>- human: Show Earth menu</span><br>
<span>- alien: Show alien menu</span><br>
<span>- order $item: Add to cart</span><br>
<span>- cart: Show cart</span><br>
<span>- clear: Clear terminal</span><br>
<span>- pay: Process payment</span><br>
<span>- about: About us</span>
</div>`,

    about: `Welcome to Galactic Cuisine Terminal!
We serve the best dishes from Earth and beyond.
Established 2157 - Now with quantum delivery!`,

    menu() {
        return this.human() + '\n\n' + this.alien();
    },

    human() {
        let output = `<div class="menu-header">=== Earth Menu ===</div>`;
    
    // Create each menu item on a new line
    Object.entries(menu.human).forEach(([item, details]) => {
        output += `<div class="menu-item">${item}: ${details.price} UC - ${details.desc}</div>`;
    });

    return output;
    },

    alien() {
        let output = `<div class="menu-header">=== Alien Menu ===</div>`;
    
    // Create each menu item on a new line
    Object.entries(menu.alien).forEach(([item, details]) => {
        output += `<div class="menu-item">${item}: ${details.price} UC - ${details.desc}</div>`;
    });

    return output;
    },

    order(item) {
        return handleMenuClick(item);
    },

    cart() {
        if (cart.length === 0) return 'Cart is empty';
        const allItems = { ...menu.human, ...menu.alien };
        const total = cart.reduce((sum, item) => sum + allItems[item].price, 0);
        return `Cart contents:
${cart.map(item => `${item}: ${allItems[item].price} UC
${allItems[item].ascii}`).join('\n')}
Total: ${total} UC`;
    },

    pay() {
        if (cart.length === 0) return 'Cart is empty!';
        const total = cart.reduce((sum, item) => 
            sum + ({ ...menu.human, ...menu.alien })[item].price, 0);
        cart = [];
        updateCart();
        showNotification('Payment processed successfully!');
        return `Payment processed! Total: ${total} UC
Thank you for choosing Galactic Cuisine!
Your order will be quantum-delivered shortly...`;
    },

    clear() {
        return '';
    }
};

// Helper functions
function showNotification(message) {
    const notifications = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notifications.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function updateCart() {
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartContent.innerHTML = 'Your cart is empty';
        cartTotal.innerHTML = '';
        return;
    }

    const allItems = { ...menu.human, ...menu.alien };
    let total = 0;
    let content = '';

    cart.forEach(item => {
        content += `<div class="menu-item">
            <pre class="ascii-art">${allItems[item].ascii}</pre>
            <div>
                ${item} - ${allItems[item].price} UC
                <br>
                <small>${allItems[item].desc}</small>
            </div>
        </div>`;
        total += allItems[item].price;
    });

    cartContent.innerHTML = content;
    cartTotal.innerHTML = `Total: ${total} UC`;
}

function showContent(type) {
    
    const contentBlock = document.getElementById('active-content');
    contentBlock.style.display = 'block';
    
    switch(type) {
        case 'human':
            contentBlock.innerHTML = `
                <div class="title">EARTH MENU</div>
                ${Object.entries(menu.human).map(([item, details]) => `
                    <div class="menu-item" onclick="handleMenuClick('${item}')">
                        <pre class="ascii-art">${details.ascii}</pre>
                        <div>
                            ${item} - ${details.price} UC
                            <br>
                            <small>${details.desc}</small>
                        </div>
                    </div>
                `).join('')}`;
            break;
        case 'alien':
            contentBlock.innerHTML = `
                <div class="title">ALIEN MENU</div>
                ${Object.entries(menu.alien).map(([item, details]) => `
                    <div class="menu-item" onclick="handleMenuClick('${item}')">
                        <pre class="ascii-art">${details.ascii}</pre>
                        <div>
                            ${item} - ${details.price} UC
                            <br>
                            <small>${details.desc}</small>
                        </div>
                    </div>
                `).join('')}`;
            break;
        case 'about':
            contentBlock.innerHTML = `
                <div class="title">ABOUT US</div>
                <p>${commands.about.replace(/\n/g, '<br>')}</p>`;
            break;
        case 'help':
            contentBlock.innerHTML = `
                <div class="title">HELP</div>
                <p>${commands.help}</p>`;
            break;
        default:
        contentBlock.innerHTML = `
                <div class="title">HELP</div>
                <p>${commands.help.replace(/\n/g, '<br>')}</pre>`;
            break;

    }
}

function handleMenuClick(item) {
    const allItems = { ...menu.human, ...menu.alien };
    if (allItems[item]) {
        cart.push(item);
        showNotification(`Added ${item} to cart!`);
        updateCart();
        return `Added ${item} to your cart! (${allItems[item].price} UC)
${allItems[item].ascii}`;
    }
    return `Error: Item '${item}' not found in menu.`;
}

// Initialize terminal
const terminalOutput = document.getElementById('terminal-output');
const input = document.getElementById('command-input');

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const fullCommand = this.value.trim().toLowerCase();
        const [command, ...args] = fullCommand.split(' ');
        this.value = '';

        terminalOutput.innerHTML += `<div style="color: #00ff00">guest@GCT:~$ ${fullCommand}</div>`;

        if (command in commands) {
            const result = typeof commands[command] === 'function' 
                ? commands[command](...args)
                : commands[command];
            
            if (command === 'clear') {
                terminalOutput.innerHTML = '';
            } else {
                terminalOutput.innerHTML += `<div>${result}</div>`;
            }
        } else if (command !== '') {
            terminalOutput.innerHTML += `<div style="color: #ff4500">Command not found: ${command}</div>`;
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// Initialize with welcome message
terminalOutput.innerHTML = `Welcome to the Galactic Cuisine Terminal!
Type 'help' to see available commands, or use the buttons above.
Please note: All dishes are certified safe for their respective species.`;

