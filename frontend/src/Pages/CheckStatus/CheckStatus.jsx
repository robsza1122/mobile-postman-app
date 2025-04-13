import React, { useState } from "react";
import { Navigation } from "../Navigation/Navigation.jsx";
import "../CheckStatus/CheckStatus.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import { getCheckStatus } from "../../api/api.js";
import classNames from "classnames";

export const CheckStatus = () => {
    const {id} = useParams();
    const { isSuccess, data: checkStatus } = useQuery({
        queryKey: ["STATUS", id],
        queryFn: () => getCheckStatus(id),
        staleTime: Infinity,
});
const [showSignature, setShowSignature] = useState(false);
   
    console.log(checkStatus);   

    return (
        <>
        <Navigation />
        <div className="status">
            <div className="status__window">
            {isSuccess && (
                <>
                <div className="status__container">
                      <span className="status__span">Number of Parcel:</span>
                      <p className="status__number">{checkStatus.numberOfParcel}</p>
                  </div>
                  <div className="status__containers">
                  <div className="status__datacontainer">
                          <span className="status__spandata">Sender's Name</span>
                          <p className="status__data">{checkStatus.senderName}</p>
                          <span className="status__spandata">Sender's Surname</span>
                          <p className="status__data">{checkStatus.senderSurname}</p>
                          <span className="status__spandata">Sender's post code</span>
                          <p className="status__data">{checkStatus.senderPostCode}</p>
                          <span className="status__spandata">Sender's city</span>
                          <p className="status__data">{checkStatus.senderCity}</p>
                          <span className="status__spandata">Sender's adress</span>
                          <p className="status__data">{checkStatus.senderAdress}</p>
                          <span className="status__spandata">Sender's country</span>
                          <p className="status__data">{checkStatus.senderCountry}</p>
                          <span className="status__spandata">Sender's email</span>
                          <p className="status__data">{checkStatus.clientEmail}</p>
                      </div>
                      <div className="status__datacontainer">
                          <span className="status__spandata">Adressee's Name</span>
                          <p className="status__data">{checkStatus.name}</p>
                          <span className="status__spandata">Adressee's Surname</span>
                          <p className="status__data">{checkStatus.surname}</p>
                          <span className="status__spandata">Adressee's post code</span>
                          <p className="status__data">{checkStatus.postCode}</p>
                          <span className="status__spandata">Adressee's city</span>
                          <p className="status__data">{checkStatus.city}</p>
                          <span className="status__spandata">Adressee's adress</span>
                          <p className="status__data">{checkStatus.adress}</p>
                          <span className="status__spandata">Adressee's country</span>
                          <p className="status__data">{checkStatus.country}</p>
                          <span className="status__spandata">Phone</span>
                          <p className="status__data">{checkStatus.phone}</p>
                      </div>
                      </div>
                      <div className="status__statuscontainer">
                          <span className="status__statusspan">STATUS:</span>
                          <table className="status__table">
                          <tr>
                                        <th className="status__head">Name of Status</th>
                                        <th className="status__head">Data of Status</th>
                                      </tr>
                              {checkStatus.status.map(status => { 
                                  const colorizeStatus = () => {
                                      console.log(status.name)
                                      switch (status.name) {
                                          case "ORDERED":
                                              return "darkred";
                                          case "IN DELIVERY":
                                              return "orange";
                                          case "DELIVERED":
                                              return "green";
                                          default: 
                                          return "black";
                                      }
                                  };

                                  return (
                                    <>
                                    <tr className={classNames("status__tablerow", {
                                        "status__tablerow--active": status.name === "DELIVERED",
                                    })} onClick={() => {
                                        if (status.name === "DELIVERED") {
                                            setShowSignature(!showSignature);
                                        }
                                    }
                                    }>
                                          <td
                                           className="status__statustext">
                                              <span 
                                              className="status__span"
                                              style={{color: colorizeStatus()}}>{status.name}</span></td>
                                          <td className="status__tdata">{status.createdAt}</td>
                                      </tr>
                                      {status.name === "DELIVERED" && showSignature && (
                                            <tr className={classNames("status__tablesignature", {
                                                "status__tablesignature--active": showSignature,
                                            })}>
                                                <td className="status__statustext">
                                                    <span className="status__span">Signature</span></td>
                                                <td className="status__signaturewindow">
                                                    <span className="status__info">Subject of delivery</span>
                                                    <p className="status__signatureperson">{checkStatus.status[checkStatus.status.length - 1].subjectOfDelivery}</p>
                                                    <span className="status__info">Receiving person</span>
                                                    <p className="status__signatureperson">{checkStatus.deliveryInput}</p>
                                                    <img className="status__signature" src={checkStatus.signature} alt="signature" />
                                                </td>
                                            </tr>
                                      )}
                                      </>
                                  )
                              })}
                          </table>
                      </div>
                      </>
            )}                                                                                      
            </div>
        </div>
        </>
    )
}
