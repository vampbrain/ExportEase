import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Send, X, MessageCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const CustomChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(uuidv4());
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      startSession();
    }
  }, [isOpen]);

  const startSession = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('session_id', sessionId);
      formData.append('context', 'Your FAQ context here');

      const response = await fetch('https://exportease-fastapi.vercel.app/faq/start', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to start session');

      // Add welcome message
      setMessages([{
        type: 'bot',
        content: "Hello! I'm your FAQ assistant. How can I help you today?"
      }]);
    } catch (error) {
      console.error('Error starting session:', error);
      setMessages([{
        type: 'bot',
        content: "Sorry, I'm having trouble connecting. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message immediately
    setMessages(prev => [...prev, {
      type: 'user',
      content: userMessage
    }]);

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('question', userMessage);
      formData.append('session_id', sessionId);

      const response = await fetch('https://exportease-fastapi.vercel.app/faq/ask', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to get answer');
      
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: data.answer
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: "I'm sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = async () => {
    try {
      await fetch(`https://exportease-fastapi.vercel.app/faq/end/${sessionId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error ending session:', error);
    }
    setIsOpen(false);
    setMessages([]);
  };

  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`
          max-w-[80%] p-3 rounded-lg
          ${message.type === 'user' 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full p-0 hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-80 sm:w-96 h-[500px] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground">
            <h3 className="font-semibold">FAQ Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleClose}
              className="hover:bg-primary-foreground/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Area */}
          <CardContent className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                ref={inputRef}
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={isLoading || !inputMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomChatbot;