"use client"

import { useState, useEffect } from "react"
import {
  Video,
  FileAudio,
  Monitor,
  Film,
  UserCheck,
  Bot,
  Smile,
  Sliders,
  Download,
  FileText,
  FileType,
} from "lucide-react"
import { pricingData, calculatePrice } from "../utils/priceCalculator"

// Define the initial state outside the component function (or inside, but then reuse it)
const initialState = {
  outputType: "video",
  deliverableType: "Low Resolution",
  selectedLanguage: "English",
  selectedTargetLanguage: "Spanish",
  duration: { hours: 0, minutes: 1 },
  contentType: "Live",
  availableFiles: {
    premixFiles: false,
    meFiles: false,
    srt: false,
    translation: false,
  },
  // 8 output requirements options
  requirements: {
    voiceMatch: false,
    aiVoiceover: false,
    lipMatch: false,
    soundBalancing: false,
    premixFilesOut: false,
    meFilesOut: false,
    srtOut: false,
    translationOut: false,
  },
  clientName: "",
  clientEmail: "",
  message: "",
};

export default function AIDubbing() {
  const [state, setState] = useState(initialState);
  const [price, setPrice] = useState({
    base: 0,
    quality: 0,
    additional: 0,
    total: 0,
  });

  const updateState = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const updateFiles = (key, value) => {
    setState(prev => ({
      ...prev,
      availableFiles: { ...prev.availableFiles, [key]: value }
    }));
  };

  const updateRequirements = (key, value) => {
    setState(prev => ({
      ...prev,
      requirements: { ...prev.requirements, [key]: value }
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting:", state);
  };

  // Reset function to clear all fields by resetting state to initialState
  const handleReset = () => {
    setState(initialState);
  };

  useEffect(() => {
    setPrice(calculatePrice(state));
  }, [state]);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">AI Dubbing Calculator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Configuration Panel */}
          <div className="lg:col-span-2">
            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h2 className="text-lg font-medium mb-6">Service Configuration</h2>

              {/* Service Type */}
              <div className="mb-6">
                <div className="inline-block bg-blue-600 px-4 py-1 rounded-md">
                  AI Dubbing
                </div>
              </div>

              {/* Output Format */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Output Format</p>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input 
                      type="radio"
                      name="format"
                      className="form-radio text-blue-600"
                      checked={state.outputType === "video"}
                      onChange={() => updateState("outputType", "video")}
                    />
                    <Video className="w-4 h-4 ml-2" />
                    <span className="ml-2">Video</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio"
                      name="format"
                      className="form-radio text-blue-600"
                      checked={state.outputType === "audio"}
                      onChange={() => updateState("outputType", "audio")}
                    />
                    <FileAudio className="w-4 h-4 ml-2" />
                    <span className="ml-2">Audio</span>
                  </label>
                </div>
              </div>

              {/* Deliverable Quality */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Deliverable Quality</p>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex items-center">
                    <input 
                      type="radio"
                      name="quality"
                      className="form-radio text-blue-600"
                      checked={state.deliverableType === "Low Resolution"}
                      onChange={() => updateState("deliverableType", "Low Resolution")}
                    />
                    <Monitor className="w-4 h-4 ml-2" />
                    <span className="ml-2">Low Resolution</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio"
                      name="quality"
                      className="form-radio text-blue-600"
                      checked={state.deliverableType === "High Resolution"}
                      onChange={() => updateState("deliverableType", "High Resolution")}
                    />
                    <Monitor className="w-4 h-4 ml-2" />
                    <span className="ml-2">High Resolution</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio"
                      name="quality"
                      className="form-radio text-blue-600"
                      checked={state.deliverableType === "Master Quality"}
                      onChange={() => updateState("deliverableType", "Master Quality")}
                    />
                    <Monitor className="w-4 h-4 ml-2" />
                    <span className="ml-2">Master Quality</span>
                  </label>
                </div>
              </div>

              {/* Language Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Source Language</p>
                  <select
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded p-2"
                    value={state.selectedLanguage}
                    onChange={(e) => updateState("selectedLanguage", e.target.value)}
                  >
                    {pricingData.languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Target Language</p>
                  <select
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded p-2"
                    value={state.selectedTargetLanguage}
                    onChange={(e) => updateState("selectedTargetLanguage", e.target.value)}
                  >
                    {pricingData.languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Duration</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Hours</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button 
                        className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
                        onClick={() =>
                          updateState("duration", { ...state.duration, hours: Math.max(0, state.duration.hours - 1) })
                        }
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        className="w-16 bg-[#2A2A2A] border border-gray-700 rounded text-center"
                        value={state.duration.hours}
                        onChange={(e) =>
                          updateState("duration", { ...state.duration, hours: Math.max(0, Number.parseInt(e.target.value) || 0) })
                        }
                      />
                      <button 
                        className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
                        onClick={() =>
                          updateState("duration", { ...state.duration, hours: state.duration.hours + 1 })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Minutes</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button 
                        className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
                        onClick={() =>
                          updateState("duration", { ...state.duration, minutes: Math.max(0, state.duration.minutes - 1) })
                        }
                      >
                        -
                      </button>
                      <input 
                        type="number"
                        className="w-16 bg-[#2A2A2A] border border-gray-700 rounded text-center"
                        value={state.duration.minutes}
                        onChange={(e) =>
                          updateState("duration", { ...state.duration, minutes: Math.min(59, Math.max(0, Number.parseInt(e.target.value) || 0)) })
                        }
                      />
                      <button 
                        className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
                        onClick={() =>
                          updateState("duration", { ...state.duration, minutes: state.duration.minutes >= 59 ? 0 : state.duration.minutes + 1 })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Type */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Content Type</p>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input 
                      type="radio"
                      name="contentType"
                      className="form-radio text-blue-600"
                      checked={state.contentType === "Live"}
                      onChange={() => updateState("contentType", "Live")}
                    />
                    <Monitor className="w-4 h-4 ml-2" />
                    <span className="ml-2">Live</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio"
                      name="contentType"
                      className="form-radio text-blue-600"
                      checked={state.contentType === "Animation"}
                      onChange={() => updateState("contentType", "Animation")}
                    />
                    <Film className="w-4 h-4 ml-2" />
                    <span className="ml-2">Animation</span>
                  </label>
                </div>
              </div>

              {/* Available Files */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Available Files</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "premixFiles", label: "Premix File", icon: Download },
                    { key: "meFiles", label: "M&E File", icon: Download },
                    { key: "srt", label: "SRT", icon: FileText },
                    { key: "translation", label: "Translation", icon: FileType }
                  ].map(option => {
                    const Icon = option.icon;
                    return (
                      <label key={option.key} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="form-checkbox text-blue-600"
                          checked={state.availableFiles[option.key]}
                          onChange={(e) => updateFiles(option.key, e.target.checked)}
                        />
                        <Icon className="w-4 h-4 ml-2" />
                        <span className="ml-2">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Output Requirements (8 options) */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Output Requirements</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "voiceMatch", label: "Voice Match", icon: UserCheck },
                    { key: "aiVoiceover", label: "AI Voiceover", icon: Bot },
                    { key: "lipMatch", label: "Lip Match", icon: Smile },
                    { key: "soundBalancing", label: "Sound Balancing", icon: Sliders },
                    { key: "premixFilesOut", label: "Premix File", icon: Download },
                    { key: "meFilesOut", label: "M&E File", icon: Download },
                    { key: "srtOut", label: "SRT", icon: FileText },
                    { key: "translationOut", label: "Translation", icon: FileType }
                  ].map(option => {
                    const Icon = option.icon;
                    return (
                      <label key={option.key} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="form-checkbox text-blue-600"
                          checked={state.requirements[option.key]}
                          onChange={(e) => updateRequirements(option.key, e.target.checked)}
                        />
                        <Icon className="w-4 h-4 ml-2" />
                        <span className="ml-2">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Client Information */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Client Name</label>
                  <input 
                    type="text"
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded mt-1 p-2"
                    value={state.clientName}
                    onChange={(e) => updateState("clientName", e.target.value)}
                    placeholder="Enter client name"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <input 
                    type="email"
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded mt-1 p-2"
                    value={state.clientEmail}
                    onChange={(e) => updateState("clientEmail", e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Additional Message</label>
                  <textarea 
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded mt-1 p-2 h-24"
                    value={state.message}
                    onChange={(e) => updateState("message", e.target.value)}
                    placeholder="Enter any additional requirements or notes"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Price Panel */}
          <div className="lg:col-span-1">
            <div className="bg-[#1E1E1E] rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-medium mb-6">Estimated Price</h2>
              <div className="text-3xl font-bold mb-6">₹{price.total}</div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Base Price</span>
                  <span>₹{price.base}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Quality Premium</span>
                  <span>₹{price.quality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Additional Services</span>
                  <span>₹{price.additional}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-700">
                  <span>Total</span>
                  <span>₹{price.total}</span>
                </div>
              </div>
  
              <button 
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mb-3"
              >
                Send Quote
              </button>
  
              <button 
                onClick={handleReset}
                className="w-full border border-gray-600 text-gray-400 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
