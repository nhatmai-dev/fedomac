const COMMON_MESSAGES = {
  MISSING_ENV_VARIABLE: (entityName) =>
    `ENV ${entityName} variable is required`,
  NOT_FOUND: (entityName) => `${entityName} not found`,
}

export { COMMON_MESSAGES }
