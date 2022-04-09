const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');
const User = require('./models/User');

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  await User.create(
    {
      email: 'user@user',
      password: '123',
      displayName: 'John Doe',
      avatar: 'avatars/user1.png',
      token: nanoid(),
    },
    {
      email: 'user2@user',
      password: '123',
      displayName: 'Jane Shepard',
      avatar: 'avatars/user2.jpg',
      token: nanoid(),
    },
  );

  await mongoose.connection.close();
};

run().catch(e => console.error(e));