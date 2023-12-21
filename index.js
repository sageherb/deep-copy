const deepCopy = (object) => {
  if (object === null || typeof object !== "object") {
    return object;
  }

  if (object instanceof Date) {
    return new Date(object.getTime());
  }

  if (object instanceof RegExp) {
    return new RegExp(object);
  }

  if (object instanceof Node) {
    return object.cloneNode(true);
  }

  if (object instanceof File) {
    return new File([object.slice(0, object.size, object.type)], object.name, {
      type: object.type,
      lastModified: object.lastModified
    });
  }

  if (object instanceof Blob) {
    return new Blob([object], { type: object.type });
  }

  if (Array.isArray(object)) {
    const copy = [];

    for (let i = 0; i < object.length; i++) {
      copy[i] = deepCopy(object[i]);
    }

    return copy;
  }

  if (object instanceof Object) {
    const copy = Object.create(Object.getPrototypeOf(object));

    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        copy[key] = deepCopy(object[key]);
      }
    }

    return copy;
  }
};
