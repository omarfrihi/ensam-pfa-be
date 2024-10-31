import { postSaveAction } from "./controller/PostSaveAction";

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: "/posts",
    method: "post",
    action: postSaveAction,
  },
];
