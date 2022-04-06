const { Store } = require('express-session');

module.exports = (options) => {
  return class DetaStore extends Store {
    constructor(options) {
      super(options);

      if (!options.client) {
        throw new Error('Missing deta client.');
      }

      const storeName = 'sess_' + (options.storeName || 'default');

      this.client = options.client.Base(storeName);
    }

    /**
     * Fetch session from Deta.
     *
     * @param {string} sid document key.
     * @param {Function} cb 
     */
    get(sid, cb) {
      this.client
        .get(sid)
        .then((sess) => cb(null, sess.data))
        .catch((error) => cb(error));
    }

    /**
     * Persist session in Deta.
     *
     * @param {string} sid document key.
     * @param {object} data 
     * @param {Function} cb 
     */
    set(sid, data, cb) {
      /** No need to serialize the data, since Deta can store JSON objects. */
      this.client
        .put({ data }, sid, { expireAt: new Date(data.cookie._expires) })
        .then(() => cb(null, null))
        .catch((error) => cb(error));
    }

    /**
     * Delete session from Deta.
     *
     * @param {string} sid document key.
     * @param {Function} cb 
     */
    destroy(sid, cb) {
      this.client
        .delete(sid)
        .catch((error) => cb(error));
    }
  }
};
