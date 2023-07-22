const express = require("express");
const spotifyWebApi = require("spotify-web-api-node");
const app = express();

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new spotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "bcbf9b1091004b7392fc119fdb299f40",
    clientSecret: "9c66a77e728946dd98c58b66fd2cebca",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});
