import { HttpService } from "../Core";
import { AuthHttpService } from "./Auth";
import { CategoryHttpService } from "./Category";
import { CourseHttpService } from "./Course";
import { VideosHttpService } from "./Video";

export function httpClientService(options) {
  const httpService = HttpService(options);

  return {
    auth: AuthHttpService({ httpService }),
    category: CategoryHttpService({ httpService }),
    course: CourseHttpService({ httpService }),
    video: VideosHttpService({httpService}),
  }
}
