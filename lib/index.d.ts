import { Hook } from '@feathersjs/feathers';
declare const _default: (...whitelist: string[]) => Hook;
/**
 * This is "soft" aletrnative of paramsFromClient hook (https://hooks-common.feathersjs.com/hooks.html#paramsfromclient).
 * When you use paramsFromClient in app.hook, it fully removes $client property (which contains all params),
 * so we loose possibility to use params in service's hooks.
 * For example:
 * query: { name: 'Ivan', $client: { schema: 'pre-seed' } }
 * app.hooks: paramsFromClient('disableParanoid') // it whitelist only "disableParanoid" param and remove all others ($client removed)
 * users.hooks: paramsFromClient('schema') // no effect, we will never get schema param, if use paramsFromClient in app.hook
 */
export default _default;
