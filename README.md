# 🎥 Video Downloader Extension

Extension tải video từ Twitter/X, Instagram, và Facebook.

## 📁 Cấu trúc thư mục

Tạo thư mục `video-downloader` với cấu trúc sau:

```
video-downloader/
├── manifest.json
├── background.js
├── content.js
├── popup.html
├── popup.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 🎨 Tạo Icons

Bạn cần tạo 3 file icon (16x16, 48x48, 128x128 pixels).

**Cách nhanh:** Tải icon miễn phí từ:
- https://www.flaticon.com (tìm "video download")
- Hoặc dùng tool online: https://favicon.io

**Hoặc tạo icon đơn giản:**
1. Mở Paint/Photoshop
2. Tạo hình vuông màu xanh với biểu tượng mũi tên xuống
3. Export 3 kích thước: 16x16, 48x48, 128x128

## ⚙️ Cài đặt Extension

### Trên Chrome/Edge:

1. **Lưu tất cả files** vào thư mục `video-downloader`

2. Mở Chrome/Edge, vào:
   ```
   chrome://extensions/
   ```

3. Bật **"Developer mode"** (góc phải trên)

4. Click **"Load unpacked"**

5. Chọn thư mục `video-downloader`

6. Done! Icon extension sẽ xuất hiện trên toolbar

### Trên Firefox:

1. Đổi `"manifest_version": 3` → `"manifest_version": 2` trong `manifest.json`

2. Đổi `"service_worker"` → `"scripts"` trong phần background:
   ```json
   "background": {
     "scripts": ["background.js"]
   }
   ```

3. Vào `about:debugging#/runtime/this-firefox`

4. Click **"Load Temporary Add-on"**

5. Chọn file `manifest.json`

## 🚀 Cách sử dụng

1. Mở Twitter/X, Instagram, hoặc Facebook

2. Scroll đến video bạn muốn tải

3. **Click icon extension** trên toolbar

4. Popup sẽ hiển thị danh sách videos đã phát hiện

5. Click **"Tải xuống"** cho video bạn muốn

6. Chọn vị trí lưu file

## ⚠️ Lưu ý quan trọng

### Những gì hoạt động:
- ✅ Twitter/X: Videos thường tải được tốt
- ✅ Instagram: Videos public posts
- ✅ Facebook: Videos public

### Hạn chế:
- ❌ YouTube: **Không hoạt động** (Google block)
- ❌ Stories (Instagram/Facebook): Có thể không detect được
- ❌ Live videos: Không hỗ trợ
- ❌ Videos có DRM: Không tải được

### Vấn đề pháp lý:
- **Chỉ dùng cho mục đích học tập cá nhân**
- Không phân phối lại videos có bản quyền
- Tôn trọng quyền sở hữu trí tuệ của tác giả gốc

## 🐛 Troubleshooting

**Extension không hoạt động?**
1. Kiểm tra console: `F12` → Tab "Console"
2. Xem có lỗi không
3. Reload extension: `chrome://extensions/` → click reload

**Không phát hiện video?**
1. Refresh trang web
2. Play video một lần
3. Click icon extension để xem có videos trong list không

**Download bị lỗi?**
1. Kiểm tra quyền "downloads" trong manifest.json
2. Thử copy URL video và tải thủ công

## 🔧 Customize

**Thêm nền tảng khác:**
1. Sửa `content.js` → thêm function `detectXXXVideos()`
2. Thêm domain vào `host_permissions` trong `manifest.json`

**Đổi màu UI:**
Sửa CSS trong `popup.html` → thay đổi colors trong phần `<style>`

## 📚 Học thêm

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)

## ⚖️ Disclaimer

Extension này chỉ dành cho mục đích học tập. Người dùng chịu trách nhiệm về việc sử dụng và tuân thủ luật bản quyền.