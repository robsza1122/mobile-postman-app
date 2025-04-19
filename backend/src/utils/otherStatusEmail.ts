import { CreateParcelOrder } from "../services/auth.service";

export const otherStatusEmail = (parcel: CreateParcelOrder, url: string) => {
    const details = parcel?.status?.[parcel?.status?.length - 1]?.details;

    const handleTitle = (detailedInfo: string | undefined) => {
        switch(detailedInfo) {
            case "Addressee refused delivery":
            case "Parcel is damaged":
            case "Addressee moved out":
            case "Addressee passed on":
            case "Parcel returned from other reason":
            case "Wrong address":
            case "Parcel is impossible to delivery":
            return "Your parcel is returned to sender";
            case "Parcel delivered to boxmachine":
            return "Your parcel is waiting on you in ATM";
            case "Parcel left in shop, ORLEN, ParcelPoint":
            return "Your parcel is waiting on you in shop";
            default:
            return "Your parcel has new status";

        }
    };

    const handleText = (detailedInfo: string | undefined) => {
        switch(detailedInfo) {
            case "Addressee refused delivery":
            case "Parcel is damaged":
            case "Addressee moved out":
            case "Addressee passed on":
            case "Parcel returned from other reason":
            case "Wrong address":
            case "Parcel is impossible to delivery":
                return `Your parcel is returned to sender on ${parcel.senderAdress} in ${parcel.senderCity} ${parcel.senderPostCode}.`;
            case "Parcel delivered to boxmachine":
                return `Your parcel is waiting on you in ATM on ${parcel.adress} in ${parcel.city} ${parcel.postCode}.`;
            case "Parcel left in shop, ORLEN, ParcelPoint":
                return `Your parcel is waiting on you in shop on ${parcel.adress} in ${parcel.city} ${parcel.postCode}.`;
            default:
                return `Your parcel has new status. You can check it on our website.`;
        }
    }

  return ({
    subject: handleTitle(details),
    text: handleText(details),
    html: ` <html lang="en-US">
    <head><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <title>
    ${handleTitle(details)}
    </title>
    </head>
    <body
    align="center"
    >
            
 <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width:37.5em;margin-left:auto;margin-right:auto;box-sizing:border-box;padding-top:1rem;padding-bottom:1rem;height:100vh">
      <tbody>
        <tr style="width:100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top:16px;margin-bottom:16px">
              <tbody>
                <tr>
                  <td>
                    <img
                      alt="Pocztex Baner"
                      height="100px"
                      width="100%"
                      src="https://www.superpaczka.pl/app/uploads/2021/03/pocztex-1.jpg"
                      style="display:block;outline:none;border:none;text-decoration:none;width:100%;border-radius:12px;object-fit:cover" />
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="margin-top:32px;text-align:center">
                      <tbody>
                        <tr>
                          <td>
                          <h1
                              style="font-size:36px;line-height:40px;font-weight:600;letter-spacing:0.4px;color:rgb(17,24,39)">
                              Details about new result
                            </h1>
                            <p
                              style="font-size:18px;line-height:28px;margin:16px 0;margin-top:16px;font-weight:450;color:darkgray">
                              ${handleText(details)}
                            </p>
                            
                            <p
                              style="font-size:24px;line-height:24px;margin:16px 0;margin-top:8px;color:rgb(107,114,128)">
                              Number of parcel: ${parcel.numberOfParcel} 
                            </p>
                            <p> You always can check status </p>                           
                            <a
                              href="${url}"
                              style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;margin-top:16px;border-radius:8px;background-color:gray;padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:12px;font-weight:600;color:white;padding:12px 24px 12px 24px;border: 5px solid red;border-radius: 12px"
                              target="_blank"
                              >Check Status</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
        </body>
        </html>`,
  });
}
  