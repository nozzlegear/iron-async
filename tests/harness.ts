import * as IronAsync from "../";
import { Expect, AsyncTest, Timeout, TestFixture } from "alsatian";

export interface EncryptedObject {
    hello: "world";
    array: [1,2,3,4,5];
    flag: true;
    object: {
        foo: "bar"
    }
}

@TestFixture("iron-async")
export class Harness {
    get password() {
        return "b4818b94-32ed-4650-b2f0-f0a3dc78b5c097eafb9f-1d87-4d95-a769-2c0539e543ed";
    }

    get object() {
        const obj: EncryptedObject = {
            hello: "world",
            array: [1,2,3,4,5],
            flag: true,
            object: {
                foo: "bar"
            }
        };

        return obj;
    }

    @AsyncTest("sealAsync")
    @Timeout(5000)
    public async sealAsync() {
        const token = await IronAsync.seal(this.object, this.password);

        Expect(token).toBeDefined();
        Expect(typeof(token)).toBe("string");
    }

    @AsyncTest("unsealAsync")
    @Timeout(5000)
    public async unsealAsync() {
        const token = await IronAsync.seal(this.object, this.password);
        const obj = await IronAsync.unseal<EncryptedObject>(token, this.password);

        Expect(obj).toBeDefined();
        Expect(obj.hello).toEqual("world");
        Expect(obj.flag).toEqual(true);
        Expect(obj.object).toBeDefined();
        Expect(obj.object.foo).toEqual("bar");
        Expect(Array.isArray(obj.array)).toEqual(true);
        Expect(obj.array[obj.array.length - 1]).toEqual(5);
    }
}