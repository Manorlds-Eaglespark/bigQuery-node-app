require('dotenv').config()
const express = require('express');
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

const app = express()
const port = 3000

let data_needed = null;

app.get('/', (req, res) => {
    runQuery()
    .then(data => {
      res.setHeader("Content-Type", "application/json");
      res.send(data);
    })
    .catch(err => console.log(err))
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

const runQuery = async function query() {
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
  const [rows] = await job.getQueryResults();

  return rows
}