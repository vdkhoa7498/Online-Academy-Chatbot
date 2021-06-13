import { HttpService } from "../Core";
import { AuthHttpService } from "./Auth";
import { CategoryHttpService } from "./Category";
import { CourseHttpService } from "./Course";

export function httpClientService(options) {
  const httpService = HttpService(options);

  return {
    auth: AuthHttpService({ httpService }),
    category: CategoryHttpService({ httpService }),
    course: CourseHttpService({ httpService })
  }
}
