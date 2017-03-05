# ExampleResponsiveEmail

This repo contains example responsive emails that can be used as a base to create your own responsive emails.

To add images, they need to be sent as attachements along with the email. If you are using NodeJS to send emails I recommend using the free <a href="https://github.com/eleith/emailjs" target="_blank">`emailjs`</a> library to send emails and attachments.

The NodeJS send simple email application is also available in this repo. Stored within the `ExampleApplication` folder. To run the app;
  - Run `npm install`
  - Run `nodemon server.js`
  
Requests can be sent to the `POST v1/email` endpoint with a request body such as;
```
{
  "type": "contact",
  "firstName": "Jordan",
  "lastName": "Lapointe",
  "email": "example@example.com"
}
```
