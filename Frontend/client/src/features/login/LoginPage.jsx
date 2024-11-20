import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

function AuthPage() {
  const [activeTab, setActiveTab] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (activeTab === 'login') {
      console.log('Logging in with:', { email, password })
      // Add your login logic here
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }
      console.log('Signing up with:', { name, email, password })
      // Add your sign-up logic here
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{activeTab === 'login' ? 'Login' : 'Sign Up'}</CardTitle>
          <CardDescription>
            {activeTab === 'login' ? 'Enter your credentials to login' : 'Create a new account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 relative">
                <TabsTrigger value="login" className="z-10">Login</TabsTrigger>
                <TabsTrigger value="signup" className="z-10">Sign Up</TabsTrigger>
                <motion.div
                  className="absolute bottom-0 h-full bg-primary rounded-sm"
                  initial={false}
                  animate={{
                    x: activeTab === 'login' ? '0%' : '100%',
                    width: '50%'
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 50
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
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" onClick={handleSubmit}>
            {activeTab === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

AuthPage.propTypes = {
  // Add any props here if needed
}

export default AuthPage