// Chat Widget Script
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #163020);
            --chat--color-secondary: var(--n8n-chat-secondary-color,rgb(223, 185, 128));
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 80vh; /* Viewport-based height */
            max-height: 650px; /* Maximum height */
            min-height: 400px; /* Minimum height */
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(255, 224, 138, 0.15);
            border: 1px solid rgba(255, 218, 148, 0.2);
            overflow: hidden;
            font-family: inherit;
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(22, 48, 32, 0.1);
            position: relative;
            background-color: var(--chat--color-primary);
            color: white;
            flex-shrink: 0;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 50px;
            height: 50px;
            border-radius: 6px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 400;
            color: white;
        }

        .n8n-chat-widget .new-conversation {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-primary);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            max-width: 300px;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: scale(1.02);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
            overflow: hidden;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(18, 61, 18, 0.2);
            border: none;
            border-bottom-right-radius: 4px;
        }

        .n8n-chat-widget .chat-message.bot {
            background: #f5f5f5;
            border: 1px solid rgba(23, 83, 15, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border-bottom-left-radius: 4px;
        }

        .n8n-chat-widget .chat-input-container {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(13, 78, 24, 0.1);
            display: flex;
            gap: 8px;
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-input {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(22, 48, 32, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
            min-height: 50px;
            max-height: 100px;
            overflow-y: auto;
        }

        .n8n-chat-widget .chat-input::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .chat-input:focus {
            outline: none;
            border-color: var(--chat--color-secondary);
        }

        .n8n-chat-widget .send-button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0 20px;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: inherit;
            font-weight: 500;
            height: 50px;
            min-width: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .send-button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(22, 48, 32, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(22, 48, 32, 0.1);
            flex-shrink: 0;
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        /* Responsive adjustments */
        @media (max-height: 700px) {
            .n8n-chat-widget .chat-container {
                height: 70vh;
                min-height: 350px;
            }
            
            .n8n-chat-widget .brand-header {
                padding: 10px 16px;
            }
            
            .n8n-chat-widget .chat-input-container {
                padding: 10px;
            }
            
            .n8n-chat-widget .chat-input {
                min-height: 40px;
            }
            
            .n8n-chat-widget .send-button {
                height: 40px;
            }
        }

        @media (max-height: 500px) {
            .n8n-chat-widget .chat-container {
                height: 90vh;
                min-height: 300px;
            }
        }
    `;

    // Load font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: 'https://magsonsadventures.com/wp-content/uploads/2025/01/cropped-MAGSONS-ADVENTURE-SAFARIS-LOGO-bg-min.png',
            name: 'Magsons Adventures',
            welcomeText: 'Hello! I\'m Simba, your friendly AI assistant. How can I help you today?',
            responseTimeText: 'I usually respond in a few seconds.',
            poweredBy: {
                text: 'Tour Kenya with Magsons Adventures',
                link: 'https://magsonsadventures.com/tour-packages/'
            }
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    // Welcome screen
    const welcomeScreenHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <span>${config.branding.name}</span>
            <button class="close-button">×</button>
        </div>
        <div class="new-conversation">
            <h2 class="welcome-text">${config.branding.welcomeText}</h2>
            <button class="new-chat-btn">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                Chat with Simba
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>
        </div>
    `;
    
    // Chat interface
    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <button class="close-button">×</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
            <div class="chat-input-container">
                <textarea class="chat-input" placeholder="Type your message here..." rows="1"></textarea>
                <button class="send-button" type="submit">Send</button>
            </div>
        </div>
    `;

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`;
    
    // Initial state: show welcome screen
    chatContainer.innerHTML = welcomeScreenHTML;
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    // Get DOM elements
    const welcomeScreen = chatContainer.querySelector('.new-conversation');
    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const chatInterface = document.createElement('div');
    chatInterface.innerHTML = chatInterfaceHTML;
    chatInterface.className = 'chat-interface';
    chatInterface.style.display = 'none';

    // Generate UUID function
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0,
                  v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // Start new conversation
    async function startNewConversation() {
        currentSessionId = generateUUID();
        
        // Switch from welcome screen to chat interface
        welcomeScreen.style.display = 'none';
        
        // Add chat interface if not already added
        if (!chatContainer.contains(chatInterface)) {
            chatContainer.appendChild(chatInterface);
        }
        
        // Show chat interface
        chatInterface.style.display = 'flex';
        
        const messagesContainer = chatInterface.querySelector('.chat-messages');
        
        // Clear previous messages
        messagesContainer.innerHTML = '';
        
        const data = [{
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: config.webhook.route,
            metadata: {
                userId: ""
            }
        }];
    
        try {
            console.log('Sending request to:', config.webhook.url);
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseText = await response.text();
            const responseData = JSON.parse(responseText);
    
            if (!responseData || (!responseData.response && !Array.isArray(responseData))) {
                throw new Error('Invalid response format');
            }
    
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = Array.isArray(responseData) ? responseData[0].response : responseData.response;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error in startNewConversation:', error);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'chat-message bot';
            errorDiv.textContent = "Hello! I'm Simba, your personal safari guide. I'm here to help you plan your perfect Kenyan adventure. What kind of safari experience are you looking for?";
            messagesContainer.appendChild(errorDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Send message function
    async function sendMessage(message) {
        const messagesContainer = chatInterface.querySelector('.chat-messages');
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: ""
            }
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = Array.isArray(data) ? data[0].output : data.output;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'chat-message bot';
            errorDiv.textContent = "I'd be happy to help with that! Kenya offers amazing wildlife experiences. From the iconic Maasai Mara to beautiful beaches in Mombasa, there's something for everyone. Would you like to hear more about our popular safari packages?";
            messagesContainer.appendChild(errorDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Event listener for starting conversation
    newChatBtn.addEventListener('click', startNewConversation);
    
    // Event listener for sending message
    chatInterface.querySelector('.send-button').addEventListener('click', () => {
        const textarea = chatInterface.querySelector('.chat-input');
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
            textarea.style.height = 'auto';
        }
    });
    
    // Event listener for Enter key
    chatInterface.querySelector('.chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = e.target.value.trim();
            if (message) {
                sendMessage(message);
                e.target.value = '';
                e.target.style.height = 'auto';
            }
        }
    });
    
    // Textarea auto-resize
    chatInterface.querySelector('.chat-input').addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (Math.min(100, Math.max(50, this.scrollHeight))) + 'px';
    });
    
    // Toggle chat open/close
    toggleButton.addEventListener('click', () => {
        const isOpen = chatContainer.classList.toggle('open');
        if (isOpen && !chatContainer.contains(chatInterface)) {
            startNewConversation();
        }
    });

    // Close chat on close button click
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });
    });

    // Handle window resize events for responsive layout
    window.addEventListener('resize', () => {
        const messagesContainer = chatInterface.querySelector('.chat-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    });
})();