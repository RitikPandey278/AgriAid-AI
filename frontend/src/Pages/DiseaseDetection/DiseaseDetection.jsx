import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/Card";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/Alert";
import { Badge } from "../../components/ui/Badge";
import { Upload, Camera, AlertCircle, CheckCircle2, Leaf, Info } from "lucide-react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const mockDiseases = [
    {
      disease: "Leaf Blight",
      confidence: 92,
      severity: "High",
      symptoms: ["Brown spots on leaves", "Yellowing edges", "Wilting"],
      causes: ["Fungal infection", "Excessive moisture", "Poor air circulation"],
      remedies: [
        "Apply fungicide (Mancozeb 75% WP) - 2g per liter water",
        "Remove infected leaves immediately",
        "Spray neem oil solution every 7 days"
      ],
      preventiveMeasures: [
        "Ensure proper drainage",
        "Maintain plant spacing",
        "Use disease-resistant varieties",
        "Avoid overhead irrigation"
      ]
    },
    {
      disease: "Powdery Mildew",
      confidence: 88,
      severity: "Medium",
      symptoms: ["White powdery coating", "Stunted growth", "Leaf curling"],
      causes: ["High humidity", "Poor sunlight", "Overcrowding"],
      remedies: [
        "Apply sulfur-based fungicide",
        "Use baking soda spray (1 tsp per liter)",
        "Improve air circulation"
      ],
      preventiveMeasures: [
        "Plant in sunny locations",
        "Space plants properly",
        "Water in the morning",
        "Prune regularly"
      ]
    },
    {
      disease: "Bacterial Spot",
      confidence: 85,
      severity: "Medium",
      symptoms: ["Dark spots with yellow halos", "Leaf drop", "Fruit lesions"],
      causes: ["Bacterial infection", "Water splash", "Contaminated tools"],
      remedies: [
        "Apply copper-based bactericide",
        "Remove infected plants",
        "Avoid working in wet conditions"
      ],
      preventiveMeasures: [
        "Use certified disease-free seeds",
        "Disinfect tools regularly",
        "Practice crop rotation",
        "Avoid overhead watering"
      ]
    }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
      setResult(randomDisease);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High": return "bg-red-100 text-red-700 border-red-300";
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Low": return "bg-green-100 text-green-700 border-green-300";
      default: return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Camera className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-gray-800 mb-4">Crop Disease Detection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload a clear photo of your crop leaves to get instant AI-powered diagnosis and treatment recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upload Crop Image</CardTitle>
                <CardDescription>
                  Take a clear photo of affected leaves in good lighting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    {selectedImage ? (
                      <div className="space-y-4">
                        <ImageWithFallback
                          src={selectedImage}
                          alt="Uploaded crop"
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        <div className="flex gap-2 justify-center">
                          <label htmlFor="file-upload">
                            <Button variant="outline" className="cursor-pointer">
                              Change Image
                            </Button>
                          </label>
                          <Button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            {isAnalyzing ? "Analyzing..." : "Analyze Crop"}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <label htmlFor="file-upload" className="cursor-pointer block">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-700 mb-2">Click to upload or drag and drop</p>
                        <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
                      </label>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle className="ml-5 pl-2">Tips for Best Results</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                        <li>Take photos in natural daylight</li>
                        <li>Focus on affected areas clearly</li>
                        <li>Avoid blurry or dark images</li>
                        <li>Include multiple leaves if possible</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  Common Crop Diseases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockDiseases.map((disease) => (
                    <div
                      key={disease.disease}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <span className="text-sm">{disease.disease}</span>
                      <Badge variant="outline" className={getSeverityColor(disease.severity)}>
                        {disease.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {result ? (
              <div className="space-y-6">
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-blue-900">
                          Diagnosis: {result.disease}
                        </CardTitle>
                        <CardDescription>
                          Confidence: {result.confidence}%
                        </CardDescription>
                      </div>
                      <Badge className={getSeverityColor(result.severity)}>
                        {result.severity} Severity
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      Symptoms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-orange-600 mt-1">•</span>
                          <span className="text-gray-700">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Possible Causes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.causes.map((cause, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-gray-700">{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-900">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Recommended Treatment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {result.remedies.map((remedy, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{remedy}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600" />
                      Preventive Measures
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.preventiveMeasures.map((measure, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-800 ml-5 pl-2">Disclaimer</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    This is an AI-generated diagnosis. For severe cases or uncertain results,
                    please consult with a local agricultural expert or extension officer.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center p-12">
                <div className="text-center text-gray-400">
                  <Camera className="w-16 h-16 mx-auto mb-4" />
                  <p>Upload an image to get started</p>
                  <p className="text-sm mt-2">Results will appear here</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
