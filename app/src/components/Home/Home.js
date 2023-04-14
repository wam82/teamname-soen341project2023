import StudentHome from './Student/StudentHome';
import EmployerHome from './Employer/EmployerHome';
import AdminHome from './Admin/AdminHome';
import HeadhunterHome from './Headerhunter/HeadhunterHome';

function Home() {

  //Get userType stored in local Storage.
  const userType = localStorage.getItem('userType');
  
  return (

      <div className= 'HomeContainer'>
        <div className='HomeContent'>
          {userType === 'STUDENT' && <StudentHome />}
          {userType === 'EMPLOYER' && <EmployerHome />}
          {userType === 'ADMIN' && <AdminHome />}
          {userType === 'HEADHUNTER' && <HeadhunterHome />}
        </div>
      </div>

  );
}

export default Home;
