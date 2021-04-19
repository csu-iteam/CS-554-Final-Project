const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const posts = data.posts;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

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

  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();
