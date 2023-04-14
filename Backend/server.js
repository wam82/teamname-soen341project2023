const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const supabaseUrl = 'https://xscgcgyexmdnddmzfhhk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzY2djZ3lleG1kbmRkbXpmaGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkzNjc5MTksImV4cCI6MTk5NDk0MzkxOX0.M61bgrfHs5GXTMChYOwIYdfYUW70ovg0SseU2CJk4z8';
const supabase = createClient(supabaseUrl, supabaseKey);




// Login authentication
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.from('users').select('*').eq('email', email).eq('password', password);
    if (error) {
      throw error;
    }
    if (data.length === 0) {
      throw new Error('Invalid email or password');
    }
    res.status(200).send({ message: 'Login successful', id: data[0].id, user_type: data[0].user_type });
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: error.message });
  }
});

// User registration
app.post('/register', async (req, res) => {
  const { username, email, password, firstName, lastName, userType } = req.body;
  try {
    // Check if user already exists
    const { data: existingEmailUser, error: emailError } = await supabase.from('users').select('*').eq('email', email);
    const { data: existingUsernameUser, error: usernameError } = await supabase.from('users').select('*').eq('username', username);

    if (emailError || usernameError) {
      throw new Error('Error checking existing user');
    }
    if (existingUsernameUser.length > 0) {
      res.status(409).send({ message: 'User with this username already exists' });
      return;
    }
    if (existingEmailUser.length > 0) {
      res.status(409).send({ message: 'User with this email already exists' });
      return;
    }
    // Create new user
    const { data: newUser, error: createUserError } = await supabase.from('users').insert({
      username,
      email,
      password,
      firstName,
      lastName,
      user_type: userType
    });
    if (createUserError) {
      throw createUserError;
    }
    res.status(200).send({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error.message });
  }
});


// Felth all jobs
app.get('/jobs', async (req, res) => {
  try {
    const { data, error } = await supabase.from('jobs').select('*');
    if (error) {
      throw error;
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//Get a specific job by id
app.get('/jobs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single();
    if (error) {
      throw error;
    }
    if (!data) {
      throw new Error('Job not found');
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

// Apply for a specific job
app.post('/job-applications', async (req, res) => {
  const { jobId, userId } = req.body;
  try {
    const { data, error } = await supabase.from('job_applications').insert({ jobId, userId, isApplied: true, isAccepted: null });
    if (error) {
      throw error;
    }
    res.send({ message: 'Job application created successfully' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

// Delete a job application
app.delete('/job-applications/:id/:userId', async (req, res) => {
  const { id, userId } = req.params;
  try {
    const { data, error } = await supabase
      .from('job_applications').delete().eq('jobId', id).eq('userId', userId);

    if (error) {
      throw error;
    }

    res.send({ message: 'Job application deleted successfully' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//fetch job applications for a specific job and user
app.get('/job-applications/:jobId/:userId', async (req, res) => {
  const { jobId, userId } = req.params;
  try {
    const { data, error } = await supabase
      .from('job_applications').select('*').eq('jobId', jobId).eq('userId', userId);
    if (error) {
      throw error;
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//Load all job postings of an employer
app.get('/jobs-by-employer/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('jobs').select('*').eq('employerId', id);
    if (error) {
      throw error;
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//Update a Job posting by an employer
app.put('/jobs/:id', async (req, res) => {
  const jobId = req.params.id;
  const { title, description, employer, company, minimum_degree } = req.body;
  try {
    const { data, error } = await supabase
      .from('jobs').update({ title, description, employer, company, minimum_degree }).eq('id', jobId);

    if (error) {
      throw error;
    }
    res.send({ message: 'Job posting updated successfully' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

// Delete a job posting
app.delete('/jobs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('jobs').delete().eq('id', id);

    if (error) {
      throw error;
    }
    // Delete job applications for the deleted job posting
    const { data: jobAppsData, error: jobAppsError } = await supabase
      .from('job_applications').delete().eq('jobId', id);
    if (jobAppsError) {
      throw jobAppsError;
    }

    res.send({ message: 'Job posting and related job applications deleted successfully' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});


//Create a job posting
app.post('/create-job', async (req, res) => {
  const { title, description, employer, company, minimum_degree } = req.body;
  const employerId = req.body.employerId || null;
  try {
    const { data, error } = await supabase
      .from('jobs').insert({ title, description, employer, company, minimum_degree, employerId }).single();

    if (error) {
      throw error;
    }
    res.send({ message: 'Job posting created successfully' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//load a job posting applicants
app.get('/applicants/:jobId', async (req, res) => {
  const { jobId } = req.params;
  
  try {
    const { data, error } = await supabase
      .from('job_applications').select().eq('jobId', jobId);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.json({ message: 'Failed to get job applicants.' });
  }
});

//Load a specific user
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data: users, error } = await supabase
      .from('users').select('*').eq('id', id).single();
    if (error) throw error;
    if (!users) {
      return res.json({ error: 'User not found' });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.json({ error: 'Internal server error' });
  }
});

//accept students or reject students
app.put('/applications/:userId/:jobId', async (req, res) => {
  try {
    const { userId, jobId } = req.params;
    const { isAccepted, isApplied } = req.body;
    const { data, error } = await supabase
      .from('job_applications').update({ isAccepted, isApplied }).eq('userId', userId).eq('jobId', jobId);
    if (error) throw error;
    res.send(updatedData);
  } catch (error) {
    console.error(error);
    res.send(error.message);
  }
});

// Update user profile general info
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { password, username, email, user_type, firstName, lastName } = req.body;
  try {
    const { data, error } = await supabase
      .from('users').update({ password, username, email, user_type, firstName, lastName }).eq('id', id).single();
    if (error) throw error;
    if (!data) {
      return res.json({ error: 'User not found' });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.json({ error: 'Internal server error' });
  }
});

// Load notifications based of a user id
app.get('/notifications/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from('job_applications').select('*').eq('userId', userId)
    if (error) {
      throw error;
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//Change a job notifcation state for student. By seeting studentDismiss
app.put('/job-applications/:id/:userId', async (req, res) => {
  const { id, userId } = req.params;
  const { studentDismiss } = req.body;

  try {
    const { data, error } = await supabase
      .from('job_applications').update({ studentDismiss }).eq('jobId', id).eq('userId', userId);

    if (error) {
      throw error;
    }

    res.send({ message: 'Job application updated successfully' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//mark students seen by the employer to avoid notifcatinos of them
app.put('/employer-seen/:jobId', async (req, res) => {
  const { jobId } = req.params;
  try {
    const { error } = await supabase
      .from('job_applications').update({ employerDismiss: true }).eq('jobId', jobId);
    if (error) {
      throw error;
    }
    res.send({ message: 'Applicants marked as seen' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//returns unseen job applications (Must stay in notifications)
app.get('/job-applications/:jobId', async (req, res) => {
  const { jobId } = req.params;
  try {
    const { data, error } = await supabase
      .from('job_applications').select('*').eq('jobId', jobId);
    if (error) {
      throw error;
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//Fetch all users
app.get('/people', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      throw error;
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//uploads resume using template given
app.post('/studentResume/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { degree, summary, education, skills } = req.body;

    //fetch data existing
    const { data: existingRecord, error: selectError } = await supabase
      .from('studentResume').select('*').eq('userId', userId).single();

    if (selectError) {
      throw selectError;
    }

    // If the record exists, update it
    if (existingRecord) {
      const { data: updateData, error: updateError } = await supabase
        .from('studentResume').update({summary, experience, degree, skills }).eq('userId', userId);
      if (updateError) {
        throw updateError;
      }
      res.send({ success: true, data: updateData });
    } else { 
      // Otherwise, insert a new resume
      const { data: insertData, error: insertError } = await supabase
        .from('studentResume').insert({ userId, degree, summary, experience, education, skills });

      if (insertError) {
        throw insertError;
      }
      res.send({ success: true, data: insertData });
    }
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});


// get a specific resume of a student
app.get('/studentResume/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { data, error } = await supabase
      .from('studentResume').select('*').eq('userId', userId).single();

    if (error) {
      throw error;
    }
    if (!data) {
      res.send({ error: 'No resume found for this user' });
    } else if (!data.degree) {
      res.send({ error: 'Resume found but degree field is missing' });
    } else {
      res.send({ data });
    }
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//get an employer contact information (Thinking of not using it at all and get rid of this feature)
app.put('/employer-contact-info/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let { phone, email } = req.body;

    // Convert phone and email to text
    phone = phone ? phone.toString() : null;
    email = email ? email.toString() : null;

    // Update the employer's contact information in the database
    const { data: employer, error: employerError } = await supabase
      .from('employerContactInfo').update({ phone, email }).eq('id', id).single();

    if (employerError) {
      throw employerError;
    }
    res.send({ message: 'Contact information updated successfully', employer });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//ADMIN FROM HERE

//Get all students 
app.get('/students', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('user_type', 'STUDENT');
    if (error) {
      throw error;
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//Delete a student and his job applcations
app.delete('/delete-student/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { error: userError } = await supabase.from('users').delete().eq('id', id);
    if (userError) {
      throw userError;
    }
    const { error: jobAppError } = await supabase.from('job_applications').delete().eq('userId', id);
    if (jobAppError) {
      throw jobAppError;
    }
    res.send({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//Get all employers
app.get('/employers', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('user_type', 'EMPLOYER');
    if (error) {
      throw error;
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//Delete an employer, jobs, and the applicaiotn
app.delete('/delete-employer/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { error: userError } = await supabase.from('users').delete().eq('id', id);
    if (userError) {
      throw userError;
    }
    const { error: jobPostError } = await supabase.from('jobs').delete().eq('employerId', id);
    if (jobPostError) {
      throw jobPostError;
    }
    const { error: jobAppError } = await supabase.from('job_applications').delete().eq('jobId', id);
    if (jobPostError) {
      throw jobPostError;
    }
    res.send({ message: 'Employer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

// Get all headhunters
app.get('/headhunters', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('user_type', 'HEADHUNTER');
    if (error) {
      throw error;
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

// Delete a headhunter, his recommendations, and recommendation applications
app.delete('/delete-headhunter/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) {
      throw error;
    }
    res.send({ message: 'Headhunter deleted successfully' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});


// Get all job postings
app.get('/job-postings', async (req, res) => {
  try {
    const { data, error } = await supabase.from('jobs').select('*');
    if (error) {
      throw error;
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

// Delete a job and its applications
app.delete('/delete-job-posting/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { error: jobPostError } = await supabase.from('jobs').delete().eq('id', id);
    if (jobPostError) {
      throw error;
    }
    const { error: jobAppError } = await supabase.from('job_applications').delete().eq('jobId', id);
    if (jobAppError){
      throw error;
    }
    res.send({ message: 'Job posting deleted successfully' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

// Get all job applications
app.get('/job-applications', async (req, res) => {
  try {
    const { data, error } = await supabase.from('job_applications').select('*');
    if (error) {
      throw error;
    }
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

// Delete a job application
app.delete('/delete-job-application/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { error } = await supabase.from('job_applications').delete().eq('id', id);
    if (error) {
      throw error;
    }
    res.send({ message: 'Job application deleted successfully' });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

//Headhunter from here

// Headhunter recommend for a job
app.put('/headhunter-recommend/:userId/:jobId', async (req, res) => {
  const { userId, jobId } = req.params;
  try {
    const { data, error } = await supabase
      .from('job_applications').update({ isRecommended: true }).eq('userId', userId).eq('jobId', jobId).single();
    if (error) {
      throw error;
    }
    res.send({ message: `User ${userId} recommended for job ${jobId}` });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

// Headhunter cancel recommend for a job
app.put('/headhunter-cancel-recommend/:userId/:jobId', async (req, res) => {
  const { userId, jobId } = req.params;
  try {
    const { data, error } = await supabase
      .from('job_applications').update({ isRecommended: null }).eq('userId', userId).eq('jobId', jobId).single();
    if (error) {
      throw error;
    }
    res.send({ message: `Recommendation for user ${userId} and job ${jobId} cancelled` });
  } catch (error) {
    console.error(error);
    res.send({ error: error.message });
  }
});

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Handle POST requests to /upload-image/:userId
app.post('/upload-image/:userId', upload.single('image'), async (req, res) => {
  try {
    const { userId } = req.params;
    const { originalname, buffer } = req.file;
    // Upload the file to the bucket using Supabase Storage SDK
    const { data, error } = await supabase.storage
      .from('images')
      .upload(`images/${userId}/${originalname}`, buffer);

    if (error) {
      throw error;
    }
    res.status(200).send({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error uploading image' });
  }
});














































app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

