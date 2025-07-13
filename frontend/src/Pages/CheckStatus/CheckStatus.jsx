import React, { useState } from "react";
import { Navigation } from "../Navigation/Navigation.jsx";
import "../CheckStatus/CheckStatus.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCheckStatus } from "../../api/api.js";
import classNames from "classnames";

export const CheckStatus = () => {
  const { id } = useParams();
  const {
    isSuccess,
    isError,
    data: checkStatus,
  } = useQuery({
    queryKey: ["STATUS", id],
    queryFn: () => getCheckStatus(id),
    staleTime: Infinity,
  });
  const [showSignature, setShowSignature] = useState(false);
  const [showAdviced, setShowAdviced] = useState(false);
  const [showOthers, setShowOthers] = useState(false);
  const [clickedId, setClickedId] = useState(null);

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
                  {checkStatus.status.map((status) => {
                    const colorizeStatus = () => {
                      switch (status.name) {
                        case "ORDERED":
                          return "darkred";
                        case "IN DELIVERY":
                          return "darkorange";
                        case "DELIVERED":
                          return "green";
                        case "ADVICED":
                          return "gold";
                        case "OTHER":
                          return "blue";
                        default:
                          return "black";
                      }
                    };

                    const handleOtherResultText = () => {
                      switch (status.details) {
                        case "Parcel returned from other reason":
                          return "Reason:";
                        case "Parcel left in shop, ORLEN, ParcelPoint":
                          return "Subject of delivery:";
                        default:
                          return "";
                      }
                    };

                    const handleShowStatuses = () => {
                      if (status.name === "DELIVERED") {
                        setClickedId(status._id);
                        setShowSignature(!showSignature);
                      }
                      if (status.name === "ADVICED") {
                        setClickedId(status._id);
                        setShowAdviced(!showAdviced);
                      }
                      if (status.name === "OTHER") {
                        setClickedId(status._id);
                        setShowOthers(!showOthers);
                      }
                      console.log(clickedId);
                    };

                    return (
                      <>
                        <tr
                          className={classNames("status__tablerow", {
                            "status__tablerow--active":
                              status.name === "DELIVERED" ||
                              status.name === "ADVICED" ||
                              status.name === "OTHER",
                          })}
                          onClick={() => handleShowStatuses()}
                          key={status._id}
                        >
                          <td className="status__statustext">
                            <span
                              className="status__span"
                              style={{ color: colorizeStatus() }}
                            >
                              {status.name}
                            </span>
                          </td>
                          <td className="status__tdata">{status.createdAt}</td>
                        </tr>
                        {status.name === "DELIVERED" &&
                          showSignature &&
                          status._id === clickedId &&
                          checkStatus.isDeliveryCode && (
                            <tr
                              className={classNames("status__tablesignature", {
                                "status__tablesignature--active": showSignature,
                              })}
                            >
                              <td className="status__statustext">
                                <span className="status__span">
                                  Information about delivery
                                </span>
                              </td>
                              <td className="status__signaturewindow">
                                <span className="status__info">
                                  PARCEL DELIVERED BY CODE
                                </span>
                              </td>
                            </tr>
                          )}
                        {status.name === "DELIVERED" &&
                          showSignature &&
                          status._id === clickedId &&
                          !checkStatus.isDeliveryCode && (
                            <tr
                              className={classNames("status__tablesignature", {
                                "status__tablesignature--active": showSignature,
                              })}
                            >
                              <td className="status__statustext">
                                <span className="status__span">
                                  Information about delivery
                                </span>
                              </td>
                              <td className="status__signaturewindow">
                                <span className="status__info">
                                  Subject of delivery
                                </span>
                                <p className="status__signatureperson">
                                  {status.subject}
                                </p>
                                {status.noAddressee && (
                                  <>
                                    <span className="status__info">
                                      Reason of not doing signature by addressee
                                    </span>
                                    <p className="status__signatureperson">
                                      {status.details}
                                    </p>
                                  </>
                                )}
                                <span className="status__info">
                                  {status.noAddressee
                                    ? "Place of leaving parcel"
                                    : "Receiving person"}
                                </span>
                                <p className="status__signatureperson">
                                  {status.deliveryInput}
                                </p>
                                <span
                                  className="status__info"
                                  style={{ marginTop: "50px" }}
                                >
                                  SIGNATURE:
                                </span>
                                <img
                                  className="status__signature"
                                  src={status.signature}
                                  alt="signature"
                                />
                              </td>
                            </tr>
                          )}
                        {status.name === "ADVICED" &&
                          showAdviced &&
                          status._id === clickedId && (
                            <tr
                              className={classNames("status__tablesignature", {
                                "status__tablesignature--active": showAdviced,
                              })}
                              onClick={() => setClickedId(status._id)}
                            >
                              <td className="status__statustext">
                                <span className="status__span">
                                  Information about advice
                                </span>
                              </td>
                              <td className="status__signaturewindow">
                                <span className="status__info">
                                  Office of advice
                                </span>
                                <p className="status__signatureperson">
                                  {status.officeOfAdvice}
                                </p>
                                <span className="status__info">
                                  Reason of advice
                                </span>
                                <p className="status__signatureperson">
                                  {status.reasonOfAdvice}
                                </p>
                                <span className="status__info">
                                  Place of notification
                                </span>
                                <p className="status__signatureperson">
                                  {status.placeOfNotification}
                                </p>
                              </td>
                            </tr>
                          )}
                        {status.name === "OTHER" &&
                          showOthers &&
                          clickedId === status._id && (
                            <tr
                              className={classNames("status__tablesignature", {
                                "status__tablesignature--active": showOthers,
                              })}
                              onClick={() => setClickedId(status._id)}
                            >
                              <td className="status__statustext">
                                <span className="status__span">
                                  Information about other status
                                </span>
                              </td>
                              <td className="status__signaturewindow">
                                <span className="status__info">Result:</span>
                                <p className="status__signatureperson">
                                  {status.subject}
                                </p>
                                <span className="status__info">
                                  Details of result:
                                </span>
                                <p className="status__signatureperson">
                                  {status.details}
                                </p>
                                <span className="status__info">
                                  {handleOtherResultText()}
                                </span>
                                {status.deliveryInput && (
                                  <p className="status__signatureperson">
                                    {status.deliveryInput}
                                  </p>
                                )}
                              </td>
                            </tr>
                          )}
                      </>
                    );
                  })}
                </table>
              </div>
            </>
          )}
          {isError && (
            <div className="status__error">
              <p className="status__errortext">Parcel not found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
