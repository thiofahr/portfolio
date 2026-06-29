// ── Network Graph ───────────────────────────────────────────
const CATS = {
  "Earth & Climate":  { color: "#2A9D8F" },
  "Data & Tech":      { color: "#3D7FBD" },
  "Science":          { color: "#6C63A6" },
  "Communication":    { color: "#FF5B3E" },
  "Tools & Code":     { color: "#C97B2E" },
  "Energy & Society": { color: "#8AB17D" },
};
const CAT_NAMES = Object.keys(CATS);

const NODES = [

  // Center
  {
    id:"me",
    label:"",
    cat:null,
    size:24,
    desc:"Physics graduate with interest at the intersection of climate, energy, and data."
  },

  // CLIMATE
  {
    id:"climate",
    label:"Climate Science",
    cat:"Earth & Climate",
    size:24,
    desc:"Climate variability, compound extremes, and how risk shifts under future scenarios."
  },

  {
    id:"enso",
    label:"ENSO",
    cat:"Earth & Climate",
    size:16,
    desc:"My undergraduate thesis focused on the energy of equatorial waves during the 2023 El Niño."
  },

  // {
  //   id:"waves",
  //   label:"Equatorial Waves",
  //   cat:"Earth & Climate",
  //   size:18,
  //   desc:"The subject of my undergraduate thesis."
  // },

  {
    id:"cmip6",
    label:"CMIP6",
    cat:"Earth & Climate",
    size:16,
    desc:"I am using CMIP6 projections for my independent project on compound hot-dry extremes."
  },

  {
    id:"extremes",
    label:"Climate Extremes",
    cat:"Earth & Climate",
    size:16,
    desc:"My interests are in compound hot-dry events and precipitation whiplash across Indonesia."
  },

  {
    id:"impact",
    label:"Climate Impact",
    cat:"Earth & Climate",
    size:15,
    desc:"Translating hazard into population exposure and risk."
  },

  // DATA
  {
    id:"data",
    label:"Data Analysis",
    cat:"Data & Tech",
    size:24,
    desc:"Turning raw climate and energy data into something decision-useful."
  },

  {
    id:"python",
    label:"Python",
    cat:"Data & Tech",
    size:18,
    desc:"My main tool for building research pipelines, from xarray to NetCDF."
  },

  {
    id:"stats",
    label:"Statistics",
    cat:"Data & Tech",
    size:16,
    desc:"PCA, trend detection, uncertainty quantification, and signal-to-noise analysis."
  },

  {
    id:"viz",
    label:"Visualization",
    cat:"Data & Tech",
    size:15,
    desc:"Python (Seaborn, Matplotlib), Streamlit, Power BI."
  },

  {
    id:"ml",
    label:"Machine Learning",
    cat:"Data & Tech",
    size:14,
    desc:"Exploring where ML can sharpen climate and energy applications."
  },

  // RESEARCH
  // {
  //   id:"research",
  //   label:"Research",
  //   cat:"Science",
  //   size:24,
  //   desc:"Internship experience at BRIN and IESR, plus independent project work."
  // },

  // {
  //   id:"physics",
  //   label:"Physics",
  //   cat:"Science",
  //   size:18,
  //   desc:"BSc in Physics, Universitas Padjadjaran, 2025."
  // },

  // {
  //   id:"signal",
  //   label:"Signal Processing",
  //   cat:"Science",
  //   size:16,
  //   desc:"FFT, EOF, and spectral methods applied to atmospheric data."
  // },

  // {
  //   id:"meteorology",
  //   label:"Meteorology",
  //   cat:"Science",
  //   size:15,
  //   desc:"I studied meteorology during internship at BRIN, as well as elective course during my undergraduate year."
  // },

  // ENERGY
  {
    id:"energy",
    label:"Energy Transition",
    cat:"Energy & Society",
    size:24,
    desc:"I spent 3 months for research internship at IESR"
  },

  {
    id:"iesr",
    label:"Energy Systems",
    cat:"Energy & Society",
    size:16,
    desc:"I worked with analyzing the RUPTL 2025-2034 for IESR's Indonesia Energy Transition Outlook."
  },

  {
    id:"methane",
    label:"Methane Emissions",
    cat:"Energy & Society",
    size:15,
    desc:"I also supported IESR literature review on coal and oil & gas methane emissions analysis in Indonesia."
  },

  // {
  //   id:"transport",
  //   label:"Transport",
  //   cat:"Energy & Society",
  //   size:14,
  //   desc:"Decarbonization angles in the transport sector."
  // },

  // COMMUNICATION
  {
    id:"comm",
    label:"Science Comm",
    cat:"Communication",
    size:24,
    desc:"I have three years experience at Pajajaran Physical Society, with an aim to make science easier to read."
  },

  {
    id:"writing",
    label:"Writing",
    cat:"Communication",
    size:18,
    desc:"Articles on Antroposen, plus a Physics magazine and children's book on climate change."
  },

  {
    id:"education",
    label:"Teaching",
    cat:"Communication",
    size:16,
    desc:"Laboratory teaching assistant during undergrad."
  },

  {
    id:"design",
    label:"Infographics",
    cat:"Communication",
    size:14,
    desc:"I also designed Physics infographics using Figma for Pajajaran Physical Society."
  },

];

const LINKS = [

  ["me","climate"],
  ["me","data"],
  // ["me","research"],
  ["me","energy"],
  ["me","comm"],

  ["climate","enso"],
  ["climate","impact"],
  ["climate","cmip6"],
  ["climate","extremes"],
  ["climate","geo"],

  ["data","python"],
  ["data","stats"],
  ["data","viz"],
  ["data","ml"],

  // ["research","physics"],
  // ["research","signal"],
  // ["research","meteorology"],

  ["energy","iesr"],
  ["energy","methane"],
  // ["energy","transport"],

  ["comm","writing"],
  ["comm","education"],
  ["comm","design"],

  // // cross-links
  // ["python","cmip6"],
  // ["python","signal"],
  // ["python","viz"],

  // ["waves","signal"],
  // ["extremes","cmip6"],

  // ["energy","climate"],
  // ["comm","climate"],
  // ["research","data"]
];