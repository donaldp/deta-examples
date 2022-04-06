const { Deta } = require('../Config/Deta');

module.exports.Query = class Query {
  constructor(db) {
    this.client = Deta.Base(db);
    this._query = {};
  }

  static make(db) {
    return new this(db)
  }

  /**
   * @param {string} key
   * @param {string} operator
   * @param {any} value
   * @returns {Query}
   */
  where() {
    let [ key, operator, value ] = arguments;

    if (!value) {
      value = operator;
      operator = '';
    }

    if (operator) {
      switch (operator.toLowerCase()) {
        case '>':
          operator = '?gt'
          break;
        
        case '<':
          operator = '?lt'
          break;
        
        case '<=':
          operator = '?lte'
          break;
          
        case '>=':
          operator = '?gte'
          break;
        
        case 'like':
          operator = '?contains'
          break;
        
        case 'not like':
          operator = '?contains'
          break;
      
        default:
          operator = ''
          break;
      }
    }

    const query = {
      [`${key}${operator}`]: value
    };

    if (Array.isArray(this._query)) {
      this._query.push(query);
    } else {
      this._query = Object.assign(this._query, query);
    }

    return this;
  }

  /**
   * @param {string} key
   * @param {string} operator
   * @param {any} value
   * @returns {Query}
   */
  orWhere() {
    if (!Array.isArray(this._query)) {
      this._query = [this._query];
    }

    this.where(...arguments);

    return this;
  }

  /**
   * @param {string} key
   * @param {any} value
   * @returns {Query}
   */
  whereNot(key, value) {
    const query = {
      [`${key}?ne`]: value
    };

    if (Array.isArray(this._query)) {
      this._query.push(query);
    } else {
      this._query = Object.assign(this._query, query);
    }

    return this;
  }

  /**
   * @param {string} key
   * @param {any} value
   * @returns {Query}
   */
  orWhereNot(key, range) {
    if (!Array.isArray(this._query)) {
      this._query = [this._query];
    }

    this.whereNot(key, range);

    return this;
  }

  /**
   * @param {string} key
   * @param {array} range
   * @returns {Query}
   */
  whereBetween(key, range) {
    const query = {
      [`${key}?r`]: range
    };

    if (Array.isArray(this._query)) {
      this._query.push(query);
    } else {
      this._query = Object.assign(this._query, query);
    }

    return this;
  }

  /**
   * @param {string} key
   * @param {array} range
   * @returns {Query}
   */
  orWhereBetween(key, range) {
    if (!Array.isArray(this._query)) {
      this._query = [this._query];
    }
    
    this.whereBetween(key, range);
    
    return this;
  }

  /**
   * Get results.
   *
   * @returns {Promise<Array>}
   */
  async get() {
    const { items } = await this.client.fetch(this._query);

    return items;
  }

  /**
   * Count results.
   *
   * @returns {Promise<Number>} count
   */
  async count() {
    const { count } = await this.client.fetch(this._query);

    return count;
  }
}