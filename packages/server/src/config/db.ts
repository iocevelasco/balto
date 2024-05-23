import { set, connect as _connect } from "mongoose";
import config from "./commons";
set("debug", config.monDebug);

async function connect(url: string) {
  await _connect(url)
    .then(() => console.log("[db] Connection successful", url))
    .catch((err) => {
      console.log(`DB Connection Error: ${err.message}`);
    });
}

export default connect;
