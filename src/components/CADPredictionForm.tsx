import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Heart, Activity, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  id: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  systolic_blood_pressure: string;
  diastolic_blood_pressure: string;
  cholesterol: string;
  glucose: string;
  smoking: string;
  alcohol_intake: string;
  active: string;
  physical_activity: string;
}

export const CADPredictionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    id: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    systolic_blood_pressure: "",
    diastolic_blood_pressure: "",
    cholesterol: "",
    glucose: "",
    smoking: "",
    alcohol_intake: "",
    active: "",
    physical_activity: "",
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const requiredFields = Object.keys(formData) as (keyof FormData)[];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before predicting CAD risk.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const predictCAD = () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate prediction delay
    setTimeout(() => {
      // Simple mock prediction logic based on risk factors
      const age = parseInt(formData.age);
      const systolic = parseInt(formData.systolic_blood_pressure);
      const diastolic = parseInt(formData.diastolic_blood_pressure);
      const cholesterol = parseInt(formData.cholesterol);
      const glucose = parseInt(formData.glucose);
      const smoking = formData.smoking === "1";
      const active = formData.active === "1";
      
      let riskScore = 0;
      
      // Age risk
      if (age > 65) riskScore += 3;
      else if (age > 55) riskScore += 2;
      else if (age > 45) riskScore += 1;
      
      // Blood pressure risk
      if (systolic > 140 || diastolic > 90) riskScore += 2;
      else if (systolic > 130 || diastolic > 80) riskScore += 1;
      
      // Cholesterol risk
      if (cholesterol > 240) riskScore += 2;
      else if (cholesterol > 200) riskScore += 1;
      
      // Glucose risk
      if (glucose > 126) riskScore += 2;
      else if (glucose > 100) riskScore += 1;
      
      // Lifestyle factors
      if (smoking) riskScore += 3;
      if (!active) riskScore += 1;
      
      // Male gender adds risk
      if (formData.gender === "male") riskScore += 1;
      
      const result = riskScore >= 5 ? "You will have CAD" : "You are free from CAD";
      setPrediction(result);
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: `CAD risk assessment has been calculated.`,
        variant: result.includes("free") ? "default" : "destructive",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">CAD Risk Predictor</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Coronary Artery Disease Risk Assessment Tool
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Patient Information
            </CardTitle>
            <CardDescription>
              Please fill in all the required information for accurate CAD risk prediction
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">Patient ID</Label>
                <Input
                  id="id"
                  placeholder="Enter patient ID"
                  value={formData.id}
                  onChange={(e) => handleInputChange("id", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter height in cm"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter weight in kg"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="systolic">Systolic BP (mmHg)</Label>
                <Input
                  id="systolic"
                  type="number"
                  placeholder="Enter systolic pressure"
                  value={formData.systolic_blood_pressure}
                  onChange={(e) => handleInputChange("systolic_blood_pressure", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diastolic">Diastolic BP (mmHg)</Label>
                <Input
                  id="diastolic"
                  type="number"
                  placeholder="Enter diastolic pressure"
                  value={formData.diastolic_blood_pressure}
                  onChange={(e) => handleInputChange("diastolic_blood_pressure", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cholesterol">Cholesterol (mg/dL)</Label>
                <Input
                  id="cholesterol"
                  type="number"
                  placeholder="Enter cholesterol level"
                  value={formData.cholesterol}
                  onChange={(e) => handleInputChange("cholesterol", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="glucose">Glucose (mg/dL)</Label>
                <Input
                  id="glucose"
                  type="number"
                  placeholder="Enter glucose level"
                  value={formData.glucose}
                  onChange={(e) => handleInputChange("glucose", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smoking">Smoking</Label>
                <Select value={formData.smoking} onValueChange={(value) => handleInputChange("smoking", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No</SelectItem>
                    <SelectItem value="1">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alcohol">Alcohol Intake</Label>
                <Select value={formData.alcohol_intake} onValueChange={(value) => handleInputChange("alcohol_intake", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select alcohol intake" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No</SelectItem>
                    <SelectItem value="1">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="active">Physically Active</Label>
                <Select value={formData.active} onValueChange={(value) => handleInputChange("active", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No</SelectItem>
                    <SelectItem value="1">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2 lg:col-span-3">
                <Label htmlFor="physical_activity">Physical Activity Level (0-10)</Label>
                <Input
                  id="physical_activity"
                  type="number"
                  min="0"
                  max="10"
                  placeholder="Enter activity level (0 = sedentary, 10 = very active)"
                  value={formData.physical_activity}
                  onChange={(e) => handleInputChange("physical_activity", e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col items-center space-y-6 pt-6">
              <Button 
                onClick={predictCAD}
                disabled={isLoading}
                size="lg"
                className="px-8 py-3 text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <Activity className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Predict CAD"
                )}
              </Button>

              {prediction && (
                <div className="text-center space-y-4">
                  <div className={`flex items-center justify-center gap-3 p-6 rounded-lg ${
                    prediction.includes("free") 
                      ? "bg-success/10 border border-success/20" 
                      : "bg-destructive/10 border border-destructive/20"
                  }`}>
                    {prediction.includes("free") ? (
                      <CheckCircle className="h-8 w-8 text-success" />
                    ) : (
                      <AlertCircle className="h-8 w-8 text-destructive" />
                    )}
                    <div>
                      <Badge 
                        variant={prediction.includes("free") ? "secondary" : "destructive"}
                        className="text-lg px-4 py-2"
                      >
                        {prediction}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">
                        {prediction.includes("free") 
                          ? "Based on the provided information, you have a low risk of CAD."
                          : "Based on the provided information, you have a high risk of CAD. Please consult a healthcare professional."
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            <strong>Disclaimer:</strong> This tool is for educational purposes only and should not replace professional medical advice.
            Always consult with a healthcare provider for accurate diagnosis and treatment.
          </p>
        </div>
      </div>
    </div>
  );
};