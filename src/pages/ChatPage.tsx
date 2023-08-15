import ChatListItem from '../components/ChatListItem';
import ScrollToBottom from 'react-scroll-to-bottom';
import '../css/index.css';

function ChatPage() {

    const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

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
                            test.map(chat => (<ChatListItem name={'Adrian Nads'} chatShown={'Tawag ka ni Mama'} />))
                        }
                    </div>
                </main>


                {/* Desktop */}
                <div className='d-none d-lg-block desktop-chat-list col-lg-4 p-0'>
                    <nav className="chat-navbar-desktop bg-light px-4 py-3">
                        <div className="">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="h3" href="#">Chat</p>
                                <button className="btn btn-sm-danger">Logout</button>
                            </div>
                            <input type="text" name="" id="" className='form-control' />
                        </div>
                    </nav>

                    <main className="desktop-content">
                        <div className='list'>
                            {
                                test.map(chat => (<ChatListItem name={'Adrian Nads'} chatShown={'Tawag ka ni Mama'} />))
                            }
                        </div>
                    </main>
                </div>

                <div className="d-none d-lg-flex chat-profile col-8 p-0">
                    <div className="px-3 py-2 chat-desktop-header">
                        <p className='h5'>Hello</p>
                    </div>
                    <ScrollToBottom className="desktop-chat-scroll">
                        <div className='chat-body'>
                            <div className="chat-bubble">
                                <p>Hello, Kumusta kana?</p>
                            </div>

                        </div>
                    </ScrollToBottom>
                    <div className="d-flex mt-3 mb-2 px-3">
                        <textarea className='form-control' name="" id="" cols="30" rows="1"></textarea>
                        <button className='btn btn-success'>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage