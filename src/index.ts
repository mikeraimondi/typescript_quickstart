import "source-map-support/register";

import * as http from "http";

import App from "./App";

App.logger.info("server starting");

const port = normalizePort(process.env.PORT || 3000);
App.express.set("port", port);

const server = http.createServer(App.express);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: number | string): number | string | boolean {
  const portVal: number = (typeof val === "string") ? parseInt(val, 10) : val;
  if (isNaN(portVal)) {
    return val;
  } else if (portVal >= 0) {
    return portVal;
  } else {
    return false;
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = (typeof port === "string") ? "Pipe " + port : "Port " + "port";
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
  App.logger.info(`listening on ${bind}`);
}
