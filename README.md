


# 🎨 Portfolio Cá Nhân – YenNhi

Đây là **website portfolio cá nhân** được phát triển bằng **React.js** (sử dụng `create-react-app`). Trang web được triển khai trên **GitHub Pages** thông qua repo **User Page** (`nhitny.github.io`).

## 🚀 Triển khai (Deployment)

Vì đây là **User Page**, nên cần triển khai **trực tiếp lên nhánh `master` hoặc `main`** (không sử dụng nhánh `gh-pages`).

### Bước 1: Cài đặt các gói phụ thuộc

```bash
npm install
```

### Bước 2: Cấu hình đường dẫn trang web (`homepage`)

Trong file `package.json`, thêm dòng sau để đảm bảo đường dẫn đúng khi build:

```json
"homepage": "https://nhitny.github.io/"
```

### Bước 3: Build project

Chạy lệnh:

```bash
npm run build
```

Lệnh này sẽ tạo thư mục **`build/`** chứa các tệp tĩnh (HTML, CSS, JS) đã được tối ưu để triển khai.

### Bước 4: Triển khai thủ công lên GitHub Pages

Với **User Page**, cần **đẩy các tệp trong thư mục `build/`** lên **thư mục gốc của nhánh `master` hoặc `main`**.

#### Các bước chi tiết:

```bash
# Xoá thư mục build cũ (nếu có)
rm -rf build

# Build lại project
npm run build

# Copy toàn bộ nội dung trong thư mục build/ ra thư mục gốc repo
cp -r build/* .

# Add, commit và push lên GitHub
git add .
git commit -m "Triển khai website React lên GitHub Pages"
git push origin master  
```

### Bước 5: Cấu hình GitHub Pages

1. Truy cập repo trên GitHub.
2. Vào **Settings** → **Pages**.
3. Trong mục **Source**, chọn **Branch: master** và **/ (root)**.
4. Nhấn **Save** để kích hoạt GitHub Pages.

### Bước 6: Kiểm tra trang web

Truy cập địa chỉ:

```
https://nhitny.github.io/
```

---

### Run local
```
npm start
```

## 🛠️ Công nghệ sử dụng

- **React.js** – Thư viện JavaScript xây dựng giao diện người dùng.
- **Create React App** – Công cụ khởi tạo và cấu hình sẵn môi trường React.
- **GitHub Pages** – Dịch vụ lưu trữ trang web tĩnh miễn phí từ GitHub.

---

## 📸 Demo

[https://nhitny.github.io/](https://nhitny.github.io/)
