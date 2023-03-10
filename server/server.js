const supabase = require('@supabase/supabase-js')
const express = require('express')
const app = express()

// TODO : add .env file for keys
const database = supabase.createClient('https://woqpnszxdqmdgcyicfgc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvcXBuc3p4ZHFtZGdjeWljZmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MDI3MzAsImV4cCI6MTk5MzE3ODczMH0.6P8xHjbJ1B3S6fZRyP-p51_CoGK7SRGsJVugwxs2hB4')

async function fetchAllUsers(db)
{
    const {data, error} =  await database.from("users").select("*")
    return data
}

async function fetchUsersByField(db, field, value)
{
    // field can be any of the user fields in a string
    const {data, error} =  await database.from("users").select("*").eq(field, value)
    return data
}

// TODO : ADD INSERT, UPDATE FUNCTIONS

async function run()
{

    app.get("/api/select", async (req, res) => {

        const query = req.query

        //data = await fetchUsersByField(database, "username", query.username)
        
        // TODO : ADD QUERY CONDITIONS 
        if (query["all"])
        {
            res.json({res: await fetchAllUsers(database)})
        } else if (query["username"])
        {
            res.json({res: await fetchUsersByField(database, "username", query["username"])})
        } else if (query["email"])
        {
            res.json({res: await fetchUsersByField(database, "email", query["email"])})
        } else {
            res.json({res: {}})
        }

        // TODO : add api route for app.get("/api/insert", =>)
        //        and app.get("/api/update", =>)

    })
        
        app.listen(5000, () => {console.log("Console started on port 5000")})
} 

run()

