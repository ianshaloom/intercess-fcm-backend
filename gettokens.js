/* getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
        token: receivedToken,
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    }); */



      /* // fetch tokens then send message then catch errors
  fetchTokens()
    .then((tokens) => {
      // construct message

      const message = {
        notification: notification,
        token: tokens,
      };

      // send message

      getMessaging()
        .sendEachForMulticast(message)
        .then((response) => {
          //
          // count failures
          if (response.failureCount > 0) {
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
              if (!resp.success) {
                failedTokens.push(registrationTokens[idx]);
              }
            });
            console.log("List of tokens that caused failures: " + failedTokens);
          }
          // count successes
          if (response.successCount > 0) {
            console.log(
              "Number of messages that were sent successfully: " +
                response.successCount
            );
          }
          //
        });
      //
    })
    .catch((error) => {
      console.log("Error getting tokens", error);
    }); */

    


//   T H I S IS T E S T I N G 2

      /* fetchTokens()
    .then((tokens) => {
      console.log("Tokens:", tokens);
      // construct message
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
      // return error to client
      res.status(400).json({
        message: "Error sending message",
        error: error,
      });
    });

  // Send response to client

  res.status(200).json({
    message: "Successfully sent message",
  });
}); */