const graphData = {

    nodes: [

        // =========================
        // CENTER
        // =========================
        {
            id: "me",
            label: "",
            x: 350,
            y: 260,
            value: 24,
            height: 24,
            fill: "#5B8FF9",
            desc: "Physics graduate with interest at the intersection of climate, energy, and data."
        },

        // =========================
        // EARTH & CLIMATE
        // =========================
        {
            id: "climate",
            label: "Climate Science",
            x: 190,
            y: 130,
            value: 24,
            height: 24,
            fill: "#2A9D8F",
            desc: "Climate variability, compound extremes, and how risk shifts under future scenarios."
        },

        {
            id: "enso",
            label: "ENSO",
            x: 60,
            y: 70,
            value: 16,
            height: 16,
            fill: "#2A9D8F",
            desc: "My undergraduate thesis focused on the energy of equatorial waves during the 2023 El Niño."
        },

        {
            id: "cmip6",
            label: "CMIP6",
            x: 70,
            y: 190,
            value: 16,
            height: 16,
            fill: "#2A9D8F",
            desc: "I am using CMIP6 projections for my independent project on compound hot-dry extremes."
        },

        {
            id: "extremes",
            label: "Climate Extremes",
            x: 190,
            y: 55,
            value: 16,
            height: 16,
            fill: "#2A9D8F",
            desc: "My interests are in compound hot-dry events and precipitation whiplash across Indonesia."
        },

        {
            id: "impact",
            label: "Climate Impact",
            x: 60,
            y: 130,
            value: 15,
            height: 15,
            fill: "#2A9D8F",
            desc: "Translating hazard into population exposure and risk."
        },

        // =========================
        // DATA & TECH
        // =========================
        {
            id: "data",
            label: "Data Analysis",
            x: 510,
            y: 130,
            value: 24,
            height: 24,
            fill: "#3D7FBD",
            desc: "Turning raw climate and energy data into something decision-useful."
        },

        {
            id: "python",
            label: "Python",
            x: 650,
            y: 70,
            value: 18,
            height: 18,
            fill: "#3D7FBD",
            desc: "My main tool for building research pipelines, from xarray to NetCDF."
        },

        {
            id: "stats",
            label: "Statistics",
            x: 670,
            y: 140,
            value: 16,
            height: 16,
            fill: "#3D7FBD",
            desc: "PCA, trend detection, uncertainty quantification, and signal-to-noise analysis."
        },

        {
            id: "viz",
            label: "Visualization",
            x: 650,
            y: 210,
            value: 15,
            height: 15,
            fill: "#3D7FBD",
            desc: "Python (Seaborn, Matplotlib), Streamlit, Power BI."
        },

        {
            id: "ml",
            label: "Machine Learning",
            x: 510,
            y: 55,
            value: 14,
            height: 14,
            fill: "#3D7FBD",
            desc: "Exploring where ML can sharpen climate and energy applications."
        },

        // =========================
        // ENERGY & SOCIETY
        // =========================
        {
            id: "energy",
            label: "Energy Transition",
            x: 510,
            y: 390,
            value: 24,
            height: 24,
            fill: "#8AB17D",
            desc: "I spent 3 months for research internship at IESR"
        },

        {
            id: "iesr",
            label: "Energy Systems",
            x: 650,
            y: 350,
            value: 16,
            height: 16,
            fill: "#8AB17D",
            desc: "I worked with analyzing the RUPTL 2025-2034 for IESR's Indonesia Energy Transition Outlook."
        },

        {
            id: "methane",
            label: "Methane Emissions",
            x: 650,
            y: 430,
            value: 15,
            height: 15,
            fill: "#8AB17D",
            desc: "I also supported IESR literature review on coal and oil & gas methane emissions analysis in Indonesia."
        },

        // =========================
        // COMMUNICATION
        // =========================
        {
            id: "comm",
            label: "Science Comm",
            x: 190,
            y: 390,
            value: 24,
            height: 24,
            fill: "#FF5B3E",
            desc: "I have three years experience at Pajajaran Physical Society, with an aim to make science easier to read."
        },

        {
            id: "writing",
            label: "Writing",
            x: 60,
            y: 350,
            value: 18,
            height: 18,
            fill: "#FF5B3E",
            desc: "Articles on Antroposen, plus a Physics magazine and children's book on climate change."
        },

        {
            id: "education",
            label: "Teaching",
            x: 70,
            y: 430,
            value: 16,
            height: 16,
            fill: "#FF5B3E",
            desc: "Laboratory teaching assistant during undergrad."
        },

        {
            id: "design",
            label: "Infographics",
            x: 190,
            y: 455,
            value: 14,
            height: 14,
            fill: "#FF5B3E",
            desc: "I also designed Physics infographics using Figma for Pajajaran Physical Society."
        }

    ],

    edges: [

        // Me → main categories
        { from: "me", to: "climate" },
        { from: "me", to: "data" },
        { from: "me", to: "energy" },
        { from: "me", to: "comm" },

        // Climate
        { from: "climate", to: "enso" },
        { from: "climate", to: "impact" },
        { from: "climate", to: "cmip6" },
        { from: "climate", to: "extremes" },

        // Data
        { from: "data", to: "python" },
        { from: "data", to: "stats" },
        { from: "data", to: "viz" },
        { from: "data", to: "ml" },

        // Energy
        { from: "energy", to: "iesr" },
        { from: "energy", to: "methane" },

        // Communication
        { from: "comm", to: "writing" },
        { from: "comm", to: "education" },
        { from: "comm", to: "design" }

    ]
};