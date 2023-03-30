const supabase = require('@supabase/supabase-js')
const { response } = require('express')
const express = require('express')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());

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

async function fetchAllPost(db)
{
    const {data, error} =  await database.from("postings").select("*")
    return data
}

// TODO : ADD INSERT, UPDATE FUNCTIONS

async function run()
{

    // GET SECTION
    app.get("/api/user", async (req, res) => {

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
        } else if (query["all"]) 
        {
            response_in_json = { res: await fetchAllPost(database)}
        }

        res.json(response_in_json)

    })

    // POST SECTION
        
        // TODO : add api route for app.get("/api/insert", =>)
        //        and app.get("/api/update", =>)
   
        //TO HANDLE LOGIN
        app.post('/api/login', async (req, res) => {

            console.log('Request body:', req.body);
            const { username, password } = req.body;
            try {
              const { data: user, error } = await database.from('users').select('id, username, email, password, user_type').or(`email.eq.${username},username.eq.${username}`).single();
              if (error) {
                console.error('Supabase connection error:', error);
                throw error;
              }
              if (!user) {
                throw new Error('User not found');
              }
              if (password !== user.password) {
                throw new Error('Invalid password');
              }
              const loggedIn = true;
              res.status(200).json({ loggedIn, userType: user.user_type, email: user.email });
            } catch (error) {
              console.error('Login error: Invalid username or password', error);
              res.status(400).json({ error: error.message });
            }
        });

        app.post("/api/post/insert", async (req, res) => {

            const query = req.query
    
            data = {
                title:       query["title"],
                employer:    query["employer"],
                description: query["description"]
            }
    
            console.log("inserting posting")
            console.log(data)
    
    
            const { error } = await database.from('postings').insert(data)
    
    
            res.json({res: (error===null)})    
        })

        app.post("/api/post/update", async (req, res) => {
            
            const query = req.query

            let id = query["id"]
            delete query.id

            const { error } = await database
            .from('postings')
            .update(query)
            .eq('id', id)

            res.json({res: (error===null)})
        })

        app.get("/api/user/update", async (req, res) => {

            const query = req.query
            
            let id = query["id"]
            delete query.id
            
            const { error } = await database
            .from('users')
            .update(query)
            .eq('id', id)

            res.json({res : (error===null)})
        })
    
        app.post("/api/user/insert", async (req, res) => {
    
            const query = req.query
            var response_in_json = {} 
    
            data = {
                first_name: query["first_name"],
                last_name:  query["last_name"],
                user_type:  query["user_type"],
                password:   query["password"],
                info:       query["info"],
                email:      query["email"],
                resume:     query["resume"],
                username:   query["username"],
                image:      query["image"]
            }
    
    
            console.log("inserting user")
            console.log(data)
    
            const { error } = await database.from('users').insert(data)
    
            res.json({res: (error===null)})
    
        })

        app.post("/api/post/delete", async (req, res) => {

            const query = req.query

            const { error } = await database
            .from("postings").delete().match(req.query)

            res.json({res: (error === null)})

        })

        app.post("/api/user/delete", async (req, res) => {

            const query = req.query

            const { error } = await database
            .from("users").delete().match(req.query)

            res.json({res: (error === null)})

        })

        app.get("/api/applications", async (req, res) => {

            const query = req.query
            var response_in_json = {}

            if (Object.keys(query).length !== 0)
            {
                const { data, error } = await database.from("applications").select("*").match(query)
                response_in_json = data

            } else  {
                const { data, error } = await database.from("applications").select("*")
                response_in_json = data
            }

            res.json({res: response_in_json})
        })


        app.post("/api/applications/insert", async (req, res) => {

            const query = req.query

            const { error } = await database.from('applications').insert(query)
    
    
            res.json({res: (error===null)})  
        })


        app.post("/api/applications/update", async (req, res) => {

            const query = req.query

            let id = query["application_id"]
            delete query["application_id"]

            const { error } = await database.from('applications')
            .update(query)
            .eq("id", id)

            res.json({res: (error===null)})  
        })

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

