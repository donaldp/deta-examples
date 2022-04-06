const pluralize = require('pluralize');
const { faker, Faker } = require('@faker-js/faker');
const { Deta } = require('../Config/Deta');

module.exports.Factory = class Factory {
  /**
   * Instantiate Factory.
   */
  constructor() {
    this._count = 1;
  }

  /**
   * Instantiate Factory.
   *
   * @returns {Factory}
   */
  static make() {
    return new this;
  }

  /**
   * Get factory collection name.
   *
   * @returns {String}
   */
  get collection() {
    /** @param {String} name */
    const name = this.constructor.name;

    return pluralize(name.substring(0, name.indexOf('Factory')))
      .replace(/([A-Z])/g, '_$1')
      .trim()
      .replace(/^\_+/, '')
      .toLowerCase();
  }

  /**
   * Get base instance.
   */
  get #base() {
    return Deta.Base(this.collection);
  }

  /**
   * Schema mapping.
   *
   * @param {Faker} faker
   * @param {Number} index
   * @returns {object}
   */
  schema(faker, index) {
    return {

    }
  }

  /**
   * Set factory count.
   *
   * @param {Number} total
   * @returns {this}
   */
  count(total) {
    this._count = total;

    return this;
  }

  /**
   * Add documents to collection.
   *
   * @returns {Promise} documents
   */
  async create() {
    const documents = [];

    for (let index = 0; index < this._count; index++) {
      const results = await this.#persist(this.schema(faker, index++));

      documents.push(results);
    }

    return documents;
  }

  /**
   * Add collection to document.
   *
   * @param {object} collection
   * @returns {Promise}
   */
  async #persist(collection) {
    return await this.#base.put(collection);
  }
}
