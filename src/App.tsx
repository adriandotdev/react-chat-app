import ChatPage from './pages/ChatPage';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MobileChatPage from './pages/MobileChatPage';

import { VerifyChatPage } from './pages/ChatPage';
import ChatAppContext from './contexts/ChatAppContext';

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route>
      <Route path="/" index element={<IndexPage />} />
      <Route path="/login" index element={<LoginPage />} />
      <Route path="/signup" index element={<RegisterPage />} />
      <Route path="/chats" element={<ChatPage />} loader={VerifyChatPage} />
      <Route path="/chats/:id" element={<MobileChatPage />} />
    </Route>
  )
);

function App() {

  return (

    <ChatAppContext>
      <RouterProvider router={router} />
    </ChatAppContext>
  )
}

export default App