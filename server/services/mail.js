
const nodemailer = require('nodemailer');


const user = {
    mail: process.env.MAIL,
    auth: process.env.MAIL_AUTH,
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_SERVER_PORT,
}

/**
 * 
 * To get an App Password for your Gmail account, follow these detailed steps:

Note: You’ll need to have two-step verification enabled on your Gmail account before generating an App Password. If you haven’t enabled it, do so first by going to your Google Account settings.

Access Your Google Account:
Start by visiting the Google Account management page. You can do this by navigating to https://myaccount.google.com/.
Sign In: Sign in to the Google Account associated with the Gmail address you want to use for sending emails programmatically.
Security: In the left sidebar, click on “Security.”
Scroll down to How you sign in to google and click on 2-step verificaiton.
App Passwords: Scroll down to “App passwords.” Click on “App passwords.” You may be prompted to re-enter your password for security purposes.
App name: Enter a custom name for this App Password. It helps you identify it later, so choose something related to the application or use case where you plan to use this App Password.
Create: Click the “Create” button. Google will create a unique 16-character App Password for your custom application/device.} email 
 *  
 */
/**
 * 
 * If needed additional email validation - use special email validation service,
 * like https://elasticemail.com/
 */
/* We can use panda.knowledger.guru emails,
  so the host will be panda.knowledger.guru and the port 465 */
/* Also we could organize for ourselves some email from email server */

const mail = async (email, subject, message) => {
    console.log('Mailing...............');

    const transporterObj = user.service === 'gmail' ? 
                                    {
                                      service: 'gmail',
                                      auth: {
                                          user: user.mail,
                                          pass: user.auth
                                      }
                                    } :
                                    {
                                      host: user.host,
                                      port: user.port,
                                      secure: true,
                                      auth: {
                                          user: user.mail,
                                          pass: user.auth
                                      }
                                    }

    const transporter = nodemailer.createTransport(transporterObj);
    
    const mailOptions = {
        from: user.mail,
        to: email,
        subject,
        html: message
        //text: message
    };
    
    console.log(user)
    console.log(mailOptions)
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
       
        return { status: 'SUCCESS',
                    msg: info.response };
    } catch (err) {
            console.log(err);
            
            return { status: 'ERROR',
                        msg: err.message }
            
    } 
        
}

const getMailTemplateWithLink = (content, buttonUrl, buttonText) => {
    return `<!DOCTYPE html>
    <html>
    <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
      <div
        style="
          max-width: 400px;
          margin: 10px;
          background-color: #fafafa;
          padding: 25px;
          border-radius: 20px;
        "
      >
        <p style="text-align: left;">
          ${content}
        </p>
        <a href="${buttonUrl}" target="_blank">
          <button
            style="
              background-color: #444394;
              border: 0;
              width: 200px;
              height: 30px;
              border-radius: 6px;
              color: #fff;
            "
          >
            ${buttonText}
          </button>
        </a>
        <p style="text-align: left;">
          If you are unable to click the above button, copy paste the below URL into your address bar
        </p>
        <a href="${buttonUrl}" target="_blank">
            <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">
              ${buttonUrl}
            </p>
        </a>
      </div>
    </body>
  </html>`;
}

module.exports = { mail, getMailTemplateWithLink };