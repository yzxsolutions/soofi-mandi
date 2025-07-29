# Build Validation Scripts

This directory contains scripts to validate and test the build environment for the Soofi Mandi website.

## Background: Netlify Build Fix

This validation script was created to address and prevent a specific build failure that occurred on Netlify:

**Original Issue**: `Cannot find module 'vitest/config' or its corresponding type declarations`

**Root Cause**: Next.js TypeScript compilation was including `vitest.config.ts` in production builds, but `vitest` is a development dependency not available in Netlify's production environment.

**Solution Applied**: Modified `tsconfig.json` to exclude test files and configurations from production builds.

**Prevention**: This validation script ensures the fix remains effective and catches similar issues early.

## validate-build-environment.js

A comprehensive script that validates the build environment separation to ensure production builds work correctly without development dependencies.

### Purpose

This script addresses the Netlify build issue where TypeScript compilation was failing due to vitest configuration files being included in production builds. It validates that:

1. TypeScript configuration properly excludes test files from production builds
2. Dependencies are correctly categorized (production vs development)
3. Production builds work without development dependencies installed
4. Build output is generated correctly

### Usage

```bash
# Run via npm script (recommended)
npm run validate-build

# Or run directly
node scripts/validate-build-environment.js
```

### What it validates

1. **TypeScript Configuration**: Checks that `tsconfig.json` properly excludes test files and configurations
2. **Package.json Dependencies**: Verifies that test-related packages are in `devDependencies`
3. **Clean Environment**: Creates a temporary clean environment for testing
4. **Production Dependencies**: Installs only production dependencies
5. **Production Build**: Tests that the build completes successfully without devDependencies
6. **Build Output**: Validates that the `.next` directory and required files are generated

### Output

The script provides detailed logging with timestamps and color-coded messages:
- 🟢 **SUCCESS**: Validation passed
- 🟡 **WARNING**: Non-critical issues found
- 🔴 **ERROR**: Critical issues that need fixing
- ℹ️ **INFO**: General information

### Exit Codes

- `0`: All validations passed
- `1`: One or more validations failed

### Example Output

```
[2025-07-29T08:41:00.515Z] [INFO] Starting build environment validation...
[2025-07-29T08:41:00.521Z] [SUCCESS] TypeScript configuration properly excludes test files
[2025-07-29T08:41:00.522Z] [SUCCESS] vitest is correctly placed in devDependencies
[2025-07-29T08:41:54.148Z] [SUCCESS] Production build completed successfully
[2025-07-29T08:41:59.206Z] [SUCCESS] ✅ All validations passed! Build environment is properly separated.
```

### When to use

- Before deploying to production
- After making changes to TypeScript configuration
- After adding new dependencies
- When troubleshooting build issues
- As part of CI/CD pipeline validation

### Troubleshooting

If the script fails, check the error messages for specific issues:

1. **TypeScript Config Issues**: Ensure test files are properly excluded in `tsconfig.json`
2. **Dependency Issues**: Move test-related packages to `devDependencies`
3. **Build Issues**: Check for missing production dependencies or configuration errors
4. **Output Issues**: Verify Next.js configuration and build process

### Technical Details

The script creates a temporary directory (`.temp-build-test`) to simulate a clean production environment. It:

1. Copies essential files (package.json, tsconfig.json, source code)
2. Removes devDependencies from package.json
3. Installs only production dependencies
4. Runs the build process
5. Validates the output
6. Cleans up temporary files

This ensures that the production build process is tested in isolation without any development dependencies that might mask issues.