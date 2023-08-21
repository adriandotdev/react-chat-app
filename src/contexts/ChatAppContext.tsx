import React, { useState, useContext } from 'react'
import io, { Socket } from 'socket.io-client';
import User from '../interfaces/User';
import axios from 'axios';

const socket = io("http://localhost:3001", { transports: ['websocket', 'polling', 'flashsocket'], autoConnect: false, 'forceNew': true });

type ContextType = {
    loggedInUser: User,
    setLoggedInUser: React.Dispatch<React.SetStateAction<User>>,
    currentChat: User,
    setCurrentChat: React.Dispatch<React.SetStateAction<User>>,
    users: User[],
    setUsers: React.Dispatch<React.SetStateAction<User[]>>,
    messages: object[],
    setMessages: React.Dispatch<React.SetStateAction<object[]>>,
    socket: Socket,
    logout: Function,
    getMessages: Function
}

const defaultValue: ContextType = {};

export const ChatContext = React.createContext(defaultValue);

export function useChatContext() {
    return useContext(ChatContext);
}

function ChatAppContext({ children }) {

    const [loggedInUser, setLoggedInUser] = useState<User>({
        _id: '',
        givenName: '',
        middleName: '',
        lastName: '',
        username: '',
        password: '',
        profileImage: '',
        friends: []
    });
    const [currentChat, setCurrentChat] = useState<User>({
        _id: '',
        givenName: '',
        middleName: '',
        lastName: '',
        username: '',
        password: '',
        profileImage: '',
        friends: []
    });

    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<object[]>([]);

    const logout = async () => {

        await axios.post('http://localhost:3001/api/auth/logout', {}, {
            withCredentials: true
        });

        setCurrentChat({
            _id: '',
            givenName: '',
            middleName: '',
            lastName: '',
            username: '',
            password: '',
            profileImage: '',
            friends: []
        });
        setUsers([]);
        setMessages([]);
        setLoggedInUser({
            _id: '',
            givenName: '',
            middleName: '',
            lastName: '',
            username: '',
            password: '',
            profileImage: '',
            friends: []
        });
        socket.disconnect();
    }

    const getMessages = async () => {

        const messages = await axios.get('http://localhost:3001/api/v1/messages', { withCredentials: true });

        setMessages(messages.data);
    }

    const AppContext: ContextType = { socket, loggedInUser, setLoggedInUser, users, setUsers, currentChat, setCurrentChat, logout, messages, setMessages, getMessages }

    return (
        <ChatContext.Provider value={AppContext}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatAppContext