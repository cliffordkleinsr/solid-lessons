import { createMiddleware } from "@solidjs/start/middleware";
import { createCSRFProtection, generateCSRFCOOKIE } from "./csrf-protection";
("use server");
export default createMiddleware({
  onRequest: [createCSRFProtection, generateCSRFCOOKIE],
  // todo
  // console.log("Request received:", event.request.url);
  // event.locals.startTime = Date.now();
  onBeforeResponse: (event) => {
    //todo
    // const endTime = Date.now();
    // const duration = endTime - event.locals.startTime;
    // console.log(`Request took ${duration}ms`);
  },
});
