function encode(text) {
    return decodeURI(encodeURI(text.replace(/</g, '&lt;').replace(/>/g, '&gt;')).replace(/%0D%0A/g, " "));
}

function ecode(text) {
    return text.replace(/%0D%0A/g, " ");
}
