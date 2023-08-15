import React from 'react'
// import './css/index.css';
import ChatPage from './pages/ChatPage';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route>
      <Route path="/login" index element={<LoginPage />} />
      <Route path="/signup" index element={<RegisterPage />} />
      <Route path="/chats" element={<ChatPage />} />
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App