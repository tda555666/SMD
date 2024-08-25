import { getInitials } from '@/utils/helper';
import PropTypes from 'prop-types';

function ProfileInfo({ onLogout }) {
    // return active user to guest , set user guest
    // delete tokens from the storage , and in the server do a logout 
    ProfileInfo.propTypes = {
        onLogout: PropTypes.func.isRequired,
    };
    return (
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">{getInitials("Eugene Krauss")}</div>

            <div>
                <p className="text-sm font-medium">Eugene Krauss</p>
                <button className="text-sm text-slate-700 underline" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default ProfileInfo;