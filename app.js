import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";
import cors from "cors";

process.env.GOOGLE_APPLICATION_CREDENTIALS;

const baseUrl = "https://dart-frog-backend-axoq040-ianshaloom.globeapp.dev";
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

app.post("/send", async function (req, res) {
  // function to fetch tokens from an API using a get request
  const fetchTokens = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("API response data:", data); // Log the entire response

      // Check for empty data
      if (!data || !data.length) {
        console.warn("API response contains no tokens");
        return []; // Return empty array to indicate no tokens
      }

      // Extract only the token values using map
      const tokens = data.map((item) => Object.values(item)[0]);

      return tokens;
    } catch (error) {
      console.error("Error fetching tokens:", error);
      // Consider returning an error object here1
    }
  };

  const tokens = await fetchTokens();
  console.log("Tokens after fetching:", tokens);

  // notification title and body
  const title = req.body.title;
  const body = req.body.body;

  // construct notification
  const notification = {
    title: title,
    body: body,
  };

  // construct message
  let message = {
    notification: notification,
    tokens: [],
  };

  message.tokens = tokens;

  // send message
  try {
    //
    getMessaging()
      .sendEachForMulticast(message)
      .then((response) => {
        // Success logic
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
        // Send success response here after successful message sending
        res.status(200).json({
          message: "Successfully sent message",
        });
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        res.status(400);
        res.send(error);
        console.log("Error sending message:", error);
      });
  } catch (error) {
    console.error("Error sending message:", error);
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
