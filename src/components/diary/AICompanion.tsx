"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneIcon, 
  PhoneXMarkIcon, 
  MicrophoneIcon, 
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/solid';
import { Dialog, Transition } from '@headlessui/react';

interface AICompanionProps {
  name?: string;
}

export default function AICompanion({ name = "Violet" }: AICompanionProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle call timer
  useEffect(() => {
    if (isCallActive && !timerRef.current) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else if (!isCallActive && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isCallActive]);

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start call
  const startCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
    setMessages([]);
    
    // Simulate AI greeting
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{
          text: `Hi there! This is ${name}, your AI companion. How can I help you today?`,
          isUser: false
        }]);
        setIsTyping(false);
      }, 1500);
    }, 1000);
  };

  // End call
  const endCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Toggle speaker
  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  // Simulate user message
  const simulateUserMessage = () => {
    if (isTyping) return;
    
    const userMessages = [
      "How have my sleep patterns been this week?",
      "What was my mood like last weekend?",
      "Can you summarize my work-related entries from last month?",
      "What activities seem to make me happiest?",
      "Have I been making progress on my fitness goals?"
    ];
    
    const randomMessage = userMessages[Math.floor(Math.random() * userMessages.length)];
    
    setMessages(prev => [...prev, {
      text: randomMessage,
      isUser: true
    }]);
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponses = [
        "Based on your entries, your sleep has been improving. You've been averaging 7.5 hours, up from 6.8 hours the previous week. Your notes mention feeling more rested in the mornings.",
        "Looking at your weekend entries, you recorded mostly positive moods. On Saturday you mentioned feeling 'excited' about your hike, and Sunday you noted being 'content' while reading at the café.",
        "I found 12 work-related entries last month. Common themes included project deadlines, team collaboration, and some stress about the quarterly review. You had a particularly positive entry about the successful product launch.",
        "According to your journal, outdoor activities consistently correlate with your happiest moods. Specifically, hiking, gardening, and beach trips were all associated with 'excited' or 'happy' mood tags.",
        "You've been making steady progress on your fitness goals. You've logged workouts on 18 days this month, which is 3 more than last month. Your entries mention feeling stronger and having more energy."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      setMessages(prev => [...prev, {
        text: randomResponse,
        isUser: false
      }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div>
      {/* Call button */}
      {!isCallActive && (
        <button
          onClick={startCall}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
        >
          <PhoneIcon className="w-6 h-6" />
        </button>
      )}

      {/* Call interface */}
      <Transition
        show={isCallActive}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl w-full max-w-md">
            {/* Call header */}
            <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-600 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
              <p className="text-indigo-200">AI Companion</p>
              <p className="text-indigo-200 mt-2">{formatDuration(callDuration)}</p>
            </div>
            
            {/* Call content - conversation */}
            <div className="h-80 overflow-y-auto p-4 bg-gray-800">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-2xl px-4 py-2 max-w-[80%] ${
                      message.isUser 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-700 rounded-2xl px-4 py-3 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Call actions */}
            <div className="p-4 bg-gray-900 flex justify-between items-center">
              <button 
                onClick={toggleMute}
                className={`p-4 rounded-full ${isMuted ? 'bg-gray-700 text-gray-400' : 'bg-gray-700 text-white'}`}
              >
                <MicrophoneIcon className="w-6 h-6" />
              </button>
              
              <button 
                onClick={simulateUserMessage}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:bg-indigo-700 transition-colors"
              >
                Speak to {name}
              </button>
              
              <button 
                onClick={toggleSpeaker}
                className={`p-4 rounded-full ${isSpeakerOn ? 'bg-gray-700 text-white' : 'bg-gray-700 text-gray-400'}`}
              >
                {isSpeakerOn ? (
                  <SpeakerWaveIcon className="w-6 h-6" />
                ) : (
                  <SpeakerXMarkIcon className="w-6 h-6" />
                )}
              </button>
            </div>
            
            {/* End call button */}
            <div className="p-4 bg-gray-900 flex justify-center">
              <button 
                onClick={endCall}
                className="bg-red-600 text-white p-4 rounded-full hover:bg-red-700 transition-colors"
              >
                <PhoneXMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
