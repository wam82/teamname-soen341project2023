import React, { useState, useEffect } from 'react';
import axios from 'axios';



//general setting edit
//pretty much setting from users table
function EditProfileGeneralSettings() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otherChangesSaved, setOtherChangesSaved] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [otherNotificationMessage, setOtherNotificationMessage] = useState('');
  const [passwordNotificationMessage, setPasswordNotificationMessage] = useState('');

  //fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/users/${userId}`);
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setUserType(user.user_type);
        setFirstName(user.firstName);
        setLastName(user.lastName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  //general setting changing handling
  const handleOtherChangesSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const user = await axios.get(`http://localhost:5000/users/${userId}`);
      if (user.data.password !== password) {
        setOtherNotificationMessage('Current password is incorrect!');
        return;
      }
      await axios.put(`http://localhost:5000/users/${userId}`, {
        username,
        email,
        firstName,
        lastName,
      });
      setOtherChangesSaved(true);
      setOtherNotificationMessage('Changes Saved!');
    } catch (error) {
      console.error(error);
    }
  };

  //password change handling
  const handlePasswordChangeSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordNotificationMessage('Passwords do not match!');
      return;
    }
    try {
      const userId = localStorage.getItem('userId');
      const user = await axios.get(`http://localhost:5000/users/${userId}`);
      if (user.data.password !== password2) {
        setPasswordNotificationMessage('Current password is incorrect!');
        return;
      }
      await axios.put(`http://localhost:5000/users/${userId}`, {
        password: newPassword,
      });
      setPasswordChanged(true);
      setPasswordNotificationMessage('Password Changed!');
    } catch (error) {
      console.error(error);
    }
  };

  //user can choose to edit general setting or password only
  return (
    <div >
      <form className='FormContainer' onSubmit={handleOtherChangesSubmit}>
        <div className='EditProfileContainer'>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>Username:</label>
            <input className='EditProfileInputBlock' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>Current Password:</label>
            <input className='EditProfileInputBlock' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>Email:</label>
            <input className='EditProfileInputBlock' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>User Type:</label>
            <input className='EditProfileInputBlock' type="text" value={userType} disabled />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>First Name:</label>
            <input className='EditProfileInputBlock' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels'>Last Name:</label>
            <input className='EditProfileInputBlock' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>
        <div className='ShowNotificationButton'>
          <button className='JobApplicationButtons' type="submit">{otherChangesSaved ? "Changes Saved" : "Save Changes"}</button>
        </div>
      </form>
      {otherNotificationMessage && (
        <div className='EditSuccessMessage'>
          {otherNotificationMessage}
        </div>
      )}
      <form onSubmit={handlePasswordChangeSubmit}>
        <div className='EditProfileContainer2'>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels2'>Current Password:</label>
            <input className='EditProfileInputBlock' type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
          </div >
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels2'>New Password:</label>
            <input className='EditProfileInputBlock' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </div>
          <div className='EditProfileInputs'>
            <label className='EditProfileLabels2'>Confirm New Password:</label>
            <input className='EditProfileInputBlock' type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
          </div>
        </div>
        <div className='ShowNotificationButton'>
          <button className='JobApplicationButtons' type="submit">{passwordChanged ? "Password Changed" : "Change Password"}</button>
        </div>
      </form>
      {passwordNotificationMessage && (
        <div className='EditSuccessMessage'>
          {passwordNotificationMessage}
        </div>
      )}
    </div>
  );
}

export default EditProfileGeneralSettings;

