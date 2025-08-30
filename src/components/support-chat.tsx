"use client";

import { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

type Message = {
  text: string;
  sender: 'user' | 'support';
};

export function SupportChat() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! How can I help you today?", sender: 'support' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessages: Message[] = [...messages, { text: inputValue, sender: 'user' }];
      setMessages(newMessages);
      setInputValue('');
      
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thanks for your message! An agent will be with you shortly.", sender: 'support' }]);
      }, 1000);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg bg-primary hover:bg-primary/90"
          size="icon"
        >
          <MessageCircle className="h-8 w-8 text-primary-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="w-80 md:w-96 mr-2 mb-2 p-0">
        <div className="flex flex-col h-[28rem]">
          <div className="p-4 bg-muted/50 rounded-t-lg">
            <h3 className="font-semibold font-headline">Customer Support</h3>
            <p className="text-sm text-muted-foreground">We're here to help!</p>
          </div>
          <Separator />
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
