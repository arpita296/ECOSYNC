async function checkElectricityMaps(latitude, longitude) {
    const apiToken = 'em_6XvyR9jgWqP9eK3T2hPUkMWvAmqprScT';
    
    // Call the v4 carbon-intensity endpoint using latitude and longitude
    const url = `https://api.electricitymaps.com/v4/carbon-intensity/latest?lat=${latitude}&lon=${longitude}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'auth-token': apiToken // Electricity Maps uses 'auth-token' for API keys
            }
        });

        if (!response.ok) {
            throw new Error(`API returned status: ${response.status}`);
        }

        const data = await response.json();
        
        // Return the core metric you need
        return {
            zone: data.zone,
            carbonIntensity: data.carbonIntensity, // Measured in gCO2eq/kWh
            timestamp: data.datetime
        };

    } catch (error) {
        console.error("Failed to fetch grid data:", error);
        return null; // Fail gracefully so the website still loads if the API crashes
    }
}