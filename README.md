# shaders-mono

Welcome to the "shaders-mono" project, an evolving exploration into the realms of WebGPU API and geometric programming using TypeScript.

At the heart of this project lies two core libraries housed within the shared folder: "geopro" and "webgpu."
The "geopro" library is dedicated to 'coordinate-free' geometric programming, providing a robust toolkit for handling and manipulating geometric data and algorithms in a way that abstracts away the complexities of traditional coordinate systems.

Parallel to "geopro," the "webgpu" library represents a forward-thinking endeavor in the realm of WebGPU technology.
This library is not just an accumulation of shader programming techniques; it's an ongoing attempt to streamline WebGPU programming.

We are not trying to replicate the abstractions found in other libraries built on top of low-level graphics APIs.
Instead, the focus is on creating a more intuitive and accessible interface for WebGPU, aiming to unlock the full potential of this modern API while avoiding the complexities and limitations imposed by previous models.

By exploring innovative approaches and prioritizing a simplified user experience, this library serves as a foundational tool for developers venturing into the intricate world of WebGPU, providing an environment where creativity and efficiency coexist.

To test and showcase the features of these library this repo also includes a few demo applications under the `demos` folder.
You can also run the live [demos here](https://micurs.github.io/shaders-mono/).

## Demo 1

![Alt text](assets/demo-01.png)

[Open the demo](https://micurs.github.io/shaders-mono/demo-01.html).

## Demo 2

A simple example with realtime animation of a 3D clock.

![Alt text](assets/demo-02.png)

[Open the demo](https://micurs.github.io/shaders-mono/demo-02.html).

## Demo 3

A simple integration with [Oimo.js 3d physics engine](https://github.com/lo-th/Oimo.js/).

![Alt text](assets/demo-03.png)

[Open the demo](https://micurs.github.io/shaders-mono/demo-03.html).

## Development

This monorepo is managed with **Turborepo** and uses `pnpm` as package manager.

First, run `pnpm install` to get all the dependencies.

Then you can run the main scripts from the root folder of this project to build the code:

* `pnpm build:all`: Build all the projects in the repo. Turborepo will intelligently order the build process based on the dependency graph and provide efficient caching.
* `pnpm build:shared`: Builds only the shared libraries in the repo (projects under `shared`).
* `pnpm build:demo1`: Builds demo-01 project.
* `pnpm build:demo2`: Builds demo-02 project.
* `pnpm build:demo3`: Builds demo-03 project.

To run the demo apps in development mode, you can use these commands from the root:

* `pnpm dev:demo1`: Runs demo-01 in development mode with hot reloading.
* `pnpm dev:demo2`: Runs demo-02 in development mode with hot reloading.
* `pnpm dev:demo3`: Runs demo-03 in development mode with hot reloading.

Each demo command will automatically build and watch the shared dependencies as needed.

You can also `cd` to any `demos` subfolder and run the `dev` script defined in each `package.json`:

```
cd demos/demo-02
pnpm dev
```

### Turborepo Benefits

The migration to Turborepo provides several advantages:

- **Intelligent Caching**: Turborepo caches build outputs and only rebuilds what has changed.
- **Parallel Execution**: Tasks run in parallel when possible, significantly improving build times.
- **Dependency Awareness**: Automatically handles build order based on package dependencies.
- **Remote Caching**: Can be configured for team-wide cache sharing (optional).

### License

This project is licensed under the MIT License - see the [LICENSE](license.txt) file for details.
