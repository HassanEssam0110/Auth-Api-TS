const HttpStatus = {
  OK: { code: 200, message: "OK" },
  CREATED: { code: 201, message: "Created" },
  DELETED: { code: 204, message: "Deleted" },
  BAD_REQUEST: { code: 400, message: "Bad Request" },
  VALIDATION_ERROR: { code: 400, message: "Validation Error" },
  INVALID_ID: { code: 400, message: "Invalid ID" },
  UNAUTHORIZED: { code: 401, message: "Unauthorized, Please login" },
  INVALID_TOKEN: { code: 401, message: "Invalid OR Expired Token" },
  INVALID_CREDENTIALS: { code: 401, message: "Invalid Credentials" },
  FORBIDDEN: { code: 403, message: "Forbidden, Access Denied" },
  NOT_FOUND: { code: 404, message: "Not Found" },
  NOT_FOUND_Route: { code: 404, message: "Route Not Found" },
  CONFLICT: { code: 409, message: "Already Exists" },
  SERVER_ERROR: { code: 500, message: "Something Went Wrong" },
} as const;

export { HttpStatus };
