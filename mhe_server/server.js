const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const { extractErrorMessage } = require('./util/transform');

const app = express();
const SERVER_PORT = 8081;

app.use(bodyParser.raw({
    type: 'application/xml',
    limit: '12mb',
}));

app.use(express.json({ limit: '12mb', parameterLimit: '12mb' }));
app.use(express.urlencoded({ extended: false, limit: '12mb' }));

// Enable CORS
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    console.log('In Default API');
    res.send('Server is working');
});

app.all('/proxy/createonline/*', async (req, res) => {
    try {
        const dynamicEndpoint = req.originalUrl.replace('/proxy', '');

        const externalApiBaseUrl = 'https://createqa.mheducation.com';

        const externalApiUrl = externalApiBaseUrl + dynamicEndpoint;
        console.log(req.headers, 'External API URL:', externalApiUrl);
        if (req.headers?.host) {
            delete req.headers.host
        }

        if (req.method === 'POST') {
            const xmlData = req.body;
            const response = await axios.post(externalApiUrl, xmlData, (req.headers ? { headers: req.headers } : null));
            console.log(response, 'Raw XML Payload:', xmlData);

            res.set('Content-Type', 'application/xml');
            res.send(response.data);
        } else if (req.method === 'GET') {
            const response = await axios.get(externalApiUrl, (req.headers ? { headers: req.headers } : null));
            res.set('Content-Type', 'application/xml');
            res.send(response.data);
        }
    } catch (error) {
        console.log('Error while hitting the external API:', error.response);
        res.status(error.status || 500).json({ error: error.message, message: extractErrorMessage(error?.response?.data) });
    }
});

app.listen(SERVER_PORT, function () {
    console.log('Listening on port ' + SERVER_PORT + '.');
});