const createBlogIntoDB = async (payload: any) => {
   console.log(payload);
   return 'blog created';
};

export const blogServices = {
   createBlogIntoDB,
};
