// src/utils/priceCalculator.js

import {
    Download,
    FileText,
    FileType,
    UserCheck,
    Bot,
    Smile,
    Sliders,
  } from "lucide-react";
  
  // Pricing data in INR including all language pairs and additional charges.
  export const pricingData = {
    languages: [
      "English",
      "Hindi",
      "Tamil",
      "Arabic",
      "Spanish",
      "French",
      "Russian",
      "German",
      "Japanese",
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
    // Full pricingRates array (each object must match exactly)
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
    ],
    // Available Files (affect pricing: deductions)
    availableFiles: [
      { key: "premixFiles", label: "Premix File", icon: Download, type: "deduction", amount: -50 },
      { key: "meFiles", label: "M&E File", icon: Download, type: "deduction", amount: -50 },
      { key: "srt", label: "SRT", icon: FileText, type: "none", amount: 0 },
      { key: "translation", label: "Translation", icon: FileType, type: "none", amount: 0 },
    ],
    // Output Requirements: 8 options.
    // First 4 add charges; next 4 (duplicates) have type "none" so they don't affect pricing.
    outputRequirements: [
      { key: "voiceMatch", label: "Voice Match", icon: UserCheck, type: "addition", amount: 150 },
      { key: "aiVoiceover", label: "AI Voiceover", icon: Bot, type: "addition", amount: 100 },
      { key: "lipMatch", label: "Lip Match", icon: Smile, type: "addition", amount: 200 },
      { key: "soundBalancing", label: "Sound Balancing", icon: Sliders, type: "addition", amount: 50 },
      { key: "premixFilesOut", label: "Premix File", icon: Download, type: "none", amount: 0 },
      { key: "meFilesOut", label: "M&E File", icon: Download, type: "none", amount: 0 },
      { key: "srtOut", label: "SRT", icon: FileText, type: "none", amount: 0 },
      { key: "translationOut", label: "Translation", icon: FileType, type: "none", amount: 0 },
    ],
  };
  
  // Helper function to look up the language pair rate based on selected source, target, and content type.
  // Returns the first element from the appropriate array.
  const getLanguagePairRate = (source, target, contentType) => {
    const rateObj = pricingData.pricingRates.find(
      (obj) => obj.Source === source && obj.Target === target
    );
    if (!rateObj) {
      console.warn("No pricing data found for", source, "to", target);
      return 0;
    }
    return contentType === "Animation" ? rateObj.Animation[0] : rateObj.Live[0];
  };
  
  // Calculate the final price.
  export const calculatePrice = (state) => {
    // Get the language pair base rate from pricingRates.
    const pairRate = getLanguagePairRate(
      state.selectedLanguage,
      state.selectedTargetLanguage,
      state.contentType
    );
    const minutes = state.duration.hours * 60 + state.duration.minutes;
    // Base price is determined by multiplying the pair rate by duration.
    let basePrice = pairRate * minutes;
  
    // Process deductions from Available Files.
    let deductions = 0;
    for (const key in state.availableFiles) {
      if (state.availableFiles[key]) {
        const fileOption = pricingData.availableFiles.find(opt => opt.key === key);
        if (fileOption && fileOption.type === "deduction") {
          deductions += fileOption.amount;
        }
      }
    }
  
    // Process additions for Output Requirements.
    // We'll ignore duplicate options (keys ending with "Out").
    const duplicateKeys = ["premixFilesOut", "meFilesOut", "srtOut", "translationOut"];
    let additions = 0;
    for (const key in state.requirements) {
      if (state.requirements[key]) {
        if (duplicateKeys.includes(key)) continue;
        const reqOption = pricingData.outputRequirements.find(opt => opt.key === key);
        if (reqOption && reqOption.type === "addition") {
          if (["voiceMatch", "aiVoiceover", "lipMatch"].includes(key)) {
            additions += reqOption.amount * minutes;
          } else if (key === "soundBalancing") {
            additions += reqOption.amount;
          }
        }
      }
    }
  
    // Effective base price after applying available files deductions.
    const effectiveBase = Math.max(0, basePrice + deductions);
    // Determine if any output requirement (the ones that affect pricing) is selected.
    const outputSelected = Object.keys(state.requirements).some(
      key => !duplicateKeys.includes(key) && state.requirements[key]
    );
    let total = effectiveBase;
    if (outputSelected) {
      // If any output requirement affecting pricing is selected, add quality premium (12%) and extra services (8%)
      const qualityPremium = effectiveBase * 0.12;
      const extraServices = effectiveBase * 0.08;
      total = effectiveBase + qualityPremium + extraServices + additions;
    }
  
    return {
      base: effectiveBase.toFixed(2),
      quality: outputSelected ? (effectiveBase * 0.12).toFixed(2) : "0.00",
      additional: outputSelected ? (additions + effectiveBase * 0.08).toFixed(2) : "0.00",
      total: total.toFixed(2),
    };
  };
  