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
        let response = ``
        const dynamicEndpoint = req.originalUrl.replace('/proxy', '');
        const externalApiBaseUrl = 'https://createqa.mheducation.com';

        const externalApiUrl = externalApiBaseUrl + dynamicEndpoint;
        console.log(req.headers, 'External API URL:', externalApiUrl, 'check this out', req.query);
        if (req.headers?.host) {
            delete req.headers.host
        }

        const axiosOptions = {
            headers: req.headers ? {
                // TODO issue in lowercase jcookie
                Cookie: req.headers['jcookie'] || '',
                ...req.headers
            } : null
        }

        if (req.headers['x-response-type']) {
            axiosOptions.responseType = req.headers['x-response-type'];
        }

        if (req.method === 'POST') {
            const xmlData = req.body;
            response = await axios.post(externalApiUrl, xmlData, axiosOptions);
            console.log(response, 'Raw XML Payload:', xmlData);
        } else if (req.method === 'GET') {
            response = await axios.get(externalApiUrl, axiosOptions);
        }
        const headersToForward = response.headers;
        Object.entries(headersToForward).forEach(([key, value]) => {
            if (key === 'access-control-allow-origin') {
                res.set(key, '*');
            } else {
                res.set(key, value);
            }
        });
        res.send(response.data);
    } catch (error) {
        console.log('Error while hitting the external API:', error.response);
        res.status(error.status || 500).json({ error: error.message, message: extractErrorMessage(error?.response?.data) });
    }
});

app.listen(SERVER_PORT, function () {
    console.log('Listening on port ' + SERVER_PORT + '.');
});