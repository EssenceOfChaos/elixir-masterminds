let express = require("express");
let bodyParser = require("body-parser");
let mongodb = require("mongodb");
let ObjectID = mongodb.ObjectID;
// const cors = require('cors');

let SCORES_COLLECTION = "scores";
// const Score {
//   user: new ObjectID()
//   score: Number
// }


const app = express();
app.use(bodyParser.json());
// app.use(cors());
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
let db;

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = client.db();
  console.log("Database connection ready");

  // Initialization
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({
    "error": message
  });
}

/*  "/api/scores"
 *    GET: finds all scores
 *    POST: creates a new score
 */

app.get("/api/scores", function (req, res) {
  db.collection(SCORES_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get scores.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/scores", function (req, res) {
  var newScore = req.body;
  newScore.createDate = new Date();

  if (!req.body) {
    handleError(res, "Invalid input", "Must provide score", 400);
  } else {
    db.collection(SCORES_COLLECTION).insertOne(newContact, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new score.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/scores/:id"
 *    GET: find score by id
 *    PUT: update score by id
 *    DELETE: deletes score by id
 */

app.get("/api/scores/:id", function (req, res) {});

app.put("/api/scores/:id", function (req, res) {});

app.delete("/api/scores/:id", function (req, res) {});
