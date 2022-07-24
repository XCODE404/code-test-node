//*[START] RESPONSE API *****************************
//*Description:
//*Success and Error response for sending to frond-end
//*

//************************************
//*Function Name: success
//*Inputs & Arguments: message, results, statusCode
//*Type: string, object | array, number
//************************************
exports.success = (message, results, statusCode) => {
  return {
    message,
    error: false,
    status: statusCode,
    results
  };
};

//************************************
//*Function Name: error
//*Inputs & Arguments: message, statusCode
//*Type: string, number
//************************************
exports.error = (message, statusCode) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  // Get matched code
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message,
    status: statusCode,
    error: true
  };
};

