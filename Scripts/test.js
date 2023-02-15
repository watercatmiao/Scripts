var req = '--Boundary+0DC9951010D4B761\n' +
    'Content-Disposition: form-data; name="data"\n' +
    '\n' +
    'FnOhG2yjzHrw889IAznh02v+RsEzs0iJG8AwRev+gwo=\n' +
    '--Boundary+0DC9951010D4B761\n' +
    'Content-Disposition: form-data; name="handshake"\n' +
    '\n' +
    'v20210601\n' +
    '--Boundary+0DC9951010D4B761--\n';
console.log(parseBatch(req))

function parseBatch(responseCollection) {
    var items = [];

    var boundary = getBatchSeparator(responseCollection);

    var responseLines = responseCollection.data.split('--' + boundary);

    _.forEach(responseLines,function (response) {
        var startJson = response.indexOf('{');
        var endJson = response.lastIndexOf('}');

        if (startJson < 0 || endJson < 0) {
            return;
        }

        var responseJson = response.substr(startJson,(endJson - startJson) + 1);

        var item = angular.fromJson(responseJson);

        items.push(item);
    });

    return items;
}

function getBatchSeparator(response) {
    var headers = response.headers();

    if (!headers['content-type'])
        return ''; //would probably be bad if this happens,but not sure it ever will.

    var components = headers['content-type'].split(';');

    var boundary = _.find(components,function (o) { return _.startsWith(_.trim(o),'boundary=') });

    boundary = _.replace(boundary,'boundary=','');

    boundary = _.trim(boundary,'; ');

    return boundary;
}