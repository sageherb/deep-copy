const deepCopy = (target) => {
  if (target === null || typeof target !== "object") {
    return target;
  }

  if (target instanceof Date) {
    return new Date(target.getTime());
  }

  if (target instanceof RegExp) {
    return new RegExp(target);
  }

  if (target instanceof Node) {
    return target.cloneNode(true);
  }

  if (target instanceof File) {
    return new File([target.slice(0, target.size, target.type)], target.name, {
      type: target.type,
      lastModified: target.lastModified
    });
  }

  if (target instanceof Blob) {
    return new Blob([target], { type: target.type });
  }

  if (target instanceof Map) {
    const copy = new Map();

    target.forEach((value, key) => {
      copy.set(key, deepCopy(value));
    });

    return copy;
  }

  if (target instanceof Set) {
    const copy = new Set();

    target.forEach((value) => {
      copy.add(deepCopy(value));
    });

    return copy;
  }

  if (Array.isArray(target)) {
    return target.map((item) => deepCopy(item));
  }

  if (target instanceof Object) {
    const copy = Object.create(Object.getPrototypeOf(target));

    for (const key in target) {
      if (target.hasOwnProperty(key)) {
        copy[key] = deepCopy(target[key]);
      }
    }

    return copy;
  }
};
