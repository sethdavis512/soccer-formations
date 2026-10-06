import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("formations", "routes/formations.tsx"),
  route("formations/:slug", "routes/formation.tsx"),
] satisfies RouteConfig;
