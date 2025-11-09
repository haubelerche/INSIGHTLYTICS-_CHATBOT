import React, { useState, useEffect } from 'react';
import { BotIcon } from './icons/BotIcon';

const LoadingMessage = ({ model }) => {
  const [dots, setDots] = useState('');
  const [stage, setStage] = useState(0);

  const stages = [
    'Searching for product...',
    'Reading customer reviews...',
    'Analyzing pros and cons...',
    'Generating detailed insights...',
  ];

  useEffect(() => {
    // Animated dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Progress through stages
    const stageInterval = setInterval(() => {
      setStage(prev => (prev + 1) % stages.length);
    }, 2500);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(stageInterval);
    };
  }, []);

  const modelColors = {
    'gpt-4o-mini': '#10a37f',
    'gemini-2.5-flash': '#4285f4',
    'deep-seek-r1': '#d97706',
  };

  const modelNames = {
    'gpt-4o-mini': 'GPT-4o Mini',
    'gemini-2.5-flash': 'Gemini 2.5 Flash',
    'deep-seek-r1': 'DeepSeek R1',
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      marginBottom: 12,
    }}>
      <div style={{
        width: 30,
        height: 30,
        borderRadius: 999,
        background: 'linear-gradient(135deg,#0ea5e9,#10b981)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'pulse 2s ease-in-out infinite',
      }}>
        <BotIcon />
      </div>

      <div style={{ display: 'inline-block', maxWidth: '70%' }}>
        {model && (
          <div style={{
            fontSize: 10,
            color: modelColors[model] || '#94a3b8',
            marginBottom: 4,
            marginLeft: 8,
            fontWeight: 500,
          }}>
            {modelNames[model] || model}
          </div>
        )}
        
        <div style={{
          display: 'inline-block',
          padding: 16,
          borderRadius: 12,
          boxShadow: '0 4px 14px rgba(2,6,23,0.6)',
          background: '#162549ff',
          color: '#fff',
        }}>
          {/* Thinking animation */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            {/* Progress text */}
            <div style={{
              fontSize: 14,
              color: '#cbd5e1',
              fontWeight: 500,
            }}>
              {stages[stage]}{dots}
            </div>

            {/* Progress bar */}
            <div style={{
              width: '100%',
              height: 4,
              background: 'rgba(148, 163, 184, 0.2)',
              borderRadius: 2,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                background: `linear-gradient(90deg, ${modelColors[model] || '#0ea5e9'}, ${modelColors[model] || '#10b981'})`,
                borderRadius: 2,
                animation: 'loading 2s ease-in-out infinite',
              }} />
            </div>

            {/* Typing dots */}
            <div style={{
              display: 'flex',
              gap: 4,
            }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#94a3b8',
                    animation: `bounce 1.4s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }

        @keyframes loading {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default LoadingMessage;
