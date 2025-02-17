

// Price calculation function
export const calculatePrice = (state) => {
  const baseRate = 100; // Base rate per minute
  const minutes = state.duration.hours * 60 + state.duration.minutes;
  let basePrice = minutes * baseRate;

  // Apply content type multiplier (20% extra for Animation)
  if (state.contentType === "Animation") {
    basePrice *= 1.2;
  }

  // Apply deliverable quality multiplier
  switch (state.deliverableType) {
    case "High Resolution":
      basePrice *= 1.3;
      break;
    case "Master Quality":
      basePrice *= 1.5;
      break;
    default:
      break;
  }

  // Process the selected options
  let deductions = 0;
  let additions = 0;
  for (const key in state.options) {
    if (state.options[key]) {
      // Get option details from pricingData
      const option = pricingData.options.find((opt) => opt.key === key);
      if (option) {
        if (option.type === "deduction") {
          deductions += option.amount;
        } else if (option.type === "addition") {
          // For options that add per minute (voiceMatch, aiVoiceover, lipMatch)
          if (["voiceMatch", "aiVoiceover", "lipMatch"].includes(key)) {
            additions += option.amount * minutes;
          } else {
            additions += option.amount;
          }
        }
      }
    }
  }

  // Apply deductions to the base price (ensuring it doesn’t drop below zero)
  basePrice = Math.max(0, basePrice - deductions);

  // Calculate quality premium and additional services fees
  const qualityPremium = basePrice * 0.12;
  const additionalServices = additions + basePrice * 0.08;
  const total = basePrice + qualityPremium + additionalServices;

  return {
    base: basePrice.toFixed(2),
    quality: qualityPremium.toFixed(2),
    additional: additionalServices.toFixed(2),
    total: total.toFixed(2),
  };
};
