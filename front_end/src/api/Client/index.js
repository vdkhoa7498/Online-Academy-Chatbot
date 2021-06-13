import { HttpService } from "../Core";
import { AuthHttpService } from "./Auth";

export function httpClientService(options) {
  const httpService = HttpService(options);

  return {
    auth: AuthHttpService({ httpService }),
  }
}
