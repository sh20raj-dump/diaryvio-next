"use client";

import React, { useState } from 'react';
import { Card, Button, Typography, Space, Alert, Spin } from 'antd';
import { AudioOutlined, AudioMutedOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface VoiceInputProps {
  onTranscript?: (text: string) => void;
  placeholder?: string;
}

export default function AntVoiceInput({
  onTranscript,
  placeholder = "Press the microphone button to start recording...",
}: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // This is a mock function - in a real app, you would implement actual voice recording
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setIsProcessing(true);
      
      // Simulate processing delay
      setTimeout(() => {
        const mockTranscript = "This is a simulated voice transcript. In a real app, this would capture your actual speech using the Web Speech API or a similar technology. The transcript would appear here as you speak, and you could edit it before saving.";
        setTranscript(mockTranscript);
        if (onTranscript) {
          onTranscript(mockTranscript);
        }
        setIsProcessing(false);
      }, 2000);
    } else {
      // Start recording
      setIsRecording(true);
      setTranscript('');
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    if (onTranscript) {
      onTranscript('');
    }
  };

  const saveTranscript = () => {
    // In a real app, this would save the transcript
    console.log('Saving transcript:', transcript);
    alert('Transcript saved!');
  };

  return (
    <Card title="Voice Input" bordered={false}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <Button
            type="primary"
            shape="circle"
            icon={isRecording ? <AudioMutedOutlined /> : <AudioOutlined />}
            onClick={toggleRecording}
            danger={isRecording}
            size="large"
            style={{ width: 64, height: 64, fontSize: 24 }}
          />
          <div style={{ marginTop: 8 }}>
            <Text type="secondary">
              {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
            </Text>
          </div>
        </div>

        {isProcessing && (
          <div style={{ textAlign: 'center', padding: 24 }}>
            <Spin tip="Processing your voice..." />
          </div>
        )}

        {!isProcessing && (
          <div 
            style={{ 
              minHeight: 120, 
              padding: 16, 
              background: '#f5f5f5', 
              borderRadius: 8,
              marginBottom: 16
            }}
          >
            {transcript ? (
              <Paragraph>{transcript}</Paragraph>
            ) : (
              <div style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.45)', paddingTop: 40 }}>
                {placeholder}
              </div>
            )}
          </div>
        )}

        {transcript && !isRecording && !isProcessing && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <Button 
              icon={<DeleteOutlined />} 
              onClick={clearTranscript}
            >
              Clear
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              onClick={saveTranscript}
            >
              Save
            </Button>
          </div>
        )}

        {isRecording && (
          <Alert
            message="Recording in progress"
            description="Speak clearly into your microphone. Click the microphone button again when you're finished."
            type="info"
            showIcon
          />
        )}
      </Space>
    </Card>
  );
}
