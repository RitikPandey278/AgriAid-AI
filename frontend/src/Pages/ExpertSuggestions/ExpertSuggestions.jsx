import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Lightbulb,
  Sprout,
  Droplets,
  Bug,
  TrendingUp,
  Calendar,
  Leaf,
  Sun,
  MessageSquare
} from "lucide-react";

export default function ExpertSuggestions() {
  const [selectedCrop, setSelectedCrop] = useState("rice");
  const [selectedSeason, setSelectedSeason] = useState("all");

  const crops = [
    { value: "rice", label: "Rice" },
    { value: "wheat", label: "Wheat" },
    { value: "corn", label: "Corn" },
    { value: "sugarcane", label: "Sugarcane" },
    { value: "cotton", label: "Cotton" },
    { value: "vegetables", label: "Vegetables" },
  ];

  const suggestions = [
    {
      id: 1,
      title: "Optimal Planting Depth",
      category: "Planting",
      description: "Plant rice seeds at 2-3 cm depth for optimal germination. Deeper planting can delay emergence and reduce stand.",
      difficulty: "Easy",
      season: "Kharif",
      icon: Sprout
    },
    {
      id: 2,
      title: "Water Management Strategy",
      category: "Irrigation",
      description: "Maintain 5-10 cm water level during vegetative stage. Drain fields 10 days before harvest to improve grain quality.",
      difficulty: "Medium",
      season: "All",
      icon: Droplets
    },
    {
      id: 3,
      title: "Integrated Pest Management",
      category: "Pest Control",
      description: "Use pheromone traps to monitor and control stem borer populations. Apply neem-based pesticides for organic control.",
      difficulty: "Advanced",
      season: "All",
      icon: Bug
    },
    {
      id: 4,
      title: "Fertilizer Application Schedule",
      category: "Nutrition",
      description: "Apply nitrogen in 3 splits: 50% at planting, 25% at tillering, and 25% at panicle initiation for maximum efficiency.",
      difficulty: "Medium",
      season: "All",
      icon: TrendingUp
    },
    {
      id: 5,
      title: "Crop Rotation Benefits",
      category: "Sustainability",
      description: "Rotate rice with legumes to improve soil nitrogen and break pest cycles. Increase yield by 15-20%.",
      difficulty: "Easy",
      season: "All",
      icon: Calendar
    },
    {
      id: 6,
      title: "Disease Prevention Tactics",
      category: "Disease Management",
      description: "Use certified disease-free seeds. Maintain proper spacing (15x20 cm) for better air circulation to prevent fungal diseases.",
      difficulty: "Easy",
      season: "All",
      icon: Leaf
    },
    {
      id: 7,
      title: "Weed Control Methods",
      category: "Weed Management",
      description: "Apply pre-emergence herbicide within 3 days of planting. Follow up with manual weeding at 30 and 45 days.",
      difficulty: "Medium",
      season: "All",
      icon: Sprout
    },
    {
      id: 8,
      title: "Heat Stress Management",
      category: "Climate",
      description: "During high temperatures (>35°C), increase irrigation frequency and apply mulch to reduce soil temperature.",
      difficulty: "Medium",
      season: "Summer",
      icon: Sun
    },
  ];

  const expertTips = [
    {
      expert: "Dr. Rajesh Kumar",
      role: "Agronomist",
      tip: "Always test your soil before planting season. Knowing NPK levels helps optimize fertilizer use and saves costs.",
      avatar: "RK"
    },
    {
      expert: "Priya Sharma",
      role: "Organic Farming Expert",
      tip: "Incorporate green manure crops during off-season. It naturally enriches soil and reduces chemical fertilizer dependency.",
      avatar: "PS"
    },
    {
      expert: "Dr. Anil Verma",
      role: "Plant Pathologist",
      tip: "Early morning inspection of crops is crucial. Most diseases show symptoms better in morning light and humidity.",
      avatar: "AV"
    },
  ];

  const quickGuides = [
    {
      title: "Seed Selection Guide",
      description: "How to choose the right variety for your region",
      duration: "5 min read",
      category: "Basics"
    },
    {
      title: "Soil Health Assessment",
      description: "Simple techniques to test soil fertility at home",
      duration: "8 min read",
      category: "Soil"
    },
    {
      title: "Organic Fertilizer Preparation",
      description: "Step-by-step guide to making compost and vermicompost",
      duration: "10 min read",
      category: "Organic"
    },
    {
      title: "Drip Irrigation Setup",
      description: "Cost-effective drip irrigation for small farms",
      duration: "12 min read",
      category: "Water"
    },
  ];

  const filteredSuggestions = suggestions.filter(suggestion => 
    selectedSeason === "all" || suggestion.season === selectedSeason || suggestion.season === "All"
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Lightbulb className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-gray-800 mb-4">Expert Farming Suggestions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized farming tips and best practices from agricultural experts
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Select Your Crop</label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className={"bg-green-100 text-green-800 border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"}>
                    <SelectValue placeholder="Choose crop" />
                  </SelectTrigger>
                  <SelectContent className={"bg-white text-gray-900 border border-gray-200 rounded-md shadow-lg z-50 mt-1 min-w-[160px]"}>
                    {crops.map(crop => (
                      <SelectItem key={crop.value} value={crop.value}>
                        {crop.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Select Season</label>
                <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                  <SelectTrigger className={"bg-green-100 text-green-800 border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"}>
                    <SelectValue placeholder="Choose season" />
                  </SelectTrigger>
                 
                  <SelectContent className={"bg-white text-gray-900 border border-gray-200 rounded-md shadow-lg z-50 mt-1 min-w-[160px]"}>
                    <SelectItem value="all">All Seasons</SelectItem>
                    <SelectItem value="Kharif">Kharif (Monsoon)</SelectItem>
                    <SelectItem value="Rabi">Rabi (Winter)</SelectItem>
                    <SelectItem value="Summer">Summer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="suggestions" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="experts">Expert Tips</TabsTrigger>
            <TabsTrigger value="guides">Quick Guides</TabsTrigger>
          </TabsList>

          {/* Suggestions Tab */}
          <TabsContent value="suggestions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredSuggestions.map((suggestion) => (
                <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg mt-1">
                          <suggestion.icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg mb-2">{suggestion.title}</CardTitle>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">
                              {suggestion.category}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(suggestion.difficulty)}`}>
                              {suggestion.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{suggestion.description}</p>
                    {suggestion.season !== "All" && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        Best for {suggestion.season} season
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Expert Tips Tab */}
          <TabsContent value="experts" className="space-y-6">
            <div className="grid gap-6">
              {expertTips.map((expert, index) => (
                <Card key={index} className="bg-gradient-to-br from-green-50 to-blue-50">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                        {expert.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="mb-2">
                          <h3 className="text-gray-800">{expert.expert}</h3>
                          <p className="text-sm text-gray-600">{expert.role}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                          <p className="text-gray-700">{expert.tip}</p>
                        </div>
                      </div>
                      <MessageSquare className="w-5 h-5 text-green-600 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-green-600 text-white">
              <CardContent className="pt-6 text-center">
                <h3 className="text-white mb-2">Have a Specific Question?</h3>
                <p className="text-green-100 mb-4">
                  Connect with our agricultural experts for personalized advice
                </p>
                <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  Ask an Expert
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quick Guides Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {quickGuides.map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{guide.category}</Badge>
                      <span className="text-xs text-gray-500">{guide.duration}</span>
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full text-green-600 hover:text-green-700 hover:bg-green-50">
                      Read Guide →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Visual guides for common farming practices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {["Drip Irrigation Setup", "Pest Identification", "Composting Basics"].map((title, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-200 transition-colors">
                      <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                        ▶
                      </div>
                      <h4 className="text-gray-800 text-sm">{title}</h4>
                      <p className="text-xs text-gray-600 mt-1">12:30 mins</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
