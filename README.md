# alajs ![npm](https://img.shields.io/npm/dw/alajs.svg)

# Table of Contents

- [Documentation](#docs)
- [Installation](#install)
  - [NPM](#npm)
  - [Add a dependency](#dependency)
  - [Browser Distribution](#browser)
- [Import](#import)
  - [ES Modules](#es_mods)
  - [CommonJS](#common)
- [Basic Usage](#basic)
  - [Signature Provider](#signature)
  - [JSON-RPC](#json)
  - [API](#api)
  - [Sending a transaction](#sending)
  - [Error handling](#error)
- [Contributing](#contributing)
- [License](#license)
- [Important](#important)

## Documentation
<a name='docs' />

- [Documentation](https://alaio.github.io/alajs)
- [Transaction Examples](https://github.com/ALADINIO/alajs/blob/master/docs/2.-Transaction-Examples.md)
- [Browsers](https://github.com/ALADINIO/alajs/blob/master/docs/3.-Browsers.md)
- [Reading Blockchain](https://github.com/ALADINIO/alajs/blob/master/docs/4.-Reading%20blockchain-Examples.md)

## Installation
<a name='install' />

### NPM
<a name='npm' />

The official distribution package can be found at [npm](https://www.npmjs.com/package/alajs).

### Add dependency to your project
<a name='dependency' />

`yarn add alajs`

### Browser Distribution
<a name='browser' />

Clone this repository locally then run `yarn build-web`.  The browser distribution will be located in `dist-web` and can be directly copied into your project repository. The `dist-web` folder contains minified bundles ready for production, along with source mapped versions of the library for debugging.  For full browser usage examples, [see the documentation](https://alaio.github.io/alajs/guides/1.-Browsers.html).

## Import
<a name='import' />

### ES Modules
<a name='es_mods' />

Importing using ESM syntax is supported using TypeScript, [webpack](https://webpack.js.org/api/module-methods), or  [Node.js with `--experimental-modules` flag](https://nodejs.org/api/esm.html)
```js
import { Api, JsonRpc, RpcError } from 'alajs';
import { JsSignatureProvider } from 'alajs/dist/alajs-jssig';           // development only
```

### CommonJS
<a name='common' />

Importing using commonJS syntax is supported by Node.js out of the box.
```js
const { Api, JsonRpc, RpcError } = require('alajs');
const { JsSignatureProvider } = require('alajs/dist/alajs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
const { TextEncoder, TextDecoder } = require('text-encoding');          // React Native, IE11, and Edge Browsers only
```

## Basic Usage
<a name='basic' />

### Signature Provider
<a name='signature' />

The Signature Provider holds private keys and is responsible for signing transactions.

***Using the JsSignatureProvider in the browser is not secure and should only be used for development purposes. Use a secure vault outside of the context of the webpage to ensure security when signing transactions in production***

```js
const defaultPrivateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"; // bob
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
```

### JSON-RPC
<a name='json' />

Open a connection to JSON-RPC, include `fetch` when on Node.js.
```js
const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch });
```

### API
<a name='api' />

Include textDecoder and textEncoder when using in Node, React Native, IE11 or Edge Browsers.
```js
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
```

### Sending a transaction
<a  name='sending' />

`transact()` is used to sign and push transactions onto the blockchain with an optional configuration object parameter.  This parameter can override the default value of `broadcast: true`, and can be used to fill TAPOS fields given `blocksBehind` and `expireSeconds`.  Given no configuration options, transactions are expected to be unpacked with TAPOS fields (`expiration`, `ref_block_num`, `ref_block_prefix`) and will automatically be broadcast onto the chain.

```js
(async () => {
  const result = await api.transact({
    actions: [{
      account: 'alaio.token',
      name: 'transfer',
      authorization: [{
        actor: 'useraaaaaaaa',
        permission: 'active',
      }],
      data: {
        from: 'useraaaaaaaa',
        to: 'useraaaaaaab',
        quantity: '0.0001 SYS',
        memo: '',
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
  console.dir(result);
})();
```

### Error handling
<a name='error' />

use `RpcError` for handling RPC Errors
```js
...
try {
  const result = await api.transact({
  ...
} catch (e) {
  console.log('\nCaught exception: ' + e);
  if (e instanceof RpcError)
    console.log(JSON.stringify(e.json, null, 2));
}
...
```

## Contributing
<a name='contributing' />

[Contributing Guide](./CONTRIBUTING.md)

[Code of Conduct](./CONTRIBUTING.md#conduct)

## License
<a name='license' />

[MIT](./LICENSE)

## Important
<a name='important' />

See LICENSE for copyright and license terms.  Block.one makes its contribution on a voluntary basis as a member of the ALAIO community and is not responsible for ensuring the overall performance of the software or any related applications.  We make no representation, warranty, guarantee or undertaking in respect of the software or any related documentation, whether expressed or implied, including but not limited to the warranties or merchantability, fitness for a particular purpose and noninfringement. In no event shall we be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or documentation or the use or other dealings in the software or documentation.  Any test results or performance figures are indicative and will not reflect performance under all conditions.  Any reference to any third party or third-party product, service or other resource is not an endorsement or recommendation by Block.one.  We are not responsible, and disclaim any and all responsibility and liability, for your use of or reliance on any of these resources. Third-party resources may be updated, changed or terminated at any time, so the information here may be out of date or inaccurate.
