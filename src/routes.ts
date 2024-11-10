import { getMetadata } from "./controller/getMetadata";
import { getQueryResult } from "./controller/getQueryResult";

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: "/metadata",
    method: "get",
    action: getMetadata,
  },
  {
    path: "/query-result",
    method: "get",
    action: getQueryResult,
  },
];
