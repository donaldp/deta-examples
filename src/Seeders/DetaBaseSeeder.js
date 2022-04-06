const { ContactFactory } = require("../Factories/ContactFactory");
const { UserFactory } = require("../Factories/UserFactory");

module.exports.Seeder = class Seeder {
  /**
   * Run seeder.
   */
  static async run() {
    await UserFactory.make()
      .count(10)
      .create();

    await ContactFactory.make()
      .count(10)
      .create()
  }
}
