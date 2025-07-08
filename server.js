const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT, 5432),
});


app.post('/requests', async (req, res) => {
  // Endpoint to save project request to DB 
    //Request Method - POST
    // Request Body 
    
    // project_type: str
    // timeline: str
    // budget: int 
    // featuees: str 
    // additional_info: str 
    // phone: long int --> Not in requirements i assume maybe useful
    // email: email --> Not in requirements i assume maybe useful
    // notify: bool --> Check box (keep me updated with relavent insights and offers )
    // status: str --> defualt 'Requested' (Requested , Reviewed, Completed) - Not in requirements i assume maybe useful

  const {
    project_type,
    timeline,
    budget,
    features,
    additional_info,
    phone,
    email,
    notify, 
    status
  } = req.body;
 
  try {
    const query = `
      INSERT INTO project_requests (project_type, timeline, budget, features, additional_info, phone, email, notify)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

    const values = [
      project_type,
      timeline,
      budget,
      features,
      additional_info,
      phone,
      email,
      notify,
      status 
    ];


    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Data saved successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

app.get('/requests', async(req, res) => {
    // Endpoint to get requested projects 
    // REQUEST METHOD - GET 
    
    try{
        query = `
        SELECT * FROM project_requests ORDER BY id DESC;
        `
        
        const result = await pool.query(query)
        res.status(201).json({ message: 'Data fetched successfully', data: result.rows });
    }catch (error) {
        console.error('Error gettig data:', error);
        res.status(500).json({ error: 'Failed to getting data' });
    }
})

app.get('/request/:id', async(req, res) => {
    const id = req.params['id']
    try {
        query = `SELECT * FROM project_requests WHERE id = ($1);`
        values = [
            id
        ]
        const result = await pool.query(query, values)
        res.status(201).json({ message: 'Data fetched successfully', data: result.rows[0] });

    }catch (error){
        console.error('Error gettig data:', error);
        res.status(500).json({ error: 'Failed to getting data' });
    }

})

app.patch('/status/:id', async(req, res) => {
    const {status} = req.body
    const id = req.params['id']
    try{
        query = `
        UPDATE project_requests
        SET status = $2
        WHERE id = $1;
    `
        values = [
            id, 
            status
        ]

        const result = await pool.query(query, values)
        res.status(201).json({ message: 'Status Updated', data: result.rows[0] });
    }catch (error){
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Failed to update data' });
    }
})

app.delete('/request/:id', async(req, res) => {
    const id = req.params['id']
    try {
        query = `DELETE FROM project_requests WHERE id = ($1);`
        values = [
            id
        ]
        const result = await pool.query(query, values)
        res.status(201).json({ message: 'Data Deleted' });

    }catch (error){
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Failed to deleting data' });
    }
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

