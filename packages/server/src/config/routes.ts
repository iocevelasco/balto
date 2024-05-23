import shelters from "../modules/shelters/network";

const urlApi = "";

const routes = function (server: any) {
  server.use(urlApi + "/shelters", shelters);
};

export default routes;
