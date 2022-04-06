const { Faker } = require('@faker-js/faker');
const { Factory } = require('./Factory');

module.exports.ContactFactory = class ContactFactory extends Factory {
  /**
   * Schema mapping.
   *
   * @param {Faker} faker
   * @returns {object}
   */
  schema(faker) {
    return {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
      phone_number: faker.phone.phoneNumber(),
      address: {
        line1: faker.address.streetAddress(true),
        line2: `${faker.address.cityName()}, ${faker.address.country()}`,
      }
    };
  }
}
