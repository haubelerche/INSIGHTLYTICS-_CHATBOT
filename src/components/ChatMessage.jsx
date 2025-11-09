import React from 'react';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';


const FormattedBotMessage = ({ text }) => {
  // Additional cleanup for any remaining technical artifacts
  let cleanedText = text;
  
  // Remove any remaining code blocks
  cleanedText = cleanedText.replace(/```[\s\S]*?```/g, '');
  
  // Remove SQL query markers
  cleanedText = cleanedText.replace(/\[SQL_QUERY\][\s\S]*?\[\/SQL_QUERY\]/g, '');
  
  // Remove markdown headers (###, ##, #)
  cleanedText = cleanedText.replace(/^#{1,6}\s+.+$/gm, '');
  
  // Remove analysis/technical sections
  cleanedText = cleanedText.replace(/Analysis of Query Results[\s\S]*?(?=\*\*Pros:\*\*|\*\*Cons:\*\*|$)/gi, '');
  cleanedText = cleanedText.replace(/Key Trends and Patterns[\s\S]*?(?=\*\*Pros:\*\*|\*\*Cons:\*\*|$)/gi, '');
  
  // Clean up excessive whitespace
  cleanedText = cleanedText.replace(/\n{3,}/g, '\n\n').trim();
  
  const sections = cleanedText.split(/\n\s*\n/);
  
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {sections.map((section, i) => {
        // Skip empty sections
        if (!section.trim()) return null;
        
        // Product Overview section
        if (section.startsWith('**Product Overview:**')) {
          const content = section.replace('**Product Overview:**', '').trim();
          return (
            <div key={i}>
              <div style={{fontWeight:600,color:'#60a5fa',fontSize:16,marginBottom:8}}>📊 Product Overview</div>
              <p style={{color:'#cbd5e1',lineHeight:1.6,margin:0}}>{content}</p>
            </div>
          );
        }
        
        // Pros section
        if (section.startsWith('**Pros:**')) {
          const items = section.replace('**Pros:**', '').trim().split('\n- ').filter(Boolean);
          return (
            <div key={i}>
              <div style={{fontWeight:600,color:'#34d399',fontSize:16,marginBottom:8}}>✅ Pros</div>
              <ul style={{marginTop:0,color:'#cbd5e1',listStyleType:'none',paddingLeft:0}}>
                {items.map((item, j) => (
                  <li key={j} style={{marginBottom:8,paddingLeft:20,position:'relative',lineHeight:1.5}}>
                    <span style={{position:'absolute',left:0,color:'#34d399'}}>•</span>
                    {item.replace(/^-\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        
        // Cons section
        if (section.startsWith('**Cons:**')) {
          const items = section.replace('**Cons:**', '').trim().split('\n- ').filter(Boolean);
          return (
            <div key={i}>
              <div style={{fontWeight:600,color:'#fb7185',fontSize:16,marginBottom:8}}>❌ Cons</div>
              <ul style={{marginTop:0,color:'#cbd5e1',listStyleType:'none',paddingLeft:0}}>
                {items.map((item, j) => (
                  <li key={j} style={{marginBottom:8,paddingLeft:20,position:'relative',lineHeight:1.5}}>
                    <span style={{position:'absolute',left:0,color:'#fb7185'}}>•</span>
                    {item.replace(/^-\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        
        // Key Features section
        if (section.startsWith('**Key Features Mentioned:**')) {
          const items = section.replace('**Key Features Mentioned:**', '').trim().split('\n- ').filter(Boolean);
          return (
            <div key={i}>
              <div style={{fontWeight:600,color:'#a78bfa',fontSize:16,marginBottom:8}}>🔑 Key Features</div>
              <ul style={{marginTop:0,color:'#cbd5e1',listStyleType:'none',paddingLeft:0}}>
                {items.map((item, j) => (
                  <li key={j} style={{marginBottom:8,paddingLeft:20,position:'relative',lineHeight:1.5}}>
                    <span style={{position:'absolute',left:0,color:'#a78bfa'}}>▸</span>
                    {item.replace(/^-\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        
        // Customer Sentiment section
        if (section.startsWith('**Customer Sentiment Analysis:**')) {
          const items = section.replace('**Customer Sentiment Analysis:**', '').trim().split('\n- ').filter(Boolean);
          return (
            <div key={i}>
              <div style={{fontWeight:600,color:'#fbbf24',fontSize:16,marginBottom:8}}>💭 Customer Sentiment</div>
              <ul style={{marginTop:0,color:'#cbd5e1',listStyleType:'none',paddingLeft:0}}>
                {items.map((item, j) => (
                  <li key={j} style={{marginBottom:8,paddingLeft:20,position:'relative',lineHeight:1.5}}>
                    <span style={{position:'absolute',left:0,color:'#fbbf24'}}>→</span>
                    {item.replace(/^-\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        
        // Price & Value section
        if (section.startsWith('**Price & Value Assessment:**')) {
          const items = section.replace('**Price & Value Assessment:**', '').trim().split('\n- ').filter(Boolean);
          return (
            <div key={i}>
              <div style={{fontWeight:600,color:'#10b981',fontSize:16,marginBottom:8}}>💰 Price & Value</div>
              <ul style={{marginTop:0,color:'#cbd5e1',listStyleType:'none',paddingLeft:0}}>
                {items.map((item, j) => (
                  <li key={j} style={{marginBottom:8,paddingLeft:20,position:'relative',lineHeight:1.5}}>
                    <span style={{position:'absolute',left:0,color:'#10b981'}}>$</span>
                    {item.replace(/^-\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        
        // Common Use Cases section
        if (section.startsWith('**Common Use Cases:**')) {
          const items = section.replace('**Common Use Cases:**', '').trim().split('\n- ').filter(Boolean);
          return (
            <div key={i}>
              <div style={{fontWeight:600,color:'#f472b6',fontSize:16,marginBottom:8}}>🎯 Common Use Cases</div>
              <ul style={{marginTop:0,color:'#cbd5e1',listStyleType:'none',paddingLeft:0}}>
                {items.map((item, j) => (
                  <li key={j} style={{marginBottom:8,paddingLeft:20,position:'relative',lineHeight:1.5}}>
                    <span style={{position:'absolute',left:0,color:'#f472b6'}}>✦</span>
                    {item.replace(/^-\s*/, '')}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        
        // Generic bold headers
        if (section.startsWith('**')) {
          const title = section.replaceAll('**', '');
          // Skip if it looks like a technical header
          if (title.match(/analysis|query|example|conclusion|trends|patterns/i)) {
            return null;
          }
          return <div key={i} style={{fontWeight:700,color:'#f8fafc',fontSize:16,marginTop:8}}>{title}</div>;
        }
        
        // Skip sections that look like technical content
        if (section.match(/review_id|product_id|rating:|SELECT|FROM|WHERE/i)) {
          return null;
        }
        
        return <p key={i} style={{color:'#cbd5e1',lineHeight:1.6,margin:0}}>{section.replaceAll('*', '')}</p>;
      })}
    </div>
  );
};

export const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  // Model info for bot messages
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
    <div style={{display:'flex',alignItems:'flex-start',gap:12,justifyContent:isBot? 'flex-start' : 'flex-end',marginBottom:12}}>
      {isBot && (
        <div style={{width:30,height:30,borderRadius:999,background:'linear-gradient(135deg,#0ea5e9,#10b981)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <BotIcon />
        </div>
      )}

      {/* make the bubble size fit content: use inline-block so it shrinks to content, but cap width with maxWidth */}
      <div style={{display: 'inline-block', maxWidth: '70%', verticalAlign: 'top'}}>
        {isBot && message.model && (
          <div style={{
            fontSize: 10,
            color: modelColors[message.model] || '#94a3b8',
            marginBottom: 4,
            marginLeft: 8,
            fontWeight: 500,
          }}>
            {modelNames[message.model] || message.model}
          </div>
        )}
        <div style={{display:'inline-block',padding:7,borderRadius:12,boxShadow:'0 4px 14px rgba(2,6,23,0.6)',background:isBot? '#162549ff' : '#992988ff',color:'#fff',whiteSpace:'normal',wordBreak:'break-word',maxWidth:'100%'}}>
          {isBot ? <FormattedBotMessage text={message.text} /> : <p style={{margin:0}}>{message.text}</p>}
        </div>
      </div>

      {!isBot && (
        <div style={{width:30,height:30,borderRadius:999,background:'#ac1280ff',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
