# Contributing Guidelines

## Welcome

Thank you for your interest in contributing to the Space Waste Management System (SWMS)! This document provides guidelines and information for contributors.

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/space-waste-management-system.git
   cd space-waste-management-system
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```
5. **Open** `http://localhost:5173` in your browser

## Development Workflow

### Branching Strategy

- `main`: Production-ready code
- `develop`: Integration branch for features
- `feature/*`: New features
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical fixes for production

### Creating a Feature Branch

```bash
# Create and switch to feature branch
git checkout -b feature/amazing-feature

# Make your changes
# Test thoroughly
# Commit changes
git add .
git commit -m "Add amazing feature"

# Push to your fork
git push origin feature/amazing-feature
```

### Pull Request Process

1. **Ensure** your branch is up to date with `main`
2. **Run tests** and ensure they pass
3. **Update documentation** if needed
4. **Create a Pull Request** with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Screenshots for UI changes
   - Reference to any related issues

### Commit Message Guidelines

Use clear, descriptive commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(fabricator): add water filter fabrication recipe
fix(inventory): resolve low stock alert bug
docs(readme): update installation instructions
```

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Strict type checking enabled
- No `any` types without justification
- Use meaningful variable and function names
- Follow camelCase convention

### React Components

```typescript
// Good: Clear component structure
interface ComponentProps {
  title: string;
  onAction: () => void;
}

const MyComponent: React.FC<ComponentProps> = ({ title, onAction }) => {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};

export default MyComponent;
```

### File Organization

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── Feature.tsx   # Feature components
│   └── index.ts      # Component exports
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── styles/           # Global styles
```

### Import Order

```typescript
// 1. React imports
import React from 'react';

// 2. Third-party libraries
import { useState } from 'react';
import { Card } from './ui/card';

// 3. Local imports
import { formatDate } from '../utils/date';
import { User } from '../types/user';

// 4. Relative imports
import Button from './Button';
```

## Testing Requirements

### Test Coverage

- Maintain 80% code coverage minimum
- Test all user-facing features
- Include edge cases and error conditions

### Writing Tests

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  test('handles user interaction', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // Assert expected behavior
  });
});
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Code Quality

### Linting

The project uses ESLint for code quality:

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

### Pre-commit Hooks

Pre-commit hooks ensure code quality:

- Runs linting
- Runs tests
- Checks commit message format
- Validates TypeScript types

### Code Review Checklist

- [ ] Code follows project conventions
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No console.log statements
- [ ] Types are properly defined
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met

## Documentation

### Updating Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions
- Update component documentation
- Include examples for new features

### Documentation Standards

```typescript
/**
 * Calculates the recovery rate for waste processing
 * @param inputWeight - Total weight of waste input
 * @param recoveredWeight - Weight of recovered materials
 * @returns Recovery rate as percentage
 */
export const calculateRecoveryRate = (
  inputWeight: number,
  recoveredWeight: number
): number => {
  return (recoveredWeight / inputWeight) * 100;
};
```

## Issue Reporting

### Bug Reports

When reporting bugs, include:

- **Title**: Clear, descriptive title
- **Description**: Steps to reproduce
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: Browser, OS, version
- **Screenshots**: If applicable

### Feature Requests

For new features, provide:

- **Title**: Feature name
- **Description**: Detailed explanation
- **Use case**: Why this feature is needed
- **Mockups**: Visual representations if applicable
- **Acceptance criteria**: How to know when it's done

## Security

### Reporting Security Issues

- **Do not** create public GitHub issues for security vulnerabilities
- Email security concerns to: security@project.org
- Include detailed reproduction steps
- Allow time for fixes before public disclosure

### Security Best Practices

- Never commit sensitive data
- Use environment variables for configuration
- Validate all user inputs
- Keep dependencies updated
- Follow OWASP guidelines

## Performance

### Performance Guidelines

- Optimize bundle size
- Use lazy loading for components
- Implement virtualization for large lists
- Minimize re-renders
- Use appropriate data structures

### Performance Testing

```typescript
// Performance test example
describe('Performance', () => {
  test('renders within time limit', () => {
    const start = performance.now();
    render(<HeavyComponent />);
    const end = performance.now();

    expect(end - start).toBeLessThan(100);
  });
});
```

## Accessibility

### WCAG Compliance

- Meet WCAG 2.1 AA standards
- Use semantic HTML
- Provide alt text for images
- Ensure keyboard navigation
- Test with screen readers

### Accessibility Testing

```typescript
// Accessibility test example
import { axe } from 'jest-axe';

test('is accessible', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Release Process

### Version Numbering

Follow semantic versioning:

- **MAJOR**: Breaking changes
- **MINOR**: New features
- **PATCH**: Bug fixes

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version number bumped
- [ ] Tag created and pushed
- [ ] Deployment successful
- [ ] Release notes published

## Getting Help

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Documentation**: Check existing docs first

### Community

- Be patient and respectful
- Help other contributors
- Share knowledge and best practices
- Participate in code reviews

## Recognition

Contributors are recognized through:

- GitHub contributor statistics
- Mention in release notes
- Project maintainer status for active contributors
- Attribution in documentation

Thank you for contributing to the Space Waste Management System!

---

**Document Version**: 1.0
**Last Updated**: October 2025