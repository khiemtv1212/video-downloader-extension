// Phát hiện video URLs từ các nền tảng khác nhau

// === TWITTER/X ===
function detectTwitterVideos() {
  // Tìm tất cả video tags
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    const src = video.src || video.currentSrc;
    if (src && src.includes('video.twimg.com')) {
      sendVideoToBackground({
        url: src,
        platform: 'Twitter/X',
        quality: 'Auto',
        type: 'video/mp4'
      });
    }
  });
}

// === INSTAGRAM ===
function detectInstagramVideos() {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    const src = video.src || video.currentSrc;
    if (src && (src.includes('cdninstagram.com') || src.includes('fbcdn.net'))) {
      sendVideoToBackground({
        url: src,
        platform: 'Instagram',
        quality: 'Auto',
        type: 'video/mp4'
      });
    }
  });
}

// === FACEBOOK ===
function detectFacebookVideos() {
  const videos = document.querySelectorAll('video');
  
  videos.forEach(video => {
    const src = video.src || video.currentSrc;
    if (src && src.includes('fbcdn.net')) {
      sendVideoToBackground({
        url: src,
        platform: 'Facebook',
        quality: 'Auto',
        type: 'video/mp4'
      });
    }
  });
}

// Gửi video info về background script
function sendVideoToBackground(videoInfo) {
  chrome.runtime.sendMessage({
    action: 'videoDetected',
    video: videoInfo
  });
}

// Detect platform và chạy function tương ứng
function detectVideos() {
  const hostname = window.location.hostname;
  
  if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
    detectTwitterVideos();
  } else if (hostname.includes('instagram.com')) {
    detectInstagramVideos();
  } else if (hostname.includes('facebook.com')) {
    detectFacebookVideos();
  }
}

// Chạy detection khi page load
detectVideos();

// Chạy lại khi có thay đổi DOM (cho single page apps)
const observer = new MutationObserver(() => {
  detectVideos();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Lắng nghe video play events
document.addEventListener('play', (e) => {
  if (e.target.tagName === 'VIDEO') {
    setTimeout(detectVideos, 500);
  }
}, true);

console.log('Video Downloader Extension: Đang tìm videos...');