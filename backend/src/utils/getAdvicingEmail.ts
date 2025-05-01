import { CreateParcelOrder } from "../services/auth.service";

export const getAdvicingEmail = (parcel: CreateParcelOrder, url: string) => ({
    subject: "Your parcel is adviced",
    text:   `Your parcel is adviced on ${parcel?.status?.[parcel.status.length - 1]?.officeOfAdvice}`,
    html: ` <html lang="en-US">
    <head><meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <title>
    Your parcel is adviced
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
                              Your parcel is adviced
                            </h1>
                            <p
                              style="font-size:18px;line-height:28px;margin:16px 0;margin-top:16px;font-weight:600;color:black">
                              Your parcel is adviced on ${parcel?.status?.[parcel.status.length - 1]?.officeOfAdvice}.
                            </p>
                            <p
                              style="font-size:18px;line-height:28px;margin:16px 0;margin-top:16px;font-weight:600;color:black">
                              Place of notification: ${parcel?.status?.[parcel.status.length - 1]?.placeOfNotification}.
                              </p>

                              <p
                              style="font-size:18px;line-height:28px;margin:16px 0;margin-top:16px;font-weight:600;color:black">
                              Reason of advice: ${parcel?.status?.[parcel.status.length - 1]?.reasonOfAdvice}.
                              </p>
                            
                            <p
                              style="font-size:24px;line-height:24px;margin:16px 0;margin-top:8px;color:rgb(107,114,128)">
                              Number of parcel: ${parcel.numberOfParcel}
                            </p>
                            <a
                              href="${url}"
                              style="line-height:100%;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;margin-top:16px;border-radius:8px;background-color:gray;padding-left:24px;padding-right:24px;padding-top:12px;padding-bottom:12px;font-weight:600;color:red;padding:12px 24px 12px 24px;border: 5px solid red;border-radius: 12px"
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
  