import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import "express-async-handler";
import "express-async-errors"
import "dotenv/config";
import connectDB from "./config/connect";
import categoryRouter from "./routes/category";
import subCategoryRouter from "./routes/subcategory";
import itemRouter from "./routes/item";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "connect-src": ["'self'"],
      },
    },
  })
);
app.use(cors());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/subCategory", subCategoryRouter);
app.use("/api/v1/item", itemRouter);

app.get("/", (req, res) => {
  res.send("Menu management app is running...");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI as string);
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

export default app;
