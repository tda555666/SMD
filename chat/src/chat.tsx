import { useEffect, useState } from 'react';
import io from 'socket.io-client'; // Importing Socket.IO client

// Adjust the URL to match your server's address
const socket = io('http://localhost:3055');

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Listen for chat messages from the server
    socket.on('message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, `anonymous: ${msg}`]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission

    if (message.trim()) {
      socket.emit('message', message); // Send the message to the server
      setMessage(''); // Clear the input field
    }
  };

  return (
    <div>
      <form id="input-form" onSubmit={sendMessage}>
        <label htmlFor="message">Enter Message:</label>
        <input
          type="text"
          id="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <div id="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default Chat;