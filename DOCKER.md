# Docker Deployment Guide for ThanhBinh.IT Portfolio

## 🐳 Cách chạy với Docker

### Phương pháp 1: Sử dụng Docker Compose (Khuyên dùng)

```bash
# 1. Build và chạy container
docker-compose up --build -d

# 2. Kiểm tra container đang chạy
docker-compose ps

# 3. Xem logs
docker-compose logs -f portfolio

# 4. Truy cập ứng dụng
# Mở trình duyệt: http://localhost:3000

# 5. Dừng container
docker-compose down
```

### Phương pháp 2: Build và chạy bằng Docker CLI

```bash
# 1. Build image
docker build -t thanhbinhit-portfolio .

# 2. Chạy container
docker run -d \
  --name thanhbinhit-portfolio \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  --restart unless-stopped \
  thanhbinhit-portfolio

# 3. Kiểm tra logs
docker logs -f thanhbinhit-portfolio

# 4. Dừng và xóa container
docker stop thanhbinhit-portfolio
docker rm thanhbinhit-portfolio
```

## 📦 Cấu trúc Docker

### Multi-stage Build
- **Stage 1 (builder)**: Cài dependencies và build ứng dụng
- **Stage 2 (runner)**: Chạy ứng dụng với user không phải root (nextjs)

### Ưu điểm
- Image nhỏ (~150MB) nhờ Alpine Linux
- Chạy với user không root (an toàn hơn)
- Chỉ copy file cần thiết vào production image
- Cache layer tối ưu cho CI/CD

## 🔧 Biến môi trường

| Biến | Giá trị mặc định | Mô tả |
|------|-----------------|--------|
| NODE_ENV | production | Môi trường chạy |
| PORT | 3000 | Port container lắng nghe |

## 📊 Kiểm tra trạng thái

```bash
# Container có đang chạy không?
docker ps | grep thanhbinhit

# Kiểm tra logs lỗi
docker logs thanhbinhit-portfolio 2>&1 | grep -i error

# Truy cập container (exec)
docker exec -it thanhbinhit-portfolio sh

# Kiểm tra dung lượng image
docker images | grep thanhbinhit

# Kiểm tra resource usage
docker stats thanhbinhit-portfolio
```

## 🔄 Cập nhật phiên bản mới

```bash
# 1. Pull code mới
git pull

# 2. Rebuild và chạy lại
docker-compose up --build -d

# 3. Xóa image cũ (tùy chọn)
docker image prune -f
```

## 🐛 Troubleshooting

### Port 3000 đã bị chiếm dụng
```bash
# Tìm process đang dùng port 3000
lsof -i :3000

# Hoặc thay đổi port trong docker-compose.yml
ports:
  - "3001:3000"  # Host:Container
```

### Build thất bại do cache
```bash
# Xóa cache và rebuild
docker-compose build --no-cache
docker-compose up -d
```

### Container liên tục restart
```bash
# Xem logs chi tiết
docker logs --tail 50 thanhbinhit-portfolio

# Kiểm tra resource
free -h  # RAM
df -h    # Disk
```

## 🏗️ CI/CD Integration

### GitHub Actions ví dụ
```yaml
name: Deploy Portfolio

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t thanhbinhit-portfolio .
      
      - name: Run container
        run: |
          docker stop thanhbinhit-portfolio || true
          docker rm thanhbinhit-portfolio || true
          docker run -d -p 3000:3000 --name thanhbinhit-portfolio thanhbinhit-portfolio
```

## 📈 Monitoring

### Kiểm tra health endpoint
```bash
curl http://localhost:3000/robots.txt
curl http://localhost:3000/sitemap.xml
```

### Performance test
```bash
# Cài ab (Apache Bench)
ab -n 100 -c 10 http://localhost:3000/
```

## 🎯 Production Checklist

- [x] Container chạy với user không root
- [x] NODE_ENV=production
- [x] Multi-stage build (image nhỏ)
- [x] Restart policy configured
- [x] Port mapping đúng
- [x] .dockerignore tối ưu
- [ ] Thêm health check (tùy chọn)
- [ ] Logging ra file/ELK (tùy chọn)
- [ ] Thêm reverse proxy (nginx) nếu cần SSL
