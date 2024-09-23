# Contributing to Qwikz
**Thank you** for considering contributing to _Qwikz_! We appreciate your time and effort in improving the platform. Whether you're helping with bug fixes, new features, or documentation, all contributions are welcome!

## How You Can Contribute
We’re looking for contributions in the following areas:

1. Bug reports: If you find a bug, let us know by reporting it.
2. Feature requests: Have ideas for new features? Open a request.
3. Code contributions: Improve existing code, add new features, or fix bugs.
4. Documentation: Help us improve the project’s documentation.
5. UI/UX Design: Contribute to the frontend and design improvements.
6. Testing: Write unit and integration tests to ensure the platform is stable.
7. Refactoring and Optimizations: Help clean and optimize code for better performance.

## Getting Started
### **Fork** the _Repository_
If you'd like to contribute, first fork the repository:

Click the "Fork" button at the top-right of this repository.
Clone the forked repository to your local machine:
```
git clone https://github.com/your-username/qwikz.git
cd qwikz
```

### Create a Branch
Create a new branch for your changes. Use a meaningful name related to the feature or issue you're addressing:
```git checkout -b feature/add-timer-support```

### Make Your Changes
Stick to the project’s coding standards (described below).
Make sure to update or add tests for your changes.
Ensure the project runs without errors after your changes.

### Commit Your Changes
Make sure to use concise and descriptive commit messages:
```git commit -m "Add timer functionality for quiz submissions"```

### Push to Your Fork
Push your changes to your forked repository:
```git push origin feature/add-timer-support```

### Submit a Pull Request (PR)
Go to the main Qwikz repository and submit a **pull request**:
Base your PR against the main branch.
In the PR description, describe what the changes do and why they are necessary.
Link any relevant issues that your PR addresses.
Add appropriate labels (e.g., bug, enhancement, documentation).

## Coding Guidelines
1. **JavaScript**/**Node.js** (_Backend_)
- Use ES6+ syntax and features where applicable.
- Organize code in a modular and reusable way.
- Avoid blocking I/O operations, and prefer async/await for asynchronous code.
- Use Express.js for building APIs (or other libraries if mentioned in the project).
- Ensure that the code is properly linted using ESLint.

2. **React.js** (_Frontend_)
- Use functional components and hooks over class components.
- Keep components modular and reusable.
- Follow a consistent folder structure (e.g., separate components, services, and hooks).
- Use state management with React Context or Redux if necessary.
- Make sure UI components are responsive and adhere to design guidelines.
- Ensure that all user inputs are properly validated.

3. **Formatting** and **Linting**
- We use ESLint for code linting. Please run it before pushing changes:
  ```npm run lint```
- We use Prettier for consistent code formatting. Run this to auto-format your code:
  ```npm run format```

4. Writing **Tests**
- We use Jest and React Testing Library for frontend tests.
- Use Mocha or Jest for backend tests.
- Ensure that any new feature or bug fix includes corresponding tests.
- To run tests locally:
  ```npm test```

5. **Commit** Messages
  Follow the Conventional Commits specification for commit messages:
- feat: A new feature.
- fix: A bug fix.
- docs: Changes to documentation.
- style: Code style or formatting improvements.
- refactor: Code refactoring without changing functionality.
- test: Adding or fixing tests.
- chore: Maintenance or project changes that do not impact the codebase.

6. **Documentation**
- Make sure to add documentation to help otehr fellow devs understand the codebase and your contribution.

7. **Reporting Bugs**
- If you find a bug, please open an issue using the Bug Report template (bug: ).

## License
By contributing to Qwikz, you agree that your contributions will be licensed under the GNU AFFERO GENERAL PUBLIC LICENSE.
