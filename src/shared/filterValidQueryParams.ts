export const filterValidQueryParams = <
   T extends Record<string, unknown>,
   K extends keyof T
>(
   obj: T,
   validParams: K[]
) => {
   const filteredParams: Partial<T> = {};

   for (const key of validParams) {
      if (Object.hasOwn(obj, key) && obj[key]) {
         filteredParams[key] = obj[key];
      }
   }

   return filteredParams;
};
