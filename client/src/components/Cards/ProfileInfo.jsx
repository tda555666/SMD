// ProfileInfo.jsx
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { userContext } from '@/context/userContext'; // Update the import to match your context file
import { getInitials } from '@/utils/helper';

function ProfileInfo({ onLogout }) {
  const { user } = useContext(userContext);
  
  console.log(user);
  let name = user && user.username ? user.username : ""; // Ensure user and username exist

  ProfileInfo.propTypes = {
    onLogout: PropTypes.func.isRequired,
  };

  return (
    <>
      {name ? (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
            {getInitials(name)}
          </div>

          <div>
            <p className="text-sm font-medium">{name}</p>
            <button
              className="text-sm text-slate-700 underline"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100"></div>

          <div>
            <p className="text-sm font-medium">{name}</p>
            <button className="text-sm text-slate-700 underline">
              <a href="/login">Login</a>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileInfo;
