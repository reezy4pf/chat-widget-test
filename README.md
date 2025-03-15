# Magsons Adventures Chat Widget Test

This repository contains a simple test implementation of the Magsons Adventures chat widget.

## Files

- `index.html` - A basic HTML page that loads and configures the chat widget
- `chat-widget.js` - The JavaScript code for the chat widget

## Configuration

The chat widget is configured in `index.html` with the following settings:

```javascript
window.ChatWidgetConfig = {
    webhook: {
        url: 'https://yoreezy.app.n8n.cloud/webhook/981f76af-574b-49ec-9ac1-82de5d264a1c/chat',
        route: 'general'
    },
    branding: {
        logo: 'https://magsonsadventures.com/wp-content/uploads/2025/01/cropped-MAGSONS-ADVENTURE-SAFARIS-LOGO-bg-min.png',
        name: 'Magsons Adventures',
        welcomeText: 'Hi 👋, how can we help?',
        responseTimeText: 'We typically respond right away'
    },
    style: {
        primaryColor: '#163020',
        secondaryColor: '#f5f2e7',
        position: 'right',
        backgroundColor: '#ffffff',
        fontColor: '#333333'
    }
};
```

## Viewing the Chat Widget

This repository is configured with GitHub Pages. You can view the chat widget in action at:
https://reezy4pf.github.io/chat-widget-test/

## Deployment

To deploy this chat widget on your own website:

1. Copy the `chat-widget.js` file to your website
2. Add the configuration script and include the widget script in your HTML:

```html
<script>
    window.ChatWidgetConfig = {
        webhook: {
            url: 'YOUR_WEBHOOK_URL',
            route: 'YOUR_ROUTE'
        },
        branding: {
            logo: 'YOUR_LOGO_URL',
            name: 'YOUR_BRAND_NAME',
            welcomeText: 'YOUR_WELCOME_TEXT',
            responseTimeText: 'YOUR_RESPONSE_TIME_TEXT'
        },
        style: {
            primaryColor: '#YOUR_PRIMARY_COLOR',
            secondaryColor: '#YOUR_SECONDARY_COLOR',
            position: 'right', // or 'left'
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };
</script>
<script src="path/to/chat-widget.js"></script>
```