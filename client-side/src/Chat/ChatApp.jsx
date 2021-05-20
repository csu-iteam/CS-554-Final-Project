import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
import React, { useEffect, useState} from 'react';
import ChatFeed from './ChatFeed';
import cookie from 'react-cookies';
import axios from 'axios';

import './chat.css'

const ChatApp = (props) => {
    const current_username = cookie.load('current_username');
    const current_password = cookie.load('current_password');
    const authObject = {'Project-ID': 'b685059a-2cbf-4c88-ad0d-a33450ba6e9b', 'User-Name': current_username, 'User-Secret': current_password}

    const [userToChat, setuserToChat] = useState('');

    useEffect(() => {
        let username = cookie.load('current_username');
        if(!username){
            window.location.href = "/login";
        }
    }, []
    );

    function createDirectChat(auth) {
        const createChatData = {
            title: userToChat,
        };
        const addMemberData = {
            username: userToChat,
        }
        const createConfig = {
            method: 'post',
            url: 'https://api.chatengine.io/chats/',
            headers: {
                ...auth,
            },
            data: createChatData
        };
        axios(createConfig).then(({data}) => {
            return data.id
        }).then((chatRoomNumber) => {
           return {
                method: 'post',
                url: `https://api.chatengine.io/chats/${chatRoomNumber}/people/`,
                headers: {
                    ...auth,
                },
                data: addMemberData
        }}).then((addConfig)=> {
             axios(addConfig);
        }).catch((e) => {
            console.log(e);
        })
        

    }

    useEffect(() => {
        
        async function fetchData() {
            try {
                let email = props.match.params.email;
                let { data } = await axios.get(`http://localhost:3008/chat/${email}`);
                return data;
            } catch (e) {
                console.log(e);
            }
        }
        if(props.match.params.email){
            fetchData().then((data) => setuserToChat(data.username))   
        }
        return 
    }, [props.match.params.email]);
   
    useEffect(() => {
        if (userToChat) {
          createDirectChat(authObject);
        }
        console.log('im called');
      }, [userToChat]);

    return (
        <ChatEngine
            height='100vh'
            projectID='b685059a-2cbf-4c88-ad0d-a33450ba6e9b'
            userName={current_username}
            userSecret={current_password}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps}/> }
            // renderChatList={(chatAppProps) => <ChatListD {...chatAppProps} directActiveChatID={directActiveChatID}/> }
        />
    )
   
}

export default ChatApp;


// import { ChatEngine, getOrCreateChat } from 'react-chat-engine';
// import React, { useEffect, useState} from 'react';
// import ChatFeed from './ChatFeed';
// import cookie from 'react-cookies'
// import axios from 'axios';

// import './chat.css'

// const ChatApp = (props) => {
//     const [userToChat, setUserToChat] = useState('');
//     const [data, setData] = useState(undefined);
//     const [loading, setLoading] = useState(true);
//     const current_username = cookie.load('current_username');
//     const current_password = cookie.load('current_password');
//     let email = props.match.params.email;
//     // const authObject = {projectID: 'f11aa7c6-092f-4478-8982-5bdf7400c712' ,userName: current_username,userSecret: current_password}

    

//     useEffect(() => {
//         let username = cookie.load('current_username');
//         if(!username){
//             window.location.href = "/login";
//         }
//     }, []
//     );

//     function createDirectChat(authObject) {
//         let username = cookie.load('current_username');
//         getOrCreateChat(
//             authObject,
//             { is_direct_chat: true, usernames: [userToChat, username] },
//             () => console.log("create chat")
//         )
//     }

//     useEffect(() => {
        
        
//         async function fetchData() {
//             let { data } = await axios.get(`http://localhost:3008/chat/${email}`);
//                     // console.log('xxx', data.username);
//                     // return(data.username)
//             setData(data);
//             setLoading(false);
            
//         }
//         if(email){
//             fetchData();
//         }
        
//         // fetchData().then((data) => {
//         //     if(email) {
//         //         console.log('this is data', data)
//         //         setUserToChat(data);
//         //         console.log('aaa', userToChat);
//         //         createDirectChat(authObject);
//         //     }
//         // });
        
//         // if(email && userToChat != '') {
//         //     createDirectChat(authObject);
//         // }
    
//         // return 
//     }, []);

    


//     if(loading){
//         return (
//             <div>
//                 <h2>Loading....</h2>
//             </div>
//         )
//     }else{
//         setUserToChat(data.username);
//         const authObject = { projectID: 'f11aa7c6-092f-4478-8982-5bdf7400c712', userName:current_username, userSecret: current_password }
//         createDirectChat(authObject);
//         return (
//             <ChatEngine
//                 height='100vh'
//                 projectID='f11aa7c6-092f-4478-8982-5bdf7400c712'
//                 userName={current_username}
//                 userSecret={current_password}
//                 renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
//             />
//         )
//     }

    

    
// }

// export default ChatApp;