const express = require('express');
const axios = require('axios');

const app = express();
const port = 4000; // Porta 80 per il servizio

// Endpoint che farà la richiesta HTTP all'API esterna
app.get('/fetch-data', async (req, res) => {
  const url = 'http://mintaka:8080/temporal/entities/urn:ngsi-ld:robot:1';
  const params = {
    timeproperty: 'modifiedAt',
    timerel: 'between',
    timeAt: '2024-01-01T00:00:00',
    endTimeAt: '2026-01-01T00:00:00',
  };

  try {
    const response = await axios.get(url, { params });
    // Rispondi con i dati ricevuti
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Avvio del server
app.listen(port, () => {
  console.log(`Microservice running on port ${port}`);
});

