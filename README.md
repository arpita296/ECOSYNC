
# EcoSync — Next-Generation Carbon-Aware Web Optimization Toolkit

 **Building a greener web by adapting digital experiences to real-time electricity grid carbon intensity.**

EcoSync is an enterprise-grade, drop-in web SDK designed to optimize website energy consumption based on the live carbon intensity of the user's local electricity grid. Inspired by sustainable web design principles, EcoSync intelligently detects the user's approximate location, retrieves real-time carbon telemetry, and dynamically adjusts website rendering to reduce energy usage during periods of high fossil-fuel dependency.

---

##  Features

-  Automatic user geolocation
-  Live grid carbon intensity monitoring
-  Dynamic UI optimization based on carbon emissions
-  Adaptive media loading and staging
- Reduced computational overhead
-  Edge-compatible architecture for low-latency execution

# 🏗 System Architecture

```text
                     ┌─────────────────────┐
                     │    User Browser     │
                     └──────────┬──────────┘
                                │
                                ▼
                 ┌──────────────────────────┐
                 │ IP Geolocation (ipapi.co)│
                 └──────────┬───────────────┘
                            │
                            ▼
      ┌──────────────────────────────────────────┐
      │ Live Carbon Intensity API (Electricity   │
      │ Maps / WattTime)                         │
      └──────────┬───────────────────────────────┘
                 │
                 ▼
        ┌────────────────────────────┐
        │  EcoSync Decision Engine   │
        └──────────┬─────────────────┘
                   │
 ┌─────────────────┼──────────────────┐
 │                 │                  │
 ▼                 ▼                  ▼
🟢 Low          🟡 Moderate         🔴 High
Carbon          Carbon             Carbon
(<150)        (150–350)          (>350)

Full UI      Reduced Motion     True Black Mode
Animations   Grayscale UI       Animation Disabled
HD Media     Optimized Images   Media Staging
```

---

# 🧠 Optimization Protocol

## 🟢 Low Carbon (<150 gCO₂/kWh)

- Full-quality images
- High-resolution assets
- Smooth animations
- Complete visual experience
- Standard rendering pipeline

---

## 🟡 Moderate Carbon (150–350 gCO₂/kWh)

- Grayscale optimization
- Reduced animation frequency
- Lower media quality
- Deferred non-essential assets
- Optimized rendering

---

## 🔴 High Carbon (>350 gCO₂/kWh)

- OLED True Black theme
- Animations disabled
- Media staged until user interaction
- Heavy assets deferred
- Reduced JavaScript execution
- Maximum energy savings

---

# ⚙ Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6+)




## APIs

- IP Geolocation (ipapi.co)
- Electricity Maps API 

## Deployment

- Vercel



