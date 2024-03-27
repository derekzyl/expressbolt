import { CustomMessageI } from "./interface.crud";
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
declare function responseMessage<V>(msg: CustomMessageI<V>, config?: "development" | "production"): {
    message: string;
    data: V;
    success: true;
    doc_length: number | undefined;
    error?: undefined;
    stack?: undefined;
} | {
    message: string;
    error: any;
    success: false;
    stack: any;
    data?: undefined;
    doc_length?: undefined;
};
export default responseMessage;
