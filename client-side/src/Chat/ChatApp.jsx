import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import React, { useEffect, useState} from 'react';
// import LoginForm from './LoginForm';
import ChatFeed from './ChatFeed';
import cookie from 'react-cookies'

import './chat.css'

const ChatApp = (props) => {
    const current_password = cookie.load('current_username');
    const current_password = cookie.load('current_password');
    const [userToChat, setuserToChat] = useState('');
    useEffect(() => {
        let username = cookie.load('current_username');
        if(!username){
            window.location.href = "/login";
        }
    }, []
    );

    function createDirectChat(authObject) {
        getOrCreateChat(
            authObject,
            { is_direct_chat: true, usernames: [userToChat, username] },
            () => setUserToChat('')
        )
    }

    useEffect(() => {
        async function fetchData() {
            try {
                let email = props.match.params.email;
                let { data } = await axios.get(`http://localhost:3008/chat/${email}`);
                setuserToChat(data.username);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
        createDirectChat(authObject);
        return 
    }, [props.match.params.email]);

    return (
        <ChatEngine
            height='100vh'
            projectID='f11aa7c6-092f-4478-8982-5bdf7400c712'
            userName={cookie.load('current_username')}
            userSecret={cookie.load('current_password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        />
    )
}

export default ChatApp;