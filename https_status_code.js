const httpStatusCodes = [
  {
    code: 200,
    phrase: 'OK',
    type: 'Success',
    description: 'The request succeeded and the server returned the expected data.',
    descriptionVi: 'Yêu cầu thành công và máy chủ trả về đúng dữ liệu mong đợi.',
  },
  {
    code: 201,
    phrase: 'Created',
    type: 'Success',
    description: 'The server created a new resource as a result of the request.',
    descriptionVi: 'Máy chủ đã tạo một tài nguyên mới để phản hồi cho yêu cầu.',
  },
  {
    code: 204,
    phrase: 'No Content',
    type: 'Success',
    description: 'The request succeeded but there is no content in the response body.',
    descriptionVi: 'Yêu cầu thành công nhưng phản hồi không có nội dung trả về.',
  },
  {
    code: 301,
    phrase: 'Moved Permanently',
    type: 'Redirect',
    description: 'The resource now lives at a new URL that should be used in future requests.',
    descriptionVi: 'Tài nguyên đã được chuyển vĩnh viễn sang URL mới và nên dùng URL đó cho các yêu cầu tiếp theo.',
  },
  {
    code: 302,
    phrase: 'Found',
    type: 'Redirect',
    description: 'The resource temporarily resides under a different URL.',
    descriptionVi: 'Tài nguyên tạm thời nằm ở URL khác và có thể quay lại URL cũ sau.',
  },
  {
    code: 304,
    phrase: 'Not Modified',
    type: 'Redirect',
    description: 'The cached version is still valid so the response body is omitted.',
    descriptionVi: 'Phiên bản được cache vẫn hợp lệ nên phản hồi không gửi lại nội dung.',
  },
  {
    code: 400,
    phrase: 'Bad Request',
    type: 'Client Error',
    description: 'The server cannot process the request because it is malformed or invalid.',
    descriptionVi: 'Máy chủ không thể xử lý vì yêu cầu sai định dạng hoặc chứa dữ liệu không hợp lệ.',
  },
  {
    code: 401,
    phrase: 'Unauthorized',
    type: 'Client Error',
    description: 'Authentication is required before the request can be processed.',
    descriptionVi: 'Cần xác thực trước khi máy chủ chấp nhận xử lý yêu cầu.',
  },
  {
    code: 403,
    phrase: 'Forbidden',
    type: 'Client Error',
    description: 'The credentials are known but the server refuses to fulfil the request.',
    descriptionVi: 'Thông tin xác thực hợp lệ nhưng máy chủ từ chối thực hiện yêu cầu.',
  },
  {
    code: 404,
    phrase: 'Not Found',
    type: 'Client Error',
    description: 'The requested resource could not be located on the server.',
    descriptionVi: 'Không tìm thấy tài nguyên mà yêu cầu đòi hỏi trên máy chủ.',
  },
  {
    code: 409,
    phrase: 'Conflict',
    type: 'Client Error',
    description: 'The request conflicts with the current state of the resource.',
    descriptionVi: 'Yêu cầu xung đột với trạng thái hiện tại của tài nguyên.',
  },
  {
    code: 500,
    phrase: 'Internal Server Error',
    type: 'Server Error',
    description: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
    descriptionVi: 'Máy chủ gặp lỗi không lường trước nên không thể hoàn thành yêu cầu.',
  },
  {
    code: 502,
    phrase: 'Bad Gateway',
    type: 'Server Error',
    description: 'The server received an invalid response from an upstream server while acting as a gateway.',
    descriptionVi: 'Máy chủ đóng vai trò gateway nhận phản hồi không hợp lệ từ máy chủ trung gian.',
  },
  {
    code: 503,
    phrase: 'Service Unavailable',
    type: 'Server Error',
    description: 'The server is temporarily unable to handle the request, often due to maintenance or overload.',
    descriptionVi: 'Máy chủ tạm thời không thể xử lý, thường do bảo trì hoặc quá tải.',
  },
  {
    code: 504,
    phrase: 'Gateway Timeout',
    type: 'Server Error',
    description: 'The upstream server failed to send a timely response while acting as a gateway.',
    descriptionVi: 'Máy chủ trung gian không nhận được phản hồi đúng hạn từ máy chủ phía trên.',
  },
];

function getStatusInfo(code){
    return httpStatusCodes.find(data => {return data.code === parseInt(code)});
};
module.exports = {
  httpStatusCodes,
  getStatusInfo,
};