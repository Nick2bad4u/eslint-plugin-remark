# require-remark-plugins-packages-installed

Require package-backed Remark `plugins` entries to be listed in workspace dependencies.

## Rule details

A Remark config that references a package not listed in `dependencies`, `devDependencies`, `peerDependencies`, or `optionalDependencies` can pass review but fail when installed in a clean workspace. This rule checks string plugin specifiers, including the first element of `[plugin, options]` tuples, against the nearest package manifests available to ESLint.

## ❌ Incorrect

```ts
export default {
 plugins: ["remark-plugin-that-is-not-installed"],
};
```

## ✅ Correct

```ts
export default {
 plugins: ["remark-gfm"],
};
```

## When not to use it

Disable this rule when plugin packages are injected by a non-package-manager runtime that is not reflected in `package.json`.
