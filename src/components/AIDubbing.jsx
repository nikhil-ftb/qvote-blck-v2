"use client"

import { useState, useEffect } from "react"
import { Video, FileAudio, Monitor, Film } from "lucide-react"
import { pricingData, calculatePrice } from "../utils/priceCalculator"
import emailjs from "@emailjs/browser"

const initialState = {
  outputType: "video",
  deliverableType: "Low Resolution",
  selectedLanguage: "",
  selectedTargetLanguage: "",
  duration: { hours: 0, minutes: 1 },
  contentType: "Live",
  availableFiles: {
    premixFiles: false,
    meFiles: false,
    srt: false,
    translation: false,
  },
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
  videoFormat: "MP4",
  audioFormat: "MP3",
  sourceLanguage: "",
  targetLanguage: "",
  dialect: "Standard",
  deadline: "",
}

export default function AIDubbing() {
  const [state, setState] = useState(initialState)
  const [price, setPrice] = useState({
    base: 0,
    quality: 0,
    additional: 0,
    total: 0,
  })
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState({})

  const updateState = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const updateFiles = (key, value) => {
    setState((prev) => ({
      ...prev,
      availableFiles: { ...prev.availableFiles, [key]: value },
    }))
  }

  const updateRequirements = (key, value) => {
    setState((prev) => ({
      ...prev,
      requirements: { ...prev.requirements, [key]: value },
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!state.sourceLanguage) newErrors.sourceLanguage = "Source language is required"
    if (!state.targetLanguage) newErrors.targetLanguage = "Target language is required"
    if (!state.clientName) newErrors.clientName = "Client name is required"
    if (!state.clientEmail) newErrors.clientEmail = "Email is required"
    if (!state.deadline) newErrors.deadline = "Deadline is required"
    if (!/\S+@\S+\.\S+/.test(state.clientEmail)) newErrors.clientEmail = "Email is invalid"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSending(true)

    const templateParams = {
      service_type: "AI Dubbing",
      client_name: state.clientName,
      client_email: state.clientEmail,
      duration: `${state.duration.hours} hours ${state.duration.minutes} minutes`,
      total_minutes: state.duration.hours * 60 + state.duration.minutes,
      content_type: state.contentType,
      subtitles: state.requirements.srtOut ? "Yes" : "No",
      source_language: state.sourceLanguage,
      target_language: state.targetLanguage,
      target_dialect: state.dialect,
      voice_match: state.requirements.voiceMatch ? "Yes" : "No",
      ai_voiceover: state.requirements.aiVoiceover ? "Yes" : "No",
      lip_match: state.requirements.lipMatch ? "Yes" : "No",
      premix_files: state.requirements.premixFilesOut ? "Yes" : "No",
      me_files: state.requirements.meFilesOut ? "Yes" : "No",
      sound_balancing: state.requirements.soundBalancing ? "Yes" : "No",
      output_format: state.outputType === "video" ? state.videoFormat : state.audioFormat,
      deliverable_type: state.deliverableType,
      deadline: state.deadline,
      price_per_minute: "₹" + (price.total / (state.duration.hours * 60 + state.duration.minutes)).toFixed(2),
      total_price: "₹" + price.total.toLocaleString("en-IN") + " INR",
      additional_notes: state.message,
      business_name: "Your Business Name",
      business_email: "your@email.com",
    }

    try {
      await emailjs.send("service_u71sf6u", "template_zqcmrnf", templateParams, "07rAnrVT0eXRN2yYl")
      alert("Quotation submitted successfully!")
    } catch (error) {
      console.error("Error:", error)
      alert("Submission failed. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  const handleReset = () => {
    setState(initialState)
    setErrors({})
  }

  useEffect(() => {
    setPrice(calculatePrice(state))
  }, [state])

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">AI Dubbing Calculator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Configuration Panel */}
          <div className="lg:col-span-2">
            <div className="bg-[#1E1E1E] rounded-lg p-6">
              <h2 className="text-lg md:text-xl font-medium mb-6">Service Configuration</h2>

              {/* Service Type */}
              <div className="mb-6">
                <div className="inline-block bg-blue-600 px-4 py-1 rounded-md">AI Dubbing</div>
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

              {/* Video Format Selection */}
              {state.outputType === "video" && (
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Video Format</p>
                  <select
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded p-2"
                    value={state.videoFormat}
                    onChange={(e) => updateState("videoFormat", e.target.value)}
                  >
                    <option value="MP4">MP4</option>
                    <option value="MOV">MOV</option>
                    <option value="AVI">AVI</option>
                  </select>
                </div>
              )}

              {/* Audio Format Selection */}
              {state.outputType === "audio" && (
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-2">Audio Format</p>
                  <select
                    className="w-full bg-[#2A2A2A] border border-gray-700 rounded p-2"
                    value={state.audioFormat}
                    onChange={(e) => updateState("audioFormat", e.target.value)}
                  >
                    <option value="MP3">MP3</option>
                    <option value="WAV">WAV</option>
                    <option value="AAC">AAC</option>
                  </select>
                </div>
              )}

              {/* Deliverable Quality */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Deliverable Quality</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Source Language</p>
                  <select
                    className={`w-full bg-[#2A2A2A] border ${errors.sourceLanguage ? "border-red-500" : "border-gray-700"} rounded p-2`}
                    value={state.sourceLanguage}
                    onChange={(e) => updateState("sourceLanguage", e.target.value)}
                  >
                    <option value="">Select Source Language</option>
                    {pricingData.languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  {errors.sourceLanguage && <p className="text-red-500 text-xs mt-1">{errors.sourceLanguage}</p>}
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Target Language</p>
                  <select
                    className={`w-full bg-[#2A2A2A] border ${errors.targetLanguage ? "border-red-500" : "border-gray-700"} rounded p-2`}
                    value={state.targetLanguage}
                    onChange={(e) => updateState("targetLanguage", e.target.value)}
                  >
                    <option value="">Select Target Language</option>
                    {pricingData.languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                  {errors.targetLanguage && <p className="text-red-500 text-xs mt-1">{errors.targetLanguage}</p>}
                </div>
              </div>

              {/* Dialect Selection */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Dialect</p>
                <select
                  className="w-full bg-[#2A2A2A] border border-gray-700 rounded p-2"
                  value={state.dialect}
                  onChange={(e) => updateState("dialect", e.target.value)}
                >
                  <option value="Standard">Standard</option>
                  <option value="Regional">Regional</option>
                  <option value="Specific Accent">Specific Accent</option>
                </select>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-2">Duration</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                          updateState("duration", {
                            ...state.duration,
                            hours: Math.max(0, Number.parseInt(e.target.value) || 0),
                          })
                        }
                      />
                      <button
                        className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
                        onClick={() => updateState("duration", { ...state.duration, hours: state.duration.hours + 1 })}
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
                          updateState("duration", {
                            ...state.duration,
                            minutes: Math.max(0, state.duration.minutes - 1),
                          })
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-16 bg-[#2A2A2A] border border-gray-700 rounded text-center"
                        value={state.duration.minutes}
                        onChange={(e) =>
                          updateState("duration", {
                            ...state.duration,
                            minutes: Math.min(59, Math.max(0, Number.parseInt(e.target.value) || 0)),
                          })
                        }
                      />
                      <button
                        className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center"
                        onClick={() =>
                          updateState("duration", {
                            ...state.duration,
                            minutes: state.duration.minutes >= 59 ? 0 : state.duration.minutes + 1,
                          })
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pricingData.availableFiles.map((option) => (
                    <label key={option.key} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-600"
                        checked={state.availableFiles[option.key]}
                        onChange={(e) => updateFiles(option.key, e.target.checked)}
                      />
                      <option.icon className="w-4 h-4 ml-2" />
                      <span className="ml-2">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Output Requirements (8 options) */}
              <div>
                <p className="text-sm text-gray-400 mb-2">Output Requirements</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pricingData.outputRequirements.map((option) => (
                    <label key={option.key} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-600"
                        checked={state.requirements[option.key]}
                        onChange={(e) => updateRequirements(option.key, e.target.checked)}
                      />
                      <option.icon className="w-4 h-4 ml-2" />
                      <span className="ml-2">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Client Information */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Client Name</label>
                  <input
                    type="text"
                    className={`w-full bg-[#2A2A2A] border ${errors.clientName ? "border-red-500" : "border-gray-700"} rounded mt-1 p-2`}
                    value={state.clientName}
                    onChange={(e) => updateState("clientName", e.target.value)}
                    placeholder="Enter client name"
                  />
                  {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>}
                </div>
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <input
                    type="email"
                    className={`w-full bg-[#2A2A2A] border ${errors.clientEmail ? "border-red-500" : "border-gray-700"} rounded mt-1 p-2`}
                    value={state.clientEmail}
                    onChange={(e) => updateState("clientEmail", e.target.value)}
                    placeholder="Enter email address"
                  />
                  {errors.clientEmail && <p className="text-red-500 text-xs mt-1">{errors.clientEmail}</p>}
                </div>
                <div>
                  <label className="text-sm text-gray-400">Deadline</label>
                  <input
                    type="date"
                    className={`w-full bg-[#2A2A2A] border ${errors.deadline ? "border-red-500" : "border-gray-700"} rounded mt-1 p-2`}
                    value={state.deadline}
                    onChange={(e) => updateState("deadline", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.deadline && <p className="text-red-500 text-xs mt-1">{errors.deadline}</p>}
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
                disabled={isSending}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mb-3 disabled:bg-gray-500"
              >
                {isSending ? "Sending..." : "Send Quote"}
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

