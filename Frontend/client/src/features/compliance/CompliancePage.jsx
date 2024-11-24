import React, { useState, useRef, useEffect } from 'react';
import { Shield, Send, Upload, Loader2, AlertCircle,LightbulbIcon    } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from 'react-markdown';

const ComplianceAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const promptSuggestions = [
    {
      title: "Document Analysis",
      description: "What are the key compliance requirements outlined in this document?",
    },
    {
      title: "Risk Assessment",
      description: "What are the potential compliance risks and their mitigation strategies?",
    },
    {
      title: "Action Items",
      description: "What immediate steps should be taken to ensure compliance?",
    }
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setMessages(prev => [...prev, {
        type: 'system',
        content: `PDF document uploaded: ${file.name}. You can now ask compliance-related questions about this document.`
      }]);
    } else {
      setMessages(prev => [...prev, {
        type: 'system',
        content: 'Please upload a valid PDF document for compliance analysis.'
      }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedFile) return;

    const newMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    setMessages(prev => [...prev, {
      type: 'user',
      content: newMessage
    }]);

    try {
      const formData = new FormData();
      formData.append('question', newMessage);
      formData.append('file', selectedFile);

      const response = await fetch('https://exportease-fastapi.vercel.app/ask/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        type: 'assistant',
        content: data.answer,
        confidence: data.score
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'system',
        content: 'Error: Unable to analyze the document. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const Message = ({ message }) => {
    const isUser = message.type === 'user';
    const isSystem = message.type === 'system';

    if (isSystem) {
      return (
        <Alert className="mx-auto max-w-[85%] my-4 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{message.content}</AlertDescription>
        </Alert>
      );
    }

    return (
      <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}>
        <Avatar className={`w-8 h-8 ${isUser ? 'bg-black' : 'bg-gray-900'}`}>
          <AvatarFallback className="text-white text-sm">
            {isUser ? 'U' : 'AI'}
          </AvatarFallback>
        </Avatar>
        <Card className={`max-w-[80%] ${isUser ? 'ml-auto bg-gray-50' : 'mr-auto bg-white'} dark:bg-gray-900`}>
          <CardContent className="p-4">
            {isUser ? (
              <p className="text-sm">{message.content}</p>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="text-sm leading-relaxed mb-3">{children}</p>,
                    h1: ({ children }) => <h1 className="text-lg font-bold mb-3">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-sm font-bold mb-2">{children}</h3>,
                    ul: ({ children }) => <ul className="list-disc ml-4 mb-3 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal ml-4 mb-3 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-sm">{children}</li>,
                    code: ({ inline, children }) => 
                      inline ? (
                        <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                      ) : (
                        <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto mb-3">
                          <code className="text-sm font-mono">{children}</code>
                        </pre>
                      ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic mb-3">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-7 w-7" />
            <h1 className="text-xl font-semibold">Compliance Document Assistant</h1>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {!selectedFile && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-12">
              <Card className="w-full max-w-xl p-8">
                <CardContent className="text-center space-y-6">
                  <Shield className="h-16 w-16 mx-auto" />
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">Compliance Assistant</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Upload a document to analyze compliance requirements and regulations.
                    </p>
                  </div>
                  <Button asChild className="w-full h-12 text-base bg-black hover:bg-gray-900 text-white">
                    <label className="cursor-pointer">
                      <Upload className="w-5 h-5 mr-2" />
                      Upload PDF Document
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </Button>
                </CardContent>
              </Card>

              <div className="w-full max-w-xl space-y-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <LightbulbIcon className="h-5 w-5" />
                  <span className="text-base font-medium">Example questions you can ask:</span>
                </div>
                
                <div className="grid gap-4">
                  {promptSuggestions.map((prompt, idx) => (
                    <Card key={idx} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                      <CardContent 
                        className="p-4"
                        onClick={() => handleSuggestionClick(prompt.description)}
                      >
                        <h3 className="font-medium mb-2">{prompt.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{prompt.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            {!selectedFile && (
              <Button
                type="button"
                variant="outline"
                className="shrink-0"
                asChild
              >
                <label className="cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </Button>
            )}
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={selectedFile 
                ? "Ask about compliance requirements..." 
                : "Upload a PDF to start analyzing"}
              disabled={!selectedFile || isLoading}
              className="flex-1"
            />
            <Button 
              type="submit"
              disabled={!selectedFile || !inputMessage.trim() || isLoading}
              className="shrink-0 bg-black hover:bg-gray-900 text-white"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplianceAssistant;