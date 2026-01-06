// Lấy danh sách videos từ background
function loadVideos() {
  chrome.runtime.sendMessage({ action: 'getVideos' }, (response) => {
    const videos = response.videos || [];
    displayVideos(videos);
  });
}

// Hiển thị danh sách videos
function displayVideos(videos) {
  const videoList = document.getElementById('videoList');
  const status = document.getElementById('status');
  const clearBtn = document.getElementById('clearBtn');
  
  if (videos.length === 0) {
    videoList.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
        </svg>
        <p>Chưa phát hiện video nào</p>
      </div>
    `;
    status.textContent = 'Chưa có video';
    clearBtn.style.display = 'none';
  } else {
    status.textContent = `Đã tìm thấy ${videos.length} video(s)`;
    clearBtn.style.display = 'block';
    
    videoList.innerHTML = videos.map((video, index) => `
      <div class="video-item">
        <div class="video-info">
          <div class="platform">${video.platform}</div>
          <div class="quality">${video.quality}</div>
        </div>
        <button class="download-btn" data-index="${index}">
          Tải xuống
        </button>
      </div>
    `).join('');
    
    // Add event listeners cho download buttons
    document.querySelectorAll('.download-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        downloadVideo(videos[index]);
      });
    });
  }
}

// Download video
function downloadVideo(video) {
  const filename = `${video.platform}_${Date.now()}.mp4`;
  
  chrome.runtime.sendMessage({
    action: 'downloadVideo',
    url: video.url,
    filename: filename
  }, (response) => {
    if (response.success) {
      showNotification('Đang tải xuống...', 'success');
    } else {
      showNotification('Lỗi: ' + response.error, 'error');
    }
  });
}

// Hiển thị notification
function showNotification(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.style.background = type === 'success' ? '#28a745' : '#dc3545';
  
  setTimeout(() => {
    status.style.background = '#2a2a2a';
    loadVideos();
  }, 2000);
}

// Clear videos
document.getElementById('clearBtn').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'clearVideos' }, () => {
    loadVideos();
  });
});

// Load videos khi popup mở
loadVideos();

// Refresh mỗi 2 giây
setInterval(loadVideos, 2000);