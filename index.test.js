/**
 * @jest-environment jsdom
 */

import deepCopy from "./index";

test("deepCopy 함수 확인", () => {
  expect(typeof deepCopy).toEqual("function");
});

test("Primitive 타입 확인", () => {
  expect(deepCopy("string")).toBe("string");
  expect(deepCopy(1)).toBe(1);
  expect(deepCopy(BigInt(1))).toBe(BigInt(1));
  expect(deepCopy(true)).toBe(true);
  expect(deepCopy(null)).toBe(null);
  expect(deepCopy(undefined)).toBe(undefined);

  const symbol = Symbol("symbol");
  expect(deepCopy(symbol)).toBe(symbol);
});

test("Date 타입 복사 확인", () => {
  const date = new Date();
  const copiedDate = deepCopy(date);

  expect(copiedDate).toBeInstanceOf(Date);
  expect(copiedDate).not.toBe(date);
  expect(copiedDate).toStrictEqual(date);
});

test("RegExp 타입 복사 확인", () => {
  const regex = /ab+c/;
  const copiedRegex = deepCopy(regex);

  expect(copiedRegex).toBeInstanceOf(RegExp);
  expect(copiedRegex).not.toBe(regex);
  expect(copiedRegex).toStrictEqual(regex);
});

test("DOM Node 타입 복사 확인", () => {
  const node = document.createElement("div");
  node.textContent = "Node Test";
  const copiedNode = deepCopy(node);

  expect(copiedNode).toBeInstanceOf(Node);
  expect(copiedNode).not.toBe(node);
  expect(copiedNode).toStrictEqual(node);
  expect(copiedNode.textContent).toEqual(node.textContent);
});

test("File 타입 복사 확인", () => {
  const file = new File(["test"], "test.txt", { type: "text/plain" });
  const copiedFile = deepCopy(file);

  expect(copiedFile).toBeInstanceOf(File);
  expect(copiedFile).not.toBe(file);
  expect(copiedFile).toStrictEqual(file);
  expect(copiedFile.name).toEqual(file.name);
  expect(copiedFile.type).toEqual(file.type);
  expect(copiedFile.size).toEqual(file.size);
  expect(copiedFile.lastModified).toEqual(file.lastModified);
});

test("Blob 타입 복사 확인", () => {
  const blob = new Blob(["test"], { type: "text/plain" });
  const copiedBlob = deepCopy(blob);

  expect(copiedBlob).toBeInstanceOf(Blob);
  expect(copiedBlob).not.toBe(blob);
  expect(copiedBlob).toStrictEqual(blob);
  expect(copiedBlob.size).toEqual(blob.size);
  expect(copiedBlob.type).toEqual(blob.type);
});

test("Map 타입 복사 확인", () => {
  const map = new Map();
  map.set("a", 1);
  map.set("b", "2");
  map.set("c", undefined);
  const copiedMap = deepCopy(map);

  expect(copiedMap).toBeInstanceOf(Map);
  expect(copiedMap).not.toBe(map);
  expect(copiedMap).toStrictEqual(map);
  expect(copiedMap.size).toEqual(map.size);
  expect(copiedMap.get("a")).toEqual(map.get("a"));
  expect(copiedMap.get("b")).toEqual(map.get("b"));
  expect(copiedMap.get("c")).toEqual(map.get("c"));
});

test("Set 타입 복사 확인", () => {
  const set = new Set();
  set.add("a");
  set.add(1);
  set.add(undefined);
  const copiedSet = deepCopy(set);

  expect(copiedSet).toBeInstanceOf(Set);
  expect(copiedSet).not.toBe(set);
  expect(copiedSet).toStrictEqual(set);
  expect(copiedSet.size).toEqual(set.size);
  expect(copiedSet.has("a")).toEqual(set.has("a"));
  expect(copiedSet.has(1)).toEqual(set.has(1));
  expect(copiedSet.has(undefined)).toEqual(set.has(undefined));
});

test("Array 타입 복사 확인", () => {
  const array = [1, "2", undefined, { a: 1 }, [1, 2, 3]];
  const copiedArray = deepCopy(array);

  expect(copiedArray).toBeInstanceOf(Array);
  expect(copiedArray).not.toBe(array);
  expect(copiedArray).toStrictEqual(array);
  expect(copiedArray.length).toEqual(array.length);
  expect(copiedArray[0]).toEqual(array[0]);
  expect(copiedArray[1]).toEqual(array[1]);
  expect(copiedArray[2]).toStrictEqual(array[2]);
  expect(copiedArray[3]).toStrictEqual(array[3]);
  expect(copiedArray[4]).toStrictEqual(array[4]);
});

test("Object 타입 복사 확인", () => {
  const object = {
    a: 1,
    b: "2",
    c: undefined,
    d: { a: 1 },
    e: [1, 2, 3],
  };
  const copiedObject = deepCopy(object);

  expect(copiedObject).toBeInstanceOf(Object);
  expect(copiedObject).not.toBe(object);
  expect(copiedObject).toStrictEqual(object);
  expect(copiedObject.keys).toStrictEqual(object.keys);
  expect(copiedObject.a).toEqual(object.a);
  expect(copiedObject.b).toEqual(object.b);
  expect(copiedObject.c).toStrictEqual(object.c);
  expect(copiedObject.d).toStrictEqual(object.d);
  expect(copiedObject.e).toStrictEqual(object.e);
});

test("Function 타입 복사 확인", () => {
  const add = (a, b) => { a + b };
  const copiedAdd = deepCopy(add);

  expect(copiedAdd).toBeInstanceOf(Function);
  expect(copiedAdd).toStrictEqual(add);
  expect(copiedAdd(1, 2)).toEqual(add(1, 2));
  expect(copiedAdd(3, 4)).toEqual(add(3, 4));
});

test("Error 타입 복사 확인", () => {
  const error = new Error("Error Test");
  const copiedError = deepCopy(error);

  expect(copiedError).toBeInstanceOf(Error);
  expect(copiedError).not.toBe(error);
  expect(copiedError).toStrictEqual(error);
  expect(copiedError.message).toEqual(error.message);
});
