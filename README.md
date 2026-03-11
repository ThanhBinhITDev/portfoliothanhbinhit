# 🌟 thanhbinhit — Portfolio Website

<div align="center">
  <img src="public/logo.svg" alt="thanhbinhit logo" width="80" />
  <br/>
  <br/>

  [![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
  [![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
  [![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-EE4B6A?style=for-the-badge&logo=framer)](https://www.framer.com/motion)

  <br/>

  > **Portfolio cá nhân của thanhbinhit — Kỹ sư Phần mềm & Kiến trúc sư Web**
  >
  > Thiết kế theo triết lý Apple: Tĩnh lặng, Tinh tế, Hiệu suất tối đa.

</div>

---

## ✨ Tính năng nổi bật

| Tính năng | Mô tả |
|---|---|
| 🎬 **Hello Loader** | Hiệu ứng viết tay "xin chào" kiểu Apple với SVG animation, nền sáng tinh tế. Loader trượt lên mượt mà khi kết thúc. |
| 🌊 **Liquid Background** | Canvas 3D WebGL sử dụng Three.js, chỉ render sau khi loader hoàn tất để tránh cạnh tranh GPU. |
| 💎 **Bento Grid** | Giao diện dạng lưới Bento hiện đại giống macOS, mỗi card là một tính năng/dự án độc lập. |
| 🎡 **Sticky Workflow** | Section quy trình làm việc với hiệu ứng cuộn ghim (sticky scroll). |
| 🌙 **Dark / Light Mode** | Chuyển đổi giao diện sáng/tối mượt mà với `next-themes`. |
| 📱 **Fully Responsive** | Responsive đầy đủ mọi thiết bị: mobile, tablet, laptop, màn hình lớn. |
| 🔮 **SVG Kính Lỏng** | 6 thành phần trang trí SVG dạng kính lỏng 3D bay lơ lửng khắp trang, tạo chiều sâu. |
| ⚡ **Framer Motion** | Toàn bộ animation sử dụng Framer Motion với GPU-accelerated transforms. |
| 🍎 **Apple Design DNA** | Typography, spacing, và motion đều bám sát ngôn ngữ thiết kế Apple HIG. |

---

## 🚀 Cài đặt & Chạy dự án

### Yêu cầu hệ thống

- **Node.js** >= 18.x
- **npm** >= 9.x hoặc **pnpm** >= 8.x

### Các bước cài đặt

```bash
# 1. Clone dự án
git clone https://github.com/thanhbinhit/portfoliothanhbinhit.git
cd portfoliothanhbinhit

# 2. Cài đặt dependencies
npm install

# 3. Chạy môi trường phát triển
npm run dev
```

Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000)

### Các lệnh có sẵn

```bash
npm run dev      # Chạy môi trường phát triển (port 3000)
npm run build    # Build production
npm run start    # Chạy production server
npm run lint     # Kiểm tra lỗi ESLint
```

---

## 📁 Cấu trúc dự án

```
portfoliothanhbinhit/
├── public/
│   ├── logo.svg                    # Logo thương hiệu chính
│   ├── images/                     # Ảnh tĩnh (dự án, avatar, ...)
│   └── svgs/                       # SVG trang trí kính lỏng 3D
│       ├── decorate-1.svg          # Khối trang trí #1 (người dùng thêm)
│       ├── decorate-2.svg          # Khối trang trí #2 (người dùng thêm)
│       ├── decorate-3.svg          # Khối trang trí #3 (người dùng thêm)
│       ├── decorate-4.svg          # Glow Orb gradient xanh-tím-teal
│       ├── decorate-5.svg          # Liquid Ring 3D cam-vàng
│       └── decorate-6.svg          # Frosted Glass Capsule trắng
│
└── src/
    ├── app/
    │   ├── globals.css             # Style toàn cục, Tailwind, custom utilities
    │   ├── layout.tsx              # Root layout (font, metadata, ThemeProvider)
    │   └── page.tsx                # Trang chủ chứa toàn bộ sections
    │
    ├── components/
    │   ├── apple-hello-effect/     # SVG handwriting "xin chào" animation
    │   ├── brand-logo.tsx          # Component logo thương hiệu
    │   ├── hello-loader.tsx        # Màn hình loader ban đầu (light theme)
    │   ├── navbar.tsx              # Thanh điều hướng (có hamburger mobile)
    │   ├── theme-provider.tsx      # Wrapper next-themes
    │   ├── theme-toggle.tsx        # Nút chuyển đổi Dark/Light
    │   └── ui/
    │       ├── bento-card.tsx      # BentoCard component
    │       └── liquid-background.tsx # Three.js WebGL canvas background
    │
    └── lib/
        └── utils.ts                # Utility functions (cn() helper)
```

---

## 🎨 Hệ thống Thiết kế

### Bảng màu

| Token | Màu sắc | Dùng cho |
|---|---|---|
| `brand-teal` | `#2DD4BF` | CTA chính, điểm nhấn teal |
| `brand-blue` | `#3B82F6` | Link, icon, badge |
| `brand-purple` | `#A855F7` | Gradient phụ, badge |
| `apple-blue` | `#147CE5` | Nút chính Apple style |

### Typography

| Tên | Font | Dùng cho |
|---|---|---|
| `font-display` | SF Pro Display / System | Tiêu đề lớn (h1, h2) |
| `font-sans` | Be Vietnam Pro | Nội dung |

### Custom CSS Utilities (globals.css)

```css
.glass-panel       /* Panel kính mờ ánh sáng */
.text-gradient-display  /* Gradient tiêu đề (dark → darker) */
.text-gradient-hero     /* Gradient hero (teal → blue → purple) */
.scrollbar-hide         /* Ẩn thanh cuộn */
```

---

## 🏗️ Kiến trúc & Hiệu suất

### Chiến lược tối ưu hiệu suất

1. **Staggered Rendering**: `LiquidBackground` (Three.js canvas) chỉ mount sau khi `HelloLoader` hoàn tất → tránh tranh chấp GPU.
2. **`will-change: transform`** trên các animation nặng để giao việc cho GPU.
3. **Static ambient glows**: Các glow effects dùng CSS tĩnh thay vì animation JS để tiết kiệm tài nguyên.
4. **Framer Motion `whileInView`**: Chỉ trigger animation khi phần tử vào viewport.
5. **`overflow-hidden` + `pb-2`**: Fix clipping dấu tiếng Việt trên tiêu đề gradient.

### Stack kỹ thuật

```
Frontend   : Next.js 16 (App Router) + React 19
Language   : TypeScript 5
Styling    : Tailwind CSS 4 + custom CSS utilities
Animation  : Framer Motion 12
3D / WebGL : Three.js 0.183 + @react-three/fiber + @react-three/drei
Icons      : Lucide React
Themes     : next-themes (Light / Dark)
UI Library : shadcn/ui (base components)
```

---

## 📐 Các Section trên trang

| Section | ID | Mô tả |
|---|---|---|
| Hero | — | Headline, CTA, tech stack, scroll indicator, SVG decorations dạng floating |
| Dự án chọn lọc | `#projects` | Bento Grid 3 cột: Website, Ứng dụng đa kênh, Lịch hẹn, Dashboard |
| Quy trình | — | Sticky scroll workflow từng bước |
| Đặc quyền | `#features` | Grid tính năng với 4 KPI cards |
| Dịch vụ | `#services` | 4 dịch vụ chính (card hover) |
| CTA | `#cta` | Kêu gọi hành động với pastel glass panel |

---

## 🖼️ SVG Trang trí

### Thêm SVG mới

1. Đặt file `.svg` vào thư mục `public/svgs/`
2. Dùng trong `page.tsx` như sau:

```tsx
import Image from "next/image"
import { motion } from "framer-motion"

<motion.div
  className="absolute top-[10%] right-[5%] w-32 h-32 opacity-40 pointer-events-none"
  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
>
  <Image src="/svgs/ten-file.svg" alt="Decoration" fill className="object-contain" />
</motion.div>
```

### Lưu ý khi dùng SVG

- **Đổi màu theo theme**: Dùng SVG dạng React component (inline), không dùng `<Image>`.
- **Hình trang trí cố định màu**: Dùng `<Image src="/svgs/...">` trong thư mục `public/svgs/`.

---

## 🌐 Deploy

Dự án được tối ưu cho deploy trên **Vercel**.

```bash
# Build production
npm run build

# Kiểm tra production locally
npm run start
```

Hoặc kết nối repo GitHub với [Vercel](https://vercel.com) để CI/CD tự động.

---

## 🐛 Troubleshooting

### Hydration Error (next-themes)
Đã được xử lý bằng `suppressHydrationWarning` trên thẻ `<body>` trong `layout.tsx`.

### Dấu tiếng Việt bị cắt (background-clip: text)
Thêm class `pb-2` vào bất kỳ element nào dùng `.text-gradient-display` có ký tự thòng xuống (g, ạ, ọ, ...).

### Loader bị lag
Đảm bảo `LiquidBackground` (`@react-three/fiber`) chỉ render **sau** khi `HelloLoader` hoàn tất thông qua `onDone` callback và state `bgReady`.

---

## 📄 Giấy phép

Dự án được phân phối theo giấy phép [MIT](LICENSE).

---

<div align="center">
  Made with ❤️ by <strong>thanhbinhit</strong>
  <br/>
  <em>Kỹ sư Phần mềm & Kiến trúc sư Web</em>
</div>
