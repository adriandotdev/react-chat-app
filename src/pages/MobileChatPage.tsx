import { useState, useContext, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatContext } from '../App'
import useScreenSize from '../hooks/useScreenSize';
import { NavLink, Navigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { IoMdSend } from 'react-icons/io';

function MobileChatPage() {

    const { socket, loggedInUser, setUsers, users, logout, setCurrentChat, currentChat, messages, setMessages, getMessages, deleteTest } = useContext(ChatContext);
    const isMatch = useScreenSize(1024);

    const [message, setMessage] = useState('');

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

    useEffect(() => {

        socket.on('new_online_user', (data) => {

            console.log("FROM JOIN ROOM DATA: ");
            console.log(data);
            setUsers(data);
        })
    }, [socket]);

    useEffect(() => {

        socket.on('receive_messages', (data) => {

            console.log("RECEIVED: " + data);
            setMessages(data);
        });
    });

    if (isMatch) {

        console.log("NOT MATCHED")
        return <Navigate to="/chats" replace={true} />
    }

    return (
        <div className="d-lg-flex chat-profile p-0">
            <div className="px-3 py-2 chat-desktop-header">
                <NavLink to="/chats"><FaArrowLeft size={25} color="rgb(139, 139, 1)" /></NavLink>
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
            <div className="d-flex mt-3 mb-2 px-3">
                <textarea placeholder='Type your message here...' value={message} onChange={(e) => setMessage(e.target.value)} className='form-control' name="" id="" rows={1}></textarea>
                <button onClick={sendMessage} className='btn'>
                    <IoMdSend size={25} color="rgb(139, 139, 1)" />
                </button>
            </div>
        </div>
    )
}

export default MobileChatPage