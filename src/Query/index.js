const { Query } = require('./Query');

const main = async () => {
  console.log('Get Users.');

  const users = await Query.make('users')
    .where('first_name', 'Ford')
    .orWhere('first_name', 'Peggie')
    .get();

  console.log(users);
  console.log('');

  console.log('Count Users.');

  const total = await Query.make('users')
    .where('email', 'like', '@yahoo.com') // you can also do something like: where('email', 'not like', '@yahoo.com') => whereContains would look cleaner though...
    .count();

  console.log(total);
}

main();
