import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import rateLimiter from 'express-rate-limit';
import SchoolHeadRoutes from './routes/SheadRoute.js';
import teacherRoutes from './routes/teacherRoute.js';
import studentRoutes from './routes/studentRoute.js';
import classRoutes from './routes/classRoutes.js';
import attendenceRoutes from './routes/attendenceRoutes.js';
import managementRoutes from './routes/managementRoute.js';
import swaggerDocs from './swaggerConfig.js';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

dotenv.config();
const app = express();

const limiter = rateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 100,
    message: "Two many request in 1 minute"
})

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api', SchoolHeadRoutes);
app.use('/api', teacherRoutes);
app.use('/api', studentRoutes);
app.use('/api', classRoutes);
app.use('/api', attendenceRoutes);
app.use('/api', managementRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("App is running on the port " + port);
}) 