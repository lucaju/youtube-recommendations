//@ts-ignore
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Youtube Recommendations',
    description: 'Documentation automatically generated by the <b>swagger-autogen</b> module.',
  },
  // host: 'localhost:3000',
  // basePath: '/',
  // schemes: ['http', 'https'],
  // consumes: ['application/json'],
  // produces: ['application/json'],
  tags: [
    { name: 'Collect', description: 'Endpoints' },
    { name: 'Project', description: 'Endpoints' },
    { name: 'User', description: 'Endpoints' }
  ],
  // securityDefinitions: {
  //   apiKeyAuth: {
  //     type: 'apiKey',
  //     in: 'header', // can be "header", "query" or "cookie"
  //     name: 'X-API-KEY', // name of the header, query parameter or cookie
  //     description: 'any description...',
  //   },
  // },
  // definitions: {
  //   User: {
  //     name: 'Jhon Doe',
  //     role: 'admin',
  //     email: 'email@example.com',
  //   },
  //   AddUser: {
  //     $name: 'Jhon Doe',
  //     $password: '******',
  //     email: 'email@example.com',
  //     role: '',
  //   },
  // },
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
  './server/server.ts',
  './server/routes/index.ts',
  './server/routes/collect/index.ts',
  // './server/routes/projects/index.ts',
  // './server/routes/users/index.ts',
];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc)
