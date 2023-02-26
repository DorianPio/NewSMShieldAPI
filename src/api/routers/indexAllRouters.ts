import { app } from "../../index";
import { mergeRoutes } from "./makeRoutes";

export function handleRouters() {
  const mergeRouters: any[] = mergeRoutes();

  for (const routers of mergeRouters) {
    app.use("/api", routers.router);
  }
}
