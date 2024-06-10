import shelters from "../modules/shelters/network";
import adoptionsForms from "../modules/adoption-form/network";

const urlApi = "";

const routes = function (server: any) {
  server.use(urlApi + "/shelters", shelters);
  server.use(urlApi + "/adoptionForms", adoptionsForms);
};

export default routes;
