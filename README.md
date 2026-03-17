# 陈衍年作品集

This is a personal portfolio built with `Vite + React + TypeScript`.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

This project is already prepared for GitHub Pages:

- `vite.config.ts` uses `base: "/NeoCyyyn/"`.
- `.github/workflows/deploy.yml` builds and deploys on pushes to `main`.
- The workflow can also be triggered manually from the GitHub Actions page.

To publish it for the first time:

1. Create a new GitHub repository.
2. Push this project to the repository's `main` branch.
3. Open `Settings -> Pages` in that repository.
4. Set `Source` to `GitHub Actions`.
5. Wait for the `Deploy Vite site to Pages` workflow to finish.

Your site URL will usually be:

```text
https://<github-username>.github.io/<repository-name>/
```

If you want to use a custom domain, add a `public/CNAME` file later.
