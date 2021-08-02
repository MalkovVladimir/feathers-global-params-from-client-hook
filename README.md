This is "soft" aletrnative of [paramsFromClient](https://hooks-common.feathersjs.com/hooks.html#paramsfromclient) hook.
When you use `paramsFromClient` in `app.hook.ts`, it fully removes `$client` property (which contains all params), so we loose possibility to use params in service's hooks.
`globalParamsFromClient` solve this problem.

## paramsFromClient problem:
### Client code:
```js
await this.$store.dispatch('your-service/find',
  paramsForServer({
    query: { type: 'custom' },
    schema: 'alt-1'
  })
)
```
On server params will look like this:
```js
{
  query: { type: 'custom' },
  $client: { schema: 'alt-1' }
}
```

### app.hooks.ts:
```js
export default {
  before: {
    ...
    find: [
      paramsFromClient('disableParanoid')
    ],
    ...
  }
}
```
It whitelist only "disableParanoid" param and remove all others (`$client` removed).


### your-service.hooks.ts:
```js
export default {
  before: {
    ...
    find: [
      paramsFromClient('schema')
    ],
    ...
  }
}
```
No effect, we will never get schema param, if use paramsFromClient in app.hook.ts.

## globalParamsFromClient usage
### app.hooks.ts:
```js
export default {
  before: {
    ...
    find: [
      globalParamsFromClient('disableParanoid')
    ],
    ...
  }
}
```
It whitelist "disableParanoid" param, remove it from $client and pass all others to your `paramsFromClient` handlers.

### your-service.hooks.ts:
```js
export default {
  before: {
    ...
    find: [
      paramsFromClient('schema')
    ],
    ...
  }
}
```
So here you will get schema param!