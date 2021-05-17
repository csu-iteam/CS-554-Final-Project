const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const posts = data.posts;

/** demo of post, do not de-comment this 

const post = {  
  _id: '133e3c23-e74a-42c7-93d1-6bb57793a8db',
  userWhoPost: {
    id: '133e3c23-e74a-42c7-93d1-6bb57793a8daw',
    name: 'Patrick Hill',
    email: 'ph@stevens.com'
  },
  title: 'queen size bed',
  tag: ['furniture'],
  description: 'Selling a queen size bed which is 80% new, pick up at Hoboken *******',
  img: [''],
  price: '100$',
  time: '2021-05-15 3:6:31',
  bought: true
}

*/

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  let user1 = await users.addUser('111', '11111@stevens.edu', '12345678');
  let user2 = await users.addUser('222', '22222@stevens.edu', '12345678');
  let user3 = await users.addUser('333', '33333@stevens.edu', '12345678');
  // let post1_1 = await posts.addPost(user1._id.toString(),'111','111','111',[],100);

  // let post1 =  await posts.addPost(`133e3c23-e74a-42c7-93d1-6bb57793a8db`, 'computer', "jingwei computer", "discription", [], 1000)
  const jingwei = await users.addUser('Jingwei', 'jw@stevens.edu', 'ASecretPassword');
  const jwId = jingwei._id;
  await posts.addPost(
    jwId,
    ['currency exchange'],
    'Need US dollar',
    'I need to exchange RMB for USD(I need USD), payment method: Alipay and Zelle!',
    ['no img'],
    'The current exchange rate for 1000USD',
  );

  await posts.addPost(
    jwId,
    ['furniture'],
    'Selling a queen size bed',
    'Selling a queen size bed which is 80% new, pick up at Hoboken *******',
    ['no img'],
    '$100'
  );

  await posts.addPost(
    jwId,
    ['bicycle'],
    'Selling a branded bicycle!',
    'This a 90% new road bike which I bought 6 months ago with $800, I just rode it for less than 100 miles and never fell',
    ['no img'],
    '$580'
  );

  await posts.addPost(
    jwId,
    ['digital product'],
    'A high profile desktop PC!',
    `CPU: Intel i10 10900K
     GPU: Nvidia RTX 3090
     Memory: G.SKILL Trident Z Royal 4000 C15 16GB*2
     MotherBoard: ROG MAXIMUS XII EXTREME (Z490)
     Contact me if you want more details!
     `,
    ['no img'],
    '$4800(not decided yet)'
  );

  await posts.addPost(
    jwId,
    ['digital product', 'furniture'],
    'Test double type',
    `test
     `,
    ['no img'],
    'test'
  );


  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();

