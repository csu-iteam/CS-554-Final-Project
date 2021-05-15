const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const posts = data.posts;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  let user1 = await users.addUser('111', '11111@stevens.edu', '12345');
  let user2 = await users.addUser('222', '22222@stevens.edu', '12345');
  let user3 = await users.addUser('333', '33333@stevens.edu', '12345');
  // let post1_1 = await posts.addPost(user1._id.toString(),'111','111','111',[],100);

  // let post1 =  await posts.addPost(`133e3c23-e74a-42c7-93d1-6bb57793a8db`, 'computer', "jingwei computer", "discription", [], 1000)
 
 

  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();
