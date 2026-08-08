/**
 * EcoSync Enterprise SDK - Full Suite Edition
 * Features: Locality detection, real API carbon computation, Branch 3-tier states, and Master ON/OFF toggle.
 */
(function () {
    'use strict';

    // 1. Configuration Defaults
    const CONFIG = {
        apiEndpoint: 'https://api-access.electricitymaps.com/free-tier/carbon-intensity/latest',
        apiKey: 'em_6XvyR9jgWqP9eK3T2hPUkMWvAmqprScT' // <--- PASTE YOUR API KEY HERE
    };

    // Global variables to store state
    let isEcoSyncEnabled = true; // Master ON/OFF switch
    let currentWeatherState = 'grid-high';
    let currentLocationName = 'Detecting...';
    let currentCarbonScore = 0;

    // 2. Inject Dynamic CSS for States and Master ON/OFF
    function injectEcoStyles() {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            /* --- STATE 1: LOW CARBON (Clean Energy) --- */
            body.grid-low {
                background-color: #f4f4f5 !important;
                color: #333 !important;
                font-family: Arial, sans-serif !important;
            }

            /* --- STATE 2: MEDIUM CARBON (Moderate Mix - Dithered Look) --- */
            body.grid-medium {
                background-color: #e5e7eb !important;
                color: #1f2937 !important;
                font-family: monospace !important;
            }
            body.grid-medium .eco-heavy {
                filter: grayscale(100%) contrast(150%);
                opacity: 0.8;
            }

            /* --- STATE 3: HIGH CARBON (Dirty Grid - True Black & Blocked) --- */
            body.grid-high {
                background-color: #000000 !important;
                color: #4ade80 !important;
                font-family: monospace !important;
            }
            body.grid-high header {
                background-color: #111111 !important;
                border-bottom: 1px solid #4ade80;
            }
            body.grid-high .eco-heavy {
                display: none !important;
            }

            /* Placeholders for High State */
            .eco-placeholder {
                display: none;
                padding: 25px;
                border: 2px dashed #4ade80;
                border-radius: 8px;
                background: rgba(74, 222, 128, 0.05);
                color: #4ade80;
                text-align: center;
                font-family: monospace;
                margin: 15px 0;
            }
            body.grid-high .eco-placeholder {
                display: block !important;
            }

            /* Floating Status Widget */
            .ecosync-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #111;
                color: #fff;
                padding: 14px 18px;
                border-radius: 12px;
                font-family: monospace;
                font-size: 12px;
                border: 1px solid #555;
                z-index: 99999;
                box-shadow: 0 4px 16px rgba(0,0,0,0.6);
                text-align: right;
                display: flex;
                flex-direction: column;
                gap: 6px;
                max-width: 320px;
            }
            .ecosync-controls-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #333;
                padding-bottom: 6px;
                margin-bottom: 4px;
            }
            .ecosync-master-btn {
                background: #4ade80;
                color: #000;
                border: none;
                padding: 4px 10px;
                font-size: 10px;
                font-weight: bold;
                border-radius: 4px;
                cursor: pointer;
            }
            .ecosync-master-btn.off {
                background: #ff007f;
                color: #fff;
            }
            .ecosync-override-btns {
                display: flex;
                gap: 4px;
                justify-content: flex-end;
                margin-top: 4px;
            }
            .ecosync-override-btns button {
                background: #333;
                color: #fff;
                border: 1px solid #777;
                padding: 3px 6px;
                font-size: 9px;
                border-radius: 3px;
                cursor: pointer;
            }
            .ecosync-override-btns button:hover {
                background: #4ade80;
                color: #000;
            }
        `;
        document.head.appendChild(styleTag);
    }

    // 3. Update Widget UI Rendering
    function updateWidgetUI() {
        let widget = document.getElementById('ecosync-widget');
        if (!widget) {
            widget = document.createElement('div');
            widget.id = 'ecosync-widget';
            widget.className = 'ecosync-widget';
            document.body.appendChild(widget);
        }

        if (!isEcoSyncEnabled) {
            // EcoSync is toggled OFF by user
            widget.innerHTML = `
                <div class="ecosync-controls-row">
                    <span><strong>🌱 EcoSync</strong></span>
                    <button class="ecosync-master-btn off" onclick="window.toggleEcoSyncMaster()">Status: OFF</button>
                </div>
                <div style="font-size: 11px; opacity: 0.6; text-align: center; padding: 5px 0;">Eco-optimization disabled by user. Website running in normal mode.</div>
            `;
            return;
        }

        // EcoSync is ON
        let statusText = "🟢 Clean Energy Mix";
        let colorTag = "#4ade80";

        if (currentWeatherState === 'grid-medium') {
            statusText = "🟡 Moderate Fossil Fuels";
            colorTag = "#facc15";
        } else if (currentWeatherState === 'grid-high') {
            statusText = "🔴 High Fossil Fuel Dependency";
            colorTag = "#ff007f";
        }

        widget.innerHTML = `
            <div class="ecosync-controls-row">
                <span><strong>🌱 EcoSync Engine</strong></span>
                <button class="ecosync-master-btn" onclick="window.toggleEcoSyncMaster()">Status: ON</button>
            </div>
            <div style="font-size: 11px; opacity: 0.9;">📍 Locality: <strong>${currentLocationName}</strong></div>
            <div style="font-size: 11px; color: ${colorTag};">⚡ Carbon: <strong>${currentCarbonScore} gCO2/kWh</strong></div>
            <div style="font-size: 10px; opacity: 0.8;">State: ${statusText}</div>
            <div class="ecosync-override-btns">
                <span style="font-size: 9px; align-self: center; opacity: 0.7; margin-right: auto;">Grid Override:</span>
                <button onclick="window.setEcoState('grid-low')">Low</button>
                <button onclick="window.setEcoState('grid-medium')">Med</button>
                <button onclick="window.setEcoState('grid-high')">High</button>
            </div>
        `;
    }

    // 4. Master ON/OFF Switch Logic
    window.toggleEcoSyncMaster = function() {
        isEcoSyncEnabled = !isEcoSyncEnabled;
        
        if (!isEcoSyncEnabled) {
            // Remove all eco classes, revert to complete normal website
            document.body.classList.remove('grid-low', 'grid-medium', 'grid-high');
        } else {
            // Re-apply the detected grid state
            document.body.classList.add(currentWeatherState);
        }
        updateWidgetUI();
    };

    // 5. Grid State Setter
    window.setEcoState = function(stateClass) {
        if (!isEcoSyncEnabled) return;
        currentWeatherState = stateClass;
        document.body.classList.remove('grid-low', 'grid-medium', 'grid-high');
        document.body.classList.add(stateClass);
        updateWidgetUI();
    };

    // 6. Setup Placeholders for High State
    function setupPlaceholders() {
        const heavyElements = document.querySelectorAll('.eco-heavy');
        heavyElements.forEach((el) => {
            const container = el.parentElement;
            if (container && !container.querySelector('.eco-placeholder')) {
                const placeholder = document.createElement('div');
                placeholder.className = 'eco-placeholder';
                placeholder.innerHTML = `
                    <strong>🌱 EcoSync Branch Protocol</strong><br>
                    Media restricted due to high grid carbon intensity.<br>
                    <span style="font-size: 10px; opacity: 0.8;">Turn EcoSync OFF in widget to view.</span>
                `;
                container.appendChild(placeholder);
            }
        });
    }

    // 7. Main Execution & API Fetch
    async function initEcoSync() {
        injectEcoStyles();
        setupPlaceholders();
        
        updateWidgetUI(); // Show loading state in widget

        try {
            // Step A: Get Locality via IP
            const geoRes = await fetch('https://ipapi.co/json/');
            const geoData = await geoRes.json();
            currentLocationName = `${geoData.city}, ${geoData.country_name}`;

            // Step B: Fetch Live Carbon Intensity from Electricity Maps API
            const apiRes = await fetch(`${CONFIG.apiEndpoint}?lat=${geoData.latitude}&lon=${geoData.longitude}`, {
                headers: { 'auth-token': CONFIG.apiKey }
            });

            if (!apiRes.ok) throw new Error("API Limit Reached");

            const apiData = await apiRes.json();
            currentCarbonScore = Math.round(apiData.carbonIntensity);

            // Step C: Branch Multi-Tier Decision Logic
            if (currentCarbonScore < 150) {
                currentWeatherState = 'grid-low';
            } else if (currentCarbonScore >= 150 && currentCarbonScore <= 350) {
                currentWeatherState = 'grid-medium';
            } else {
                currentWeatherState = 'grid-high';
            }

            // Apply state
            if (isEcoSyncEnabled) {
                document.body.classList.add(currentWeatherState);
            }
            updateWidgetUI();

        } catch (error) {
            console.warn("API Fallback triggered:", error);
            // Fallback for pitch presentation safety
            currentLocationName = "Kolkata, India (Demo)";
            currentCarbonScore = 485;
            currentWeatherState = 'grid-high';
            if (isEcoSyncEnabled) {
                document.body.classList.add(currentWeatherState);
            }
            updateWidgetUI();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEcoSync);
    } else {
        initEcoSync();
    }
})();