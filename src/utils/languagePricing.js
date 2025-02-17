// src/utils/languagePricing.js

export const languageData = {
    languages: [
      "English",
      "Hindi",
      "Tamil",
      "Arabic",
      "Spanish",
      "French",
      "Russian",
      "German",
      "Japanese"
    ],
    dialects: {
      "English": ["British", "American", "Australian", "Canadian"],
      "Hindi": ["Standard", "Bhojpuri", "Awadhi"],
      "Tamil": [],
      "Arabic": [],
      "Spanish": ["Castilian", "Mexican", "Argentine"],
      "French": ["Standard", "Canadian", "Belgian"],
      "Russian": [],
      "German": ["Standard", "Swiss", "Austrian"],
      "Japanese": ["Standard", "Kansai", "Tohoku"]
    },
    pricingRates: [
      {
        Source: "English",
        Target: "Hindi",
        Animation: [375, 375, 375, 375, 375, 350, 350, 350],
        Live: [400, 350, 350, 350, 300, 275, 275, 275]
      },
      {
        Source: "English",
        Target: "Tamil",
        Animation: [475, 475, 475, 475, 475, 450, 450, 450],
        Live: [500, 450, 450, 450, 350, 325, 325, 325]
      },
      {
        Source: "English",
        Target: "Arabic",
        Animation: [600, 600, 600, 600, 600, 575, 575, 575],
        Live: [600, 580, 580, 580, 525, 475, 475, 475]
      },
      {
        Source: "English",
        Target: "Spanish",
        Animation: [600, 600, 600, 600, 600, 575, 575, 575],
        Live: [600, 580, 580, 580, 525, 475, 475, 475]
      },
      {
        Source: "English",
        Target: "French",
        Animation: [600, 600, 600, 600, 600, 575, 575, 575],
        Live: [600, 580, 580, 580, 525, 475, 475, 475]
      },
      {
        Source: "English",
        Target: "Russian",
        Animation: [800, 800, 800, 800, 800, 775, 775, 775],
        Live: [800, 850, 850, 850, 750, 725, 725, 725]
      },
      {
        Source: "English",
        Target: "German",
        Animation: [600, 600, 600, 600, 600, 575, 575, 575],
        Live: [600, 580, 580, 580, 525, 475, 475, 475]
      },
      {
        Source: "English",
        Target: "Japanese",
        Animation: [600, 600, 600, 600, 600, 575, 575, 575],
        Live: [600, 580, 580, 580, 525, 475, 475, 475]
      },
      {
        Source: "Hindi",
        Target: "English",
        Animation: [375, 375, 375, 375, 375, 350, 350, 350],
        Live: [400, 350, 350, 350, 300, 275, 275, 275]
      },
      {
        Source: "Hindi",
        Target: "Tamil",
        Animation: [475, 475, 475, 475, 475, 450, 450, 450],
        Live: [500, 450, 450, 450, 350, 325, 325, 325]
      },
      {
        Source: "Hindi",
        Target: "Arabic",
        Animation: [700, 700, 700, 700, 700, 675, 675, 675],
        Live: [750, 680, 680, 680, 625, 575, 575, 575]
      },
      {
        Source: "Hindi",
        Target: "Spanish",
        Animation: [700, 700, 700, 700, 700, 675, 675, 675],
        Live: [750, 680, 680, 680, 625, 575, 575, 575]
      },
      {
        Source: "Hindi",
        Target: "French",
        Animation: [700, 700, 700, 700, 700, 675, 675, 675],
        Live: [750, 680, 680, 680, 625, 575, 575, 575]
      },
      {
        Source: "Hindi",
        Target: "Russian",
        Animation: [900, 900, 900, 900, 900, 875, 875, 875],
        Live: [950, 950, 950, 950, 850, 825, 825, 825]
      },
      {
        Source: "Hindi",
        Target: "German",
        Animation: [700, 700, 700, 700, 700, 675, 675, 675],
        Live: [750, 680, 680, 680, 625, 575, 575, 575]
      },
      {
        Source: "Hindi",
        Target: "Japanese",
        Animation: [700, 700, 700, 700, 700, 675, 675, 675],
        Live: [750, 680, 680, 680, 625, 575, 575, 575]
      }
    ]
  };
  