/**
 * OpenAPI 3 specification for Garden Connect.
 * Keep in sync with routers and DTOs when endpoints change.
 */
export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Garden Connect API",
    version: "1.0.0",
    description:
      "API REST do backend Garden Connect (utilizadores, jardins e equipamentos).",
  },
  tags: [
    { name: "Health", description: "Estado do serviço" },
    { name: "Users", description: "Utilizadores" },
    { name: "Gardens", description: "Jardins" },
    { name: "Equipamentos", description: "Equipamento por jardim (horta)" },
  ],
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: {
          "200": {
            description: "Serviço em execução",
            content: {
              "text/plain": {
                schema: { type: "string", example: "Hello World" },
              },
            },
          },
        },
      },
    },
    "/users/login": {
      post: {
        tags: ["Users"],
        summary: "Login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserLoginInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "JWT emitido",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginResponse" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "401": { $ref: "#/components/responses/Unauthorized" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/users": {
      get: {
        tags: ["Users"],
        summary: "Listar utilizadores",
        responses: {
          "200": {
            description: "Lista de utilizadores",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
              },
            },
          },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        tags: ["Users"],
        summary: "Criar utilizador",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Utilizador criado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Obter utilizador por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          "200": {
            description: "Utilizador (resposta pode ser null se não existir)",
            content: {
              "application/json": {
                schema: {
                  nullable: true,
                  allOf: [{ $ref: "#/components/schemas/User" }],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      patch: {
        tags: ["Users"],
        summary: "Atualizar utilizador",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UserUpdateInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Utilizador atualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Eliminar utilizador",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          "204": { description: "Eliminado com sucesso" },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/gardens": {
      get: {
        tags: ["Gardens"],
        summary: "Listar jardins",
        responses: {
          "200": {
            description: "Lista de jardins",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Garden" },
                },
              },
            },
          },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        tags: ["Gardens"],
        summary: "Criar jardim",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GardenInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Jardim criado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Garden" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/gardens/{id}": {
      get: {
        tags: ["Gardens"],
        summary: "Obter jardim por ID",
        parameters: [{ $ref: "#/components/parameters/GardenIdPath" }],
        responses: {
          "200": {
            description: "Jardim (resposta pode ser null se não existir)",
            content: {
              "application/json": {
                schema: {
                  nullable: true,
                  allOf: [{ $ref: "#/components/schemas/Garden" }],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      patch: {
        tags: ["Gardens"],
        summary: "Atualizar jardim",
        parameters: [{ $ref: "#/components/parameters/GardenIdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GardenUpdateInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Jardim atualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Garden" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      delete: {
        tags: ["Gardens"],
        summary: "Eliminar jardim",
        parameters: [{ $ref: "#/components/parameters/GardenIdPath" }],
        responses: {
          "204": { description: "Eliminado com sucesso" },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/equipamentos": {
      get: {
        tags: ["Equipamentos"],
        summary: "Listar equipamentos",
        parameters: [
          {
            name: "gardenId",
            in: "query",
            required: false,
            description:
              "Filtrar por jardim (ObjectId MongoDB da horta / garden)",
            schema: { type: "string", example: "507f1f77bcf86cd799439011" },
          },
        ],
        responses: {
          "200": {
            description: "Lista de equipamentos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Equipment" },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        tags: ["Equipamentos"],
        summary: "Criar equipamento",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EquipmentInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Equipamento criado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Equipment" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/equipamentos/{id}": {
      get: {
        tags: ["Equipamentos"],
        summary: "Obter equipamento por ID",
        parameters: [{ $ref: "#/components/parameters/EquipmentIdPath" }],
        responses: {
          "200": {
            description: "Equipamento (null se não existir)",
            content: {
              "application/json": {
                schema: {
                  nullable: true,
                  allOf: [{ $ref: "#/components/schemas/Equipment" }],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      patch: {
        tags: ["Equipamentos"],
        summary: "Atualizar equipamento",
        parameters: [{ $ref: "#/components/parameters/EquipmentIdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EquipmentUpdateInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Equipamento atualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Equipment" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      delete: {
        tags: ["Equipamentos"],
        summary: "Eliminar equipamento",
        parameters: [{ $ref: "#/components/parameters/EquipmentIdPath" }],
        responses: {
          "204": { description: "Eliminado com sucesso" },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
  },
  components: {
    parameters: {
      IdPath: {
        name: "id",
        in: "path",
        required: true,
        description: "ObjectId MongoDB do utilizador",
        schema: { type: "string", example: "507f1f77bcf86cd799439011" },
      },
      GardenIdPath: {
        name: "id",
        in: "path",
        required: true,
        description: "ObjectId MongoDB do jardim",
        schema: { type: "string", example: "507f1f77bcf86cd799439011" },
      },
      EquipmentIdPath: {
        name: "id",
        in: "path",
        required: true,
        description: "ObjectId MongoDB do equipamento",
        schema: { type: "string", example: "507f1f77bcf86cd799439011" },
      },
    },
    responses: {
      BadRequest: {
        description: "Pedido inválido ou erro de validação",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorMessage" },
          },
        },
      },
      NotFound: {
        description: "Recurso não encontrado",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorMessage" },
          },
        },
      },
      Unauthorized: {
        description: "Credenciais inválidas",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorMessage" },
          },
        },
      },
      InternalError: {
        description: "Erro interno",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorMessage" },
          },
        },
      },
    },
    schemas: {
      ErrorMessage: {
        type: "object",
        required: ["message"],
        properties: {
          message: { type: "string" },
        },
      },
      User: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string", maxLength: 100 },
          cpf: {
            type: "string",
            pattern: "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$",
            example: "123.456.789-00",
          },
          email: { type: "string", format: "email" },
          type: { type: "string", enum: ["user", "admin"] },
        },
      },
      UserInput: {
        type: "object",
        required: ["name", "cpf", "email", "password", "type"],
        properties: {
          name: { type: "string", minLength: 1, maxLength: 100 },
          cpf: {
            type: "string",
            pattern: "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$",
          },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
          type: { type: "string", enum: ["user", "admin"] },
        },
      },
      UserUpdateInput: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1, maxLength: 100 },
          cpf: {
            type: "string",
            pattern: "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$",
          },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
          type: { type: "string", enum: ["user", "admin"] },
        },
      },
      UserLoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 1 },
        },
      },
      LoginResponse: {
        type: "object",
        required: ["token"],
        properties: {
          token: { type: "string", description: "JWT" },
        },
      },
      Garden: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string", maxLength: 100 },
          localization: { type: "string" },
        },
      },
      GardenInput: {
        type: "object",
        required: ["name", "localization"],
        properties: {
          name: { type: "string", minLength: 1, maxLength: 100 },
          localization: { type: "string", minLength: 1, maxLength: 100 },
        },
      },
      GardenUpdateInput: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1, maxLength: 100 },
          localization: { type: "string", minLength: 1, maxLength: 100 },
        },
      },
      Equipment: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string", maxLength: 200 },
          state: { type: "string", maxLength: 100 },
          gardenId: {
            type: "string",
            description: "ObjectId do jardim (horta)",
          },
        },
      },
      EquipmentInput: {
        type: "object",
        required: ["name", "state", "gardenId"],
        properties: {
          name: { type: "string", minLength: 1, maxLength: 200 },
          state: { type: "string", minLength: 1, maxLength: 100 },
          gardenId: {
            type: "string",
            description: "ObjectId MongoDB do jardim existente",
            example: "507f1f77bcf86cd799439011",
          },
        },
      },
      EquipmentUpdateInput: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1, maxLength: 200 },
          state: { type: "string", minLength: 1, maxLength: 100 },
          gardenId: {
            type: "string",
            description: "ObjectId MongoDB do jardim existente",
          },
        },
      },
    },
  },
} as const;
