import ChatListItem from '../components/ChatListItem';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../css/index.css';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../App';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { useChatContext } from '../contexts/ChatAppContext';
function ChatPage() {

    const data = useLoaderData();
    const navigate = useNavigate();
    //useContext<ContextType>(ChatContext);
    const { socket, setLoggedInUser, loggedInUser, setUsers, users, logout, setCurrentChat, currentChat, messages, setMessages, getMessages } = useChatContext();

    const [message, setMessage] = useState('');

    useEffect(() => {

        const connect = async () => {

            if (socket !== null)
                socket.disconnect();

            socket.connect();
            await socket.emit("join_room", loggedInUser._id);
        }

        connect();

        setLoggedInUser(data.user);
    }, []);

    useEffect(() => {

        socket.on('new_online_user', (data) => {

            setUsers(data);
        })
    }, [socket]);

    useEffect(() => {

        socket.on('receive_messages', (data) => {

            setMessages(data);
        });
    });

    const sendMessage = async () => {

        const newMessage = {
            message,
            from: loggedInUser._id,
            to: currentChat._id,
            reaction: '',
            hasReply: 0
        }

        await socket.emit('send_message', newMessage);

        setMessage('');
    }

    if (!data) {
        return <Navigate to="/login" replace={true} />
    }

    return (

        <div className="chat-page container-fluid">
            <div className="main-window-mobile row">

                <nav className="d-lg-none chat-navbar bg-light p-3 col-12">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Chat</a>
                        <input type="text" name="" id="" className='form-control' />
                    </div>
                </nav>

                <main className="d-lg-none mobile-content col-12">
                    <div className='list'>
                        {
                            users.map(user => (<ChatListItem click={() => {

                                setCurrentChat(user);
                                getMessages();
                                navigate(`/chats/${user._id}`);
                            }} key={user._id} name={user.givenName} chatShown={'Tawag ka ni Mama'} />))
                        }
                    </div>
                </main>


                {/* Desktop */}
                <div className='d-none d-lg-block desktop-chat-list col-lg-4 p-0'>
                    <nav className="chat-navbar-desktop bg-light px-4 py-3">
                        <div className="">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="h3">Chat</p>


                                {/* Logout */}
                                <button onClick={() => {
                                    logout();
                                    navigate('/login');
                                }} className="btn">
                                    <FaSignOutAlt className="fa-signout" size={25} />
                                </button>

                                {/* Logout */}
                                {/* <button onClick={() => {
                                    deleteTest();
                                }} className="btn text-danger">Delete Test</button> */}
                            </div>
                            <input placeholder="Search Contacts..." type="text" name="" id="" className='form-control' />
                        </div>
                    </nav>

                    <main className="desktop-content">
                        <div className='list'>
                            {
                                users.map(user => (<ChatListItem key={user._id} name={user.givenName} click={() => {
                                    setCurrentChat(user);
                                    getMessages();
                                }} chatShown={'Tawag ka ni Mama'} />))
                            }
                        </div>
                    </main>
                </div>

                {
                    currentChat._id ?
                        <div className="d-none d-lg-flex chat-profile col-8 p-0">
                            <div className="px-3 py-2 chat-desktop-header">
                                <p className='h5 m-0'>{currentChat.givenName}</p>
                            </div>
                            <ScrollToBottom className="desktop-chat-scroll">
                                <div className='chat-body'>
                                    {
                                        messages.map(message => {

                                            if (message.to === currentChat._id && message.from === loggedInUser._id) {
                                                return (
                                                    <div className={`${message.from === loggedInUser._id && 'you'} chat-bubble`}>
                                                        <p className='fw-bold m-0 p-0'>{message.message}</p>
                                                    </div>
                                                )
                                            } else if (message.to === loggedInUser._id && message.from === currentChat._id) {
                                                return (
                                                    <div className={`chat-bubble ${message.from === currentChat._id && 'other'}`}>
                                                        <p className='fw-bold m-0 p-0'>{message.message}</p>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </ScrollToBottom>
                            <div className="d-flex mt-3 mb-2 px-3 mt-5">
                                <textarea placeholder="Type your message here..." value={message} onChange={(e) => setMessage(e.target.value)} className='form-control' name="" id="" rows={1}></textarea>
                                <button onClick={sendMessage} className='btn'><IoMdSend size={25} color="rgb(139, 139, 1)" /></button>
                            </div>
                        </div>
                        :
                        <div className='d-none d-lg-flex justify-content-center chat-profile col-8 p-0'>
                            <h1 className='text-center'>Start Messaging</h1>
                        </div>
                }
            </div>
        </div>
    )
}

export const VerifyChatPage = async () => {

    try {
        const response = await axios.post('http://localhost:3001/api/auth/verify', {}, { withCredentials: true });

        return response.data;
    }
    catch (err) {

        return null;
    }
}
export default ChatPage