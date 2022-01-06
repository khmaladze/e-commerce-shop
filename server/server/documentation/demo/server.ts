import { getSwaggerUiRouter } from "../open-api-documentation";
import app from "./app";
import config from "./swagger.config";

app.use(getSwaggerUiRouter(app, config));
app.listen(8080, () => {
  console.log("server started http://localhost:8080/docs");
});
