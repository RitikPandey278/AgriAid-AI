import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/Button";
import {
  BookOpen,
  Search,
  TrendingUp,
  Clock,
  User,
  MessageCircle,
  ThumbsUp,
  Eye,
  FileText,
  Video,
  HelpCircle
} from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState("");

  const articles = [
    {
      id: 1,
      title: "Complete Guide to Organic Farming in India",
      category: "Organic Farming",
      author: "Dr. Rajesh Kumar",
      date: "Oct 15, 2025",
      readTime: "12 min",
      views: 2450,
      likes: 189,
      excerpt: "Learn the fundamentals of organic farming, from soil preparation to certification. This comprehensive guide covers everything you need to start your organic farming journey.",
      tags: ["Organic", "Sustainability", "Beginner"],
      image: "https://images.unsplash.com/photo-1758524054106-06b11aec385c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwZXhwZXJ0JTIwYWR2aWNlfGVufDF8fHx8MTc2MDg1NzgwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      title: "Water Conservation Techniques for Small Farms",
      category: "Water Management",
      author: "Priya Sharma",
      date: "Oct 12, 2025",
      readTime: "8 min",
      views: 1890,
      likes: 156,
      excerpt: "Discover practical water-saving methods including drip irrigation, rainwater harvesting, and moisture retention techniques suitable for small and medium farms.",
      tags: ["Irrigation", "Conservation", "Practical"],
    },
    {
      id: 3,
      title: "Identifying Common Crop Pests and Natural Solutions",
      category: "Pest Management",
      author: "Anil Verma",
      date: "Oct 10, 2025",
      readTime: "15 min",
      views: 3200,
      likes: 245,
      excerpt: "A visual guide to recognizing harmful pests and implementing eco-friendly control methods using natural predators and organic pesticides.",
      tags: ["Pest Control", "IPM", "Natural"],
    },
    {
      id: 4,
      title: "Soil Health: Testing and Improvement Strategies",
      category: "Soil Management",
      author: "Dr. Sunita Rao",
      date: "Oct 8, 2025",
      readTime: "10 min",
      views: 2100,
      likes: 178,
      excerpt: "Understanding soil testing results and implementing practical strategies to improve soil fertility, structure, and microbial activity.",
      tags: ["Soil", "Testing", "Fertility"],
    },
    {
      id: 5,
      title: "Climate-Smart Agriculture: Adapting to Change",
      category: "Climate",
      author: "Vikram Singh",
      date: "Oct 5, 2025",
      readTime: "11 min",
      views: 1750,
      likes: 132,
      excerpt: "Learn how to adapt farming practices to changing climate patterns, including crop selection, planting schedules, and risk mitigation strategies.",
      tags: ["Climate", "Adaptation", "Modern"],
    },
    {
      id: 6,
      title: "Maximizing Yield with Crop Rotation",
      category: "Crop Management",
      author: "Meera Patel",
      date: "Oct 3, 2025",
      readTime: "9 min",
      views: 2850,
      likes: 201,
      excerpt: "Explore the science behind crop rotation, its benefits for soil health, pest control, and how to design effective rotation schedules for your farm.",
      tags: ["Rotation", "Yield", "Planning"],
    },
  ];

  const faqs = [
    {
      question: "How often should I test my soil?",
      answer: "Soil testing should be done at least once a year, preferably before the planting season. For intensive farming, testing twice a year is recommended.",
      category: "Soil"
    },
    {
      question: "What is the best time for pesticide application?",
      answer: "Early morning or late evening is ideal as temperatures are cooler and winds are calmer. Avoid spraying during rain or when rain is expected within 24 hours.",
      category: "Pest Control"
    },
    {
      question: "How can I improve water retention in sandy soil?",
      answer: "Add organic matter like compost, use mulch, and consider mixing in clay or bentonite. Drip irrigation is more efficient than flood irrigation for sandy soils.",
      category: "Soil"
    },
    {
      question: "What are the benefits of crop rotation?",
      answer: "Crop rotation improves soil fertility, breaks pest and disease cycles, reduces weed pressure, and can increase overall farm productivity by 15-20%.",
      category: "Crop Management"
    },
  ];

  const categories = [
    { name: "All Articles", count: articles.length, icon: BookOpen },
    { name: "Organic Farming", count: 45, icon: BookOpen },
    { name: "Pest Management", count: 32, icon: BookOpen },
    { name: "Water Management", count: 28, icon: BookOpen },
    { name: "Soil Health", count: 38, icon: BookOpen },
    { name: "Climate", count: 22, icon: BookOpen },
  ];

  const trendingTopics = [
    "Organic Certification",
    "Drip Irrigation",
    "Integrated Pest Management",
    "Soil Testing",
    "Climate Adaptation",
    "Crop Insurance"
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-gray-800 mb-4">Knowledge Base</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Comprehensive guides, articles, and resources to help you succeed in farming
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles, guides, FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <category.icon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="outline"
                      className="cursor-pointer hover:bg-purple-50 hover:border-purple-300"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg text-purple-900">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-purple-700 hover:text-purple-900 hover:bg-purple-100">
                  <Video className="w-4 h-4 mr-2" />
                  Video Tutorials
                </Button>
                <Button variant="ghost" className="w-full justify-start text-purple-700 hover:text-purple-900 hover:bg-purple-100">
                  <FileText className="w-4 h-4 mr-2" />
                  Downloadable PDFs
                </Button>
                <Button variant="ghost" className="w-full justify-start text-purple-700 hover:text-purple-900 hover:bg-purple-100">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Community Forum
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="articles" className="space-y-6">
              <TabsList>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>

              {/* Articles Tab */}
              <TabsContent value="articles" className="space-y-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-4 gap-4">
                        {article.image && (
                          <div className="md:col-span-1">
                            <ImageWithFallback
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <div className={article.image ? "md:col-span-3" : "md:col-span-4"}>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline">{article.category}</Badge>
                            {article.tags.map((tag) => (
                              <Badge key={tag} className="bg-purple-100 text-purple-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-gray-800 mb-2">{article.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {article.author}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {article.readTime}
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {article.views}
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="w-4 h-4" />
                                {article.likes}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* FAQs Tab */}
              <TabsContent value="faqs" className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <HelpCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{faq.question}</CardTitle>
                          <Badge variant="outline" className="mb-3">{faq.category}</Badge>
                          <CardDescription className="text-gray-700">
                            {faq.answer}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6 text-center">
                    <h3 className="text-blue-900 mb-2">Can't find your answer?</h3>
                    <p className="text-blue-700 mb-4 text-sm">
                      Ask our community or submit a question to our experts
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Ask a Question
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Videos Tab */}
              <TabsContent value="videos" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {["Organic Pest Control Methods", "Drip Irrigation Installation", "Soil Testing at Home", "Composting for Beginners", "Crop Rotation Planning", "Seed Selection Tips"].map((title, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center mb-4">
                          <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center">
                            <Video className="w-8 h-8" />
                          </div>
                        </div>
                        <h3 className="text-gray-800 mb-2">{title}</h3>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>15:30 mins</span>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            1.2K views
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
