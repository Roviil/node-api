const swaggerUi = require("swagger-ui-express")
const swaggereJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "캡스톤 프로젝트",
      description:
        "캡스톤 프로젝트 API 명세",
    },
    servers: [
      {
        url: "http://3.39.88.187:3000", // 요청 URL
      },
    ],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  apis: ["./routes/*.js", "./routes/user/*.js", "./routes/post/*.js"], //Swagger 파일 연동
}

const specs = swaggereJsdoc(options)

module.exports = { swaggerUi, specs }
