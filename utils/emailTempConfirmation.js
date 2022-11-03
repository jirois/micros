export const emailVerificationTemp = (code) => {
  return `
  <body
    style="
      background-color: #f4f4f4;
      margin: 0 !important;
      padding: 0 !important;
    "
  >
    <!-- HIDDEN PREHEADER TEXT -->
    <div
      style="
        display: none;
        font-size: 1px;
        color: #fefefe;
        line-height: 1px;
        font-family: 'Lato', Helvetica, Arial, sans-serif;
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
      "
    >
      Confirm your email.
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td bgcolor="#f4f4f4" align="center">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="center"
                valign="top"
                style="padding: 40px 10px 40px 10px"
              ></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#ffffff"
                align="center"
                valign="top"
                style="
                  padding: 40px 20px 20px 20px;
                  border-radius: 4px 4px 0px 0px;
                  color: #111111;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 48px;
                  font-weight: 400;
                  letter-spacing: 4px;
                  line-height: 28px;
                "
              >
                <h1 style="font-size: 48px; font-weight: 400; margin: 0">
                  Welcome!
                </h1>
                <img
                  src="https://res.cloudinary.com/jinncy/image/upload/v1662071930/phoenix_logo_dzdyzw.png"
                  width="135"
                  height="130"
                  style="display: block; border: 0px"
                />
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                align="center"
                bgcolor="#ffffff"
                style="
                  padding: 10px 24px 0;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                "
              >
                <p
                  style="
                    margin-top: -43px;
                    font-size: 14px;
                    font-weight: 300;
                    line-height: 23px;
                  "
                >
                  We're excited to have you get started. First, you need to
                  confirm your account. Just copy the code below and past it on
                  the email confirmation form.
                </p>
              </td>
            </tr>
            <!-- start copy -->
            <tr>
              <td
                align="center"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 12px;
                  font-weight: 600;
                "
              >
                <p style="margin-bottom: -20px">
                  Use the confirmation code below:
                </p>
              </td>
            </tr>
            <!-- start button -->
            <tr>
              <td align="left" bgcolor="#ffffff">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" bgcolor="#ffffff" style="padding: 12px">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="border-radius: 6px">
                            <p
                              style="
                                display: inline-block;
                                font-family: 'Source Sans Pro', Helvetica, Arial,
                                  sans-serif;
                                font-size: 35px;
                                color: #000;
                                text-decoration: none;
                                margin: 0;
                                border-radius: 6px;
                                line-height: normal;
                              "
                            >
                             ${code}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end button -->
            <!-- COPY -->

            <!-- start copy -->
            <tr>
              <td
                align="center"
                bgcolor="#ffffff"
                style="
                  padding: 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 12px;
                  font-weight: 600;
                "
              >
                <p style="margin-top: -20px; text-align: center">
                  Code expires in 5 minutes;
                </p>
              </td>
            </tr>
            <!-- end copy -->
            <tr>
              <td
                bgcolor="#ffffff"
                align="left"
                style="
                  padding: 0px 30px 40px 30px;
                  border-radius: 0px 0px 4px 4px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 18px;
                  font-weight: 400;
                  line-height: 25px;
                "
              >
                <p style="margin: 0">Cheers,<br />PhoenixCap Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <!-- start footer -->
      <tr>
        <td align="center">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
            align="center"
          >
            <!-- start permission -->
            <tr>
              <td
                align="center"
                bgcolor="#ffffff"
                style="
                  padding: 12px 24px;
                  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
                  font-size: 12px;
                  line-height: 20px;
                  color: #666;
                "
              >
                <p style="margin-top: -10px">
                  This is an automated email; if you received it in error, no
                  action is required. For more information, please visit
                  <a href="#">phoenixcapng Support.</a>
                </p>
              </td>
            </tr>
            <!-- end permission -->
          </table>
          <!-- end body -->
        </td>
      </tr>
      <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px">
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px"
          >
            <tr>
              <td
                bgcolor="#f4f4f4"
                align="left"
                style="
                  padding: 0px 30px 30px 30px;
                  color: #666666;
                  font-family: 'Lato', Helvetica, Arial, sans-serif;
                  font-size: 14px;
                  font-weight: 400;
                  line-height: 18px;
                "
              >
                <br />
                <p style="margin: 0">
                  If these emails get annoying, please feel free to
                  <a
                    href="#"
                    target="_blank"
                    style="color: #111111; font-weight: 700"
                    >unsubscribe</a
                  >.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>



    `;
};
