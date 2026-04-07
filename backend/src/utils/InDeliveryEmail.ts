import { CreateParcelOrder } from "../services/parcel.service";


export const getInDeliveryStatusEmail = (parcel: CreateParcelOrder, url: string) => ({
    subject: "Your parcel is in Delivery",
    text: "Courier has your parcel in delivery. If you want contact with him, call +48 592 460 326.",
    html: ` <html lang="en-US">
    <head><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <title>
    Your parcel was sent
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
                      alt="Postman Baner"
                      height="280px"
                      width="100%"
                      src="https://i.ibb.co/xKKCpJFt/1-mar-2026-15-01-52.png"
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
                              Your parcel is in Delivery
                            </h1>
                            <p
                              style="font-size:24px;line-height:24px;margin:16px 0;margin-top:8px;color:rgb(107,114,128)">
                              Number of parcel: ${parcel.numberOfParcel}
                            </p>
                            <p
                              style="font-size:18px;line-height:28px;margin:16px 0;margin-top:16px;font-weight:600;color:black">
                              Courier has your parcel in delivery. If you want contact with him, call +48 592 460 326.
                            </p>                       
                            <p
                              style="font-size:18px;line-height:28px;margin:16px 0;margin-top:16px;font-weight:300;color:black">
                              Delivery code: ${parcel.deliveryCode}
                            </p>  
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
  