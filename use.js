/**
 * EcoSync Enterprise SDK v1.1
 * User-Controlled Carbon-Aware Web Optimization Engine.
 */
(function () {
    'use strict';

    let totalDataSaved = 14.4; // Simulated megabytes saved

    // 1. Inject Dynamic CSS (True-Black OLED state, placeholders, and UI button)
    function injectEcoStyles() {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            body.eco-mode {
                background-color: #000000 !important;
                color: #4ade80 !important;
                transition: background-color 0.5s ease;
            }
            body.eco-mode header, body.eco-mode nav {
                background-color: #111111 !important;
                color: #4ade80 !important;
                border-bottom: 1px solid #4ade80;
            }
            body.eco-mode .eco-heavy {
                display: none !important;
            }
            .eco-placeholder {
                display: none;
                padding: 30px;
                border: 2px dashed #4ade80;
                border-radius: 8px;
                background: rgba(74, 222, 128, 0.05);
                color: #4ade80;
                text-align: center;
                font-family: monospace;
                margin: 15px 0;
            }
            body.eco-mode .eco-placeholder {
                display: block !important;
            }
            .ecosync-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #111;
                color: #fff;
                padding: 12px 18px;
                border-radius: 12px;
                font-family: monospace;
                font-size: 13px;
                border: 1px solid #4ade80;
                z-index: 99999;
                box-shadow: 0 4px 16px rgba(0,0,0,0.6);
                display: flex;
                flex-direction: column;
                gap: 8px;
                text-align: right;
            }
            .ecosync-toggle-btn {
                background: #ff007f;
                color: #fff;
                border: none;
                padding: 8px 14px;
                border-radius: 6px;
                font-weight: bold;
                cursor: pointer;
                font-family: monospace;
                transition: background 0.2s;
            }
            .ecosync-toggle-btn.active {
                background: #4ade80;
                color: #000;
            }
        `;
        document.head.appendChild(styleTag);
    }

    // 2. Create the Interactive Widget & Button on the Screen
    function createWidget() {
        let widget = document.getElementById('ecosync-widget');
        if (!widget) {
            widget = document.createElement('div');
            widget.id = 'ecosync-widget';
            widget.className = 'ecosync-widget';
            document.body.appendChild(widget);
        }

        const isEcoActive = document.body.classList.contains('eco-mode');
        const co2Saved = (totalDataSaved * 0.8).toFixed(2);

        widget.innerHTML = `
            <div id="ecosync-status-text">
                ${isEcoActive ? '⚠️ Eco Saver Mode Active' : '🟢 Normal High-Res Mode'}
            </div>
            <div style="font-size: 11px; opacity: 0.8; color: #4ade80;">
                Saved: ${isEcoActive ? totalDataSaved : '0.0'} MB (${isEcoActive ? co2Saved : '0.00'}g CO2)
            </div>
            <button class="ecosync-toggle-btn ${isEcoActive ? 'active' : ''}" id="ecosync-btn">
                ${isEcoActive ? 'Turn Eco Mode OFF' : 'Turn Eco Saver ON'}
            </button>
        `;

        // Attach click event to the dynamically created button
        document.getElementById('ecosync-btn').onclick = toggleEcoMode;
    }

    // 3. Wrap heavy elements with placeholders automatically
    function setupPlaceholders() {
        const heavyElements = document.querySelectorAll('.eco-heavy');
        heavyElements.forEach((el) => {
            const container = el.parentElement;
            if (container && !container.querySelector('.eco-placeholder')) {
                const placeholder = document.createElement('div');
                placeholder.className = 'eco-placeholder';
                placeholder.innerHTML = `
                    <strong>🌱 EcoSync Active</strong><br>
                    Heavy media blocked to preserve local grid energy.<br>
                    <span style="font-size: 10px; opacity: 0.8;">Estimated savings: ~2.5 MB</span>
                `;
                container.appendChild(placeholder);
            }
        });
    }

    // 4. Toggle Function (User Control)
    function toggleEcoMode() {
        document.body.classList.toggle('eco-mode');
        createWidget(); // Refresh widget text and state
    }

    // 5. Initialize on Load
    function initEcoSync() {
        injectEcoStyles();
        setupPlaceholders();
        createWidget(); // Renders in Normal Mode by default
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEcoSync);
    } else {
        initEcoSync();
    }
})();