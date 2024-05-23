import shelter from "./shelter";

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
  host: "localhost:5000",

  servers: [
    {
      url: "localhost:5000",
      description: "Local server",
    },
  ],

  tags: [
    {
      name: "Shelters",
      description: "Shelters management",
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
  },
  definitions: {
    Shelter: shelter.definitions.Shelter,
    ShelterInfo: shelter.definitions.ShelterInfo,
    NewShelter: shelter.definitions.NewShelter,
    UpdateShelter: shelter.definitions.UpdateShelter,
    ListSimple: shelter.definitions.ListSimple,
  },
};

export default definition;
