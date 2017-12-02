import $ from 'jquery';
import Config from '../config';

var baseUrl = Config.BASE_URL

/**
 * do the ajax
 * @param {string} url ajax url
 * @param {string} method ajax http method
 * @param {object} param ajax parameters
 * @param {function} onErr ajax error callback
 * @param {function} onSucc ajax success callback
 * @param {bool} shouldLog if true, log the param and result
 */
function ajax(url, method, param, onErr, onSucc, shouldLog = true) {
    if (shouldLog) {
        console.log(`ajax, url: ${url}`);
        console.log(`ajax, method: ${method}`);
        console.log(`ajax, param`, param);
    }
    $.ajax({
        url: url,
        method: method,
        data: param,
        success: function (result, status, xhr) {
            if (shouldLog)
                console.log(`AJAX (SUCCESS):\nStatus: ${status}\nResult:\n${JSON.stringify(result)}`);
            if (result.status == 1) {
                onSucc(result, status, xhr);
            } else {
                onErr(result, status, xhr);
            }
        },
        error: function (xhr, status, error) {
            if (shouldLog)
                console.log(`AJAX (FAIL):\nStatus: ${status}\nError:\n${error}`);
            if (onErr) {
                onErr(error);
            }
        }
    });
}
/**
 * a short cut to access end point, which is a wrapper of ajax
 * @param {string} apiEndpoint endpoint url
 * @param {string} method ajax http method
 * @param {object} param ajax parameters
 * @param {function} onErr ajax error callback
 * @param {function} onSucc ajax success callback
 * @param {bool} shouldLog if true, log the param and result
 */
function ajaxApi(apiEndpoint, method, param, err, suc, log = true) {
    ajax(`${baseUrl}${apiEndpoint}`, method, param, err, suc, log)
}

export default {
    ajax,
    ajaxApi,
    baseUrl,
};
