import "./Manage_Profile.css"

export default function Manage_Profile() {
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
  
              <img
                class="img-account-profile rounded-circle mb-2"
                src="https://i.pinimg.com/originals/ef/f7/2d/eff72de667ed34187de0ffde33b5856d.jpg"
                alt=""
              />

              <div class="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>

              <button class="btn btn-primary" type="button">
                Upload new image
              </button>
            </div>
          </div>
        </div>
        <div class="col-xl-8">

          <div class="card mb-4">
            <div class="card-header">Account Details</div>
            <div class="card-body">
              <form>

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
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="formFile" class="form-label"
                    >Upload your CV</label
                  >
                  <input class="form-control" type="file" id="formFile" />
                </div>

                <button class="btn btn-primary" type="button">
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
