import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/Badge";
import { ScrollArea } from "../../components/ui/ScrollArea";
import {
  MessageCircle,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  X,
  Volume2,
  Languages,
  Minimize2,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../../components/ui/select";
import { toast } from "sonner";

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      text: "नमस्ते! मैं AgriAid का AI सहायक हूं। मैं आपकी खेती संबंधी समस्याओं में मदद कर सकता हूं। कृपया अपनी समस्या बताएं।",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState("hi");
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollAreaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Track unread messages when widget is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender === "bot") setUnreadCount((p) => p + 1);
    }
    if (isOpen) setUnreadCount(0);
  }, [messages, isOpen]);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window ).webkitSpeechRecognition || (window ).SpeechRecognition;
      try {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        const langMap = {
          hi: "hi-IN",
          bho: "hi-IN",
          en: "en-IN",
          hinglish: "hi-IN",
        };
        recognitionRef.current.lang = langMap[language] || "hi-IN";

        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          setIsListening(false);
          toast.success("आवाज़ पहचानी गई!");
        };

        recognitionRef.current.onerror = (event) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          toast.error("आवाज़ नहीं सुन पाए। कृपया फिर से प्रयास करें।");
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      } catch (err) {
        console.warn("SpeechRecognition init failed:", err);
        recognitionRef.current = null;
      }
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("आपका ब्राउज़र वॉइस इनपुट को सपोर्ट नहीं करता।");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast.info("सुन रहे हैं... कृपया बोलें");
    }
  };

  const detectLanguage = (text) => {
    const hindiRegex = /[\u0900-\u097F]/;
    const englishOnlyRegex = /^[a-zA-Z0-9\s.,!?]+$/;
    if (hindiRegex.test(text)) return "hi";
    if (englishOnlyRegex.test(text)) return "en";
    return "hinglish";
  };

  const getAIResponse = (userMessage, detectedLang) => {
    const lowerMessage = (userMessage || "").toLowerCase();

    // Responses database (includes rice/crop details)
    const responses = {
      greeting: {
        hi: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूं? कृपया अपनी खेती से जुड़ी समस्या बताएं।",
        en: "Hello! How can I help you with your farming? Please describe your problem.",
        hinglish: "Hello! Aapki farming mein kya problem hai? Batayein, main help karunga.",
        bho: "प्रणाम! आपके खेती में का परेशानी बा? हम मदद करब।",
      },
      pest: {
        hi:
          "कीटों की समस्या के लिए:\n\n1. नीम का तेल स्प्रे करें (10ml प्रति लीटर पानी)\n2. पीले चिपचिपे ट्रैप लगाएं\n3. गेंदे के फूल बॉर्डर पर लगाएं\n4. जैविक कीटनाशक उपयोग करें\n5. फसल चक्र अपनाएं\n\nकिसान हेल्पलाइन: 1800-180-1551",
        en:
          "For pest problems:\n\n1. Use neem oil spray (10ml per liter)\n2. Install yellow sticky traps\n3. Plant marigold as border crop\n4. Apply organic pesticide\n5. Practice crop rotation\n\nFarmer Helpline: 1800-180-1551",
        hinglish:
          "Pest problem ke liye: Neem oil spray (10ml/l), yellow traps, marigold lagayein, organic pesticide use karein.",
        bho: "कीड़ा के समस्या खातिर: नीम तेल स्प्रे, ट्रैप लगाईं, दवाई डालीं।",
      },
      yellow_leaves: {
        hi:
          "पीली पत्तियों के कारण और समाधान:\n\n1. नाइट्रोजन की कमी → यूरिया 50kg/एकड़\n2. अधिक पानी → जल निकासी सुधारें\n3. जड़ सड़न → फफूंदनाशक दें (कॉपर ऑक्सीक्लोराइड)\n4. कीट संक्रमण → कीटनाशक स्प्रे करें\n5. आयरन की कमी → फेरस सल्फेट का छिड़काव\n\nमिट्टी परीक्षण करवाएं।",
        en:
          "Yellow leaves causes and solutions:\n\n1. Nitrogen deficiency → Apply Urea 50kg/acre\n2. Overwatering → Improve drainage\n3. Root rot → Use fungicide (Copper Oxychloride)\n4. Pest attack → Spray pesticide\n5. Iron deficiency → Spray ferrous sulfate\n\nGet soil tested if needed.",
        hinglish:
          "Yellow leaves: Nitrogen ki kami ya zyada pani. Soil check karein, phir fertilizer ya drainage adjust karein.",
        bho: "पियर पत्ती: खाद कमी या पानी ज्यादे. मिट्टी जांचीं।",
      },
      irrigation: {
        hi: "सिंचाई के सुझाव:\n\n✓ सबसे अच्छा समय:\n  - सुबह 6-8 बजे\n  - शाम 5-7 बजे\n✓ तरीके: ड्रिप सिंचाई सबसे प्रभावी\n✓ आवृत्ति: फसल व मौसम पर निर्भर\n\nMulching और rainwater harvesting अपनाएं।",
        en: "Irrigation suggestions:\n\nBest time: Morning 6-8 AM or Evening 5-7 PM.\nMethods: Drip irrigation is best. Frequency depends on crop & weather.\nUse mulching and rainwater harvesting.",
        hinglish: "Irrigation: Subah 6-8 ya shaam 5-7. Drip best. Mulch aur rainwater collect karein.",
        bho: "सींचाई: भोरे 6-8 या सांझ 5-7 बढ़िया। ड्रिप उपयोग करीं।",
      },
      fertilizer: {
        hi: "खाद और उर्वरक:\n\n🌿 जैविक: गोबर खाद 5-10 टन/एकड़\n⚗️ रासायनिक: NPK और यूरिया की मात्रा मिट्टी परीक्षण पर आधारित होनी चाहिए\n\nमिट्टी परीक्षण करवाएँ।",
        en: "Fertilizer info:\n\nOrganic: FYM 5-10 tons/acre.\nChemical: NPK and urea rates depend on soil test.\nGet soil tested.",
        hinglish: "Khad: Gobar 5-10 ton/acre. NPK soil test ke hisab se dijiye.",
        bho: "खाद: गोबर खाद डालीं; मिट्टी जांचीं।",
      },
       // Weather - मौसम
      weather: {
        hi: "मौसम की जानकारी के लिए:\n\n📱 ऑनलाइन:\n  1. WeatherAlerts पेज देखें (इसी app में)\n  2. IMD वेबसाइट: www.imd.gov.in\n  3. Mausam app डाउनलोड करें\n\n📞 हेल्पलाइन:\n  • किसान कॉल सेंटर: 1800-180-1551\n  • मौसम विभाग: 011-24611842\n\n🌧️ बारिश के लिए तैयारी:\n  1. जल निकासी व्यवस्था बनाएं\n  2. फसल को सहारा दें\n  3. फफूंदनाशक तैयार रखें\n  4. अधिक बारिश में कटाई टालें\n\n☀️ सूखे के लिए:\n  1. मल्चिंग करें\n  2. ड्रिप सिंचाई अपनाएं\n  3. सूखा प्रतिरोधी फसलें लगाएं",
        en: "Weather information:\n\n📱 Online:\n  1. Check WeatherAlerts page (in this app)\n  2. IMD website: www.imd.gov.in\n  3. Download Mausam app\n\n📞 Helpline:\n  • Kisan Call Center: 1800-180-1551\n  • Weather Dept: 011-24611842\n\n🌧️ Rain preparation:\n  1. Ensure drainage\n  2. Support crops\n  3. Keep fungicide ready\n  4. Delay harvest in heavy rain\n\n☀️ For drought:\n  1. Apply mulch\n  2. Use drip irrigation\n  3. Grow drought-resistant crops",
        hinglish: "Weather info:\n\n📱 Online:\n  1. WeatherAlerts page check karein\n  2. IMD website dekhen\n  3. Mausam app download karein\n\n📞 Helpline:\n  • 1800-180-1551\n\n🌧️ Barish ke liye:\n  1. Drainage theek karein\n  2. Crop ko support dein\n  3. Fungicide ready rakhein\n\n☀️ Sukhe ke liye:\n  1. Mulching karein\n  2. Drip irrigation lagayein",
        bho: "मउसम के जानकारी:\n\n📱 ऑनलाइन:\n  1. WeatherAlerts देखीं\n  2. Mausam app डाउनलोड करीं\n\n📞 हेल्पलाइन:\n  • 1800-180-1551\n\n🌧️ बरखा खातिर:\n  1. पानी के निकास बनाईं\n  2. फसल के सहारा दीं"
      },
      market: {
        hi: "मंडी भाव और विक्रय:\n\neNAM, Agmarknet और स्थानीय मंडी से भाव जाँचें।\nHelpline: 1800-180-1551",
        en: "Market prices & selling:\n\nCheck eNAM, Agmarknet or local mandi. Helpline: 1800-180-1551",
        hinglish: "Mandi bhav: eNAM ya local mandi check karein.",
        bho: "मंडी भाव: eNAM या मंडी में पूछीं।",
      },
      schemes: {
        hi: "सरकारी योजनाएँ:\n\nPM-KISAN, PMFBY, Kisan Credit Card — आधिकारिक पोर्टल पर जानकारी लें।",
        en: "Government schemes:\n\nPM-KISAN, PMFBY, Kisan Credit Card — check official portals.",
        hinglish: "Yojana: PM-KISAN, Fasal Bima, KCC. Official site dekhein.",
        bho: "योजना: PM-KISAN आदि।",
      },
      // Rice/crop detailed response (added)
      rice: {
        hi:
          "धान (चावल) की खेती:\n\n🌾 बुवाई:\n• समय: जून-जुलाई (खरीफ)\n• बीज दर: 20-25 kg/एकड़\n• दूरी: 20x15 cm\n\n💧 पानी:\n• खेत में 2-3 इंच पानी रखें\n• रोपाई के बाद पानी बनाए रखें\n• फूल आने पर पर्याप्त पानी दें\n\n🌱 खाद:\n• NPK: 120:60:40 kg/ha\n• यूरिया: 3 बार में विभाजित दें\n• गोबर खाद: ~10 टन/एकड़\n\n🦠 रोग और उपचार:\n• ब्लास्ट - ट्राइसाइक्लाजोल स्प्रे\n• ब्राउन स्पॉट - मैनकोजेब\n• शीथ ब्लाइट - वैलिडामाइसिन\n\n✂️ कटाई:\n• समय: 120-130 दिन बाद\n• दाने सख्त होने पर कटाई करें\n\n(क्षेत्र व किस्म के अनुसार समायोजन आवश्यक हो सकता है।)",
        en:
          "Rice cultivation:\n\nSowing: June-July (Kharif). Seed rate: 20-25 kg/acre. Spacing: 20x15 cm.\nWater: Maintain 2-3 inches after transplanting; ensure adequate water at flowering.\nFertilizer: NPK 120:60:40 kg/ha; split urea doses; FYM ~10 t/acre.\nDiseases: Blast (Tricyclazole), Brown spot (Mancozeb), Sheath blight (Validamycin).\nHarvest: 120-130 days or when grains harden.\n(Adjust per local recommendations.)",
        hinglish:
          "Dhan ki kheti: Buvai June-July, 20-25kg/acre, spacing 20x15cm. Pani 2-3 inch, phool par zyada. NPK 120:60:40, gobar ~10 ton/acre. Diseases: Blast - tricyclazole, Brown spot - mancozeb. Harvest 120-130 din par.",
        bho:
          "धान के खेती:\nबुवाई: जून-जुलाई, बीज 20-25kg/एकड़, दूरी 20x15cm.\nपानी: 2-3 इंच. खाद: NPK 120:60:40. बीमारी पर उपयुक्त दवाई दीं.",
      },
    };
    Sugarcane:{
      hi:
        "गन्ना की खेती:\n\n🌾 बुवाई:\n• समय: प्रारंभिक: दिसंबर - जनवरी\n ii) मध्य: फरवरी - मार्च\n iii) देर: अप्रैल - मई\n• बीज दर: 1500-2000 kg/हेक्टेयर\n• दूरी: 75x45 cm\n\n💧 पानी:\n• नियमित सिंचाई आवश्यक\n• ड्रिप या स्प्रिंकलर सिंचाई बेहतर\n\n🌱 खाद:\n• NPK: 150:75:75 kg/ha\n• यूरिया: 3 बार में विभाजित दें\n• गोबर खाद: ~20 टन/हेक्टेयर\n\n🦠 रोग और उपचार:\n• लाल रतुआ - कार्बेन्डाजिम स्प्रे\n• सफेद रतुआ - मैनकोजेब\n• गन्ना जड़ फफूंद - थायोफेनेट मेथिल\n\n✂️कटाई:\n•समय: 
    }

    // Keyword mapping (include rice/crop keys)
    const keywordMap = {
      नमस्ते: "greeting",
      नमस्कार: "greeting",
      प्रणाम: "greeting",
      hello: "greeting",
      hi: "greeting",
      कीड़े: "pest",
      कीड़ा: "pest",
      कीट: "pest",
      pest: "pest",
      पीले: "yellow_leaves",
      पीली: "yellow_leaves",
      yellow: "yellow_leaves",
      पत्ते: "yellow_leaves",
      पानी: "irrigation",
      सिंचाई: "irrigation",
      water: "irrigation",
      खाद: "fertilizer",
      उर्वरक: "fertilizer",
      fertilizer: "fertilizer",
      मंडी: "market",
      भाव: "market",
      market: "market",
      योजना: "schemes",
      pmkisan: "schemes",
      "pm-kisan": "schemes",
      // rice / paddy keywords
      धान: "rice",
      चावल: "rice",
      "धान की": "rice",
      "चावल की": "rice",
      rice: "rice",
      paddy: "rice",
    };

    for (const [kw, key] of Object.entries(keywordMap)) {
      // compare with both lowercased ascii and original for unicode keywords
      if (lowerMessage.includes(kw.toLowerCase()) || lowerMessage.includes(kw)) {
        const resp = responses[key];
        if (resp) return resp[detectedLang] || resp.hi;
      }
    }

    const defaults = {
      hi:
        "मुझे आपकी समस्या पूरी तरह समझ नहीं आई। कृपया फिर से स्पष्ट शब्दों में बताएं।\n\nमैं इन विषयों में मदद कर सकता हूं:\n• कीड़े और बीमारी 🐛\n• पानी और सिंचाई 💧\n• खाद और उर्वरक 🌱\n• मौसम की जानकारी 🌤️\n• धान-गेहूं की खेती 🌾\n• मंडी भाव 📊\n• सरकारी योजनाएं 🏛️\n\nया हमारे हेल्पलाइन पर कॉल करें:\n📞 1800-180-1551",
      en:
        "I didn't fully understand your problem. Please explain clearly.\n\nI can help with these topics:\n• Pests and diseases 🐛\n• Water and irrigation 💧\n• Fertilizers 🌱\n• Weather information 🌤️\n• Rice-Wheat farming 🌾\n• Market prices 📊\n• Government schemes 🏛️\n\nOr call our helpline:\n📞 1800-180-1551",
      hinglish: "Samajh nahi aaya. Thoda aur clear batayein.\n\nMain in topics mein help kar sakta hoon:\n• Pest aur disease 🐛\n• Pani aur irrigation 💧\n• Khad aur fertilizer 🌱\n• Weather info 🌤️\n• Rice-Wheat farming 🌾\n• Mandi bhav 📊\n• Sarkari yojana 🏛️\n\nYa call karein:\n📞 1800-180-1551",
      bho: "हमरा समझ ना आइल। फेर से बताईं।\n\nहम एही में मदद कर सकत बानी:\n• कीड़ा आ बीमारी 🐛\n• पानी आ सिंचाई 💧\n• खाद 🌱\n• मउसम 🌤️\n• धान-गेहूं 🌾\n• मंडी भाव 📊\n• सरकार के योजना 🏛️\n\nCall करीं: 📞 1800-180-1551",
    };
    return defaults[detectedLang] || defaults.hi;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const detectedLang = detectLanguage(inputMessage);

    const userMsg = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((p) => [...p, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        text: getAIResponse(inputMessage, detectedLang),
        sender: "bot",
        timestamp: new Date(),
        language: detectedLang,
      };
      setMessages((p) => [...p, botMsg]);
      setIsTyping(false);
    }, 700 + Math.random() * 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    { hi: "मेरी फसल में कीड़े लग गए हैं", en: "Pests in my crop" },
    { hi: "पत्ते पीले हो रहे हैं", en: "Yellow leaves problem" },
    { hi: "सिंचाई कब करें?", en: "When to irrigate?" },
    { hi: "कौन सी खाद डालें?", en: "Which fertilizer?" },
    { hi: "मंडी भाव क्या है?", en: "Market prices" },
    { hi: "PM-KISAN योजना", en: "PM-KISAN scheme" },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-600 to-green-700 hover:scale-110 text-white rounded-full p-4 shadow-2xl"
        aria-label="Open AI Chatbot"
      >
        <MessageCircle className="w-7 h-7" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="w-80 shadow-2xl">
          <CardHeader
            className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 cursor-pointer"
            onClick={() => setIsMinimized(false)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">AI किसान सहायक</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col">
      <Card className="w-[400px] h-[600px] shadow-2xl flex flex-col">
        {/* Header */}
        <CardHeader className="border-b bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-white text-base">AI किसान सहायक</CardTitle>
                <p className="text-xs text-green-100">ऑनलाइन • 24/7 उपलब्ध</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[50px] h-8 bg-white/20 border-white/30 text-white text-xs p-1">
                  <Languages className="w-4 h-4" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hi">हिंदी</SelectItem>
                  <SelectItem value="bho">भोजपुरी</SelectItem>
                  <SelectItem value="hinglish">Hinglish</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => setIsMinimized(true)}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={() => {
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area - Fixed height with scroll */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === "user" ? "bg-blue-500" : "bg-green-500"}`}>
                    {message.sender === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`flex-1 max-w-[75%] ${message.sender === "user" ? "text-right" : "text-left"}`}>
                    <div className={`inline-block p-3 rounded-lg text-sm ${message.sender === "user" ? "bg-blue-500 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none shadow-sm"}`}>
                      <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-1">
                      {new Date(message.timestamp).toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-500">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-lg rounded-bl-none p-3 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </div>

        {/* Quick Questions - Fixed */}
        <div className="border-t bg-white p-2 flex-shrink-0">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {quickQuestions.slice(0, 3).map((q, index) => (
              <Badge key={index} variant="outline" className="cursor-pointer hover:bg-green-50 hover:border-green-500 whitespace-nowrap text-xs px-2 py-1 flex-shrink-0" onClick={() => setInputMessage(q.hi)}>
                {q.hi}
              </Badge>
            ))}
          </div>
        </div>

        {/* Input Area - Fixed at bottom */}
        <div className="border-t p-3 bg-white flex-shrink-0">
          <div className="flex gap-2">
            <Button type="button" variant={isListening ? "destructive" : "outline"} size="icon" onClick={toggleListening} className="flex-shrink-0 h-10 w-10">
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>

            <Input placeholder="अपनी समस्या यहाँ लिखें..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress} className="flex-1 h-10" disabled={isListening} />

            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isListening} className="bg-green-600 hover:bg-green-700 flex-shrink-0 h-10 w-10 p-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {isListening && (
            <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
              <Volume2 className="w-3 h-3 animate-pulse" />
              सुन रहे हैं... कृपया बोलें
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}