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