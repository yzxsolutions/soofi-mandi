# Soofi Mandi - Authentic Arabian Food Ordering Website

A modern, responsive web application for ordering authentic Arabian and Middle Eastern cuisine, built with Next.js 14+ and featuring a culturally authentic design aesthetic.

## 🚀 Project Setup Complete

This project has been initialized with the core infrastructure including:

- ✅ Next.js 14+ with App Router and TypeScript
- ✅ Tailwind CSS with custom Soofi Mandi color palette and design system
- ✅ Zustand stores for cart and UI state management
- ✅ Required dependencies (Lucide React, React Hook Form, Zod)
- ✅ Basic project structure with app directory layout
- ✅ API routes for menu and orders
- ✅ TypeScript interfaces and types

## 🎨 Design System

The application uses a warm, culturally-inspired color palette:

- **Primary Gold**: #D4A574
- **Secondary Orange**: #CC7A00  
- **Accent Brown**: #8B4513
- **Background Cream**: #F5F5DC
- **Text Dark**: #2D1810

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── menu/
│   │   └── orders/
│   ├── checkout/
│   ├── home/
│   ├── menu/
│   ├── order-confirmation/
│   ├── layout.tsx
│   ├── page.tsx (Splash Screen)
│   └── globals.css
├── stores/
│   ├── cart-store.ts
│   └── ui-store.ts
└── types/
    └── index.ts
```

## 🛠 Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Typography**: Inter font

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to see the splash screen

4. Build for production:
```bash
npm run build
```

## 📋 Next Steps

The core infrastructure is now complete. The next tasks in the implementation plan are:

1. **Design System and Shared Components** (Task 2)
2. **Data Models and State Management** (Task 3)  
3. **Splash Screen and Initial User Experience** (Task 4)
4. **Home Page Implementation** (Task 5)

Refer to `.kiro/specs/soofi-mandi-website/tasks.md` for the complete implementation roadmap.

## 🎯 Features Implemented

- [x] Project setup with Next.js 14+ and TypeScript
- [x] Tailwind CSS configuration with custom color palette
- [x] Zustand stores for cart and UI state management
- [x] Basic app directory structure
- [x] API routes foundation
- [x] TypeScript interfaces and types
- [x] Splash screen with cultural design elements

## 📝 Notes

- The splash screen includes cultural design elements and auto-redirects to `/home` after 3 seconds
- Cart store includes persistence with localStorage
- All pages have proper metadata and SEO optimization
- API routes include mock data and error handling
- Build process is optimized and error-free
