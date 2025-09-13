export type StatusCode =
  // Success Responses
  | 200 // OK
  | 201 // CREATED
  | 204 // NO_CONTENT

  // Error Responses
  | 400 // BAD_REQUEST
  | 401 // UNAUTHORISED
  | 403 // FORBIDDEN
  | 404 // NOT_FOUND
  | 500; // INTERNAL_SERVER_ERROR
