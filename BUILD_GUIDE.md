# Build Guide - Soofi Mandi Website

This guide provides detailed information about the build process, environment separation, and troubleshooting for the Soofi Mandi website.

## Overview

The Soofi Mandi website uses Next.js with TypeScript and is deployed on Netlify. The build process has been specifically configured to handle environment separation between development and production builds.

## Build Process Architecture

### Development Environment
- Includes all dependencies (production + development)
- Test files and configurations are available
- Full TypeScript compilation including test files
- Development server with hot reloading

### Production Environment
- Only production dependencies are available
- Test files and configurations are excluded from compilation
- Optimized build output for deployment
- Static export generation for Netlify

## TypeScript Configuration

The `tsconfig.json` file is configured with specific exclusions to prevent build failures:

```json
{
  "exclude": [
    "node_modules",
    "vitest.config.ts",           // Vitest config requires devDependencies
    "**/*.test.ts",               // Test files
    "**/*.test.tsx",
    "**/*.spec.ts",
    "**/*.spec.tsx",
    "**/__tests__/**/*",          // Test directories
    "src/test/**/*"
  ]
}
```

### Why These Exclusions Are Necessary

1. **vitest.config.ts**: This file imports from `vitest/config` which is a development dependency. During Netlify builds, development dependencies are not installed, causing module resolution failures.

2. **Test Files**: Test files often import testing utilities that are development dependencies. Excluding them prevents compilation errors in production.

3. **Test Directories**: Entire directories containing test utilities and configurations that should not be part of the production build.

## Dependency Management

### Production Dependencies (`dependencies`)
These packages are required for the application to run in production:
- `next`: React framework
- `react`: UI library
- `react-dom`: React DOM renderer
- `tailwindcss`: CSS framework
- `zustand`: State management
- `lucide-react`: Icons
- `react-hook-form`: Form handling
- `zod`: Schema validation

### Development Dependencies (`devDependencies`)
These packages are only needed during development and testing:
- `vitest`: Testing framework
- `@types/*`: TypeScript type definitions
- `eslint`: Code linting
- `typescript`: TypeScript compiler
- `@vitejs/plugin-react`: Vite React plugin

## Build Commands

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server locally
npm run validate-build # Validate build environment
```

### Production Build Process
1. **Dependency Installation**: Only production dependencies are installed
2. **TypeScript Compilation**: Excludes test files and configurations
3. **Next.js Build**: Generates optimized production bundle
4. **Static Export**: Creates static files for deployment

## Build Validation

The `validate-build-environment.js` script ensures build reliability by:

1. **Configuration Validation**: Checks TypeScript exclusions
2. **Dependency Verification**: Ensures proper categorization
3. **Clean Environment Testing**: Simulates production build environment
4. **Output Validation**: Verifies build artifacts are generated correctly

### Running Build Validation
```bash
npm run validate-build
```

### Validation Steps
1. Validates `tsconfig.json` excludes test files
2. Checks `package.json` dependency categorization
3. Creates temporary clean environment
4. Installs only production dependencies
5. Runs production build
6. Validates `.next` directory output
7. Cleans up temporary files

## Netlify Build Fix Implementation

### Background
The Soofi Mandi website was experiencing build failures on Netlify due to TypeScript compilation errors. The specific error was:

```
Cannot find module 'vitest/config' or its corresponding type declarations
```

This occurred because Next.js was attempting to compile `vitest.config.ts` during the production build process, but the `vitest` package (a development dependency) was not available in Netlify's production build environment.

### Root Cause Analysis
1. **Environment Separation Issue**: Netlify production builds only install `dependencies`, not `devDependencies`
2. **TypeScript Compilation Scope**: Next.js TypeScript compilation was including test configuration files
3. **Module Resolution Failure**: Production build environment couldn't resolve development-only modules

### Solution Implemented
The fix involved modifying the TypeScript configuration to exclude test-related files from production builds:

```json
{
  "exclude": [
    "node_modules",
    "vitest.config.ts",           // Vitest config requires devDependencies
    "**/*.test.ts",               // Test files
    "**/*.test.tsx",
    "**/*.spec.ts", 
    "**/*.spec.tsx",
    "**/__tests__/**/*",          // Test directories
    "src/test/**/*"
  ]
}
```

### Verification Steps
1. **Local Testing**: Confirmed `npm run build` works locally
2. **Environment Simulation**: Created build validation script to test without devDependencies
3. **Production Deployment**: Verified successful Netlify builds
4. **Regression Prevention**: Added automated validation to prevent future issues

### Prevention Measures
- **Build Validation Script**: `npm run validate-build` tests environment separation
- **Documentation**: Comprehensive build guide and troubleshooting steps
- **TypeScript Configuration**: Properly excludes all test-related files
- **Dependency Management**: Clear separation between production and development dependencies

## Common Build Issues and Solutions

### Issue: "Cannot find module 'vitest/config'"
**Cause**: `vitest.config.ts` is being compiled in production build
**Solution**: Ensure `vitest.config.ts` is in the `exclude` array of `tsconfig.json`
**Status**: ✅ **FIXED** - This specific issue has been resolved

### Issue: "Cannot find module '@vitest/ui'" or similar test dependencies
**Cause**: Test files are being compiled in production build
**Solution**: Add test file patterns to `exclude` array in `tsconfig.json`
**Prevention**: Use the build validation script to catch these issues early

### Issue: Build succeeds locally but fails on Netlify
**Cause**: Local environment has development dependencies installed
**Solution**: Run `npm run validate-build` to test in clean environment
**Prevention**: Always run validation script before deploying

### Issue: Missing production dependencies
**Cause**: Required packages are in `devDependencies` instead of `dependencies`
**Solution**: Move necessary packages to `dependencies` in `package.json`
**Detection**: Build validation script will identify this issue

## Netlify-Specific Considerations

### Build Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `out` (for static export)
- **Node Version**: Specified in `.nvmrc` or Netlify settings

### Environment Variables
Production environment variables should be configured in Netlify dashboard, not in local `.env` files.

### Build Optimization
- Static export is used for optimal performance
- Build cache is enabled for faster subsequent builds
- Only production dependencies are installed during build

## Prevention Best Practices

### File Organization
- Keep test files in `__tests__` directories or with `.test.ts`/`.spec.ts` extensions
- Place test configurations in root directory (excluded by TypeScript)
- Separate development utilities in `src/test` directory

### Dependency Management
- Always categorize dependencies correctly in `package.json`
- Use `npm install --save` for production dependencies
- Use `npm install --save-dev` for development dependencies

### Build Testing
- Run `npm run build` locally before pushing changes
- Use `npm run validate-build` to test environment separation
- Test in clean environment periodically

### Code Reviews
- Verify new dependencies are categorized correctly
- Check that test files follow naming conventions
- Ensure TypeScript configuration remains correct

## Monitoring and Maintenance

### Regular Checks
- Run build validation after dependency updates
- Monitor Netlify build logs for warnings
- Test build process after TypeScript configuration changes

### Performance Monitoring
- Monitor build times and optimize as needed
- Check bundle size after major changes
- Validate static export output

## Troubleshooting Checklist

When encountering build issues:

- [ ] Check Netlify build logs for specific error messages
- [ ] Verify `tsconfig.json` excludes all test-related files
- [ ] Confirm all production dependencies are in `dependencies`
- [ ] Run `npm run validate-build` locally
- [ ] Test `npm run build` in clean environment
- [ ] Check for missing or miscategorized dependencies
- [ ] Verify file naming conventions for test files
- [ ] Ensure no test imports in production code

## Support and Resources

- **Netlify Documentation**: [Build Configuration](https://docs.netlify.com/configure-builds/)
- **Next.js Documentation**: [Building for Production](https://nextjs.org/docs/deployment)
- **TypeScript Documentation**: [tsconfig.json](https://www.typescriptlang.org/tsconfig)

For project-specific issues, refer to the build validation script output and this guide's troubleshooting section.