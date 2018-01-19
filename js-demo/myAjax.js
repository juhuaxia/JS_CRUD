/**
* params:
*     method:string,
*     url:string,
*     async:boolean,
*     dataType:string,
*     withCredentials: boolen,
*     header:object,
*     data:string/formdata,
*     timeout: number,
*     success:function,
*     error:function
* 
*/

window.MyAjax = function(params){
    this.options = params || {}
    this._ajaxStaticOptions = {
        'contentType': {
            'form': 'application/x-www-form-urlencoded; charset=utf-8',
            'json': 'application/json; charset=utf-8',
            'multipart': 'multipart/form-data; charset=utf-8'
        }
    }
    this._init();
}
MyAjax.prototype = {
    _init:function(){
        var xhr = this.xhr =  new XMLHttpRequest();
        
        xhr.checkedOptions = this._checkAjaxOptions();

        xhr.onreadystatechange = function(){
            if(this.readyState === 4){
                if(this.status == 200){
                    if(xhr.checkedOptions['dataType'] === '' || xhr.checkedOptions['dataType'] === 'text') {
                        xhr.checkedOptions.success(this.responseText, this);
                    } else if(xhr.checkedOptions['dataType'] === 'json') {
                        if(Object.prototype.toString.call(this.response) === '[object Object]') {
                            xhr.checkedOptions.success(this.response, this);
                        } else {
                            var json = this.response;
                            try { json = JSON.parse(this.response); } catch (e) { }
                            xhr.checkedOptions.success(json, this);
                        }
                    }
                }
            }else{
                xhr.checkedOptions['error'] && xhr.checkedOptions['error'](this.statusText, this)
            }
        }

        var method = xhr.checkedOptions.method,
            url = xhr.checkedOptions.url,
            async = xhr.checkedOptions.async;
        if(method === 'get') {
            var d = this._handleSendType(xhr.checkedOptions.data, 'form');
            var url = url.replace(/((\?*&*|&*\?*)#\w*)$/, '');
            url = url + (url.indexOf('?') < 0 ? (d ? '?' : '') : '') + d;
            xhr.open(method, url, async);
            var header = xhr.checkedOptions['header'];
            for(var s in header) {
                xhr.setRequestHeader(s, header[s]);
            }
            xhr.send();
        }else if(method === 'post') {
            xhr.open(method, url, async);
            var dataType = 'form';
            var header = data['header'];
            for(var s in header) {
                if(s.toLowerCase() === 'contenttype') {
                    var contenttype = this._ajaxStaticOptions['contentType'][header[s]] || header[s];
                    if(contenttype.indexOf('x-www-form-urlencoded') > -1) {
                        xhr.setRequestHeader('Content-Type', contenttype);
                        dataType = 'form';
                    } else if(contenttype.indexOf('json') > -1) {
                        xhr.setRequestHeader('Content-Type', contenttype);
                        dataType = 'json';
                    } else {
                        dataType = null;
                    }
                    continue;
                }
                xhr.setRequestHeader(s, header[s]);
            }
            xhr.send(serializeSendData(xhr.checkedOptions.data, dataType));
        }
    },
    _checkAjaxOptions:function(){
        var checkedOptions = {};
        if(!this.options['url'] || typeof this.options['url'] !== 'string'){
            throw new Error('url is invalid');
        }else{
            checkedOptions.url = this.options['url'];
        }
        if(this.options['timeout'] !== undefined){
            this.xhr.timeout = checkedOptions.timeout =  parseInt(this.options[timeout]);
        }
        checkedOptions.method = this.options['method'] || 'get';
        if(this.options['withCredentials'] !== undefined){
            this.xhr.withCredentials = checkedOptions.withCredentials = this.options['withCredentials'];
        }
        if(this.options['dataType']&&typeof this.options['dataType'] == 'string'){
            this.xhr.responseType = checkedOptions.dataType = this.options[dataType].toLowerCase();
        }else{
            this.xhr.responseType = checkedOptions.dataType = '';
        }
        if(Object.prototype.toString.call(this.options['header']) === '[object Object]' ){
            checkedOptions.header = this.options['header'];
        }else{
            checkedOptions.header = {};
        }
        checkedOptions.async = !!this.options['async'];
        checkedOptions.data = this.options['data'] || null;
        if(this.options['success'] && (typeof this.options['success'] !== 'function')){
            throw new Error('typeof success is not function');
        }else{
            checkedOptions.success = this.options['success'];
        }
        if(this.options['error'] && (typeof this.options['error'] !== 'function')){
            throw new Error('typeof error is not function');
        }else{
            checkedOptions.error = this.options['error'];
        }

        return checkedOptions;
    },
    _handleSendType:function(data,type){
        if(data){
            if(Object.prototype.toString.call(data) === '[object Object]') {
                if(type === 'json') {
                    return JSON.stringify(data);
                } else if(type === 'form' || type === null) {
                    var dataArr = [];
                    for(var s in data) {
                        if(data[s]) {
                            dataArr.push(s + '=' + data[s]);
                            continue;
                        }
                        dataArr.push(s);
                    }
                    return dataArr.join('&');
                } else {
                    return data;
                }
            } else {
                return data;
            }
        }else{
            return '';
        }
    }
}