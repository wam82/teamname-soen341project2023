import "./Manage_Profile.css"
import React from "react";
import {useState} from 'react';
import ReactDOM from "react-dom";

export default function Manage_Profile() {

  //postdata
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [org, setOrgName] = useState('');
  const [Location, setLocation] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhoneNum] = useState('');
  const [GPA, setGPA] = useState('');
  
 

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
          ref={uploadedImage}
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

                <div class="row gx-3 mb-3">

                  <div class="col-md-6">
                    <label class="small mb-1" for="inputOrgName"
                      >Organization name</label
                    >
                    <input
                      class="form-control"
                      id="inputOrgName"
                      type="text"
                      placeholder="Enter your organization name"
                      onChange={(e)=> setOrgName(e.target.value)}
                    />
                  </div>

                  <div class="col-md-6">
                    <label class="small mb-1" for="inputLocation"
                      >Location</label
                    >
                    <input
                      class="form-control"
                      id="inputLocation"
                      type="text"
                      placeholder="Enter your location"
                      onChange={(e)=> setLocation(e.target.value)}
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

                <div class="row gx-3 mb-3">

                  <div class="col-md-6">
                    <label class="small mb-1" for="inputPhone"
                      >Phone number</label
                    >
                    <input
                      class="form-control"
                      id="inputPhone"
                      type="tel"
                      placeholder="Enter your phone number"
                      onChange={(e)=> setPhoneNum(e.target.value)}
                    />
                  </div>

                  <div class="col-md-6">
                    <label class="small mb-1" for="inputGPA">GPA</label>
                    <input
                      class="form-control"
                      id="inputGPA"
                      type="text"
                      name="GPA"
                      placeholder="Enter your GPA"
                      onChange={(e)=> setGPA(e.target.value)}
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="formFile" class="form-label"
                    >Upload your CV</label
                  >
                  <input class="form-control" type="file" id="formFile" />
                </div>

                <button class="btn btn-primary" type="button" >
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

