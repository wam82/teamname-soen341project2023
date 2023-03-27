import "./Manage_Profile.css"
import React from "react";
import {useState} from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import { async } from "q";

export default function Manage_Profile() {

  //postdata
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Resume, setResume] = useState('');
  const [Pfp, setPfp] = useState('');

  
  const submit = async(e)=>{
    e.preventDefault()
    try{
      alert("Profile updated!")
      await axios.post("http://localhost:5000/api/user/update?",{
        FirstName,
        LastName,
        Email,
        Resume,
        Pfp
      })
    }
    catch{
      console.log(e);
    }
  }
 

  //pfp changer
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="Manage_Profile">
    <div class="container-xl px-4 mt-4">

      <nav class="nav nav-borders">
        <a
          class="nav-link active ms-0"
          href=""
          target="__blank"
          >Profile</a
        >
      </nav>
      <hr class="mt-0 mb-4" />
      <div class="row">
        <div class="col-xl-4">
 
          <div class="card mb-4 mb-xl-0">
            <div class="card-header">Profile Picture</div>
            <div class="card-body text-center">

            <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />
      <div
        onClick={() => imageUploader.current.click()}
      >
        <img class="img-account-profile rounded-circle mb-2" id="pfp"
          ref={uploadedImage} onChange={(e)=> setPfp(e.target.value)}
        />
      </div>
      Click to upload Image
    </div>



            </div>
          </div>
        </div>
        <div class="col-xl-8">

          <div class="card mb-4">
            <div class="card-header">Account Details</div>
            <div class="card-body">
              <form action="POST">

                <div class="row gx-3 mb-3">

                  <div class="col-md-6">
                    <label class="small mb-1" for="inputFirstName"
                      >First name</label
                    >
                    <input
                      class="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      onChange={(e)=> setFirstName(e.target.value)}
                    />
                  </div>

                  <div class="col-md-6">
                    <label class="small mb-1" for="inputLastName"
                      >Last name</label
                    >
                    <input
                      class="form-control"
                      id="inputLastName"
                      type="text"
                      placeholder="Enter your last name"
                      onChange={(e)=> setLastName(e.target.value)}
                    />
                  </div>
                </div>

            

                <div class="mb-3">
                  <label class="small mb-1" for="inputEmailAddress"
                    >Email address</label
                  >
                  <input
                    class="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder="Enter your email address"
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>


                <div class="mb-3">
                  <label for="formFile" class="form-label"
                    >Upload your CV</label
                  >
                  <input class="form-control" type="file" id="formFile" onChange={(e)=> setResume(e.target.value)}/>
                </div>

                <button class="btn btn-primary" type="button" onClick={submit}>
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

