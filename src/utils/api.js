import _ from 'lodash';
import AntdSwal from '~/custom/AntSwal';
import queryString from 'query-string';
import { axiosClient } from '~/api/client';
export const paramsToStr = (params) => {
    // If params is null or an empty object
    if (!params || _.isEmpty(params)) return '';

    return '?' + queryString.stringify(params);
};

export const generateApi = (method = 'get', endpoint, params = {}, data = {}) => {
    const strParams = paramsToStr(params);
    const strData = JSON.stringify(data);
    const apiUrl = `${endpoint}${strParams}`;

    if (method === 'post') return axiosClient.post(apiUrl, strData);
    else if (method === 'put') return axiosClient.put(apiUrl, strData);
    else if (method === 'delete') return axiosClient.delete(apiUrl, strData);
    else return axiosClient.get(apiUrl, strData);
};
export const apiCaller = async (
    api,
    handleSuccess = (data) => {
        console.log(data);
    },
    handleError = defaultErrorHandler,
) => {
    try {
        const response = await api;
        handleSuccess(response.data);
        return response.data;

        // Catch error
    } catch (error) {
        // Handle errors in API response
        if (error?.response) {
            const resError = {
                data: error?.response?.data?.data,
                message: error?.response?.data?.message,
                status: error?.response?.data?.status,
            };
            handleError(resError);
            return resError;
        }
        // Handle other errors
        else {
            const resError = {
                error: error?.message,
                status: 500,
            };
            handleError(resError);
            return resError;
        }
    }
};

const defaultErrorHandler = function (error) {
    let message = '';
    console.log(error);

    if (error.message) {
        message = error.message;
    } else if (error.error) {
        message = error.error;
    } else {
        const keys = Object.keys(error.data);
        if (keys.length > 0) {
            message = error.data[keys[0]];
        }
    }

    AntdSwal.fire('Có lỗi xảy ra', message, 'error');
};
