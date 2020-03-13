// 自己封装的ajax
export default function ajax(options) {
    const xhr = new XMLHttpRequest()
    xhr.open('post', options.action, true)
    const fd = new FormData() // h5用来上传文件的api
    fd.append(options.filename, options.file)
    xhr.onerror = function(err) {
        options.onError(err)
    }
    xhr.onload = function() {
        const text = xhr.responseText || xhr.response
        options.onSuccess(JSON.parse(text))
    }
    xhr.upload.onprogress = function(e) {
        // console.log(e, 'e')
        if(e.total > 0) {
            e.percent = e.loaded / e.total * 100
        }
        options.onProgress(e)
    }
    xhr.send(fd)
    return xhr
}