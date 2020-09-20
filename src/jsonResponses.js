// Object that holds all users
const users = {};

// Generic helper for sending some sort of JSON response
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// Generic helper for sending some sort of JSON response
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

// Get users object
const getUsers = (request, response) => {
  // Object to send
  const responseJSON = {
    users,
  };

  // Use helper function
  return respondJSON(request, response, 200, responseJSON);
};

// Get HEAD for users object
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

// Error for GET request
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found!',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

// Error for HEAD request
const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

// Temporary method for creating a user
const updateUser = (request, response) => {
  const newUser = {
    createdAt: Date.now(),
  };

  users[newUser.createdAt] = newUser;

  return respondJSON(request, response, 201, newUser);
};

module.exports = {
  getUsers,
  getUsersMeta,
  notFound,
  notFoundMeta,
  updateUser,
};
