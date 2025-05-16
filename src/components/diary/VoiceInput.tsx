"use client";

import React, { useState } from 'react';
import { MicrophoneIcon, StopIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline';

interface VoiceInputProps {
  onTranscript?: (text: string) => void;
  className?: string;
  placeholder?: string;
}

export default function VoiceInput({
  onTranscript,
  className = "",
  placeholder = "Press the microphone to start recording...",
}: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);

  // This is a mock function - in a real app, you would implement actual voice recording
  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      console.log('Recording started...');

      // Start timer
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setRecordingInterval(interval);

      // Mock a delayed transcript for demo purposes
      setTimeout(() => {
        const mockTranscript = "This is a simulated voice transcript. In a real app, this would capture your actual speech using the Web Speech API or a similar technology.";
        setTranscript(mockTranscript);
        if (onTranscript) {
          onTranscript(mockTranscript);
        }
        stopRecording();
      }, 3000);
    } else {
      stopRecording();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    console.log('Recording stopped.');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`rounded-xl overflow-hidden shadow-lg ${className}`}>
      <div className="bg-gray-800 border border-gray-700 p-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <button
              onClick={toggleRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
              {isRecording ? (
                <StopIcon className="w-8 h-8" />
              ) : (
                <MicrophoneIcon className="w-8 h-8" />
              )}
            </button>

            {isRecording && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 px-3 py-1 rounded-full text-red-400 text-sm font-mono">
                {formatTime(recordingTime)}
              </div>
            )}
          </div>

          <div className="w-full">
            {transcript ? (
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 min-h-[120px] shadow-inner">
                <p className="text-gray-200">{transcript}</p>
              </div>
            ) : (
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 min-h-[120px] flex items-center justify-center shadow-inner">
                <p className="text-gray-400 text-center">
                  {isRecording ? (
                    <span className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                      Listening...
                    </span>
                  ) : (
                    placeholder
                  )}
                </p>
              </div>
            )}
          </div>

          {transcript && (
            <div className="mt-6 flex gap-3 w-full">
              <button
                onClick={() => {
                  setTranscript('');
                  if (onTranscript) onTranscript('');
                }}
                className="flex-1 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center"
              >
                <TrashIcon className="w-5 h-5 mr-2" />
                Clear
              </button>
              <button
                onClick={() => {
                  // In a real app, this would save the transcript
                  console.log('Saving transcript:', transcript);
                }}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
              >
                <CheckIcon className="w-5 h-5 mr-2" />
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
