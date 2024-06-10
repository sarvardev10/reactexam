import { productRoute } from "./products/route";
import { taskRoute } from "./task/route";

export const routes = [...productRoute, ...taskRoute];
