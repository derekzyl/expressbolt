/**
 *
 * @param {CustomMessageI} msg
 * @returns
 */
/**
 * The function `responseMessage` takes in a custom message object and a configuration option, and
 * returns a response object based on the success status of the message.
 * @param msg - The `msg` parameter is an object of type `CustomMessageI<V>`. It contains the following
 * properties:
 * @param {"development" | "production"} [config=development] - The `config` parameter is a string that
 * specifies the environment in which the function is being executed. It can have two possible values:
 * "development" or "production". By default, it is set to "development".
 * @returns an object with different properties based on the value of `msg.success_status`.
 */
function responseMessage(msg, config = "production") {
    switch (msg.success) {
        case true:
            return {
                message: msg.message,
                data: msg.data,
                success: msg.success,
                doc_length: msg.doc_length,
            };
        case false:
            return {
                message: msg.message,
                error: msg.error,
                success: msg.success,
                stack: config === "development" ? msg.stack : {},
            };
    }
}
export default responseMessage;
//# sourceMappingURL=responseMessage.js.map