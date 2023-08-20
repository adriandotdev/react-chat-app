import ChatPage from './pages/ChatPage';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MobileChatPage from './pages/MobileChatPage';
import React, { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

import { VerifyChatPage } from './pages/ChatPage';

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route>
      <Route path="/login" index element={<LoginPage />} />
      <Route path="/signup" index element={<RegisterPage />} />
      <Route path="/chats" element={<ChatPage />} loader={VerifyChatPage} />
      <Route path="/chats/:id" element={<MobileChatPage />} />
    </Route>
  )
);

const socket = io("http://localhost:3001", { transports: ['websocket', 'polling', 'flashsocket'], autoConnect: false, 'forceNew': true });
export const ChatContext = React.createContext({});



function App() {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [currentChat, setCurrentChat] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const logout = async () => {

    await axios.post('http://localhost:3001/api/auth/logout', {}, {
      withCredentials: true
    });

    setCurrentChat('');
    setUsers([]);
    setMessages([]);
    setLoggedInUser('');
    socket.disconnect();
  }

  const getMessages = async () => {

    const messages = await axios.get('http://localhost:3001/api/v1/messages', { withCredentials: true });

    setMessages(messages.data);
  }

  const deleteTest = async () => {
    await axios.delete('http://localhost:3001/api/v1/messages', { withCredentials: true });

    setMessages([])
  }

  return (

    <ChatContext.Provider value={{ socket, loggedInUser, setLoggedInUser, users, setUsers, currentChat, setCurrentChat, logout, messages, setMessages, getMessages, deleteTest }}>
      <RouterProvider router={router} />
    </ChatContext.Provider>
  )
}

export default App