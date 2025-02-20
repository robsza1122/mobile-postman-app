import React from "react";
import { Navigation } from "../Navigation/Navigation.jsx";
import "./CheckStatus.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {getCheckStatus} from "../../api/api.js";
import { Loading } from "../../Loading/Loading.jsx";

export const CheckStatus = () => {
    const { number } = useParams();
    const { isSuccess, isError, isPending, data: checkStatus } = useQuery({
        queryKey: ["checkStatus", number],
        queryFn: () => getCheckStatus(number), 
    })
    const colorizeStatus = (status) => {
        switch (status) {
            case "UNPAID":
                return "darkred";
            case "PARCEL SENT TO PACK":
                return "rgba(215, 66, 12, 0.884)";
        }
    }
  const data = "at " + checkStatus.parcel.createdAt
  .toString().slice(0, -5).replace("T", " ");
    return (
        <>
        <Navigation />
        <div className="status">
            <div className="status__window">
                {isPending && (
                    <Loading message="Loading status..."/>
                )}
                {isError && (
                                        <>
                                        <div className="status__container">
                            <span className="status__span">Number of Parcel:</span>
                            <p className="status__number">{number}</p>
                        
                        <div className="status__error">There is no parcel with this number...</div>
                        </div>
                        </>
                )}
                {isSuccess && (
                      <>
                      <div className="status__container">
                            <span className="status__span">Number of Parcel:</span>
                            <p className="status__number">{checkStatus.numberOfParcel}</p>
                        </div>
                        <div className="status__containers">
                        <div className="status__datacontainer">
                                <span className="status__spandata">Sender's Name</span>
                                <p className="status__data">{checkStatus.parcel.senderName}</p>
                                <span className="status__spandata">Sender's Surname</span>
                                <p className="status__data">{checkStatus.parcel.senderSurname}</p>
                                <span className="status__spandata">Sender's post code</span>
                                <p className="status__data">{checkStatus.parcel.senderPostCode}</p>
                                <span className="status__spandata">Sender's city</span>
                                <p className="status__data">{checkStatus.parcel.senderCity}</p>
                                <span className="status__spandata">Sender's adress</span>
                                <p className="status__data">{checkStatus.parcel.senderAdress}</p>
                                <span className="status__spandata">Sender's country</span>
                                <p className="status__data">{checkStatus.parcel.senderCountry}</p>
                                <span className="status__spandata">Sender's email</span>
                                <p className="status__data">{checkStatus.parcel.clientEmail}</p>
                            </div>
                            <div className="status__datacontainer">
                                <span className="status__spandata">Adressee's Name</span>
                                <p className="status__data">{checkStatus.parcel.name}</p>
                                <span className="status__spandata">Adressee's Surname</span>
                                <p className="status__data">{checkStatus.parcel.surname}</p>
                                <span className="status__spandata">Adressee's post code</span>
                                <p className="status__data">{checkStatus.parcel.postCode}</p>
                                <span className="status__spandata">Adressee's city</span>
                                <p className="status__data">{checkStatus.parcel.city}</p>
                                <span className="status__spandata">Adressee's adress</span>
                                <p className="status__data">{checkStatus.parcel.adress}</p>
                                <span className="status__spandata">Adressee's country</span>
                                <p className="status__data">{checkStatus.parcel.country}</p>
                                <span className="status__spandata">Phone</span>
                                <p className="status__data">{checkStatus.parcel.phone}</p>
                            </div>
                            </div>
                            <div className="status__statuscontainer">
                                <span className="status__statusspan">STATUS:</span>
                                <p 
                                className="status__statustext"
                                 style={{color: colorizeStatus(checkStatus.status)}}>
                                    {checkStatus.status}
                                    </p>
                                    <span className="status__data">{data}</span>
                                <div className="status__box"></div>
                                <div className="status__timeline"></div>
                            </div>
                            </>
                )}
                    
            </div>
        </div>
        </>
    )
}
