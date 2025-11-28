import React, { useState, useEffect } from "react";
import {
Card,
CardContent,
CardDescription,
CardHeader,
CardTitle,
} from "../../components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/Alert";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/Button";
import {
CloudRain,
Wind,
Droplets,
MapPin,
Search,
AlertTriangle,
CheckCircle,
Thermometer,
} from "lucide-react";

export default function WeatherAlerts() {
const [location, setLocation] = useState("Delhi, India");
const [searchInput, setSearchInput] = useState("");
const [weatherData, setWeatherData] = useState(null);
const [forecast, setForecast] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const apiKey = "82d592ed404519d25c56eae13af2a8c3"; // ✅ Your OpenWeatherMap API key

// Fetch current weather
const fetchWeather = async (city) => {
try {
setLoading(true);
setError(null);
const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);
if (!response.ok) throw new Error("City not found");
const data = await response.json();

  const updatedWeather = {
    location: `${data.name}, ${data.sys.country}`,
    temperature: Math.round(data.main.temp),
    condition: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    rainfall: data.rain ? data.rain["1h"] || 0 : 0,
    icon: data.weather[0].icon,
  };

  setWeatherData(updatedWeather);
  setLocation(`${data.name}, ${data.sys.country}`);
  fetchForecast(city);
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}

};

// Fetch 5-day forecast
const fetchForecast = async (city) => {
try {
const response = await fetch(
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
);
if (!response.ok) throw new Error("Forecast not found");
const data = await response.json();

  const dailyData = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyData[date]) dailyData[date] = [];
    dailyData[date].push(item);
  });

  const forecastArray = Object.keys(dailyData)
    .slice(0, 5)
    .map((date, i) => {
      const dayData = dailyData[date];
      const avgTemp = (
        dayData.reduce((sum, d) => sum + d.main.temp, 0) / dayData.length
      ).toFixed(1);
      const avgRain = dayData
        .reduce((sum, d) => sum + (d.rain ? d.rain["3h"] || 0 : 0), 0)
        .toFixed(1);
      const condition = dayData[0].weather[0].description;
      return {
        day:
          i === 0
            ? "Today"
            : new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        temp: `${avgTemp}°C`,
        condition,
        rain: `${avgRain}mm`,
      };
    });

  setForecast(forecastArray);
} catch (err) {
  console.error("Forecast fetch error:", err);
}

};

useEffect(() => {
fetchWeather(location);
}, []);

const handleSearch = (e) => {
e.preventDefault();
if (searchInput.trim()) {
fetchWeather(searchInput.trim());
setSearchInput("");
}
};

const getAlertColor = (type) => {
switch (type) {
case "danger":
return "border-red-200 bg-red-50";
case "warning":
return "border-yellow-200 bg-yellow-50";
case "info":
return "border-blue-200 bg-blue-50";
default:
return "border-gray-200 bg-gray-50";
}
};

const getAlertIconColor = (type) => {
switch (type) {
case "danger":
return "text-red-600";
case "warning":
return "text-yellow-600";
case "info":
return "text-blue-600";
default:
return "text-gray-600";
}
};

const alerts = [
{
id: 1,
type: "warning",
title: "High Wind Warning",
description: "Strong winds expected tomorrow. Secure loose objects.",
icon: Wind,
},
{
id: 2,
type: "info",
title: "Pest Alert",
description: "Warm, humid weather may increase pest activity.",
icon: AlertTriangle,
},
];

const farmingAdvice = [
{
title: "Irrigation",
advice: "Adjust irrigation based on rainfall.",
status: "action",
},
{
title: "Pesticide",
advice: "Avoid spraying during rainfall.",
status: "warning",
},
{
title: "Harvesting",
advice: "Best on clear, dry days.",
status: "good",
},
{
title: "Planting",
advice: "Wait for stable weather.",
status: "warning",
},
];

return ( <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12"> <div className="container mx-auto px-4 max-w-7xl">
{/* Header */} <div className="text-center mb-8"> <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4"> <CloudRain className="w-8 h-8 text-orange-600" /> </div> <h1 className="text-gray-800 mb-4 text-2xl font-semibold">
Weather & Disaster Alerts </h1> <p className="text-gray-600 max-w-2xl mx-auto">
Real-time weather updates and early warnings to protect your crops </p> </div>

    {/* Search */}
    <Card className="mb-8 max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Enter your location (e.g., Mumbai, India)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>
      </CardContent>
    </Card>

    {loading && (
      <p className="text-center text-gray-500 mb-4">
        Loading weather data...
      </p>
    )}
    {error && (
      <p className="text-center text-red-500 mb-4">⚠️ {error}</p>
    )}

    {/* Weather + Forecast */}
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {weatherData && (
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    {weatherData.location}
                  </CardTitle>
                  <CardDescription className="capitalize text-blue-100">
                    {weatherData.condition}
                  </CardDescription>
                </div>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                  alt="icon"
                  className="w-16 h-16"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-6xl mb-6">
                {weatherData.temperature}°C
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5" />
                  <div>
                    <div className="text-sm text-blue-100">Humidity</div>
                    <div>{weatherData.humidity}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-5 h-5" />
                  <div>
                    <div className="text-sm text-blue-100">Wind</div>
                    <div>{weatherData.windSpeed} km/h</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CloudRain className="w-5 h-5" />
                  <div>
                    <div className="text-sm text-blue-100">Rainfall</div>
                    <div>{weatherData.rainfall} mm</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Forecast */}
        <Card>
          <CardHeader>
            <CardTitle>5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {forecast.map((day) => (
                <div
                  key={day.day}
                  className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="text-gray-700 mb-2">{day.day}</div>
                  <div className="text-2xl mb-2">{day.temp}</div>
                  <div className="text-sm text-gray-600 mb-1 capitalize">
                    {day.condition}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {day.rain} rain
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Weather & Farm Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 ">
            
            {alerts.map((alert) => (
              <Alert
               key={alert.id}
                className={`${getAlertColor(alert.type)} border rounded-lg p-5 flex items-center gap-6`}
              >
                <div className={`flex-shrink-0 ${getAlertIconColor(alert.type)}`}>
                 <alert.icon className="w-6 h-6" />
                </div>
               <div className="min-w-0">
                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertDescription>{alert.description}</AlertDescription>
                </div>
              </Alert>
           ))}
            
          </CardContent>
        </Card>

        {/* Farming Advice */}
        <Card>
          <CardHeader>
            <CardTitle>Farming Advice</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            {farmingAdvice.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">
                    {item.title}
                  </h4>
                  {item.status === "good" && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {item.status === "warning" && (
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  )}
                  {item.status === "action" && (
                    <Thermometer className="w-5 h-5 text-blue-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{item.advice}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</div>

);
}
