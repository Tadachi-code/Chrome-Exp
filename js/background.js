let latestPutRequest = null;
const targetPattern = /\/answer/i;
const resendCount = 3; //送信回数

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.method === "PUT" && targetPattern.test(details.url)) {
      const body = details.requestBody?.raw?.[0]?.bytes;
      if (body) {
        const decoder = new TextDecoder("utf-8");
        const decodedBody = decoder.decode(body);

        latestPutRequest = {
          url: details.url,
          body: decodedBody
        };

        console.log("Captured PUT:", details.url);
        resendLatestPut();
      }
    }
  },
  { urls: ["https://quiz.loilonote.app/api/quiz/*/answer"] },
  ["requestBody"]
);

function resendLatestPut() {
  if (!latestPutRequest) return;

  for (let i = 0; i < resendCount; i++) {
    fetch(latestPutRequest.url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json" // 必要に応じて変更
      },
      body: latestPutRequest.body
    })
      .then((res) => {
        console.log(`✅ Resent PUT (${i + 1}/${resendCount}) - Status: ${res.status}`);
      })
      .catch((err) => {
        console.error("❌ Failed to resend:", err);
      });
  }
}
