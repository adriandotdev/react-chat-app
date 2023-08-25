import ChatPage from './pages/ChatPage';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MobileChatPage from './pages/MobileChatPage';

// Private Page
import PrivatePage from './pages/PrivatePage';
import { PrivateRouteVerifier } from './pages/PrivatePage';

// Non-Private Page
import NotPrivatePage from './pages/NotPrivatePage';
import { NonPrivateRouteVerifier } from './pages/NotPrivatePage';

import { LoggedInUserLoader } from './pages/ChatPage';
import ChatAppContext from './contexts/ChatAppContext';

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route>

      {/* Private Routes */}
      <Route element={<PrivatePage />} loader={PrivateRouteVerifier}>
        <Route path="/chats" element={<ChatPage />} loader={LoggedInUserLoader} />
        <Route path="/chats/:id" element={<MobileChatPage />} />
      </Route>

      {/* Non-Private Routes */}
      <Route element={<NotPrivatePage />} loader={NonPrivateRouteVerifier} >
        <Route path="/" index element={<IndexPage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/signup" index element={<RegisterPage />} />
      </Route>

    </Route >
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