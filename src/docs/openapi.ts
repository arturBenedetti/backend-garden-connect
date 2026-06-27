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
      "API REST do backend Garden Connect (utilizadores, jardins, equipamentos, insumos, canteiros, espécies de planta, plantios, tarefas e agendas).",
  },
  tags: [
    { name: "Health", description: "Estado do serviço" },
    { name: "Users", description: "Utilizadores" },
    { name: "Gardens", description: "Jardins" },
    { name: "Equipamentos", description: "Equipamento por jardim (horta)" },
    { name: "Insumos", description: "Insumos por jardim (horta)" },
    { name: "Canteiros", description: "Canteiros por jardim (horta)" },
    { name: "Espécies de planta", description: "Catálogo de espécies de planta" },
    { name: "Plantios", description: "Plantios por canteiro e espécie" },
    { name: "Tarefas", description: "Tarefas atribuídas a utilizadores e canteiros" },
    { name: "Agendas", description: "Agendamentos de tarefas por data e hora" },
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
        description:
          "Elimina o utilizador e todas as tarefas associadas (cascade delete).",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          "204": { description: "Eliminado com sucesso" },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/users/{id}/tarefas": {
      get: {
        tags: ["Users"],
        summary: "Listar tarefas de um utilizador",
        description:
          "Retorna as tarefas atribuídas ao utilizador. Um utilizador pode ter zero ou mais tarefas.",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          "200": {
            description: "Lista de tarefas do utilizador (pode ser vazia)",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Tarefa" },
                },
              },
            },
          },
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
        parameters: [
          { $ref: "#/components/parameters/GardenIdPath" },
          {
            name: "includeEquipments",
            in: "query",
            required: false,
            description:
              "Incluir equipamentos associados ao jardim (relação 1:N)",
            schema: { type: "boolean", example: true },
          },
          {
            name: "includeCanteiros",
            in: "query",
            required: false,
            description:
              "Incluir canteiros associados ao jardim (relação 1:N)",
            schema: { type: "boolean", example: true },
          },
        ],
        responses: {
          "200": {
            description: "Jardim (resposta pode ser null se não existir)",
            content: {
              "application/json": {
                schema: {
                  nullable: true,
                  allOf: [{ $ref: "#/components/schemas/GardenWithEquipments" }],
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
        description:
          "Elimina o jardim e todos os equipamentos, plantios, tarefas e canteiros associados (cascade delete).",
        parameters: [{ $ref: "#/components/parameters/GardenIdPath" }],
        responses: {
          "204": { description: "Eliminado com sucesso" },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/gardens/{id}/canteiros": {
      get: {
        tags: ["Gardens"],
        summary: "Listar canteiros de um jardim",
        description:
          "Retorna os canteiros do jardim. Um jardim pode ter zero ou mais canteiros.",
        parameters: [{ $ref: "#/components/parameters/GardenIdPath" }],
        responses: {
          "200": {
            description: "Lista de canteiros do jardim (pode ser vazia)",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Canteiro" },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/gardens/{id}/equipments": {
      get: {
        tags: ["Gardens"],
        summary: "Listar equipamentos de um jardim",
        description:
          "Retorna os equipamentos do jardim. Um jardim pode ter zero ou mais equipamentos.",
        parameters: [{ $ref: "#/components/parameters/GardenIdPath" }],
        responses: {
          "200": {
            description: "Lista de equipamentos do jardim (pode ser vazia)",
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
    "/insumos": {
      get: {
        tags: ["Insumos"],
        summary: "Listar insumos",
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
            description: "Lista de insumos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Insumo" },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        tags: ["Insumos"],
        summary: "Criar insumo",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/InsumoInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Insumo criado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Insumo" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/insumos/{id}": {
      get: {
        tags: ["Insumos"],
        summary: "Obter insumo por ID",
        parameters: [{ $ref: "#/components/parameters/InsumoIdPath" }],
        responses: {
          "200": {
            description: "Insumo (null se não existir)",
            content: {
              "application/json": {
                schema: {
                  nullable: true,
                  allOf: [{ $ref: "#/components/schemas/Insumo" }],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      patch: {
        tags: ["Insumos"],
        summary: "Atualizar insumo",
        parameters: [{ $ref: "#/components/parameters/InsumoIdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/InsumoUpdateInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Insumo atualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Insumo" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      delete: {
        tags: ["Insumos"],
        summary: "Eliminar insumo",
        parameters: [{ $ref: "#/components/parameters/InsumoIdPath" }],
        responses: {
          "204": { description: "Eliminado com sucesso" },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/canteiros": {
      get: {
        tags: ["Canteiros"],
        summary: "Listar canteiros",
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
            description: "Lista de canteiros",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Canteiro" },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        tags: ["Canteiros"],
        summary: "Criar canteiro",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CanteiroInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Canteiro criado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Canteiro" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/canteiros/{id}": {
      get: {
        tags: ["Canteiros"],
        summary: "Obter canteiro por ID",
        parameters: [{ $ref: "#/components/parameters/CanteiroIdPath" }],
        responses: {
          "200": {
            description: "Canteiro (null se não existir)",
            content: {
              "application/json": {
                schema: {
                  nullable: true,
                  allOf: [{ $ref: "#/components/schemas/Canteiro" }],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      patch: {
        tags: ["Canteiros"],
        summary: "Atualizar canteiro",
        parameters: [{ $ref: "#/components/parameters/CanteiroIdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CanteiroUpdateInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Canteiro atualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Canteiro" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      delete: {
        tags: ["Canteiros"],
        summary: "Eliminar canteiro",
        description:
          "Elimina o canteiro e todos os plantios e tarefas associados (cascade delete).",
        parameters: [{ $ref: "#/components/parameters/CanteiroIdPath" }],
        responses: {
          "204": { description: "Eliminado com sucesso" },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/canteiros/{id}/plantios": {
      get: {
        tags: ["Canteiros"],
        summary: "Listar plantios de um canteiro",
        description:
          "Retorna os plantios do canteiro. Um canteiro pode ter zero ou mais plantios.",
        parameters: [{ $ref: "#/components/parameters/CanteiroIdPath" }],
        responses: {
          "200": {
            description: "Lista de plantios do canteiro (pode ser vazia)",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Plantio" },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/canteiros/{id}/tarefas": {
      get: {
        tags: ["Canteiros"],
        summary: "Listar tarefas de um canteiro",
        description:
          "Retorna as tarefas do canteiro. Um canteiro pode ter zero ou mais tarefas.",
        parameters: [{ $ref: "#/components/parameters/CanteiroIdPath" }],
        responses: {
          "200": {
            description: "Lista de tarefas do canteiro (pode ser vazia)",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Tarefa" },
                },
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
    "/especies-planta": {
      get: {
        tags: ["Espécies de planta"],
        summary: "Listar espécies de planta",
        responses: {
          "200": {
            description: "Lista de espécies de planta",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/EspeciePlanta" },
                },
              },
            },
          },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        tags: ["Espécies de planta"],
        summary: "Criar espécie de planta",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EspeciePlantaInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Espécie de planta criada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EspeciePlanta" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/especies-planta/{id}": {
      get: {
        tags: ["Espécies de planta"],
        summary: "Obter espécie de planta por ID",
        parameters: [{ $ref: "#/components/parameters/EspeciePlantaIdPath" }],
        responses: {
          "200": {
            description: "Espécie de planta (null se não existir)",
            content: {
              "application/json": {
                schema: {
                  nullable: true,
                  allOf: [{ $ref: "#/components/schemas/EspeciePlanta" }],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      patch: {
        tags: ["Espécies de planta"],
        summary: "Atualizar espécie de planta",
        parameters: [{ $ref: "#/components/parameters/EspeciePlantaIdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EspeciePlantaUpdateInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Espécie de planta atualizada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EspeciePlanta" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      delete: {
        tags: ["Espécies de planta"],
        summary: "Eliminar espécie de planta",
        description:
          "Não é possível eliminar uma espécie que tenha plantios associados.",
        parameters: [{ $ref: "#/components/parameters/EspeciePlantaIdPath" }],
        responses: {
          "204": { description: "Eliminado com sucesso" },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "409": {
            description: "Espécie com plantios associados",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/ErrorMessage" },
              },
            },
          },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/especies-planta/{id}/plantios": {
      get: {
        tags: ["Espécies de planta"],
        summary: "Listar plantios de uma espécie",
        description:
          "Retorna os plantios da espécie. Uma espécie pode ter zero ou mais plantios.",
        parameters: [{ $ref: "#/components/parameters/EspeciePlantaIdPath" }],
        responses: {
          "200": {
            description: "Lista de plantios da espécie (pode ser vazia)",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Plantio" },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/plantios": {
      get: {
        tags: ["Plantios"],
        summary: "Listar plantios",
        parameters: [
          {
            name: "canteiroId",
            in: "query",
            required: false,
            description: "Filtrar por canteiro (ObjectId MongoDB)",
            schema: { type: "string", example: "507f1f77bcf86cd799439011" },
          },
          {
            name: "especieId",
            in: "query",
            required: false,
            description: "Filtrar por espécie de planta (ObjectId MongoDB)",
            schema: { type: "string", example: "507f1f77bcf86cd799439011" },
          },
        ],
        responses: {
          "200": {
            description: "Lista de plantios",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Plantio" },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        tags: ["Plantios"],
        summary: "Criar plantio",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PlantioInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Plantio criado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Plantio" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/plantios/{id}": {
      get: {
        tags: ["Plantios"],
        summary: "Obter plantio por ID",
        parameters: [
          { $ref: "#/components/parameters/PlantioIdPath" },
          {
            name: "includeCanteiro",
            in: "query",
            required: false,
            description: "Incluir dados do canteiro associado",
            schema: { type: "boolean", default: false },
          },
          {
            name: "includeEspecie",
            in: "query",
            required: false,
            description: "Incluir dados da espécie associada",
            schema: { type: "boolean", default: false },
          },
        ],
        responses: {
          "200": {
            description: "Plantio (null se não existir)",
            content: {
              "application/json": {
                schema: {
                  nullable: true,
                  allOf: [{ $ref: "#/components/schemas/Plantio" }],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      patch: {
        tags: ["Plantios"],
        summary: "Atualizar plantio",
        parameters: [{ $ref: "#/components/parameters/PlantioIdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PlantioUpdateInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Plantio atualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Plantio" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      delete: {
        tags: ["Plantios"],
        summary: "Eliminar plantio",
        parameters: [{ $ref: "#/components/parameters/PlantioIdPath" }],
        responses: {
          "204": { description: "Eliminado com sucesso" },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/tarefas": {
      get: {
        tags: ["Tarefas"],
        summary: "Listar tarefas",
        parameters: [
          {
            name: "userId",
            in: "query",
            required: false,
            description: "Filtrar por utilizador (ObjectId MongoDB)",
            schema: { type: "string", example: "507f1f77bcf86cd799439011" },
          },
          {
            name: "canteiroId",
            in: "query",
            required: false,
            description: "Filtrar por canteiro (ObjectId MongoDB)",
            schema: { type: "string", example: "507f1f77bcf86cd799439011" },
          },
        ],
        responses: {
          "200": {
            description: "Lista de tarefas",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Tarefa" },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        tags: ["Tarefas"],
        summary: "Criar tarefa",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TarefaInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Tarefa criada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Tarefa" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/tarefas/{id}": {
      get: {
        tags: ["Tarefas"],
        summary: "Obter tarefa por ID",
        parameters: [
          { $ref: "#/components/parameters/TarefaIdPath" },
          {
            name: "includeUser",
            in: "query",
            required: false,
            description: "Incluir dados do utilizador associado (sem password)",
            schema: { type: "boolean", default: false },
          },
          {
            name: "includeCanteiro",
            in: "query",
            required: false,
            description: "Incluir dados do canteiro associado",
            schema: { type: "boolean", default: false },
          },
        ],
        responses: {
          "200": {
            description: "Tarefa (null se não existir)",
            content: {
              "application/json": {
                schema: {
                  nullable: true,
                  allOf: [{ $ref: "#/components/schemas/Tarefa" }],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      patch: {
        tags: ["Tarefas"],
        summary: "Atualizar tarefa",
        parameters: [{ $ref: "#/components/parameters/TarefaIdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TarefaUpdateInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Tarefa atualizada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Tarefa" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      delete: {
        tags: ["Tarefas"],
        summary: "Eliminar tarefa",
        description:
          "Elimina a tarefa e todos os agendamentos associados (cascade delete).",
        parameters: [{ $ref: "#/components/parameters/TarefaIdPath" }],
        responses: {
          "204": { description: "Eliminado com sucesso" },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/tarefas/{id}/agendas": {
      get: {
        tags: ["Tarefas"],
        summary: "Listar agendamentos de uma tarefa",
        description:
          "Retorna os agendamentos da tarefa ordenados por data/hora. Uma tarefa pode ter zero ou mais entradas na agenda.",
        parameters: [{ $ref: "#/components/parameters/TarefaIdPath" }],
        responses: {
          "200": {
            description: "Lista de agendamentos da tarefa (pode ser vazia)",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Agenda" },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/agendas": {
      get: {
        tags: ["Agendas"],
        summary: "Listar agendamentos",
        parameters: [
          {
            name: "tarefaId",
            in: "query",
            required: false,
            description: "Filtrar por tarefa (ObjectId MongoDB)",
            schema: { type: "string", example: "507f1f77bcf86cd799439011" },
          },
        ],
        responses: {
          "200": {
            description: "Lista de agendamentos ordenados por data/hora",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Agenda" },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      post: {
        tags: ["Agendas"],
        summary: "Criar agendamento",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AgendaInput" },
            },
          },
        },
        responses: {
          "201": {
            description: "Agendamento criado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Agenda" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
    },
    "/agendas/{id}": {
      get: {
        tags: ["Agendas"],
        summary: "Obter agendamento por ID",
        parameters: [
          { $ref: "#/components/parameters/AgendaIdPath" },
          {
            name: "includeTarefa",
            in: "query",
            required: false,
            description: "Incluir dados da tarefa associada",
            schema: { type: "boolean", default: false },
          },
        ],
        responses: {
          "200": {
            description: "Agendamento (null se não existir)",
            content: {
              "application/json": {
                schema: {
                  nullable: true,
                  allOf: [{ $ref: "#/components/schemas/Agenda" }],
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      patch: {
        tags: ["Agendas"],
        summary: "Atualizar agendamento",
        parameters: [{ $ref: "#/components/parameters/AgendaIdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AgendaUpdateInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Agendamento atualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Agenda" },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalError" },
        },
      },
      delete: {
        tags: ["Agendas"],
        summary: "Eliminar agendamento",
        parameters: [{ $ref: "#/components/parameters/AgendaIdPath" }],
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
      InsumoIdPath: {
        name: "id",
        in: "path",
        required: true,
        description: "ObjectId MongoDB do insumo",
        schema: { type: "string", example: "507f1f77bcf86cd799439011" },
      },
      CanteiroIdPath: {
        name: "id",
        in: "path",
        required: true,
        description: "ObjectId MongoDB do canteiro",
        schema: { type: "string", example: "507f1f77bcf86cd799439011" },
      },
      EspeciePlantaIdPath: {
        name: "id",
        in: "path",
        required: true,
        description: "ObjectId MongoDB da espécie de planta",
        schema: { type: "string", example: "507f1f77bcf86cd799439011" },
      },
      PlantioIdPath: {
        name: "id",
        in: "path",
        required: true,
        description: "ObjectId MongoDB do plantio",
        schema: { type: "string", example: "507f1f77bcf86cd799439011" },
      },
      TarefaIdPath: {
        name: "id",
        in: "path",
        required: true,
        description: "ObjectId MongoDB da tarefa",
        schema: { type: "string", example: "507f1f77bcf86cd799439011" },
      },
      AgendaIdPath: {
        name: "id",
        in: "path",
        required: true,
        description: "ObjectId MongoDB do agendamento",
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
      GardenWithEquipments: {
        allOf: [
          { $ref: "#/components/schemas/Garden" },
          {
            type: "object",
            properties: {
              equipments: {
                type: "array",
                description:
                  "Presente apenas quando includeEquipments=true. Pode ser vazio.",
                items: { $ref: "#/components/schemas/Equipment" },
              },
              canteiros: {
                type: "array",
                description:
                  "Presente apenas quando includeCanteiros=true. Pode ser vazio.",
                items: { $ref: "#/components/schemas/Canteiro" },
              },
            },
          },
        ],
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
      Insumo: {
        type: "object",
        properties: {
          _id: { type: "string" },
          nome: { type: "string", maxLength: 200 },
          quantidade: { type: "number", minimum: 0 },
          unidade: { type: "string", maxLength: 50 },
          gardenId: {
            type: "string",
            description: "ObjectId do jardim (horta)",
          },
        },
      },
      InsumoInput: {
        type: "object",
        required: ["nome", "quantidade", "unidade", "gardenId"],
        properties: {
          nome: { type: "string", minLength: 1, maxLength: 200 },
          quantidade: { type: "number", minimum: 0 },
          unidade: { type: "string", minLength: 1, maxLength: 50 },
          gardenId: {
            type: "string",
            description: "ObjectId MongoDB do jardim existente",
            example: "507f1f77bcf86cd799439011",
          },
        },
      },
      InsumoUpdateInput: {
        type: "object",
        properties: {
          nome: { type: "string", minLength: 1, maxLength: 200 },
          quantidade: { type: "number", minimum: 0 },
          unidade: { type: "string", minLength: 1, maxLength: 50 },
          gardenId: {
            type: "string",
            description: "ObjectId MongoDB do jardim existente",
          },
        },
      },
      Canteiro: {
        type: "object",
        properties: {
          _id: { type: "string" },
          numero: { type: "integer", minimum: 1 },
          area: { type: "number", minimum: 0 },
          gardenId: {
            type: "string",
            description: "ObjectId do jardim (horta)",
          },
        },
      },
      CanteiroInput: {
        type: "object",
        required: ["numero", "area", "gardenId"],
        properties: {
          numero: { type: "integer", minimum: 1 },
          area: { type: "number", minimum: 0 },
          gardenId: {
            type: "string",
            description: "ObjectId MongoDB do jardim existente",
            example: "507f1f77bcf86cd799439011",
          },
        },
      },
      CanteiroUpdateInput: {
        type: "object",
        properties: {
          numero: { type: "integer", minimum: 1 },
          area: { type: "number", minimum: 0 },
          gardenId: {
            type: "string",
            description: "ObjectId MongoDB do jardim existente",
          },
        },
      },
      EspeciePlanta: {
        type: "object",
        properties: {
          _id: { type: "string" },
          nome_comum: { type: "string", maxLength: 200 },
          nome_cientifico: { type: "string", maxLength: 200 },
          tempo_colheita_dias: { type: "integer", minimum: 1 },
        },
      },
      EspeciePlantaInput: {
        type: "object",
        required: ["nome_comum", "nome_cientifico", "tempo_colheita_dias"],
        properties: {
          nome_comum: { type: "string", minLength: 1, maxLength: 200 },
          nome_cientifico: { type: "string", minLength: 1, maxLength: 200 },
          tempo_colheita_dias: { type: "integer", minimum: 1 },
        },
      },
      EspeciePlantaUpdateInput: {
        type: "object",
        properties: {
          nome_comum: { type: "string", minLength: 1, maxLength: 200 },
          nome_cientifico: { type: "string", minLength: 1, maxLength: 200 },
          tempo_colheita_dias: { type: "integer", minimum: 1 },
        },
      },
      Plantio: {
        type: "object",
        properties: {
          _id: { type: "string" },
          canteiroId: {
            type: "string",
            description: "ObjectId do canteiro",
          },
          especieId: {
            type: "string",
            description: "ObjectId da espécie de planta",
          },
          data_inicio: { type: "string", format: "date-time" },
          status: {
            type: "string",
            enum: ["ativo", "colhido", "cancelado"],
          },
        },
      },
      PlantioInput: {
        type: "object",
        required: ["canteiroId", "especieId", "data_inicio", "status"],
        properties: {
          canteiroId: {
            type: "string",
            description: "ObjectId MongoDB do canteiro existente",
            example: "507f1f77bcf86cd799439011",
          },
          especieId: {
            type: "string",
            description: "ObjectId MongoDB da espécie de planta existente",
            example: "507f1f77bcf86cd799439011",
          },
          data_inicio: {
            type: "string",
            format: "date-time",
            example: "2026-06-16T00:00:00.000Z",
          },
          status: {
            type: "string",
            enum: ["ativo", "colhido", "cancelado"],
          },
        },
      },
      PlantioUpdateInput: {
        type: "object",
        properties: {
          canteiroId: {
            type: "string",
            description: "ObjectId MongoDB do canteiro existente",
          },
          especieId: {
            type: "string",
            description: "ObjectId MongoDB da espécie de planta existente",
          },
          data_inicio: { type: "string", format: "date-time" },
          status: {
            type: "string",
            enum: ["ativo", "colhido", "cancelado"],
          },
        },
      },
      Tarefa: {
        type: "object",
        properties: {
          _id: { type: "string" },
          descricao: { type: "string", maxLength: 500 },
          prioridade: {
            type: "string",
            enum: ["baixa", "media", "alta"],
          },
          status: {
            type: "string",
            enum: ["pendente", "em_andamento", "concluida", "cancelada"],
          },
          userId: {
            type: "string",
            description: "ObjectId do utilizador responsável",
          },
          canteiroId: {
            type: "string",
            description: "ObjectId do canteiro associado",
          },
        },
      },
      TarefaInput: {
        type: "object",
        required: [
          "descricao",
          "prioridade",
          "status",
          "userId",
          "canteiroId",
        ],
        properties: {
          descricao: { type: "string", minLength: 1, maxLength: 500 },
          prioridade: {
            type: "string",
            enum: ["baixa", "media", "alta"],
          },
          status: {
            type: "string",
            enum: ["pendente", "em_andamento", "concluida", "cancelada"],
          },
          userId: {
            type: "string",
            description: "ObjectId MongoDB do utilizador existente",
            example: "507f1f77bcf86cd799439011",
          },
          canteiroId: {
            type: "string",
            description: "ObjectId MongoDB do canteiro existente",
            example: "507f1f77bcf86cd799439011",
          },
        },
      },
      TarefaUpdateInput: {
        type: "object",
        properties: {
          descricao: { type: "string", minLength: 1, maxLength: 500 },
          prioridade: {
            type: "string",
            enum: ["baixa", "media", "alta"],
          },
          status: {
            type: "string",
            enum: ["pendente", "em_andamento", "concluida", "cancelada"],
          },
          userId: {
            type: "string",
            description: "ObjectId MongoDB do utilizador existente",
          },
          canteiroId: {
            type: "string",
            description: "ObjectId MongoDB do canteiro existente",
          },
        },
      },
      Agenda: {
        type: "object",
        properties: {
          _id: { type: "string" },
          tarefaId: {
            type: "string",
            description: "ObjectId da tarefa associada",
          },
          data_hora: { type: "string", format: "date-time" },
        },
      },
      AgendaInput: {
        type: "object",
        required: ["tarefaId", "data_hora"],
        properties: {
          tarefaId: {
            type: "string",
            description: "ObjectId MongoDB da tarefa existente",
            example: "507f1f77bcf86cd799439011",
          },
          data_hora: {
            type: "string",
            format: "date-time",
            example: "2026-06-27T14:30:00.000Z",
          },
        },
      },
      AgendaUpdateInput: {
        type: "object",
        properties: {
          tarefaId: {
            type: "string",
            description: "ObjectId MongoDB da tarefa existente",
          },
          data_hora: { type: "string", format: "date-time" },
        },
      },
    },
  },
} as const;
