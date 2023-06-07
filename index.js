import express from "express";
import { router as AuthRoutes } from "./AuthRoutes";

const app = express();
const PORT = 4000;

app.use("/api/user", AuthRoutes);

app.listen(PORT, () => console.log(`Running server on port : ${PORT}`));


