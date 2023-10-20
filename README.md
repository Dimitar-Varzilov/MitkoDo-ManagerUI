# MitkoDo Manager UI.  
> This include React+TS with familiar pre-setup tooling  
> Redux Toolkit, RTK Query, React Router, eslint-config-ts-prefixer, Vitest/TS/react-testing-library.

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [eslint-config-ts-prefixer](https://github.com/laststance/eslint-config-ts-prefixer). Specialized fixable(`--fix` option) rule sets. Zero extend any recommended for confortable DX.
- [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), [react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library)
- [Github Actions](https://github.com/features/actions)

All npm package are keeping least release version powered by [Dependabot](https://github.com/dependabot).

# Installation


- Install [pnpm](https://pnpm.io/installation)

### pnpm

```sh
pnpm install
pnpm dev
```

## Commands

```bash
pnpm dev             # start development server
pnpm start           # start development server
pnpm test            # run vitest
pnpm test:watch      # run vitest watch mode
pnpm lint            # run eslint
pnpm lint:fix         # run eslint with --fix option
pnpm typecheck       # run TypeScript compiler check
pnpm build           # build production bundle to 'dist' directly
pnpm prettier        # run prettier for json|yml|css|md|mdx files
pnpm clean           # remove 'node_modules' 'yarn.lock' 'dist' completely
pnpm serve           # launch server for production bundle in local
```