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
  console.log(`Setting Password on User: ${user._id}`);
  Accounts.setPassword(user._id, 'newpassword');
  console.log('SUCCESS');
});
