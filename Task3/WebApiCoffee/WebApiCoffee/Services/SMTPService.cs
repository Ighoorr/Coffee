﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;
using MailKit.Net.Imap;
using MailKit.Security;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Util.Store;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Util;
using static Google.Apis.Auth.OAuth2.LocalServerCodeReceiver;
using System.Threading;

namespace WebApiCoffee.Services
{
    public class SMTPService
    {
        private const string DefaultClosePageResponse =
@"<html>
  <head><title>OAuth 2.0 Authentication Token Received</title></head>
  <body>
    Received verification code. You may now close this window.
    <script type='text/javascript'>
      // This doesn't work on every browser.
      window.setTimeout(function() {
          this.focus();
          window.opener = this;
          window.open('', '_self', ''); 
          window.close(); 
        }, 1000);
      //if (window.opener) { window.opener.checkToken(); }
    </script>
  </body>
</html>";
        public async void SendEmail(string sender, string receiver)
        {
            var email = new MimeMessage();

            email.From.Add(new MailboxAddress("Sender Name", sender));
            email.To.Add(new MailboxAddress("Receiver Name", receiver));

            email.Subject = "Testing out email sending";
            email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = "<b>Hello all the way from the land of C#</b>"
            };

            using (var smtp = new SmtpClient())
            {
                smtp.Connect("smtp.gmail.com", 587, false);

                await OAuthAsync(smtp);

                smtp.Send(email);
                smtp.Disconnect(true);
            }
        }

        static async Task OAuthAsync(SmtpClient client)
        {
            var clientSecrets = new ClientSecrets
            {
                ClientId = "**ClientId.apps.googleusercontent.com**",
                ClientSecret = "**ClientSecret**"
            };

            var codeFlow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                DataStore = new FileDataStore("CredentialCacheFolder", false),
                Scopes = new[] { "https://mail.google.com/" },
                ClientSecrets = clientSecrets
            });

            // Note: For a web app, you'll want to use AuthorizationCodeWebApp instead.
            var codeReceiver = new LocalServerCodeReceiver(DefaultClosePageResponse, CallbackUriChooserStrategy.ForceLocalhost);
            var authCode = new AuthorizationCodeInstalledApp(codeFlow, codeReceiver);

            var credential = await authCode.AuthorizeAsync("@gmail.com", CancellationToken.None);

            if (credential.Token.IsExpired(SystemClock.Default))
                await credential.RefreshTokenAsync(CancellationToken.None);

            // Note: We use credential.UserId here instead of GMailAccount because the user *may* have chosen a
            // different GMail account when presented with the browser window during the authentication process.
            SaslMechanism oauth2;

            if (client.AuthenticationMechanisms.Contains("OAUTHBEARER"))
                oauth2 = new SaslMechanismOAuthBearer(credential.UserId, credential.Token.AccessToken);
            else
                oauth2 = new SaslMechanismOAuth2(credential.UserId, credential.Token.AccessToken);

            await client.AuthenticateAsync(oauth2);
        }
    }
}
