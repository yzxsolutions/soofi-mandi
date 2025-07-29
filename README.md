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

## 🏗️ Build Process & Environment Separation

This project implements strict separation between development and production build environments to ensure reliable deployments.

### ✅ Netlify Build Fix Applied

**Issue Resolved**: The website was failing to build on Netlify due to TypeScript compilation errors with `vitest.config.ts`.

**Solution**: Modified `tsconfig.json` to exclude test files and configurations from production builds, ensuring that development dependencies like `vitest` don't cause build failures in production environments.

### Build Configuration

The TypeScript configuration (`tsconfig.json`) is specifically configured to exclude test files and development-only configurations from production builds:

- **Test files**: `**/*.test.ts`, `**/*.test.tsx`, `**/*.spec.ts`, `**/*.spec.tsx`
- **Test directories**: `**/__tests__/**/*`, `src/test/**/*`
- **Development configs**: `vitest.config.ts`

This prevents build failures on platforms like Netlify where development dependencies are not available during production builds.

### Build Validation

Use the build validation script to ensure your environment is properly configured:

```bash
npm run validate-build
```

This script:
- ✅ Verifies TypeScript configuration excludes test files
- ✅ Checks dependency categorization (production vs development)
- ✅ Tests production build in clean environment
- ✅ Validates build output integrity

### Dependency Management

**Production Dependencies**: Required for the application to run
- Next.js, React, Tailwind CSS, Zustand, etc.

**Development Dependencies**: Only needed during development
- Vitest, TypeScript, ESLint, testing utilities, etc.

### Troubleshooting Build Issues

If you encounter build failures:

1. **TypeScript Compilation Errors**: Ensure test files are properly excluded in `tsconfig.json`
2. **Module Resolution Errors**: Check that all production dependencies are in `dependencies` (not `devDependencies`)
3. **Netlify Build Failures**: Run `npm run validate-build` locally to simulate production environment
4. **Missing Dependencies**: Verify all required packages are installed and properly categorized

### Prevention Measures

To prevent future build issues:

- Always run `npm run validate-build` before deploying
- Keep test files in designated directories (`__tests__`, `src/test`)
- Ensure test configurations (like `vitest.config.ts`) are excluded from production builds
- Categorize dependencies correctly in `package.json`
- Test builds locally with `npm run build` before pushing changes

### Quick Troubleshooting

**Build failing with "Cannot find module" errors?**
1. Run `npm run validate-build` to test environment separation
2. Check that test files are excluded in `tsconfig.json`
3. Verify dependencies are categorized correctly in `package.json`

**Need detailed troubleshooting?**
- See `BUILD_GUIDE.md` for comprehensive build documentation
- Check `scripts/README.md` for validation script details
- Review Netlify build logs for specific error messages

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
