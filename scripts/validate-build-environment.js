#!/usr/bin/env node

/**
 * Build Environment Validation Script
 * 
 * This script validates that the production build process works correctly
 * without development dependencies, ensuring proper environment separation.
 * 
 * Usage: node scripts/validate-build-environment.js
 */

import { execSync, spawn } from 'child_process';
import { existsSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const tempDir = join(projectRoot, '.temp-build-test');

class BuildValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${type.toUpperCase()}]`;
    
    switch (type) {
      case 'error':
        console.error(`\x1b[31m${prefix} ${message}\x1b[0m`);
        this.errors.push(message);
        break;
      case 'warning':
        console.warn(`\x1b[33m${prefix} ${message}\x1b[0m`);
        this.warnings.push(message);
        break;
      case 'success':
        console.log(`\x1b[32m${prefix} ${message}\x1b[0m`);
        this.success.push(message);
        break;
      default:
        console.log(`${prefix} ${message}`);
    }
  }

  async validateTypeScriptConfig() {
    this.log('Validating TypeScript configuration...');
    
    try {
      const tsconfigPath = join(projectRoot, 'tsconfig.json');
      if (!existsSync(tsconfigPath)) {
        this.log('tsconfig.json not found', 'error');
        return false;
      }

      // Read the file content and check for required exclusions
      const tsconfigContent = readFileSync(tsconfigPath, 'utf8');
      
      // Check if test files are properly excluded
      // These exclusions prevent the specific Netlify build failure that occurred
      // when Next.js tried to compile vitest.config.ts in production
      const requiredExclusions = [
        'vitest.config.ts',        // Primary fix for Netlify build issue
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/__tests__/**/*',
        'src/test/**/*'            // Additional test directory exclusion
      ];

      const missingExclusions = requiredExclusions.filter(
        pattern => !tsconfigContent.includes(`"${pattern}"`)
      );

      if (missingExclusions.length > 0) {
        this.log(`Missing exclusions in tsconfig.json: ${missingExclusions.join(', ')}`, 'warning');
        return false;
      } else {
        this.log('TypeScript configuration properly excludes test files', 'success');
      }

      // Additional check for the exclude section
      if (!tsconfigContent.includes('"exclude"')) {
        this.log('tsconfig.json missing exclude section', 'error');
        return false;
      }

      this.log('TypeScript configuration validation passed', 'success');
      return true;
    } catch (error) {
      this.log(`Error validating TypeScript config: ${error.message}`, 'error');
      return false;
    }
  }

  async validatePackageJson() {
    this.log('Validating package.json dependencies...');
    
    try {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
      
      const devDeps = Object.keys(packageJson.devDependencies || {});
      const prodDeps = Object.keys(packageJson.dependencies || {});
      
      // Check if vitest is properly in devDependencies
      if (devDeps.includes('vitest')) {
        this.log('vitest is correctly placed in devDependencies', 'success');
      } else if (prodDeps.includes('vitest')) {
        this.log('vitest should be in devDependencies, not dependencies', 'error');
        return false;
      } else {
        this.log('vitest not found in dependencies', 'warning');
      }

      // Check for other test-related packages
      const testPackages = ['@testing-library/react', '@testing-library/jest-dom', 'jsdom'];
      const misplacedTestPackages = testPackages.filter(pkg => prodDeps.includes(pkg));
      
      if (misplacedTestPackages.length > 0) {
        this.log(`Test packages in production dependencies: ${misplacedTestPackages.join(', ')}`, 'error');
        return false;
      }

      this.log('Package.json dependencies are properly categorized', 'success');
      return true;
    } catch (error) {
      this.log(`Error validating package.json: ${error.message}`, 'error');
      return false;
    }
  }

  async createCleanEnvironment() {
    this.log('Creating clean test environment...');
    
    try {
      // Clean up any existing temp directory
      if (existsSync(tempDir)) {
        rmSync(tempDir, { recursive: true, force: true });
      }
      
      mkdirSync(tempDir, { recursive: true });
      
      // Copy essential files for build
      const filesToCopy = [
        'package.json',
        'package-lock.json',
        'next.config.mjs',
        'tsconfig.json',
        'postcss.config.mjs',
        'next-env.d.ts',
        'netlify.toml'
      ];
      
      for (const file of filesToCopy) {
        const srcPath = join(projectRoot, file);
        const destPath = join(tempDir, file);
        
        if (existsSync(srcPath)) {
          const content = readFileSync(srcPath);
          writeFileSync(destPath, content);
        }
      }
      
      // Copy src directory
      this.copyDirectory(join(projectRoot, 'src'), join(tempDir, 'src'));
      this.copyDirectory(join(projectRoot, 'public'), join(tempDir, 'public'));
      
      this.log('Clean environment created successfully', 'success');
      return true;
    } catch (error) {
      this.log(`Error creating clean environment: ${error.message}`, 'error');
      return false;
    }
  }

  copyDirectory(src, dest) {
    if (!existsSync(src)) return;
    
    mkdirSync(dest, { recursive: true });
    const entries = execSync(`find "${src}" -type f`, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);
    
    for (const entry of entries) {
      const relativePath = entry.replace(src, '');
      const destPath = join(dest, relativePath);
      const destDir = dirname(destPath);
      
      mkdirSync(destDir, { recursive: true });
      const content = readFileSync(entry);
      writeFileSync(destPath, content);
    }
  }

  async installProductionDependencies() {
    this.log('Installing production dependencies only...');
    
    try {
      // Modify package.json to remove devDependencies
      const packageJsonPath = join(tempDir, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
      
      // Remove devDependencies section
      delete packageJson.devDependencies;
      
      writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      
      // Install dependencies
      execSync('npm ci --only=production', {
        cwd: tempDir,
        stdio: 'pipe',
        encoding: 'utf8'
      });
      
      this.log('Production dependencies installed successfully', 'success');
      return true;
    } catch (error) {
      this.log(`Error installing production dependencies: ${error.message}`, 'error');
      return false;
    }
  }

  async testProductionBuild() {
    this.log('Testing production build without devDependencies...');
    
    return new Promise((resolve) => {
      const buildProcess = spawn('npm', ['run', 'build'], {
        cwd: tempDir,
        stdio: 'pipe',
        env: { ...process.env, NODE_ENV: 'production' }
      });
      
      let stdout = '';
      let stderr = '';
      
      buildProcess.stdout.on('data', (data) => {
        stdout += data.toString();
      });
      
      buildProcess.stderr.on('data', (data) => {
        stderr += data.toString();
      });
      
      buildProcess.on('close', (code) => {
        if (code === 0) {
          this.log('Production build completed successfully', 'success');
          
          // Check if .next directory was created
          const nextDir = join(tempDir, '.next');
          if (existsSync(nextDir)) {
            this.log('.next directory created successfully', 'success');
          } else {
            this.log('.next directory not found after build', 'error');
          }
          
          resolve(true);
        } else {
          this.log(`Production build failed with code ${code}`, 'error');
          this.log(`Build output: ${stdout}`, 'error');
          this.log(`Build errors: ${stderr}`, 'error');
          resolve(false);
        }
      });
      
      // Set timeout for build process
      setTimeout(() => {
        buildProcess.kill();
        this.log('Build process timed out', 'error');
        resolve(false);
      }, 300000); // 5 minutes timeout
    });
  }

  async validateBuildOutput() {
    this.log('Validating build output...');
    
    try {
      const nextDir = join(tempDir, '.next');
      const staticDir = join(nextDir, 'static');
      const serverDir = join(nextDir, 'server');
      
      const requiredDirs = [nextDir, staticDir, serverDir];
      const missingDirs = requiredDirs.filter(dir => !existsSync(dir));
      
      if (missingDirs.length > 0) {
        this.log(`Missing build output directories: ${missingDirs.join(', ')}`, 'error');
        return false;
      }
      
      this.log('Build output validation passed', 'success');
      return true;
    } catch (error) {
      this.log(`Error validating build output: ${error.message}`, 'error');
      return false;
    }
  }

  async cleanup() {
    this.log('Cleaning up temporary files...');
    
    try {
      if (existsSync(tempDir)) {
        rmSync(tempDir, { recursive: true, force: true });
      }
      this.log('Cleanup completed', 'success');
    } catch (error) {
      this.log(`Error during cleanup: ${error.message}`, 'warning');
    }
  }

  async run() {
    this.log('Starting build environment validation...');
    
    const steps = [
      { name: 'TypeScript Config', fn: () => this.validateTypeScriptConfig() },
      { name: 'Package.json', fn: () => this.validatePackageJson() },
      { name: 'Clean Environment', fn: () => this.createCleanEnvironment() },
      { name: 'Production Dependencies', fn: () => this.installProductionDependencies() },
      { name: 'Production Build', fn: () => this.testProductionBuild() },
      { name: 'Build Output', fn: () => this.validateBuildOutput() }
    ];
    
    let allPassed = true;
    
    for (const step of steps) {
      this.log(`Running ${step.name} validation...`);
      const result = await step.fn();
      
      if (!result) {
        allPassed = false;
        this.log(`${step.name} validation failed`, 'error');
      } else {
        this.log(`${step.name} validation passed`, 'success');
      }
    }
    
    await this.cleanup();
    
    // Print summary
    this.log('\n=== VALIDATION SUMMARY ===');
    this.log(`Successful checks: ${this.success.length}`);
    this.log(`Warnings: ${this.warnings.length}`);
    this.log(`Errors: ${this.errors.length}`);
    
    if (this.warnings.length > 0) {
      this.log('\nWarnings:', 'warning');
      this.warnings.forEach(warning => this.log(`  - ${warning}`, 'warning'));
    }
    
    if (this.errors.length > 0) {
      this.log('\nErrors:', 'error');
      this.errors.forEach(error => this.log(`  - ${error}`, 'error'));
    }
    
    if (allPassed && this.errors.length === 0) {
      this.log('\n✅ All validations passed! Build environment is properly separated.', 'success');
      process.exit(0);
    } else {
      this.log('\n❌ Some validations failed. Please review the errors above.', 'error');
      process.exit(1);
    }
  }
}

// Run the validator
const validator = new BuildValidator();
validator.run().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});