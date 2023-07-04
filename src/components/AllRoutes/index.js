import { useRoutes } from "react-router-dom";
import { routes } from "../../routes";

export default function AllRoutes() {
  const allroutes = useRoutes(routes);
  return allroutes;
}
