import ChatListItem from '../components/ChatListItem';
import ScrollToBottom from 'react-scroll-to-bottom';

function MobilePage() {

    const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

    return (
        <div className="main-window-mobile row">

            {/* <nav className="chat-navbar bg-light p-3 col-12">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <input type="text" name="" id="" className='form-control' />
                </div>
            </nav>

            <main className="mobile-content col-12">
                <div className='list'>
                    {
                        test.map(chat => (<Chat />))
                    }
                </div>
            </main> */}

            <div className='desktop-chat-list col-lg-3 p-0'>
                <nav className="chat-navbar-desktop bg-light px-4 py-3">
                    <div className="">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <input type="text" name="" id="" className='form-control' />
                    </div>
                </nav>

                <main className="desktop-content">
                    <div className='list'>
                        {
                            test.map(chat => (<ChatListItem />))
                        }
                    </div>
                </main>
            </div>

            <div className="chat-profile col-9 p-0">
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
                <div className="d-flex mt-3 mb-2">
                    <textarea className='form-control' name="" id="" cols="30" rows="1"></textarea>
                    <button className='btn btn-success'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default MobilePage