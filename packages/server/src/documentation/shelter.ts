const create = {
  post: {
    tags: ["Shelters"],
    summary: "Create Shelter",
    description: "This endpoint allows you to create a new shelter with the data provided.",
    parameters: [
      {
        name: "Authorization",
        in: "header",
        description: "Authorization Bearer Token",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        in: "body",
        name: "body",
        description: "Shelter that needs to be added",
        required: true,
        schema: {
          $ref: "#/definitions/NewShelter"
        }
      }
    ],
    responses: {
      201: {
        description: "OK",
        schema: {
          $ref: "#/definitions/Shelter",
        },
      },
      400: {
        description: "An error occurred while create the Shelter"
      }
    },
  },
};

const update = {
  patch: {
    tags: ["Shelters"],
    summary: "Update an existing shelter",
    description: "This endpoint allows you to update an existing shelter by including the ID in the request body.",
    parameters: [
      {
        name: "Authorization",
        in: "header",
        description: "Authorization Bearer Token",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        in: "body",
        name: "body",
        description: "Object with the data to update, including the ID",
        required: true,
        schema: {
          $ref: "#/definitions/UpdateShelter"
        }
      }
    ],
    responses: {
      200: {
        description: "Shelter updated successfully"
      },
      400: {
        description: "An error occurred while updating the Shelter"
      }
    }
  }
}

const getOne = {
  get: {
    tags: ["Shelters"],
    summary: "Consult a shelter by ID",
    description: "This endpoint allows you to query a specific shelter using its unique ID.",
    parameters: [
      {
        name: "Authorization",
        in: "header",
        description: "Authorization Bearer Token",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "id",
        in: "path",
        required: true,
        type: "string",
        description: "Unique ID of the shelter to consult"
      }
    ],
    responses: {
      200: {
        description: "OK",
        schema: {
          "$ref": "#/definitions/Shelter"
        }
      },
      400: {
        description: "Results error"
      }
    }
  }
}

const getAll = {
  get: {
    tags: ["Shelters"],
    summary: "Consult the complete paginated list",
    description: "This endpoint allows you to consult a complete list of shelters in a paginated manner.",
    parameters: [
      {
        name: "Authorization",
        in: "header",
        description: "Authorization Bearer Token",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "pattern",
        in: "path",
        required: false,
        type: "string",
        description: "Search pattern to filter the list"
      },
      {
        name: "page",
        in: "path",
        required: false,
        type: "integer",
        description: "Page number for pagination",
        default: 1
      }
    ],
    responses: {
      200: {
        description: "OK",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/Shelter"
          }
        }
      },
      400: {
        description: "Results error"
      }
    }
  }
}

const getSimple = {
  get: {
    tags: ["Shelters"],
    summary: "Consult the complete simple list",
    description: "This endpoint delivers a simple, non-paged list of shelters.",
    parameters: [
      {
        name: "Authorization",
        in: "header",
        description: "Authorization Bearer Token",
        required: true,
        schema: {
          type: "string",
        },
      }
    ],
    responses: {
      200: {
        description: "OK",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/ListSimple"
          }
        }
      },
      400: {
        description: "Results error"
      }
    }
  }
}

const remove = {
  delete: {
    tags: ["Shelters"],
    summary: "Delete a shelter by ID",
    description: "This endpoint allows you to delete a specific shelter using its unique ID.",
    parameters: [
      {
        name: "Authorization",
        in: "header",
        description: "Authorization Bearer Token",
        required: true,
        schema: {
          type: "string",
        },
      },
      {
        name: "id",
        in: "path",
        required: true,
        type: "string",
        description: "Unique ID of the shelter to delete"
      }
    ],
    responses: {
      200: {
        description: "Shelter 3fa85f64-5717-4562-b3fc-2c963f66afa6 deleted"
      },
      400: {
        description: "Results error"
      }
    }
  }
}

const definitions = {
  Shelter: {
    required: ["_id", "name", "description", "image"],
    properties: {
      _id: {
        type: "string",
        format: "uuid",
        uniqueItems: true,
      },
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
      image: {
        type: "string",
      },
      information: {
        $ref: "#/definitions/ShelterInfo"
      },
      active: {
        type: "boolean",
      },
      createdAt: {
        type: "string",
        format: "date-time"
      },
      updatedAt: {
        type: "string",
        format: "date-time"
      }
    }
  },
  ShelterInfo: {
    type: "object",
    properties: {
      email: {
        type: "string",
        format: "email"
      },
      phone: {
        type: "string"
      },
      address: {
        type: "string"
      }
    }
  },
  NewShelter: {
    type: "object",
    required: ["name", "description", "image", "information"],
    properties: {
      name: {
        type: "string"
      },
      description: {
        type: "string"
      },
      image: {
        type: "string"
      },
      information: {
        $ref: "#/definitions/ShelterInfo"
      }
    }
  },
  UpdateShelter: {
    allOf: [
      {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid"
          }
        }
      },
      {
        $ref: "#/definitions/NewShelter"
      }
    ]
  },
  ListSimple: {
    properties: {
      _id: { type: "string", format: "uuid" },
      name: { type: "string" }
    },
  }
};

export default {
  create,
  update,
  getOne,
  getAll,
  getSimple,
  remove,
  definitions,
};
