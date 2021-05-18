import { ChatEngine } from 'react-chat-engine';
import React, { useEffect} from 'react';
// import LoginForm from './LoginForm';
import ChatFeed from './ChatFeed';
import './chat.css'
import cookie from 'react-cookies'
const ChatApp = () => {
    // if (!localStorage.getItem('username')) return <LoginForm />
    useEffect(() => {
        let username = cookie.load('current_username');
        if(!username){
            window.location.href = "/login";
        }
    }, []
    );

    return (
        <ChatEngine
            height='100vh'
            projectID='f11aa7c6-092f-4478-8982-5bdf7400c712'
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />
    )
}

export default ChatApp;