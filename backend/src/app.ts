import express, { Express } from "express";
import setupRoutes from "./routes";

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,DELETE,OPTIONS,PUT,PATCH",
      );
      res.header("Access-Control-Allow-Headers", "*");
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private routes(): void {
    setupRoutes(this.app);
  }

  public start(PORT: number) {
    return this.app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  }

  public stop() {
    this.app.listen().close();
  }
}

export default App;
