import express from "express";
import { prisma } from "db/client"; 

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json(user);
});

app.post("/users", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      userName: req.body.userName,
      password: req.body.password,
    },
  });
  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      userName: req.body.userName,
      password: req.body.password,
    },
  });
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json(user);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});