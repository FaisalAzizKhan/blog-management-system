// src/app/Services/Urls/Urls.ts

export const BackendEndpoints = {
  Auth: {
    Login: "/auth/login",
    Signup: "/auth/sign-up",
  },
  Post: {
    GetAll: "/post/get-all",
    CreateNew: "/post/create-new",
  },
  Comment: {
    CreateNewComment: "/comment/create-new",
    GetAllComments: "/comment/get-all-by-post-id",
  },
  Users: {
    GetAll: "/users/get-all",
    createNew: "/users/create-new",
  },
};
