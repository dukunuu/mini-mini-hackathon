import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home/page.tsx"),
  route('/sign-up', 'routes/sign-up.tsx'),
  route('/sign-in', 'routes/sign-in.tsx'),
  route('/dashboard', 'routes/dashboard.tsx'),
  route('/forgot-password', 'routes/forgot-password.tsx'),
] satisfies RouteConfig;
