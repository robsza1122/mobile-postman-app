import { useContext } from "react";
import './LeaveParcelOnPostBranch.scss';
import { PostManState } from "../../PostGlobalProvider";
import { AppNavigation } from "../AppNavigation/AppNavigation";
import useParcels, { PARCELS } from "../../hooks/useParcels";
import { SettledParcels } from "../OtherOptionScreen/SettledParcels";
import { SettleWorkButton } from "../SettleWork/SettleWorkButton";
import { useMutation } from "@tanstack/react-query";
import { leaveParcelOnPostBranch } from "../../api/api";
import { Loading } from "../../Loading/Loading";
import { useNavigate } from "react-router-dom";


export const LeaveParcelOnPostBranch = () => {
    const { currentUser, downloadedParcels, setDownloadedParcels, setIsUpdatingParcel, placeOfLeavingParcels } = useContext(PostManState);
    const { parcels } = useParcels();
    const { mutateAsync: asyncLeavingParcels } = useMutation({
        mutationKey: [PARCELS],
        mutationFn: leaveParcelOnPostBranch,
    });

    const navigate = useNavigate();
    const amountOfAdvicedParcels = downloadedParcels.filter(
        (parcel) =>
            parcel.status &&
            parcel.status[parcel.status.length - 1].name === "ADVICED" &&
            parcel.status[parcel.status.length - 1].officeOfAdvice === placeOfLeavingParcels &&
            parcel.forUser === currentUser.username,
    );


    console.log(parcels);
    console.log(placeOfLeavingParcels);
    const handleSettlingButton =  async () => {
        setIsUpdatingParcel(true);
        asyncLeavingParcels({
            user: currentUser.username,
            officeOfAdvice: placeOfLeavingParcels,
        })
            .catch((error) => {
                console.error("Error leaving parcels on post branch:", error);
                alert("An error occurred while leaving parcels on post branch. Please try again.");
            })
            .finally(() => {
                setIsUpdatingParcel(false);
            });
            navigate('/settle');
            setDownloadedParcels(downloadedParcels.map((parcel) => {
                if (parcel.status &&
            parcel.status[parcel.status.length - 1].name === "ADVICED" &&
            parcel.status[parcel.status.length - 1].officeOfAdvice === placeOfLeavingParcels &&
            parcel.placeOfLeavingParcel === "" &&
            parcel.forUser === currentUser.username) {
                return {
                    ...parcel,
                    placeOfLeavingParcel: placeOfLeavingParcels,
                }
            }

            return parcel;
            }))
    };
    return (
        <>
            <AppNavigation
             username={currentUser?.username}
              title="LEAVING PARCELS ON POST BRANCH"
               EMINumber={currentUser?.EMINumber} 
               />
            <div className="leaveparcel__office">{placeOfLeavingParcels}</div>
            {amountOfAdvicedParcels.map((parcel) =>
                <SettledParcels key={parcel._id} parcel={parcel} />
            )}
            <SettleWorkButton handleSettlingButton={handleSettlingButton} name="Send parcels on post branch" />

        </>
    );

};
