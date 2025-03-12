import './WorkNav.scss';
import { WorkNavOptions } from '../WorkNavOptions/WorkNavOptions';
import useAuth from '../../hooks/useAuth';

export const WorkNav = () => {
  const {user} = useAuth();
    return (
        <>
        <div className="worknav__content">
                <div className="worknav__maininfos">
                    <p className="worknav__maintext">MAIN SCREEN</p>
                    <p className="worknav__user">{`${user.username} [90${user.EMINumber}]`}</p>
                </div>
                <WorkNavOptions />
            </div>
            </> 
    );
};
