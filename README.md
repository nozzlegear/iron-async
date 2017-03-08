# iron-async
An async wrapper for the Iron encryption package.

## Installation

With [Yarn](https://github.com/yarnpkg/yarn):

```shell
yarn install iron-async
```

Or from [NPM](https://npmjs.com/package/iron-async):

```shell
npm install iron-async --save
```

## Importing

Import iron-async via ES6 default import:

```js
import * as IronAsync from "iron-async";
```

Or via Node's require:

```js
const IronAsync = require("iron-async");
```

## Examples

**seal(value: any, password: string, defaults?)**

```js
import { seal } from "iron-async";

const sealedToken: string = await seal({
    hello: "world"
}, password);
```

**unseal(token: string, password: string, defaults?)**

```js
import { unseal } from "iron-async";

const unsealedObject = await unseal(sealedToken, password);
```