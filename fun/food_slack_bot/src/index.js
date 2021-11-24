const {
  client,
  gsrun,
  menuAttachments,
  recommentAttachments,
  FOOD_SLACK_URL_DICT,
} = require("./food");

process.env.TZ = "Asia/Seoul";

exports.handler = async (event) => {
  const path = event.path;

  const data = await gsrun(client);

  const buildResponse = (res) => ({
    statusCode: 200,
    body: typeof res === "string" ? res : JSON.stringify(res),
  });

  const handleGet = () => {
    return buildResponse("Success GET");
  };

  const handlePost = () => {
    if (path === FOOD_SLACK_URL_DICT.base) {
      return buildResponse(menuAttachments);
    }

    if (path === FOOD_SLACK_URL_DICT.interactive) {
      const body = JSON.parse(
        decodeURIComponent(event.body).replace("payload=", "")
      );

      if (body.callback_id === "type") {
        const typeVal = body.actions[0].value;
        if (data[body.actions[0].value]) {
          return buildResponse(recommentAttachments);
        }
      }
    }
  };

  // handle event
  switch (event.httpMethod) {
    case "GET":
      handleGet();
    case "POST":
      handlePost();
  }

  return {
    statusCode: 400,
    body: "unknown httpMethod",
  };
};
