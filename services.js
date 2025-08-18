// // // src/services.js

// // // ✅ Fetch weather from OpenWeather API
// // export async function fetchWeather(city = "Pune", lang = "en") {
// //   const API_KEY = "d76f22811edeb3a4e27906c9d07c906b"; // 🔑 Replace with your real API key
// //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=${lang}`;

// //   try {
// //     const res = await fetch(url);
// //     const data = await res.json();
// //     if (data.cod !== 200) throw new Error(data.message);
// //     return {
// //       location: `${data.name}, ${data.sys.country}`,
// //       temperature: `${data.main.temp}°C`,
// //       humidity: `${data.main.humidity}%`,
// //       description: data.weather[0].description,
// //     };
// //   } catch (err) {
// //     console.error("Weather API error:", err);
// //     return null;
// //   }
// // }

// // // ✅ Fetch market prices from Agmarknet API
// // export async function fetchMarketPrices(crop = "") {
// //   const API_KEY = "YOUR_REAL_DATA_GOV_API_KEY"; // 🔑 Replace with your API key
// //   let url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=10`;

// //   // Add crop filter if provided
// //   if (crop) {
// //     url += `&filters[commodity]=${encodeURIComponent(crop)}`;
// //   }

// //   try {
// //     const response = await fetch(url);
// //     const data = await response.json();

// //     if (!data.records) return [];

// //     return data.records.map((item) => ({
// //       name_en: item.commodity,
// //       name_hi: translateToHindi(item.commodity),
// //       price: `${item.min_price} - ${item.max_price} ₹/quintal`,
// //       market: item.market,
// //       state: item.state,
// //     }));
// //   } catch (error) {
// //     console.error("Error fetching market prices:", error);
// //     return [];
// //   }
// // }

// // // ✅ Simple English-to-Hindi dictionary
// // function translateToHindi(englishName) {
// //   const dictionary = {
// //     Wheat: "गेहूं",
// //     Soybean: "सोयाबीन",
// //     Tomato: "टमाटर",
// //     Onion: "प्याज",
// //     Rice: "चावल",
// //     Maize: "मक्का",
// //   };
// //   return dictionary[englishName] || englishName;
// // }

// // // ✅ Voice input (speech-to-text)
// // export function startVoiceInput(setText, language = "en-IN") {
// //   if (!("webkitSpeechRecognition" in window)) {
// //     alert("Speech recognition not supported in this browser.");
// //     return;
// //   }
// //   const recognition = new window.webkitSpeechRecognition();
// //   recognition.lang = language;
// //   recognition.onresult = (event) => {
// //     const transcript = event.results[0][0].transcript;
// //     setText(transcript);
// //   };
// //   recognition.start();
// // }

// // // ✅ Text-to-speech for answers
// // export function speakText(text, lang = "en-IN") {
// //   const utterance = new SpeechSynthesisUtterance(text);
// //   utterance.lang = lang;
// //   window.speechSynthesis.speak(utterance);
// // }














// // src/services.js

// // ✅ Fetch weather from OpenWeather API
// export async function fetchWeather(city = "Pune", lang = "en") {
//   const API_KEY = "d76f22811edeb3a4e27906c9d07c906b"; // 🔑 Replace with your real API key
//   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=${lang}`;

//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     if (data.cod !== 200) throw new Error(data.message);
//     return {
//       location: `${data.name}, ${data.sys.country}`,
//       temperature: `${data.main.temp}°C`,
//       humidity: `${data.main.humidity}%`,
//       description: data.weather[0].description,
//     };
//   } catch (err) {
//     console.error("Weather API error:", err);
//     return null;
//   }
// }


// export async function fetchMarketPrice(crop) {
//   try {
//     const res = await fetch(`http://localhost:5000/api/market/${crop}`);
//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching market data:", error);
//     return null;
//   }
// }


// // ✅ Simple English-to-Hindi dictionary
// function translateToHindi(englishName) {
//   const dictionary = {
//     Wheat: "गेहूं",
//     Soybean: "सोयाबीन",
//     Tomato: "टमाटर",
//     Onion: "प्याज",
//     Rice: "चावल",
//     Maize: "मक्का",
//   };
//   return dictionary[englishName] || englishName;
// }

// // ✅ Voice input (speech-to-text)
// export function startVoiceInput(setText, language = "en-IN") {
//   if (!("webkitSpeechRecognition" in window)) {
//     alert("Speech recognition not supported in this browser.");
//     return;
//   }
//   const recognition = new window.webkitSpeechRecognition();
//   recognition.lang = language;
//   recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     setText(transcript);
//     // 🔹 NEW: Automatically process with AI after speech input
//     processAIQuestion(transcript);
//   };
//   recognition.start();
// }

// // ✅ Text-to-speech for answers
// export function speakText(text, lang = "en-IN") {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = lang;
//   window.speechSynthesis.speak(utterance);
// }

// /* 🔹 NEW: AI Q&A Feature
//    This is a simple AI-like function that answers user questions
//    about weather or market prices in natural language.
// */
// export async function processAIQuestion(question) {
//   question = question.toLowerCase();

//   if (question.includes("weather in")) {
//     const city = question.split("weather in")[1].trim();
//     const weather = await fetchWeather(city);
//     if (weather) {
//       const answer = `Weather in ${weather.location}: ${weather.temperature}, ${weather.description}, Humidity: ${weather.humidity}`;
//       speakText(answer);
//       console.log(answer);
//     } else {
//       speakText("Sorry, I could not fetch the weather.");
//     }
//   } else if (question.includes("price of") || question.includes("market price")) {
//     let crop = "";
//     const match = question.match(/price of (\w+)/);
//     if (match) crop = match[1];
//     const prices = await fetchMarketPrices(crop);
//     if (prices.length > 0) {
//       const answer = prices.map((p) => `${p.name_en} in ${p.market}, ${p.state}: ${p.price}`).join(". ");
//       speakText(answer);
//       console.log(answer);
//     } else {
//       speakText("Sorry, I could not find market prices for that crop.");
//     }
//   } else {
//     speakText("I can provide weather and market prices. Please ask accordingly.");
//   }
// }










// src/services.js

// ✅ Fetch weather from OpenWeather API
export async function fetchWeather(city = "Pune", lang = "en") {
  const API_KEY = "d76f22811edeb3a4e27906c9d07c906b"; // 🔑 Replace with your real API key
  let url = "";

  // If city is lat,lon coordinates
  if (city.includes(",")) {
    const [lat, lon] = city.split(",");
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=${lang}`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=${lang}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod !== 200) throw new Error(data.message);

    return {
      location: `${data.name}, ${data.sys.country}`,
      temperature: `${data.main.temp}°C`,
      humidity: `${data.main.humidity}%`,
      description: data.weather[0].description,
    };
  } catch (err) {
    console.error("Weather API error:", err);
    return {
      location: "Pune, IN",
      temperature: "N/A",
      humidity: "N/A",
      description: lang === "en" ? "Unable to fetch weather" : "मौसम जानकारी उपलब्ध नहीं",
    };
  }
}

// ✅ Fetch market prices
export async function fetchMarketPrice(crop) {
  try {
    const res = await fetch(`http://localhost:5000/api/market/${crop}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching market data:", error);
    return null;
  }
}

// ✅ Simple English-to-Hindi dictionary
function translateToHindi(englishName) {
  const dictionary = {
    Wheat: "गेहूं",
    Soybean: "सोयाबीन",
    Tomato: "टमाटर",
    Onion: "प्याज",
    Rice: "चावल",
    Maize: "मक्का",
  };
  return dictionary[englishName] || englishName;
}

// ✅ Voice input (speech-to-text)
export function startVoiceInput(setText, language = "en-IN") {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Speech recognition not supported in this browser.");
    return;
  }
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = language;
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setText(transcript);
    // 🔹 Automatically process with AI after speech input
    processAIQuestion(transcript);
  };
  recognition.start();
}

// ✅ Text-to-speech for answers
export function speakText(text, lang = "en-IN") {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}

// 🔹 AI Q&A Feature
export async function processAIQuestion(question) {
  question = question.toLowerCase();

  if (question.includes("weather in")) {
    const city = question.split("weather in")[1].trim();
    const weather = await fetchWeather(city);
    if (weather) {
      const answer = `Weather in ${weather.location}: ${weather.temperature}, ${weather.description}, Humidity: ${weather.humidity}`;
      speakText(answer);
      console.log(answer);
    } else {
      speakText("Sorry, I could not fetch the weather.");
    }
  } else if (question.includes("price of") || question.includes("market price")) {
    let crop = "";
    const match = question.match(/price of (\w+)/);
    if (match) crop = match[1];
    const prices = await fetchMarketPrice(crop);
    if (prices && prices.length > 0) {
      const answer = prices.map((p) => `${p.name_en} in ${p.market}, ${p.state}: ${p.price}`).join(". ");
      speakText(answer);
      console.log(answer);
    } else {
      speakText("Sorry, I could not find market prices for that crop.");
    }
  } else {
    speakText("I can provide weather and market prices. Please ask accordingly.");
  }
}

