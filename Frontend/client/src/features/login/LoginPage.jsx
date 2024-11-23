import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Small Business"); // Default role
  const [error, setError] = useState("");

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear existing errors
  
    try {
      if (activeTab === "login") {
        const response = await fetch(`${apiBaseUrl}/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const textResponse = await response.text(); // Get the response as text first
        console.log("Response Text:", textResponse); // Log the response
  
        let data;
        try {
          data = JSON.parse(textResponse); // Try parsing the response as JSON
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          throw new Error("Failed to parse server response as JSON");
        }
  
        if (!response.ok) throw new Error(data.message || "Login failed");
  
        toast.success("Login successful!");
        console.log("Login successful:", data);
        navigate("/"); // Redirect after success
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          toast.error("Passwords do not match!");
          return;
        }
  
        const response = await fetch(`${apiBaseUrl}/users/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        });
  
        const textResponse = await response.text(); // Get the response as text
        console.log("Response Text:", textResponse);
  
        let data;
        try {
          data = JSON.parse(textResponse); // Try parsing the response as JSON
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          throw new Error("Failed to parse server response as JSON");
        }
  
        if (!response.ok) throw new Error(data.message || "Signup failed");
  
        toast.success("Signup successful!");
        console.log("Signup successful:", data);
        navigate("/"); // Redirect after success
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setError(err.message);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{activeTab === "login" ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription>
            {activeTab === "login" ? "Enter your credentials to login" : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}> {/* Ensure this is wrapped around the entire form */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 relative">
                <TabsTrigger value="login" className="z-10">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="z-10">
                  Sign Up
                </TabsTrigger>
                <motion.div
                  className="absolute bottom-0 h-full bg-primary rounded-sm"
                  initial={false}
                  animate={{
                    x: activeTab === "login" ? "0%" : "100%",
                    width: "50%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 50,
                  }}
                />
              </TabsList>
              <div className="mt-4 space-y-4">
                <TabsContent value="login">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="signup">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Sign in As</Label>
                      <RadioGroup value={role} onValueChange={(value) => setRole(value)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Small Business" id="small-business" />
                          <Label htmlFor="small-business">Small Business</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Big Organization" id="big-organization" />
                          <Label htmlFor="big-organization">Big Organization</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <CardFooter className="p-0">
              <Button className="w-full mt-5" type="submit">
                {activeTab === "login" ? "Login" : "Sign Up"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

AuthPage.propTypes = {
  // Add any props here if needed
};

export default AuthPage;