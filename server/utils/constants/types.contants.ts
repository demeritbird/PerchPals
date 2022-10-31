export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
  MASTER = 'master',
}

export type StatusCode =
  // Success Responses
  | 200 // OK
  | 201 // CREATED
  | 204 // NO_CONTENT

  // Error Responses
  | 401 // UNAUTHORISED
  | 403 // FORBIDDEN
  | 404; // NOT_FOUND
