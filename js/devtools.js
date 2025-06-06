chrome.devtools.network.onRequestFinished.addListener(function (request) {
  if (
    request.request.method === "PUT" &&
    request.request.url.includes("/api/quiz/") &&
    request.request.url.endsWith("/answer")
  ) {
    request.getContent((body) => {
      // backgroundへ転送
      chrome.runtime.sendMessage({
        type: "resend",
        url: request.request.url,
        method: "PUT",
        headers: request.request.headers,
        body: body
      });
    });
  }
});
