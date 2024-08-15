import shelter from "./shelter";
import adoptionForm from "./adoptionForm";

const definition = {
  swagger: "2.0",
  info: {
    version: "2.0.0",
    title: "Balto's API",
    description: "API for balto App",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: "localhost:8080",

  servers: [
    {
      url: "localhost:8080",
      description: "Local server",
    },
  ],

  tags: [
    {
      name: "Shelters",
      description: "Shelters management",
    },
    {
      name: "Adoption Forms Question",
      description: "Adoption form management"
    }
  ],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/shelters": shelter.create,
    "/shelters ": shelter.update,
    "/shelters/{id}": shelter.getOne,
    "/shelters/list/{pattern}/{page}": shelter.getAll,
    "/shelters/simple": shelter.getSimple,
    "/shelters/{id} ": shelter.remove,
    "/adoptionForms":adoptionForm.create,
    "/adoptionForms ":adoptionForm.getAll,
    "/adoptionForms  ":adoptionForm.update,
    "/adoptionForms/{id} ": adoptionForm.remove,
  },
  definitions: {
    Shelter: shelter.definitions.Shelter,
    ShelterInfo: shelter.definitions.ShelterInfo,
    NewShelter: shelter.definitions.NewShelter,
    UpdateShelter: shelter.definitions.UpdateShelter,
    ListSimple: shelter.definitions.ListSimple,
   AdoptionForm: adoptionForm.definitions.AdoptionForm,
   NewAdoptionForm: adoptionForm.definitions.NewAdoptionForm,
   GetAllForm: adoptionForm.definitions.GetAllForm,
   UpdateForm: adoptionForm.definitions.UpdateForm,
  },
};

export default definition;
