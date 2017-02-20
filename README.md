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

**sealAsync(value: any, password: string, defaults?)**

```js
import { sealAsync } from "iron-async";

const sealedToken: string = await sealAsync({
    hello: "world"
}, password);
```

**unsealAsync(token: string, password: string, defaults?)**

```js
import { unsealAsync } from "iron-async";

const unsealedObject = await sealAsync(sealedToken, password);
```