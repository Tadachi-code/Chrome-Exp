let latestPutRequest = null;

chrome.devtools.network.onRequestFinished.addListner(request => {
    if (request.request.method === "PUT" && request.request.url.includes("answer")) {
        request.getContent(body => {
            latestPutRequest = {
                url: request.request.url,
                headers: request.requesr.headers,
                body: body
            };
        }
    }
});
