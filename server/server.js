const supabase = require('@supabase/supabase-js')
const { response } = require('express')
const express = require('express')
const fetch = require('node-fetch')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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

// insert posting
// delete posting
// update posting

async function fetchPostByID(db, id)
{
    const {data, error} =  await database.from("postings").select("*").eq("id", id)
    return data
}

// TODO : ADD INSERT, UPDATE FUNCTIONS

async function run()
{

    // GET SECTION

    app.get("/api", async (req, res) => {

        const query = req.query
        var response_in_json = {} 
        //data = await fetchUsersByField(database, "username", query.username)
        
        // TODO : ADD QUERY CONDITIONS 
        if (query["all"])
        {
            response_in_json = {res: await fetchAllUsers(database)}
        } else if (query["username"])
        {
            response_in_json = {res: await fetchUsersByField(database, "username", query["username"])}
        } else if (query["email"])
        {
            response_in_json = {res: await fetchUsersByField(database, "email", query["email"])}
        }

        res.json(response_in_json)

    })


    app.get("/api/post", async (req, res) => {

        const query = req.query
        var response_in_json = {}

        if (query["id"]) {
            response_in_json = { res: await fetchPostByID(database, query["id"])}
        }

        res.json(response_in_json)

    })

    // POST SECTION

    app.post("/api", async (req, res) =>{
        const query = req.query
        res.json(query)
    })
        
        // TODO : add api route for app.get("/api/insert", =>)
        //        and app.get("/api/update", =>)
   

        
        app.listen(5000, () => {console.log("Console started on port 5000")})



} 

    
    // TODO : add api route for app.get("/api/insert", =>)
    //        and app.get("/api/update", =>)



run()
console.log("Sever started")



function POST(url) 
{
    const Http = new XMLHttpRequest()
    Http.open("POST", url);
    Http.send();
}

