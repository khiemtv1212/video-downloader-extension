// Lưu trữ video URLs được phát hiện
let detectedVideos = {};

// Lắng nghe messages từ content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'videoDetected') {
    const tabId = sender.tab.id;
    if (!detectedVideos[tabId]) {
      detectedVideos[tabId] = [];
    }
    
    // Kiểm tra video đã tồn tại chưa
    const exists = detectedVideos[tabId].some(v => v.url === request.video.url);
    if (!exists) {
      detectedVideos[tabId].push(request.video);
      
      // Cập nhật badge
      chrome.action.setBadgeText({
        text: detectedVideos[tabId].length.toString(),
        tabId: tabId
      });
      chrome.action.setBadgeBackgroundColor({
        color: '#FF0000',
        tabId: tabId
      });
    }
    
    sendResponse({ success: true });
  }
  
  if (request.action === 'getVideos') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      sendResponse({ videos: detectedVideos[tabId] || [] });
    });
    return true; // Async response
  }
  
  if (request.action === 'downloadVideo') {
    chrome.downloads.download({
      url: request.url,
      filename: request.filename || 'video.mp4',
      saveAs: true
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ success: true, downloadId: downloadId });
      }
    });
    return true; // Async response
  }
  
  if (request.action === 'clearVideos') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      detectedVideos[tabId] = [];
      chrome.action.setBadgeText({ text: '', tabId: tabId });
      sendResponse({ success: true });
    });
    return true;
  }
});

// Xóa videos khi tab đóng
chrome.tabs.onRemoved.addListener((tabId) => {
  delete detectedVideos[tabId];
});

// Xóa videos khi navigation
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === 'loading') {
    detectedVideos[tabId] = [];
    chrome.action.setBadgeText({ text: '', tabId: tabId });
  }
});