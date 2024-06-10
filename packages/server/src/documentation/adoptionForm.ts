import { response } from "express"

const create = {
   post: {
      tags: ["Adoption Forms Question"],
      summary: "create new adoption form questions",
      description: "This point create answers about adoption form",
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
            description: "Answers that needs to be completed",
            required: true,
            schema: {
               $ref: "#/definitions/NewAdoptionForm"
            }
         }
      ],
      responses: {
         201: {
            description: "OK",
            schema: {
               $ref: "#/definitions/AdoptionForm",
            },
         },
         400: {
            description: "An error occurred while create the answers of adoption form"
         }
      },
   }
}

const getAll = {
   get: {
      tags: ["Adoption Forms Question"],
      summary: "Consult all adoptions forms",
      description: "This point allows all adoptions form",
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
                  $ref: "#/definitions/GetAllForm"
               }
            }
         },
         400: {
            description: "Results error"
         }
      }
   }
}

const update = {
   patch: {
      tags: ["Adoption Forms Question"],
      summary: "Update a adoption form existing",
      description: "Update a adoption form existing by including the ID in the request body",
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
               $ref: "#/definitions/UpdateForm"
            }
         }
      ],
      responses: {
         200: {
            description: "Adoption form updated successfully"
         },
         400: {
            description: "An error occurred while updating the adoption form"
         }
      }

   }
}

const remove = {
   delete: {
      tags: ["Adoption Forms Question"],
      summary: "Delete a adoption form by ID",
      description: "This endpoint allows you to delete a specific form using its unique ID.",
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
            description: "Unique ID of the adoption form to delete"
         }
      ],
      responses: {
         200: {
            description: "Adoption Form deleted"
         },
         400: {
            description: "An error occurred while deleting the Adoption Form"
         }
      }
   }
}

const definitions = {
   AdoptionForm: {
      required: ["_id", "label", "inputType", "key"],
      properties: {
         _id: {
            type: "string",
            format: "uuid",
            uniqueItems: true,
         },
         label: {
            type: "string",
         },
         inputType: {
            type: "string",
         },
         key: {
            type: "string",
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
   NewAdoptionForm: {
      type: "object",
      required: ["label", "inputType", "key"],
      properties: {
         label: {
            type: "string",
         },
         inputType: {
            type: "string",
         },
         key: {
            type: "string",
         },
      }
   },
   GetAllForm: {
      properties: {
         _id: { type: "string", format: "uuid" },
         label: { type: "string" },
         inputType: { type: "string" },
         key: { type: "string" }
      },
   },
   UpdateForm: {
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
            $ref: "#/definitions/NewAdoptionForm"
         }
      ]
   },
}

export default {
   create,
   getAll,
   update,
   remove,
   definitions
}