import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Upload, CheckCircle, AlertCircle, Download } from "lucide-react";

// API Configuration
const API_CONFIG = {
  baseUrl: 'http://localhost:8000',
  endpoints: {
    generateDocuments: '/api/generate-documents',
    validateDocument: '/api/validate-document',
    syntheticData: '/api/generate-synthetic-data',
    uploadDocument: '/api/upload-document'
  }
};

// API Service functions
const apiService = {
  generateDocuments: async () => {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.generateDocuments}`);
    if (!response.ok) throw new Error('Failed to generate documents');
    return response.json();
  },

  validateDocument: async (documentType, content) => {
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.validateDocument}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document_type: documentType, content })
    });
    if (!response.ok) throw new Error('Document validation failed');
    return response.json();
  },

  generateSyntheticData: async (documentType) => {
    const response = await fetch(
      `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.syntheticData}?document_type=${documentType}`
    );
    if (!response.ok) throw new Error('Failed to generate synthetic data');
    return response.json();
  },

  uploadDocument: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.uploadDocument}`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) throw new Error('File upload failed');
    return response.json();
  }
};

const CompliancePage = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocType, setSelectedDocType] = useState("IEC");
  const [validationContent, setValidationContent] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [syntheticData, setSyntheticData] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const documentTypes = [
    "IEC",
    "AD Code",
    "Commercial Invoice",
    "Bill of Lading",
    "Packing List"
  ];

  const handleGenerateDocuments = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.generateDocuments();
      setDocuments(data.compliance_documents);
      setValidationResult({
        type: 'success',
        message: 'Documents generated successfully'
      });
    } catch (error) {
      setValidationResult({
        type: 'error',
        message: error.message
      });
    }
    setIsLoading(false);
  };

  const handleValidateDocument = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.validateDocument(selectedDocType, validationContent);
      setValidationResult({
        type: 'success',
        message: data.message
      });
    } catch (error) {
      setValidationResult({
        type: 'error',
        message: error.message
      });
    }
    setIsLoading(false);
  };

  const handleGenerateSyntheticData = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.generateSyntheticData(selectedDocType);
      setSyntheticData(data);
      setValidationResult({
        type: 'success',
        message: 'Synthetic data generated successfully'
      });
    } catch (error) {
      setValidationResult({
        type: 'error',
        message: error.message
      });
    }
    setIsLoading(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const data = await apiService.uploadDocument(file);
      setUploadStatus({
        type: 'success',
        message: 'File uploaded successfully'
      });
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: error.message
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Compliance Document Management</CardTitle>
          <CardDescription>
            Manage and validate your export compliance documents
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generate">Generate Documents</TabsTrigger>
          <TabsTrigger value="validate">Validate Document</TabsTrigger>
          <TabsTrigger value="synthetic">Synthetic Data</TabsTrigger>
          <TabsTrigger value="upload">Upload Document</TabsTrigger>
        </TabsList>

        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Generate Random Documents</CardTitle>
              <CardDescription>
                Generate a set of random compliance documents from the available types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleGenerateDocuments} 
                disabled={isLoading}
                className="w-full"
              >
                <FileText className="mr-2 h-4 w-4" />
                Generate Documents
              </Button>
              {documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  {documents.map((doc, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{doc.document}</h3>
                        <p className="text-sm text-gray-500">{doc.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validate">
          <Card>
            <CardHeader>
              <CardTitle>Validate Document</CardTitle>
              <CardDescription>
                Validate the content of a specific document type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="docType">Document Type</Label>
                <Select 
                  value={selectedDocType} 
                  onValueChange={setSelectedDocType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Document Content</Label>
                <Input
                  id="content"
                  placeholder="Enter document content"
                  value={validationContent}
                  onChange={(e) => setValidationContent(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleValidateDocument} 
                disabled={isLoading}
                className="w-full"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Validate Document
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="synthetic">
          <Card>
            <CardHeader>
              <CardTitle>Generate Synthetic Data</CardTitle>
              <CardDescription>
                Generate synthetic data for a specific document type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="syntheticDocType">Document Type</Label>
                <Select 
                  value={selectedDocType} 
                  onValueChange={setSelectedDocType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleGenerateSyntheticData} 
                disabled={isLoading}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Generate Data
              </Button>
              {syntheticData && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <pre className="whitespace-pre-wrap text-sm">
                      {JSON.stringify(syntheticData, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Document</CardTitle>
              <CardDescription>
                Upload a compliance document file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-4">
                <Label htmlFor="file">Document File</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {validationResult && (
        <Alert className={`mt-4 ${validationResult.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
          <AlertCircle className={validationResult.type === 'error' ? 'text-red-600' : 'text-green-600'} />
          <AlertTitle>
            {validationResult.type === 'error' ? 'Error' : 'Success'}
          </AlertTitle>
          <AlertDescription>
            {validationResult.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CompliancePage;