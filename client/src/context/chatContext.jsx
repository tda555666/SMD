import React, { createContext, useContext, Suspense } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const Chat = React.lazy(() => import('chat/App'));

  return (
    <ChatContext.Provider value={{ Chat }}>
      <Suspense fallback={<div>Loading chat...</div>}>
        {children}
      </Suspense>
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

export default ChatProvider;