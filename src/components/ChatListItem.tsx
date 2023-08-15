import React from 'react'

type ChatListItemType = {
    name: string,
    chatShown: string,
    notification?: string
}

function ChatListItem({ name, chatShown, notification }: ChatListItemType) {
    return (
        <div className='chat-item px-3 py-2'>
            <div className='chat-left'>
                <img className='chat-img' src="/GRAD_PIC_MOBILE.jpg" alt="" />
                <div className="no-photo-replacement"><span>A</span></div>
                <div className="chat-content">
                    <span>Adrian Nads L. Marcelo</span>
                    <div className='chat-shown'>Tawag ka ni mama</div>
                </div>
            </div>

            <span className="notification">2</span>
        </div>
    )
}

export default ChatListItem