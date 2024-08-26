import { getInitials } from '@/utils/helper';
import PropTypes from 'prop-types';
import LoginContext from '@/context/loginContext';
import { useContext } from "react";



function ProfileInfo({ onLogout }) {
    const { currUser } = useContext(LoginContext);
    console.log(currUser);
    let name = currUser.username ? currUser.username : "";
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