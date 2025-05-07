
const bodyParser = require("../utils/bodyParser");
const errorHandler = require("../middleware/errorHandler");

exports.createClient = async (req, res) => {
  try {
    const data = await bodyParser(req);
    const newClient = await Client.save(data);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newClient));
  } catch (err) {
    errorHandler(res, 500, err.message);
  }
};
