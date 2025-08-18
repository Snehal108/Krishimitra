import React, { useState, useEffect } from "react";
import {
  fetchWeather,
  startVoiceInput,
  speakText,
  fetchMarketPrice,
} from "./services"; // ✅ your services.js file

const tabs = ["Home", "Ask", "Datasets", "Recommendation", "GovernmentSchemes", "About"];

export default function App() {
  const [activeTab, setActiveTab] = useState("Home");

  const [language, setLanguage] = useState("EN"); // default EN (English)

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "HI" : "EN");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 pt-20 pb-28">
      {/* Navbar */}

      <nav className="fixed top-0 left-0 w-full bg-green-700 text-white px-6 py-4 shadow z-50">
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">
      {language === "EN" ? "KrishiMitra" : "कृषिमित्र"}
    </h1>

    {/* Right side: Language toggle + Hamburger */}
    <div className="flex items-center gap-4">

      {/* Language Button (always visible) */}
      <button
        onClick={toggleLanguage}
        className="bg-yellow-400 text-green-900 px-3 py-1 rounded hover:bg-yellow-300 text-sm"
      >
        {language === "EN" ? "हिन्दी" : "EN"}
      </button>

      {/* Hamburger Button */}
      <button
        className="text-white text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
    </div>
  </div>

  {/* Mobile Menu - visible when menuOpen is true */}
  {menuOpen && (
    <ul className="absolute right-6 top-16 bg-green-700 p-4 rounded shadow-lg text-white z-50 flex flex-col gap-4">
      {tabs.map((tab) => (
        <li
          key={tab}
          onClick={() => {
            setActiveTab(tab);
            setMenuOpen(false); // Close menu on tab click
          }}
          className={`cursor-pointer hover:text-yellow-300 ${
            activeTab === tab ? "underline font-semibold" : ""
          }`}
        >
          {language === "EN"
  ? tab
  : tab === "Home"
  ? "होम"
  : tab === "Ask"
  ? "प्रश्न पूछें"
  : tab === "Datasets"
  ? "डेटासेट"
  : tab === "Recommendation"
  ? "सिफारिशें"
  : tab === "GovernmentSchemes" // ✅ move it **before** the default
  ? "सरकारी योजना"
  : "परिचय"}

        </li>
      ))}
    </ul>
  )}
</nav>

      {/* Main Content */}

      {/* <main className="flex-1 p-6">
        {activeTab === "Home" && <Home language={language} />} */}

<main className="flex-1 p-0">
        {activeTab === "Home" && <Home language={language} />}
        {activeTab === "Ask" && <Ask language={language} />}
        {activeTab === "Datasets" && <Datasets language={language} />}
        {activeTab === "Recommendation" && (<Recommendation language={language} /> )}
        {activeTab === "GovernmentSchemes" && (<GovernmentSchemes language={language} /> )}
        {activeTab === "About" && <About language={language} />}
      </main>


      {/* Footer */}
<footer className="fixed bottom-0 left-0 w-full bg-green-700 text-white text-center py-4 shadow-md z-50">
  <p className="text-sm">
    © {new Date().getFullYear()}{" "}
    {language === "EN"
      ? "KrishiMitra | Empowering Agriculture with Data & Insights"
      : "कृषिमित्र | कृषि को डेटा और जानकारी से सशक्त बनाना"}
  </p>
  <p className="text-xs">
    {language === "EN"
      ? "Designed for Indian farmers & agriculture stakeholders"
      : "भारतीय किसानों और कृषि हितधारकों के लिए डिज़ाइन किया गया"}
  </p>
</footer>

    </div>
  );
}

/* ---------------- HOME ---------------- */


function Home({ language }) {
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState(null);
  const [crop, setCrop] = useState("");
  const [market, setMarket] = useState(null);

  // Fetch weather data
  const getWeatherData = async (cityName) => {
    const langCode = language === "EN" ? "en" : "hi";
    const weatherData = await fetchWeather(cityName, langCode);
    setWeather(weatherData);
  };

  // Fetch market price
  const getMarketData = async () => {
    const data = await fetchMarketPrice(crop);
    setMarket(data);
  };

  // Detect user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const detectedCityWeather = await fetchWeather(`${lat},${lon}`, language === "EN" ? "en" : "hi");
            setCity(detectedCityWeather.location || "Pune");
            setWeather(detectedCityWeather);
          } catch (err) {
            console.error("Location fetch failed, fallback to Pune:", err);
            setCity("Pune");
            getWeatherData("Pune");
          }
        },
        (err) => {
          console.warn("Location permission denied, fallback to Pune:", err);
          setCity("Pune");
          getWeatherData("Pune");
        }
      );
    } else {
      console.warn("Geolocation not supported, fallback to Pune");
      setCity("Pune");
      getWeatherData("Pune");
    }

    // Always fetch market prices for default crop list
    getMarketData();
  }, [language]);

  return (
    <section className="relative bg-gradient-to-r from-green-200 via-green-100 to-green-200 min-h-screen flex flex-col items-center justify-center text-center p-6">

      {/* Background overlay image */}
      <div className="absolute inset-0 bg-[url('/images/farm-hero.jpg')] bg-cover bg-center opacity-30 -z-10"></div>

      {/* Content wrapper */}
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4 drop-shadow-lg">
          {language === "EN" ? "Welcome to KrishiMitra" : "कृषिमित्र में आपका स्वागत है"}
        </h1>
        <p className="text-lg md:text-xl mb-12 text-green-900 drop-shadow">
          {language === "EN"
            ? "KrishiMitra helps farmers make informed decisions with crop recommendations, weather forecasts, and market prices."
            : "कृषिमित्र किसानों को फसल सुझाव, मौसम पूर्वानुमान और बाजार मूल्य के साथ सूचित निर्णय लेने में मदद करता है।"}
        </p>

        {/* Weather & Market Cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          
          {/* Weather card */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex-1">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              {language === "EN" ? "🌤 Weather Update" : "🌤 मौसम अपडेट"}
            </h3>
            <div className="mb-4 flex justify-center gap-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={language === "EN" ? "Enter city name" : "शहर का नाम दर्ज करें"}
                className="border border-gray-300 rounded px-3 py-2 w-64"
              />
              <button
                onClick={() => getWeatherData(city)}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {language === "EN" ? "Search" : "खोजें"}
              </button>
            </div>
            {weather ? (
              <>
                <p>{language === "EN" ? `Location: ${weather.location}` : `स्थान: ${weather.location}`}</p>
                <p>{language === "EN" ? `Temperature: ${weather.temperature} | Humidity: ${weather.humidity}` : `तापमान: ${weather.temperature} | आर्द्रता: ${weather.humidity}`}</p>
                <p>{language === "EN" ? `Condition: ${weather.description}` : `स्थिति: ${weather.description}`}</p>
              </>
            ) : (
              <p>{language === "EN" ? "Loading..." : "लोड हो रहा है..."}</p>
            )}
          </div>

          {/* Market card */}
          <div className="bg-white shadow-lg rounded-xl p-6 flex-1">
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              {language === "EN" ? "📈 Market Prices" : "📈 बाजार भाव"}
            </h3>
            <div className="mb-4 flex justify-center gap-2">
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                placeholder={language === "EN" ? "Enter crop name (e.g., Wheat)" : "फसल का नाम दर्ज करें (जैसे गेहूं)"}
                className="border border-gray-300 rounded px-3 py-2 w-64"
              />
              <button
                onClick={getMarketData}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {language === "EN" ? "Search" : "खोजें"}
              </button>
            </div>
            {market && market.length > 0 ? (
              <ul>
                {market.map((item, idx) => (
                  <li key={idx}>
                    {language === "EN" ? `${item.name_en}: ${item.price}` : `${item.name_hi}: ${item.price}`}
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                {[
                  { name_en: "Wheat", name_hi: "गेहूं", price: "₹2200/qtl" },
                  { name_en: "Rice", name_hi: "चावल", price: "₹2500/qtl" },
                  { name_en: "Maize", name_hi: "मक्का", price: "₹1800/qtl" },
                ].map((item, idx) => (
                  <li key={idx}>
                    {language === "EN" ? `${item.name_en}: ${item.price}` : `${item.name_hi}: ${item.price}`}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}


//ask 


function Ask({ language, weather, market, recommendations, schemes }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  // Voice input handler
  const handleVoiceInput = () => {
    const langCode = language === "EN" ? "en-IN" : "hi-IN";
    startVoiceInput(setQuestion, langCode);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    const newChatHistory = [...chatHistory, { role: "user", content: question }];
    setChatHistory(newChatHistory);

    try {
      const res = await fetch("http://localhost:5000/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          language,
          context: { weather, market, recommendations, schemes },
          chatHistory: newChatHistory,
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      const aiAnswer = data.answer || (language === "EN" ? "No answer returned." : "कोई उत्तर नहीं मिला।");

      setAnswer(aiAnswer);
      setChatHistory([...newChatHistory, { role: "ai", content: aiAnswer }]);
      const langCode = language === "EN" ? "en-IN" : "hi-IN";
      speakText(aiAnswer, langCode);

    } catch (err) {
      console.error("Ask AI error:", err);
      setAnswer(language === "EN" ? "Something went wrong." : "कुछ गलत हो गया।");
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <section className="text-center bg-gradient-to-r from-green-100 via-green-50 to-green-100 min-h-screen py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          {language === "EN" ? "Ask a Question" : "प्रश्न पूछें"}
        </h2>

        <form onSubmit={handleSubmit}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={language === "EN" ? "Type your question here..." : "यहां अपना प्रश्न लिखें..."}
            className="w-full border border-gray-300 rounded p-2 mb-4"
            rows="4"
          ></textarea>

          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={handleVoiceInput}
              className="bg-yellow-400 text-green-900 px-4 py-2 rounded hover:bg-yellow-300"
            >
              🎤 {language === "EN" ? "Speak" : "बोलें"}
            </button>

            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {loading ? (language === "EN" ? "Thinking..." : "सोच रहा है...") : (language === "EN" ? "Submit" : "जमा करें")}
            </button>
          </div>
        </form>

        {/* Chat history */}
        {chatHistory.length > 0 && (
          <div className="mt-4 max-h-96 overflow-y-auto space-y-4">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded ${msg.role === "user" ? "bg-green-100 text-green-900" : "bg-green-50 text-green-800"}`}
              >
                <strong>{msg.role === "user" ? (language === "EN" ? "You: " : "आप: ") : (language === "EN" ? "AI: " : "एआई: ")}</strong>
                <span>{msg.content}</span>
              </div>
            ))}
          </div>
        )}

        {/* Latest AI answer */}
        {answer && (
          <div className="mt-6 bg-green-50 p-4 rounded border border-green-200">
            <h3 className="font-semibold text-green-700 mb-2">
              {language === "EN" ? "Answer:" : "उत्तर:"}
            </h3>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </section>
  );
}


/* ---------------- DATASETS ---------------- */
function Datasets({ language }) {
  // Dummy dataset entries with datasets under each category
  const dummyDatasets = [
    {
      title_en: "Crop Yield Data",
      title_hi: "फसल उपज डेटा",
      datasets: [
        {
          id: 1,
          name_en: "Crop Yield Dataset",
          name_hi: "फसल उत्पादन डेटासेट",
          description_en: "Historical crop yield data of major crops.",
          description_hi: "मुख्य फसलों के ऐतिहासिक उत्पादन का डेटा।",
          link: "https://example.com/crop-yield-2024.csv",
        },
        {
          id: 2,
          name_en: "Regional Crop Analysis",
          name_hi: "क्षेत्रीय फसल विश्लेषण",
          description_en: "Data on crop performance in different regions.",
          description_hi: "विभिन्न क्षेत्रों में फसल प्रदर्शन का डेटा।",
          link: "https://example.com/regional-crop-analysis.csv",
        },
      ],
    },
    {
      title_en: "Rainfall & Weather Trends",
      title_hi: "वर्षा और मौसम रुझान",
      datasets: [
        {
          id: 3,
          name_en: "Weather Patterns Dataset",
          name_hi: "मौसम पैटर्न डेटासेट",
          description_en: "Rainfall, temperature, and climate records for agriculture.",
          description_hi: "कृषि के लिए वर्षा, तापमान और जलवायु के रिकॉर्ड।",
          link: "https://example.com/weather-patterns.csv",
        },
        {
          id: 4,
          name_en: "Rainfall Analysis Dataset",
          name_hi: "वर्षा विश्लेषण डेटासेट",
          description_en: "Monthly and annual rainfall data across regions.",
          description_hi: "विभिन्न क्षेत्रों में मासिक और वार्षिक वर्षा डेटा।",
          link: "https://example.com/rainfall-analysis.csv",
        },
      ],
    },
    {
      title_en: "Market Prices (Last 6 Months)",
      title_hi: "बाजार भाव (पिछले 6 महीने)",
      datasets: [
        {
          id: 5,
          name_en: "Market Price Trends",
          name_hi: "बाजार भाव रुझान",
          description_en: "Price fluctuations of major crops over last 6 months.",
          description_hi: "पिछले 6 महीनों में मुख्य फसलों के भाव में उतार-चढ़ाव।",
          link: "https://example.com/market-price-trends.csv",
        },
      ],
    },
    {
      title_en: "Soil Quality Reports",
      title_hi: "मिट्टी की गुणवत्ता रिपोर्ट",
      datasets: [
        {
          id: 6,
          name_en: "Soil Health Dataset",
          name_hi: "मिट्टी स्वास्थ्य डेटासेट",
          description_en: "Contains soil fertility and micronutrient data across regions.",
          description_hi: "विभिन्न क्षेत्रों की मिट्टी की उर्वरता और सूक्ष्म पोषक तत्वों का डेटा।",
          link: "https://example.com/soil-health.csv",
        },
      ],
    },
  ];

  return (
    <section className="text-center bg-gradient-to-r from-green-100 via-green-50 to-green-100 min-h-screen py-10">
      <div className="max-w-xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          {language === "EN" ? "📊 Datasets" : "📊 डेटासेट"}
        </h2>

        {dummyDatasets.map((category, idx) => (
          <div key={idx} className="mb-6 text-left">
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              {language === "EN" ? category.title_en : category.title_hi}
            </h3>
            <ul className="ml-4 space-y-2">
              {category.datasets.map((ds) => (
                <li key={ds.id} className="border-b border-gray-200 pb-2">
                  <strong>{language === "EN" ? ds.name_en : ds.name_hi}</strong>
                  <p className="text-sm text-gray-600">
                    {language === "EN" ? ds.description_en : ds.description_hi}
                  </p>
                  {ds.link && (
                    <a
                      href={ds.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 text-sm underline"
                    >
                      {language === "EN" ? "Download" : "डाउनलोड"}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- RECOMMENDATION (Crop + Pest) ---------------- */

function Recommendation({ language }) {
  const [soil, setSoil] = useState("Alluvial");
  const [season, setSeason] = useState("Kharif");
  const [recommendations, setRecommendations] = useState([]);

  // pest info database
  const pestDB = {
    Wheat: {
      EN: ["Rust – Use resistant varieties", "Aphids – Neem oil spray"],
      HI: ["रस्ट – प्रतिरोधी किस्में लगाएं", "एफिड्स – नीम तेल का छिड़काव"],
    },
    Rice: {
      EN: ["Stem borer – Apply Triazophos", "Leaf folder – Spray Neem extract"],
      HI: ["तना छेदक – ट्रायजोफॉस का प्रयोग करें", "लीफ फोल्डर – नीम अर्क का छिड़काव"],
    },
    Cotton: {
      EN: ["Bollworm – Use pheromone traps", "Whitefly – Spray Imidacloprid"],
      HI: ["बॉलवर्म – फेरोमोन ट्रैप लगाएं", "सफेद मक्खी – इमिडाक्लोप्रिड छिड़कें"],
    },
    Maize: {
      EN: ["Fall Armyworm – Use biocontrol agents", "Stem borer – Apply Carbofuran"],
      HI: ["फॉल आर्मीवर्म – जैविक नियंत्रण एजेंट का प्रयोग करें", "तना छेदक – कार्बोफ्यूरान का प्रयोग करें"],
    },
  };

  const handleRecommend = () => {
    const cropsData = {
      Alluvial: {
        Kharif: ["Rice", "Maize", "Sugarcane"],
        Rabi: ["Wheat", "Barley", "Mustard"],
      },
      Black: {
        Kharif: ["Cotton", "Soybean", "Jowar"],
        Rabi: ["Wheat", "Gram", "Sunflower"],
      },
      Red: {
        Kharif: ["Groundnut", "Millets", "Pulses"],
        Rabi: ["Wheat", "Linseed", "Barley"],
      },
    };

    setRecommendations(cropsData[soil][season]);
  };

  return (
    <section className="flex flex-col items-center bg-gradient-to-r from-green-100 via-green-50 to-green-100 min-h-screen py-10">
      <div className="bg-white shadow rounded-lg p-6 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          {language === "EN" ? "🌱 Crop & Pest Recommendation" : "🌱 फसल व कीट सिफारिश"}
        </h2>

        {/* Crop Recommendation */}
        <div className="mb-6 text-left">
          <label className="block mb-2 font-semibold">
            {language === "EN" ? "Select Soil Type" : "मिट्टी का प्रकार चुनें"}
          </label>
          <select
            value={soil}
            onChange={(e) => setSoil(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="Alluvial">{language === "EN" ? "Alluvial Soil" : "जलोढ़ मिट्टी"}</option>
            <option value="Black">{language === "EN" ? "Black Soil" : "काली मिट्टी"}</option>
            <option value="Red">{language === "EN" ? "Red Soil" : "लाल मिट्टी"}</option>
          </select>
        </div>

        <div className="mb-6 text-left">
          <label className="block mb-2 font-semibold">
            {language === "EN" ? "Select Season" : "ऋतु चुनें"}
          </label>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="Kharif">{language === "EN" ? "Kharif" : "खरीफ"}</option>
            <option value="Rabi">{language === "EN" ? "Rabi" : "रबी"}</option>
          </select>
        </div>

        <button
          onClick={handleRecommend}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {language === "EN" ? "Get Recommendations" : "सिफारिश देखें"}
        </button>

        {/* Show Crops + Pest Info */}
        {recommendations.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="font-semibold text-green-700 mb-2">
              {language === "EN" ? "Recommended Crops:" : "सुझाई गई फसलें:"}
            </h3>
            <ul className="list-disc list-inside mb-6">
              {recommendations.map((crop, idx) => (
                <li key={idx}>{crop}</li>
              ))}
            </ul>

            <h3 className="font-semibold text-green-700 mb-2">
              {language === "EN" ? "Pest Management:" : "कीट प्रबंधन:"}
            </h3>
            {recommendations.map(
              (crop, idx) =>
                pestDB[crop] && (
                  <div key={idx} className="mb-4">
                    <p className="font-medium">{crop}</p>
                    <ul className="list-disc list-inside ml-4 text-sm">
                      {pestDB[crop][language].map((pest, i) => (
                        <li key={i}>{pest}</li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

  // government scheme 

function GovernmentSchemes({ language }) {
  // ✅ Dummy government scheme entry
  const schemes = [
    {
      id: 1,
      name_en: "PM-KISAN Scheme",
      name_hi: "प्रधानमंत्री किसान सम्मान निधि योजना",
      description_en:
        "Provides income support to all small and marginal farmers with ₹6,000 per year.",
      description_hi:
        "सभी छोटे और सीमांत किसानों को प्रति वर्ष ₹6,000 की आय सहायता प्रदान करता है।",
      link: "https://pmkisan.gov.in/", // Optional
    },
    {
      id: 2,
      name_en: "Soil Health Card Scheme",
      name_hi: "मिट्टी स्वास्थ्य कार्ड योजना",
      description_en:
        "Helps farmers understand nutrient status of their soil and improve crop productivity.",
      description_hi:
        "किसानों को अपनी मिट्टी के पोषक तत्वों की स्थिति समझने और फसल उत्पादन बढ़ाने में मदद करता है।",
      link: "https://soilhealth.dac.gov.in/",
    },
  ];

  return (
    <section className="flex justify-center bg-gradient-to-r from-green-100 via-green-50 to-green-100 min-h-screen py-10">
      <div className="bg-white shadow rounded-lg p-6 max-w-xl w-full">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          {language === "EN" ? "🌾 Government Schemes" : "🌾 सरकारी योजनाएँ"}
        </h2>

        <ul className="space-y-4 text-left">
          {schemes.map((scheme) => (
            <li key={scheme.id} className="border-b border-gray-200 pb-3">
              <strong className="text-green-800">
                {language === "EN" ? scheme.name_en : scheme.name_hi}
              </strong>
              <p className="text-sm text-gray-600 mb-1">
                {language === "EN" ? scheme.description_en : scheme.description_hi}
              </p>
              {scheme.link && (
                <a
                  href={scheme.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 text-sm underline"
                >
                  {language === "EN" ? "More info" : "अधिक जानकारी"}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

function About({ language }) {
  return (
    <section className="flex justify-center bg-gradient-to-r from-green-100 via-green-50 to-green-100 min-h-screen py-16">
      <div className="max-w-2xl text-center px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          {language === "EN" ? "About KrishiMitra" : "कृषिमित्र के बारे में"}
        </h2>
        <p className="text-gray-700 text-lg">
          {language === "EN"
            ? "KrishiMitra is an AI-driven agriculture assistant designed to provide farmers with the latest market prices, accurate weather forecasts, and personalized crop recommendations."
            : "कृषिमित्र एक एआई-संचालित कृषि सहायक है, जिसे किसानों को नवीनतम बाजार भाव, सटीक मौसम पूर्वानुमान और व्यक्तिगत फसल सिफारिशें प्रदान करने के लिए डिज़ाइन किया गया है।"}
        </p>
      </div>
    </section>
  );
}