# Contributing to Chimoney Interledger Wallet Transfer

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/chimoney-community-projects.git
   cd chimoney-community-projects/submissions/chimoney-interledger-wallet-transfer
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Chimoney API key to .env.local
   ```

## Development Workflow

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Ensure TypeScript types are properly defined
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm run dev      # Test in development
   npm run build    # Ensure it builds
   npm test         # Run tests
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Provide a clear description of your changes

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type
- Export types from `types/index.ts`

### React Components
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use proper prop types

### Styling
- Use Tailwind CSS utility classes
- Follow the existing design system
- Maintain responsive design
- Use shadcn/ui components where possible

### File Organization
```
app/
  - Server components and layouts
  - API routes in app/api/

components/
  - Reusable React components
  - UI components in components/ui/

lib/
  - Utility functions
  - Shared helpers

types/
  - TypeScript type definitions
```

## Commit Message Guidelines

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add transaction filtering
fix: wallet address validation
docs: update setup instructions
```

## Testing Guidelines

- Write tests for new features
- Ensure existing tests pass
- Test edge cases and error scenarios
- Use meaningful test descriptions

## Areas for Contribution

### High Priority
- [ ] Database integration for transaction history
- [ ] User authentication system
- [ ] Enhanced error handling
- [ ] Transaction search and filtering

### Medium Priority
- [ ] Multi-currency support
- [ ] Email notifications
- [ ] Export transactions (CSV/PDF)
- [ ] Dark mode support

### Low Priority
- [ ] Performance optimizations
- [ ] Additional UI improvements
- [ ] Integration tests
- [ ] Documentation improvements

## Questions?

- Open an issue for bugs or feature requests
- Join the [Chimoney Community Discord](https://discord.gg/chimoney)
- Check the [main README](./README.md) for setup help

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the Chimoney Community guidelines

Thank you for contributing! 🎉
