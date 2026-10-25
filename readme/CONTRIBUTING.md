# Contributing to Chakra Agent

Thank you for your interest in contributing to Chakra Agent! We welcome contributions to our multi-agent framework, components, test runner sandboxes, and documentation.

---

## Code of Conduct

Please be respectful, collaborative, and constructive when interacting with maintainers and other contributors.

---

## Development Workflow

1. **Fork & Branch**:
   - Fork the repository.
   - Create a feature branch with a descriptive name:
     ```bash
     git checkout -b feat/your-feature-name
     ```

2. **Coding Standards**:
   - Write clean, strongly-typed TypeScript.
   - Follow the design system tokens defined in `@theme` inside `src/index.css`.
   - Adhere to the zero-pill discipline (clean unboxed typographic metadata instead of candy badge capsules).
   - Maintain natural responsiveness across phone, tablet, and desktop viewports.
   - Use the standardized `<ChakraLogo />` component.

3. **Verification & Testing**:
   Before opening a PR, ensure all checks pass:
   ```bash
   # Run TypeScript type check
   npm run lint

   # Verify production build compilation
   npm run build
   ```

4. **Submitting a Pull Request**:
   - Open a PR against `main`.
   - Include a clear description of the problem solved and the agents touched.
   - Attach screenshots or recordings of visual changes.

---

## License

By contributing to Chakra Agent, you agree that your contributions will be licensed under the project's [Apache-2.0 License](../LICENSE).
