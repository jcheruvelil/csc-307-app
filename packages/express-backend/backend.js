import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};

const findUserByNameandJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["job"] === job && user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUser = (userid) => {
  const idx = users["users_list"].findIndex((user) => user["id"] === userid);
  users["users_list"].splice(idx, 1);
};

const generateID = () => {
  const randomNum = Math.random();
  const randomID = randomNum.toString().substring(3,9);
  return randomID;
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
  
app.get("/users", (req, res) => {   //users?name=Mac&job=Professor
    const name = req.query.name;
    const job = req.query.job;
    if(name != undefined & job != undefined){
      let result = findUserByNameandJob(name, job);
      result = { users_list: result};
      res.send(result)
    }
    else if (job === undefined && name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const userid = generateID();
    const userwithid = {id: userid, ...userToAdd};
    addUser(userwithid);
    res.status(201).send(userwithid);
});

app.delete("/users/:id", (req, res) => {
  const userToDelete = req.params["id"];
  deleteUser(userToDelete);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});