'use strict';

/**
 * Bakery.js controller
 *
 * @description: A set of functions called "actions" for managing `Bakery`.
 */

module.exports = {

  /**
   * Retrieve bakery records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.bakery.fetchAll(ctx.query);
  },

  /**
   * Retrieve a bakery record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.bakery.fetch(ctx.params);
  },

  /**
   * Create a/an bakery record.
   *
   * @return {Object}
   */
  create: async (ctx) => {
    const data = await strapi.services.bakery.add(ctx.request.body);
    // Send 201 `created`
    ctx.created(data);
    // NEW LINE: call our method emitToAllUsers and pass it body request
    strapi.emitToAllUsers(ctx.request.body);
  },

  /**
   * Update a/an bakery record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.bakery.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an bakery record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.bakery.remove(ctx.params);
  }
};
