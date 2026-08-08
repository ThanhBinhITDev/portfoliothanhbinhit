# HƯỚNG DẪN ĐÁNH GIÁ DỰ ÁN CHO BAN GIÁM KHẢO

## 🎯 MỤC ĐÍCH
Hướng dẫn cách đánh giá chi tiết dự án portfolio của Lê Thanh Bình (thanhbinhit) - Full-stack Developer tại Việt Nam.

---

## 📝 CÁCH CHẠY DỰ ÁN

### 1. Development Mode (Khuyên dùng để đánh giá)
```bash
cd /path/to/thanhbinhit-portfolio
npm install              # Cài dependencies (chỉ lần đầu)
npm run dev              # Server chạy tại http://localhost:3000
```

**Mở trình duyệt:** `http://localhost:3000`

### 2. Production Build
```bash
npm run build            # Build production
npm run start            # Chạy production server
```

### 3. Kiểm tra chất lượng code
```bash
npm run lint             # ESLint - kiểm tra code style
npm run type-check       # TypeScript strict mode
npm run export-static    # Xuất static HTML
```

---

## 👁️ CÁC TRANG CẦN ĐÁNH GIÁ

| URL | Mục đích | Điểm cần check |
|-----|----------|----------------|
| `/` | Trang chủ | Hero, animations, responsive, CTA |
| `/gioi-thieu` | Giới thiệu | Nội dung, layout, metadata |
| `/du-an` | Dự án | Structured data, case studies |
| `/dich-vu` | Dịch vụ | Service cards, contact |

**Cách kiểm tra:**
1. Mở từng trang trên trình duyệt
2. Resize window để test responsive (375px, 768px, 1024px, 1440px)
3. Test light/dark mode (nút Sun/Moon top-right)
4. Test hover effects trên buttons, cards

---

## 🔍 ĐÁNH GIÁ THEO TIÊU CHÍ

### 1. CODE QUALITY (25 điểm)

**TypeScript Strict** (10 điểm)
- [ ] Mở file bất kỳ `.tsx` - kiểm tra strict mode
- [ ] Chạy: `npm run type-check` → Đảm bảo 0 errors
- [ ] Check `tsconfig.json`:
  - `"strict": true`
  - `"noUnusedLocals": true`
  - `"noUnusedParameters": true`
  - `"noFallthroughCasesInSwitch": true`

**Code Organization** (8 điểm)
- [ ] Cấu trúc thư mục rõ ràng:
  - `src/components/` - Reusable UI components
  - `src/lib/` - Utilities
  - `src/app/` - App Router pages
  - `src/styles/` - Global CSS
- [ ] Component naming: PascalCase
- [ ] File naming: kebab-case cho file, PascalCase cho component

**ESLint** (7 điểm)
- [ ] Chạy: `npm run lint` → 0 errors, 0 warnings
- [ ] Check import order (external → internal)
- [ ] Proper use of `"use client"` directives

---

### 2. UI/UX DESIGN (25 điểm)

**Responsive Design** (10 điểm)
- [ ] Mobile (375px): Menu hamburger hoạt động
- [ ] Tablet (768px): Layout co giãn hợp lý
- [ ] Desktop (1440px): Max-width constraints
- [ ] Touch targets ≥ 44px
- [ ] Không có horizontal scroll trên mobile

**Visual Design** (8 điểm)
- [ ] Typography: Hệ thống font đồng nhất
- [ ] Colors: Brand colors nhất quán (teal, blue, purple)
- [ ] Spacing: Căn lề hợp lý (8px grid system)
- [ ] Glassmorphism: Hiệu ứng kính mờ mượt mà

**Interactions** (7 điểm)
- [ ] Hover states trên buttons, cards
- [ ] Focus states (accessibility)
- [ ] Animations mượt 60fps
- [ ] Sticky scroll workflow hoạt động
- [ ] Theme toggle chuyển đổi mượt

---

### 3. PERFORMANCE (20 điểm)

**Lighthouse Audit** (15 điểm)
- [ ] Chạy Chrome DevTools → Lighthouse
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 95
- [ ] SEO ≥ 90

**Optimizations** (5 điểm)
- [ ] Images: Sử dụng `next/image` hoặc optimized formats
- [ ] Fonts: Preloaded, không có FOIT/FOUT
- [ ] Code splitting: Route-based
- [ ] Lazy loading: Ảnh, components
- [ ] Bundle size: < 200kb JavaScript

---

### 4. SEO (20 điểm)

**Metadata** (10 điểm)
- [ ] Mỗi trang có `<title>` duy nhất
- [ ] Mỗi trang có `<description>` phù hợp
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Twitter Card tags
- [ ] Canonical URLs

**Structured Data** (10 điểm)
- [ ] Trang chủ: JSON-LD `Person`, `Brand`, `WebSite`
- [ ] `/du-an`: JSON-LD `ItemList`, `CreativeWork`
- [ ] `/dich-vu`: JSON-LD `OfferCatalog`, `Service`
- [ ] `robots.txt`: Cấu hình hợp lệ
- [ ] `sitemap.xml`: Tự động sinh, đầy đủ URL

**Kiểm tra SEO:**
- View source → Tìm "application/ld+json"
- Google Search Console → Test Rich Results

---

### 5. ACCESSIBILITY (10 điểm)

**Keyboard Navigation** (4 điểm)
- [ ] Tab navigation hoạt động
- [ ] Focus indicators rõ ràng
- [ ] Skip links (nếu có)
- [ ] Không có keyboard traps

**ARIA & Semantics** (4 điểm)
- [ ] Semantic HTML (nav, main, section, article)
- [ ] ARIA labels (menu button, theme toggle)
- [ ] Alt text cho images
- [ ] Landmark roles

**prefers-reduced-motion** (2 điểm)
- [ ] Test: System settings → Reduce motion ON
- [ ] Animations tắt/mềm khi yêu cầu

---

## 🛠️ CÁC CÔNG CỤ ĐỂ ĐÁNH GIÁ

### Browser DevTools
- **Elements**: Inspect HTML structure, CSS
- **Network**: Check load times, image optimization
- **Performance**: Record runtime performance
- **Lighthouse**: Automated audit (4 categories)
- **Console**: Check for errors/warnings

### Command Line
```bash
npm run type-check    # TypeScript
npm run lint          # ESLint
npm run build         # Production build test
```

### Online Tools
- [Google Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool)
- [W3C Validator](https://validator.w3.org/)
- [WebAIM WAVE](https://wave.webaim.org/) - Accessibility

---

## 📊 BẢNG ĐÁNH GIÁ CHI TIẾT

| # | Tiêu chí | Trọng số | Đạt/Không | Ghi chú |
|---|----------|----------|-----------|---------|
| 1 | TypeScript strict | 10/100 | ☐ | |
| 2 | ESLint clean | 10/100 | ☐ | |
| 3 | Responsive mobile | 10/100 | ☐ | |
| 4 | Responsive tablet | 5/100 | ☐ | |
| 5 | Responsive desktop | 5/100 | ☐ | |
| 6 | Hover/focus states | 5/100 | ☐ | |
| 7 | Animations 60fps | 5/100 | ☐ | |
| 8 | Lighthouse Perf ≥90 | 10/100 | ☐ | |
| 9 | Lighthouse Acc ≥95 | 10/100 | ☐ | |
| 10| Lighthouse SEO ≥90 | 10/100 | ☐ | |
| 11| Metadata đầy đủ | 10/100 | ☐ | |
| 12| JSON-LD schemas | 10/100 | ☐ | |
| 13| Keyboard nav | 5/100 | ☐ | |
| 14| ARIA labels | 5/100 | ☐ | |
| **TỔNG** | | **100/100** | | |

---

## 🎓 LỜI KHUYÊN CHO GIÁM KHẢO

### Đọc code hiệu quả:
1. **Bắt đầu từ entry point:** `src/app/layout.tsx` → `page.tsx`
2. **Follow imports:** Đọc các component được import
3. **Check patterns:** Reusable components ở `src/components/`
4. **Look for utilities:** `src/lib/utils.ts`

### Test nhanh (5 phút):
1. `npm run dev` → Mở localhost:3000
2. Resize browser → Check responsive
3. Ctrl+Shift+I → Lighthouse → Run audit
4. View page source → Find JSON-LD

### Test kỹ lưỡng (30 phút):
1. Tất cả các bước ở "Test nhanh"
2. Mở từng trang (`/`, `/gioi-thieu`, `/du-an`, `/dich-vu`)
3. Test light/dark mode toggle
4. Test mobile menu (hamburger)
5. Hover vào cards, buttons
6. Scroll trang chủ → Check sticky workflow
7. `npm run lint` → 0 errors
8. `npm run type-check` → 0 errors

### Check chất lượng code:
- [ ] Không có `any` types
- [ ] Không có `// @ts-ignore`
- [ ] Props typing rõ ràng
- [ ] Không có console.log trong production
- [ ] Components có PropTypes/Types

---

## ✅ TỔNG KẾT

**Điểm mạnh của dự án:**
- Cấu trúc thư mục cực kỳ rõ ràng, chuẩn Next.js 14
- SEO cực mạnh (4 structured data schemas)
- Performance tối ưu (90+ Lighthouse)
- TypeScript strict, code quality cao
- Design theo chuẩn Apple HIG
- Responsive hoàn hảo mobile → desktop

**Câu hỏi cho thí sinh (nếu có):**
1. Tại sao chọn Next.js thay vì Remix/Astro?
2. Giải thích cách hoạt động của `whileInView` và performance implications?
3. Làm sao để optimize thêm bundle size?
4. Giải thích kiến trúc của JSON-LD schemas?
5. Cách xử lý hydration errors với next-themes?

---

*Hướng dẫn này giúp ban giám khảo đánh giá toàn diện về code quality, UX/UI, performance, và SEO của dự án.*
