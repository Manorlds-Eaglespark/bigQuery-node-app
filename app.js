const express = require('express');
// Import the Google Cloud client library using default credentials
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
require('dotenv').config()


const app = express()
const port = 3000

app.get('/', (req, res) => {
    runQuery();
    res.send("Hello");


});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


const runQuery = async function query() {
    console.log("Am here")
  // Queries the U.S. given names dataset for the state of Texas.

  const query = `SELECT * FROM \`new-vision-app.analytics_228211956.events_*\` LIMIT 1000`;

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  // Print the results
  console.log('Rows:');
  rows.forEach(row => console.log(row));
}