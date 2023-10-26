# shaders-mono

## Demo 01

![Alt text](assets/demo-01.png)

## Development

This mono repo is managed with NX and the following are the main scripts you need during development:

* `pnpm build`: Build any project that has changes in source code or configurations.
* `pnpm build:all`: Build all the projects in the repo. Nx will intelligently order the build process based on the dependency graph.
* `pnpm build:shared`: Builds only the shared libraries in the repo (projects under `shared`).
* `pnpm build:demo`: Builds the current main demo project.
* `pnpm dev:demo`: Runs development server and watch for changes for the current demo project.
