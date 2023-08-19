type ChatListItemType = {
    name: string,
    chatShown: string,
    click: (event: React.MouseEvent<HTMLDivElement>) => void,
    notification?: string
}

function ChatListItem({ name, chatShown, click, notification }: ChatListItemType) {
    return (
        <div onClick={click} className='chat-item px-3 py-2'>
            <div className='chat-left'>
                <img className='chat-img' src="/GRAD_PIC_MOBILE.jpg" alt="" />
                <div className="no-photo-replacement"><span>{name[0].toUpperCase()}</span></div>
                <div className="chat-content">
                    <span className="chat-name">{name}</span>
                    <div className='chat-shown'>{chatShown}</div>
                </div>
            </div>

            <span className="notification">2</span>
        </div>
    )
}

export default ChatListItem