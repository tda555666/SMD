import { useEffect, useState, FormEvent } from 'react';
import io from 'socket.io-client';
import './chat.css'; // Ensure this path is correct

const socket = io('http://localhost:3055');

function Chat() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, `anonymous: ${msg}`]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <form id="input-form" onSubmit={sendMessage} className="input-form">
        <input
          type="text"
          id="message"
          name="message"
          placeholder='Enter a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;