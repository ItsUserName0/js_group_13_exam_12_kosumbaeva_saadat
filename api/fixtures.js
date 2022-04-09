const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');
const User = require('./models/User');
const Image = require('./models/Image');

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user1, user2] = await User.create(
    {
      email: 'user1@user',
      password: '123',
      displayName: 'John Doe',
      avatar: 'fixtures/user1.png',
      token: nanoid(),
    },
    {
      email: 'user2@user',
      password: '123',
      displayName: 'Jane Shepard',
      avatar: 'fixtures/user2.jpg',
      token: nanoid(),
    },
  );

  await Image.create(
    {
      user: user1,
      title: 'Picture1',
      image: 'fixtures/pic1.jpg',
    },
    {
      user: user1,
      title: 'Picture2',
      image: 'fixtures/pic2.jpeg',
    },
    {
      user: user1,
      title: 'Picture3',
      image: 'fixtures/pic3.jpg',
    },
    {
      user: user2,
      title: 'Picture4',
      image: 'fixtures/pic4.jpeg',
    },
    {
      user: user2,
      title: 'Picture5',
      image: 'fixtures/pic5.jpg',
    },
  );

  await mongoose.connection.close();
};

run().catch(e => console.error(e));