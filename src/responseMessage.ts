
import { CustomMessageI } from './interface.crud';
/**
 *
 * @param {CustomMessageI} msg
 * @returns
 */
function responseMessage<V>(msg: CustomMessageI<V>) {
  switch (msg.success_status) {
    case true:
      return {
        message: msg.message,
        data: msg.data,
        success: msg.success_status,
        doc_length: msg.doc_length,
      };

    case false:
      return {
        message: msg.message,
        error: msg.error,
        success: msg.success_status,
        stack: config.env === 'development' ? msg.stack : {},
      };
    default:
      return null;
  }
}
export default responseMessage;
