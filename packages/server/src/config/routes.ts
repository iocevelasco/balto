import shelters from "../modules/shelters/network";

const url_api = "";

const routes = function (server: any) {
  server.use(url_api + "/shelters", shelters);
};

export default routes;
