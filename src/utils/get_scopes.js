/**
 *  take a string of scopes separeted by ','
 *  and return an array of scopes
 */
function getScopes() {
  const scopes = process.env.SCOPES;

  return scopes.split(",");
}

module.exports = {
  getScopes,
};
