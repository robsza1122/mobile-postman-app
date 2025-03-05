import './WorkNav.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import makeEmiNumber from '../../hooks/getRandomString';
import { logoutUser } from '../../api/api';
import { WorkNavOptions } from '../WorkNavOptions/WorkNavOptions';

export const WorkNav = () => {
    const {user} = useAuth();
    console.log(user);
    const navigate = useNavigate();
    const { mutate: signOut } = useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {
        navigate("/", {
          replace: true,
        });
      }
    });
    return (
        <>
        
        <div className="worknav__content">
                <div className="worknav__maininfos">
                    <p className="worknav__maintext">MAIN SCREEN</p>
                    <p className="worknav__user">{`${user.username} [90${makeEmiNumber(3)}]`}</p>
                </div>
                <WorkNavOptions />
            </div>
            </> 
    );
}