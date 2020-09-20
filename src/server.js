// Basic includes
const http = require('http');
const url = require('url');
// const query = require('querystring');
const pageHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

// Find a valid port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': pageHandler.getIndex,
    '/style.css': pageHandler.getStyle,
    '/getUsers': jsonHandler.getUsers,
    '/updateUser': jsonHandler.updateUser,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

// Request response code
const onRequest = (request, response) => {
  // Get parsed request information
  const parsedUrl = url.parse(request.url);

  // Print out information for the request
  console.dir(parsedUrl.pathname);
  console.dir(request.method);

  // Call relevant method
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
  // Request URL is not found
    urlStruct[request.method].notFound(request, response);
  }
};

// Call HTTP to set up request response function
http.createServer(onRequest).listen(port);

// Basic print for port
console.log(`Listening on 127.0.0.1: ${port}`);
