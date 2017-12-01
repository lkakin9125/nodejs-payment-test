import $ from 'jquery';
import Config from '../config';
var baseUrl = Config.BASE_URL
function ajax(url, method, param, err, suc, log = true) {
    if(log){
        console.log(`ajax, url: ${url}`);
        console.log(`ajax, method: ${method}`);
        console.log(`ajax, param`,param);
    }
    $.ajax({
        url: url,
        method: method,
        data: param,
        success: function (result, status, xhr) {
            if (log)
                console.log(`AJAX (SUCCESS):\nStatus: ${status}\nResult:\n${JSON.stringify(result)}`);
            try {
                suc(JSON.parse(result));
            } catch (error) {
                suc(result);
            }
        },
        error: function (xhr, status, error) {
            if (log)
                console.log(`AJAX (FAIL):\nStatus: ${status}\nError:\n${error}`);
            if (err) {
                err(error);
            }
        }
    });
}

function ajaxApi(apiEndpoint, method, param, err, suc, log = true) {
    ajax(`${baseUrl}${apiEndpoint}`, method, param, err, suc, log)
}

export default {
    ajax,
    ajaxApi,
    baseUrl
};
