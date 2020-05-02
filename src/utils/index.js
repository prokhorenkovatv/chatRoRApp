export const pipe = (fn, ...fns) => (...args) =>
  fns.reduce((v, f) => f(v), fn(...args));
export const compose = (...fns) => pipe(...fns.reverse());

export const id = x => x;
export const isEmpty = arr => (arr ? arr.length === 0 : true);

export const get = k => obj => obj[k];

export const map = f => xs => xs.map(f);
export const sort = p => xs => xs.sort(p);
export const filter = p => xs => xs.filter(p);
export const find = p => xs => xs.find(p);

export const arrToHash = arr =>
  arr.reduce(
    (xs, x) => ({
      ...xs,
      [x.id]: x,
    }),
    {},
  );

export const hashToArr = xs => Object.values(xs);

export const parseJWT = (token = '') => {
  try {
    const jwtPayload = token.split('.')[1];
    const decodedPayload = atob(jwtPayload);
    const parsedPayload = JSON.parse(decodedPayload);
    return {
      id: parsedPayload.user_id,
    };
  } catch (e) {
    return {};
  }
};

export const capitalizeWord = word =>
  word ? word.toString()[0].toUpperCase() + word.toString().slice(1) : '';

export const log = x => console.log(x) || x;
