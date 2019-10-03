const response = {
    Success : 1,
    Fail : 0  
}
const failureResponse = (status, info, error) => {
    responseData = {
        status: status,
        info: info,
        error: error
      }
      return responseData;
}

const successResponse = (status, info, data) => {
    responseData = {
        status: status,
        info: info,
        data: data
      }
      return responseData;
}
module.exports = {
    response,
    successResponse,
    failureResponse
}
