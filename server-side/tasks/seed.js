const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const posts = data.posts;

// const post = {  //demo of post, do not de-comment this
//   _id: '133e3c23-e74a-42c7-93d1-6bb57793a8db',
//   userWhoPost: {
//     id: '133e3c23-e74a-42c7-93d1-6bb57793a8daw',
//     name: 'Patrick Hill',
//     email: 'ph@stevens.com'
//   },
//   title: 'queen size bed',
//   tag: ['furniture'],
//   description: 'Selling a queen size bed which is 80% new, pick up at Hoboken *******',
//   img: [''],
//   price: '100$',
//   time: '2021-05-15 3:6:31',
//   bought: true
// }

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  let user1 = await users.addUser('111', '11111@stevens.edu', '12345');
  let user2 = await users.addUser('222', '22222@stevens.edu', '12345');
  let user3 = await users.addUser('333', '33333@stevens.edu', '12345');
  // let post1_1 = await posts.addPost(user1._id.toString(),'111','111','111',[],100);

  // let post1 =  await posts.addPost(`133e3c23-e74a-42c7-93d1-6bb57793a8db`, 'computer', "jingwei computer", "discription", [], 1000)
  const jingwei = await users.addUser('Jingwei', 'Li');
  const id = jingwei._id;
  await posts.addPost(
    'Need US dollar',
    'I need to exchange RMB for USD(I need USD), payment method: Alipay and Zelle!',
    'The current exchange rate for 1000USD',
    ['currency exchange'],
    id);

  await posts.addPost(
    'Selling a queen size bed',
    'Selling a queen size bed which is 80% new, pick up at Hoboken *******',
    '$100',
    ['furniture'],
    id
  );

  await posts.addPost(
    'Selling a branded bicycle!',
    'This a 90% new road bike which I bought 6 months ago with $800, I just rode it for less than 100 miles and never fell',
    '$580',
    ['bicycle'],
    id
  );

  await posts.addPost(
    'A high profile desktop PC!',
    `CPU: Intel i10 10900K
     GPU: Nvidia RTX 3090
     Memory: G.SKILL Trident Z Royal 4000 C15 16GB*2
     MotherBoard: ROG MAXIMUS XII EXTREME (Z490)
     Contact me if you want more details!
     `,
    '$4800(not decided yet)',
    ['digital product'],
    id
  );

  await posts.addPost(
    'Test double type',
    `test
     `,
    'test',
    ['digital product', 'furniture'],
    id
  );


  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();

