import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Volume2 } from 'lucide-react';
import Mascota from '../assets/images/Mascota.png'
import '../styles/ChatSection.css'

function ChatSection() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'mascot',
      content: '¡Hola! Soy tu compañero virtual. Puedes hablarme presionando el botón del micrófono o escribiendo un mensaje. ¿Cómo te sientes hoy?',
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const mascotResponses = [
    "¡Qué bueno escucharte! Me alegra mucho poder conversar contigo. ¿Ya tomaste tus medicinas?",
    "Entiendo lo que me dices. Eso se escucha interesante. ¿Me podrias contar mas?",
    "¡Excelente! Es importante que compartas tus pensamientos conmigo. Recuerda que estare pendiente de tendencias o patrones en tus signos para revisar cualquier padecimiento..",
    "Me parece muy interesante lo que me cuentas. ¿Puedes contarme más?",
    "Gracias por confiar en mí. Tu bienestar es muy importante para mí.",
    "¡Qué maravilloso! Me encanta cuando conversamos así.",
    "Entiendo perfectamente. A veces es bueno hablar de nuestros sentimientos.",
    "¡Muy bien! Mantener una conversación activa es excelente para la mente."
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleMicToggle = () => {
    if (isRecording) {
      // Detener grabación
      setIsRecording(false);
      setIsListening(false);
      
      // Simular procesamiento de audio
      setTimeout(() => {
        const simulatedText = "Hoy me he sentido bien. Hoy tras que amanecio me tome mis pastillas.";
        addUserMessage(simulatedText, 'voice');
      }, 1000);
    } else {
      // Iniciar grabación
      setIsRecording(true);
      setIsListening(true);
    }
  };

  const addUserMessage = (content, type = 'text') => {
    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: content,
      messageType: type,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    // Respuesta automática de la mascota
    setTimeout(() => {
      const randomResponse = mascotResponses[Math.floor(Math.random() * mascotResponses.length)];
      const mascotMessage = {
        id: Date.now() + 1,
        type: 'mascot',
        content: randomResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, mascotMessage]);
    }, 1500);
  };

  const handleSendText = () => {
    if (textInput.trim()) {
      addUserMessage(textInput);
      setTextInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendText();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="chat-section">
      <div className="section-header">
        <h2>💬 Charla con tu Compañero</h2>
        <p>Habla o escribe para conversar con tu mascota virtual</p>
      </div>

      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              {message.type === 'mascot' && (
                <img src={Mascota} alt="Doctor" className="message-avatar" />
              )}
              <div className="message-content">
                <div className="message-bubble">
                  {message.messageType === 'voice' && (
                    <div className="voice-indicator">
                      <Volume2 size={16} />
                      <span>Mensaje de voz</span>
                    </div>
                  )}
                  <p>{message.content}</p>
                </div>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <div className="voice-controls">
            <button 
              className={`mic-button ${isRecording ? 'recording' : ''}`}
              onClick={handleMicToggle}
            >
              {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
            {isListening && (
              <div className="listening-indicator">
                <div className="pulse"></div>
                <span>Escuchando...</span>
              </div>
            )}
          </div>

          <div className="text-input-container">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje aquí..."
              className="text-input"
            />
            <button 
              className="send-button"
              onClick={handleSendText}
              disabled={!textInput.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSection;