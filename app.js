import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";
import cors from "cors";

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const baseUrl = "https://dart-frog-backend-pqzj8oe-ianshaloom.globeapp.dev";
const endpoint = "/api/token";
const url = baseUrl + endpoint;

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

initializeApp({
  credential: applicationDefault(),
  projectId: "intercess-77637",
});

app.post("/send", function (req, res) {
  // function to fetch tokens from an API using a get request
  const fetchTokens = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Extract only the token values using map
      const tokens = data.map((item) => Object.values(item)[0]);

      return tokens;
    } catch (error) {
      console.log(error);
    }
  };

  // notification title and body
  const title = req.body.title;
  const body = req.body.body;

  // construct notification
  const notification = {
    title: title,
    body: body,
  };

  fetchTokens()
    .then((tokens) => {
      const message = {
        notification: notification,
        token: tokens,
      };

      return getMessaging().sendEachForMulticast(message); // Allow error propagation
    })
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = response.responses
          .filter((resp) => !resp.success)
          .map((resp, idx) => tokens[idx]); // Access original tokens
        // Store failed tokens persistently (if needed)
        console.error("Failed tokens:", failedTokens);
      }
      console.log(
        "Number of messages sent successfully:",
        response.successCount
      );
    })
    .catch((error) => {
      console.error("Error sending messages:", error);
    });
  
  // Send response to client

  res.status(200).json({
    message: "Successfully sent message",
  });


  
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
