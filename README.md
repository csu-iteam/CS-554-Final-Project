# Secondary market(temporary name)

## Introduction
As we found in the group chat of Stevens students, the demand of second-hand transactions is quite high, especially for international students. When they come to the campus at the first time, many kinds of stuff like kitchenware, furniture and bicycles are needed. However, after their graduation, they might have to discard most of those stuff.  


Therefore, students often send selling information through group chat, which may bother the students who do not want such stuff. Although we can kind of fix this by setting up a specialized group chat, some problems still exist. For the sellers, they can post their stuff every day, otherwise their information will be flushed away, which is inconvenient and a waste of energy. For the buyers, they must scroll a lot to find out if there is anyone selling anything they need.  


To fix the problems we mentioned above, we decide to develop a web platform for students who need second-hand transaction or currency exchange. After logged in with personal account, students can publish anything they would like to sell on this webpage. With relative information and images, the buyer can just search for their needs instead of scrolling redundant and duplicate information. The buyer can contact the seller through a private chatroom, so they can arrange a trading time and place or maybe bargain. The buyer can follow the stuff he or she interested in, see if the price is decreased, or the stuff has been bought, or even evaluate whether the stuff will be sold out soon or not by tracking the number of followers, which means this data is transparent to all users.

## Getting started
### installation
This project is separate into client-side and server-side, you need get into both of the folders and do installation:  
`npm install`
### start redis
This web application need redis, make sure you have set up redis on your device, if not:https://redis.io/download
After redis installed, go into your command line and cd into your redis path, do: `redis-server`; then start another cmd, do: `redis-cli`. 
### run
Like you did for installation, you need run both client-side and server-side with:
`npm start`,
The client-side will be on http://localhost:3000, the server-side will be on http://localhost:3008.
