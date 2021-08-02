// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

/**
 * This is "soft" aletrnative of paramsFromClient hook (https://hooks-common.feathersjs.com/hooks.html#paramsfromclient).
 * When you use paramsFromClient in app.hook, it fully removes $client property (which contains all params),
 * so we loose possibility to use params in service's hooks.
 * For example:
 * query: { name: 'Ivan', $client: { schema: 'pre-seed' } }
 * app.hooks: paramsFromClient('disableParanoid') // it whitelist only "disableParanoid" param and remove all others ($client removed)
 * users.hooks: paramsFromClient('schema') // no effect, we will never get schema param, if use paramsFromClient in app.hook
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (...whitelist: string[]): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const { params } = context;

    if (params && params.query && params.query.$client && typeof params.query.$client === 'object') {
      const client = params.query.$client;

      whitelist.forEach(key => {
        if (key in client) {
          params[key] = client[key];
          delete client[key];
        }
      });

      // Remove $client if it has no props only
      if (!Object.keys(client).length) {
        delete params.query.$client;
      }
    }

    return context;
  };
};
