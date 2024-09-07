import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School Management API',
            version: '1.0.0',
            description: 'API documentation for the School Management app',
        },
        servers: [
            {
                url: 'http://localhost:8000', // Replace with your server URL
            },
        ],
    },
    apis: ['./controllers/*.js'], // Path to your API routes
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;
