import ajax from 'common/js/ajax.js';

export const getInfo = params => ajax.get('device/deviceList', params).then(res => res);