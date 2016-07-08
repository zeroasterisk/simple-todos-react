import { Random } from 'meteor/random';
import '../imports/api/tasks.js';

// -------------------------------------------
// BUG: Accounts.setPassword() fails when aws-sdk is imported
// -------------------------------------------
// If you comment this out all of these imports, it works fine
// import AWS from 'aws-sdk';

// I have tried these methods of importing as well
// import { S3 } from 'aws-sdk';
// const AWS = require('aws-sdk');

// Super basic inline testing
Meteor.startup(() => {
  // Super basic inline testing
  console.log('BUG: Accounts.setPassword() fails when aws-sdk is imported');
  if (Meteor.users.find().count() === 0) {
    console.log('No Users -- creating mock user');
    Accounts.createUser({username: 'mock', email: 'mock@mock.com', password: 'mock'});
  }
  const user = Meteor.users.findOne();
  const oldHash = user.services.password.bcrypt;
  const pass = Random.id();
  console.log(`Setting Password on User: ${user._id} --> ${pass}`);
  Accounts.setPassword(user._id, pass);
  const after = Meteor.users.findOne(user._id);
  const newHash = after.services.password.bcrypt;
  if (oldHash === newHash) {
    console.error('  ERROR');
    console.error(`  password hash not changed ${oldHash}`);
  } else {
    console.log('  SUCCESS');
    console.log(`  changed hash from ${oldHash}`);
    console.log(`                 to ${newHash}`);
  }
});
