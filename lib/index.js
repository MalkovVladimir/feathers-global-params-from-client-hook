"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = (...whitelist) => {
    return (context) => __awaiter(void 0, void 0, void 0, function* () {
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
    });
};
