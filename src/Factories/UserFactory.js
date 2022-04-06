const { Faker } = require('@faker-js/faker');
const { Factory } = require('./Factory');

module.exports.UserFactory = class UserFactory extends Factory {
  /**
   * Schema mapping.
   *
   * @param {Faker} faker
   * @param {Number} index
   * @returns {object}
   */
  schema(faker, index) {
    return {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'random bcrypt hash',
    };
  }
}
