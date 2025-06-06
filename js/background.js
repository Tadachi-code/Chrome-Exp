chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "resend") {
    fetch(msg.url, {
      method: msg.method,
      headers: msg.headers.reduce((acc, h) => {
        acc[h.name] = h.value;
        return acc;
      }, {}),
      body: msg.body
    }).then(res => {
      console.log("Re-sent request:", res.status);
    });
  }
});
