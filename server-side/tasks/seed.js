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


  let user1 = await users.addUser('Jingwei', '1@stevens.edu', '12345678');
  let user2 = await users.addUser('Jiaming', '2@stevens.edu', '12345678');
  let user3 = await users.addUser('Shuoyu', '3@stevens.edu', '12345678');
  let user4 = await users.addUser('Jianzheng', '4@stevens.edu', '12345678');
  let user5 = await users.addUser('Yingjie', '5@stevens.edu', '12345678');
  let user1_Id = user1._id;
  let user2_Id = user2._id;
  let user3_Id = user3._id;
  let user4_Id = user4._id;
  let user5_Id = user5._id;

  // let post1_1 = await posts.addPost(user1._id.toString(),'111','111','111',[],100);

  // let post1 =  await posts.addPost(`133e3c23-e74a-42c7-93d1-6bb57793a8db`, 'computer', "jingwei computer", "discription", [], 1000)
  // const jingwei = await users.addUser('Jingwei', 'jw@stevens.edu', 'ASecretPassword');
  // const jwId = jingwei._id;
  const imgId = await data.images.insertImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAaVBMVEUAAAAkiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8kiP8AAABV2AGBAAAAIXRSTlMAAA0ZC5G5Hv6pFqoVCh1K2WqNVfng+KZU5msMUvEmHE2Aq2qFAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAAZAAAAGQAD5bF3QAAAAd0SU1FB+UFEQ0xHp6SNpkAAABXSURBVBjTnc85AoAgEAPAjeKFeCKIitf/P2knrKXpJqlC9AZAkoJZZHnBXVaSu1bglsDX+GN896YVzNT1wxib9GTsrILJ2XtZt2Dyu7XmiE6e3ukrCcUDk3EEYb9x3BYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDUtMTFUMDQ6MTk6MzUrMDA6MDAtZWOCAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTEyLTI5VDA1OjUwOjIwKzAwOjAwSwhlzAAAACB0RVh0c29mdHdhcmUAaHR0cHM6Ly9pbWFnZW1hZ2ljay5vcme8zx2dAAAAY3RFWHRzdmc6Y29tbWVudAAgR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICDOSJALAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAA0MDh3geHpAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADQwOORwsbQAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTYwOTIyMTAyMCoVzTwAAAARdEVYdFRodW1iOjpTaXplADEzMzFClyzsNgAAAFp0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2RhdGEvd3d3cm9vdC93d3cuZWFzeWljb24ubmV0L2Nkbi1pbWcuZWFzeWljb24uY24vZmlsZXMvMTMwLzEzMDExMDAucG5n8Fo4aQAAAABJRU5ErkJggg==')


  await posts.addPost(
    user1_Id,
    ['Computers'],
    'Mac Book2020',
    'Brand new Mac, bought last year',
    [imgId],
    '$600'
  );

  await posts.addPost(
    user1_Id,
    ['Computers', 'Electronics'],
    'Mac',
    'Old mac, good condition',
    [imgId],
    '$500'
  );

  await posts.addPost(
    user1_Id,
    ['Electronics'],
    'iphone12',
    'Brand new',
    [imgId],
    '$800'
  );

  await posts.addPost(
    user1_Id,
    ['Electronics'],
    'ipad',
    'very good condition',
    [imgId],
    '$200'
  );

  await posts.addPost(
    user2_Id,
    ['Home,Garden,Tools'],
    'queen size bed',
    'broken bed',
    [imgId],
    '$30'
  );

  await posts.addPost(
    user2_Id,
    ['Home,Garden,Tools','Smart Home','Electronics'],
    'Amazon alxa',
    'very good condition',
    [imgId],
    '$20'
  );

  await posts.addPost(
    user3_Id,
    ['Books'],
    'cs554 text book',
    'very helpful for study web program',
    [imgId],
    '$10'
  );

  await posts.addPost(
    user4_Id,
    ['MoneyChange'],
    'want US dollar',
    'I need more US dollar',
    [imgId],
    '$20000000'
  );

  await posts.addPost(
    user5_Id,
    ['Others'],
    'Dream',
    'Here is a dream for sell!',
    [imgId],
    '$9999999999999'
  );




  // await posts.addPost(

  //   jwId,
  //   ['MoneyChange'],
  //   'Need US dollar',
  //   'I need to exchange RMB for USD(I need USD), payment method: Alipay and Zelle!',
  //   [imgId],
  //   'The current exchange rate for 1000USD'
  // );

  // await posts.addPost(
  //   jwId,
  //   ['Home,Garden,Tools','Smart Home'],
  //   'Selling a queen size bed',
  //   'Selling a queen size bed which is 80% new, pick up at Hoboken *******',
  //   [imgId],
  //   '$100'
  // );

  // await posts.addPost(
  //   jwId,
  //   ['Outdoors','Others'],
  //   'Selling a branded bicycle!',
  //   'This a 90% new road bike which I bought 6 months ago with $800, I just rode it for less than 100 miles and never fell',
  //   [imgId],
  //   '$580'
  // );

  // await posts.addPost(
  //   jwId,
  //   ['Electronics','Computers'],
  //   'A high profile desktop PC!',
  //   `CPU: Intel i10 10900K
  //    GPU: Nvidia RTX 3090
  //    Memory: G.SKILL Trident Z Royal 4000 C15 16GB*2
  //    MotherBoard: ROG MAXIMUS XII EXTREME (Z490)
  //    Contact me if you want more details!
  //    `,
  //   [imgId],
  //   '$4800(not decided yet)'
  // );

  // await posts.addPost(
  //   jwId,
  //   ['Books'],
  //   'CS554 book',
  //   `this is a book which can make sure you get A 
  //    `,
  //   [imgId],
  //   '$10000000000'
  // );

  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();

