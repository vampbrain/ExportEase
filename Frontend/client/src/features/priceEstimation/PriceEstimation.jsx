import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  Truck, 
  Clock, 
  MapPin, 
  Weight, 
  Box,
  Zap,
  Plane,
  Ship
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getShippingEstimates } from '../../lib/gemini';

const ShippingEstimator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [estimates, setEstimates] = useState(null);
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    weight: '',
    length: '',
    width: '',
    height: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await getShippingEstimates(formData);
      setEstimates(result.estimates);
    } catch (err) {
      setError('Unable to get shipping estimates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getServiceIcon = (serviceType) => {
    if (serviceType?.toLowerCase().includes('express')) return <Plane className="h-5 w-5" />;
    if (serviceType?.toLowerCase().includes('standard')) return <Truck className="h-5 w-5" />;
    return <Ship className="h-5 w-5" />;
  };

  const getServiceColor = (serviceType) => {
    if (serviceType?.toLowerCase().includes('express')) return 'bg-red-50 text-red-700 border-red-200';
    if (serviceType?.toLowerCase().includes('standard')) return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-green-50 text-green-700 border-green-200';
  };

  return (
    <div className=" bg-gradient-to-b  p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Shipping Rate Calculator</h1>
          <p className="text-gray-600">Get instant AI-powered shipping quotes for your package</p>
        </div>

        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Package Details
            </CardTitle>
            <CardDescription>
              Enter your shipment information to get accurate quotes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="source" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      Pickup Location
                    </Label>
                    <Input
                      id="source"
                      name="source"
                      placeholder="Enter pickup address"
                      value={formData.source}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      Delivery Location
                    </Label>
                    <Input
                      id="destination"
                      name="destination"
                      placeholder="Enter delivery address"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Box className="h-4 w-4" />
                    Package Dimensions & Weight
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-sm">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        placeholder="0.0"
                        value={formData.weight}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.1"
                        className="border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="length" className="text-sm">Length (cm)</Label>
                      <Input
                        id="length"
                        name="length"
                        type="number"
                        placeholder="0"
                        value={formData.length}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width" className="text-sm">Width (cm)</Label>
                      <Input
                        id="width"
                        name="width"
                        type="number"
                        placeholder="0"
                        value={formData.width}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height" className="text-sm">Height (cm)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        placeholder="0"
                        value={formData.height}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="border-gray-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full text-white" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Calculating Rates...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4" />
                    Get Shipping Rates
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="mb-8 shadow-md">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {estimates && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                Available Shipping Options
              </CardTitle>
              <CardDescription>
                Compare rates and delivery times from different carriers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {estimates.map((estimate, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white border hover:shadow-md transition-all duration-200"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getServiceIcon(estimate.service_type)}
                        <h3 className="font-medium text-gray-900">{estimate.provider}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getServiceColor(estimate.service_type)}`}>
                          {estimate.service_type}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {estimate.duration}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{(estimate.cost).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">Inc. of all taxes</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ShippingEstimator;