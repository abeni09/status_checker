const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3005;
const listOfPairs = [
    {
        'meetDoctor': 'http://196.189.155.130:8080'
    },
    {
        'meetLawyer': 'http://196.189.155.130:8080'
    },
    {
        'meetPharmacy': 'http://196.189.155.130:8080'
    },
    {
        'meetDamicha': 'http://196.189.155.130:8080'
    },
]
// Proxy endpoint
app.get(`/api/:company/:phoneNumber`, async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  const company = req.params.company;
  // Find the corresponding URL for the given company
  const companyUrl = listOfPairs.find(pair => pair.hasOwnProperty(company));
  // console.log(companyUrl[company]);

  const apiUrl = `${companyUrl[company]}/${company}/index.php/api/Search/searhByPhone/${phoneNumber}`;

  try {
    const response = await axios.get(apiUrl);
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'Error fetching data from API' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server listening at http://localhost:${PORT}`);
});
