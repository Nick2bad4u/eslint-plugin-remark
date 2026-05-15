<!-- markdownlint-disable -->
<!-- eslint-disable markdown/no-missing-label-refs -->
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]


[a030a19...2266a76](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/compare/a030a19ab6f6c3c50eb7d22f53e2ccbd6cc9eb4c...2266a76345f8ea7c233c7ecebbe34500f52f33d5)


### ✨ Features

- [`2266a76`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/2266a76345f8ea7c233c7ecebbe34500f52f33d5) — ✨ [feat] Enhance HomepageFeatures with new icons and improved styles

- Add icon support for external and internal features

- Update styles for card components, including hover effects and transitions

- Refactor feature structure to improve clarity and maintainability
🧪 [test] Update configs test to include new rules for duplicate extends and plugins

- Add tests for "disallow-stylelint-duplicate-extends" and "disallow-stylelint-duplicate-plugins"

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`fab4f56`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/fab4f561cdaec2ac89495b5ed51c52a00d5887bc) — ✨ [feat] Add stylelint config hygiene rules and helpers

✨ [feat] Adds a broad new policy layer for stylelint config files:

- duplicates in extends/plugins/secondary option arrays

- non-array extends/plugins, relative path extends/plugins, and null rule values

- stable ordering for extends/plugins/rules keys

- canonical stylelint config filename convention

- require reportDisables true and requires installed extends/plugins packages

✨ [feat] Implements shared internal factories for:

- string-array config option parsing/fixing

- package dependency resolution from nearest package.json

- top-level rules object value traversal

📝 [docs] Updates README, docs site, presets index to expose new rules.

🧪 [test] Adds test coverage for each new rule plus plugin config registry states.


- Enables cleaner, deterministic config composition and auditability in stylelint authoring.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`adf5e9c`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/adf5e9c268132c7195e1faaa0f224179a75ab727) — ✨ [feat] Add new Stylelint configuration rules for enhanced hygiene

- Introduced `disallow-stylelint-allow-empty-input` to prevent empty input configurations.

- Added `disallow-stylelint-configuration-comment` to disallow configuration comments in Stylelint configs.

- Implemented `disallow-stylelint-custom-syntax` to restrict custom syntax at the top level.

- Created `disallow-stylelint-empty-rules-object` to disallow empty rules objects in Stylelint configs.

- Added `disallow-stylelint-processors` to prevent the use of processors in Stylelint configurations.

- Introduced `require-stylelint-custom-syntax-in-overrides` to enforce custom syntax within overrides.

- Implemented `require-stylelint-overrides-files` to ensure non-empty files matchers in overrides.

- Added `require-stylelint-rules-object` to enforce the presence of a top-level rules object in Stylelint configs.
🧪 [test] Add tests for new Stylelint configuration rules

- Created tests for `disallow-stylelint-allow-empty-input` to validate empty input handling.

- Added tests for `disallow-stylelint-configuration-comment` to ensure comments are disallowed.

- Implemented tests for `disallow-stylelint-custom-syntax` to validate custom syntax restrictions.

- Created tests for `disallow-stylelint-empty-rules-object` to ensure non-empty rules objects.

- Added tests for `disallow-stylelint-processors` to validate processor restrictions.

- Implemented tests for `require-stylelint-custom-syntax-in-overrides` to ensure custom syntax is scoped.

- Created tests for `require-stylelint-overrides-files` to validate non-empty files matchers.

- Added tests for `require-stylelint-rules-object` to ensure rules object presence.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`b10b6bb`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/b10b6bb0afd81fc55d6c85dd5f7afc138f4038ce) — ✨ [feat] Add new rules to enhance Stylelint configuration hygiene

- Introduced `disallow-stylelint-cache` to prevent cache configuration in Stylelint config files.

- Added `disallow-stylelint-default-severity` to disallow top-level default severity settings.

- Implemented `disallow-stylelint-fix` to prevent fix configuration in Stylelint config files.

- Added `disallow-stylelint-ignore-files` to disallow ignore files configuration in Stylelint config files.
📝 [docs] Update documentation to reflect new rules

- Updated presets documentation to include new rules with descriptions and autofix capabilities.

- Enhanced configuration documentation to include new rules in the flat config example.

- Updated the rules matrix in the index documentation to include new rules and their respective preset keys.
🧪 [test] Add tests for new rules

- Created tests for `disallow-stylelint-cache`, `disallow-stylelint-default-severity`, `disallow-stylelint-fix`, and `disallow-stylelint-ignore-files` to ensure correct functionality and error reporting.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`6903302`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/6903302e0e5a7b2a395036da6c197a5994877d73) — ✨ [feat] (homepage) Revamp homepage layout and content

- Introduced hero badges to highlight key features of the ESLint plugin.

- Added quick links for easy navigation to important documentation sections.

- Updated meta tags for improved SEO and social sharing.

- Enhanced visual elements with a new logo and improved SVG graphics.

- Refactored layout structure for better responsiveness and user experience.

🎨 [style] (navbar) Improve navbar component styling

- Adjusted color mode toggle styling for consistency.

- Cleaned up code formatting for better readability.

🧹 [chore] (assets) Update favicon and logo images

- Replaced existing favicon and logo images with new versions for branding consistency.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`e771060`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/e771060f1a84e8125d75dd646a313d76e7c130f2) — ✨ [feat] (presets) Introduce new configuration presets and update aliases

- Introduced `stylelintOnly` preset for stylesheet linting only, replacing `stylesheets` alias.

- Introduced `configuration` preset for config hygiene, replacing `configs` alias.

- Updated documentation to reflect new preset structure and usage.

- Updated all relevant code references to use new preset names.

- Ensured backward compatibility for legacy aliases.
📝 [docs] (presets) Update documentation for new preset structure

- Added detailed descriptions for `stylelintOnly` and `configuration` presets.

- Updated related documentation links and examples across multiple files.

- Enhanced clarity on the purpose and usage of each preset.
🧪 [test] (configs) Update tests to reflect new preset names and functionality

- Adjusted tests to verify the behavior of new `stylelintOnly` and `configuration` presets.

- Ensured legacy aliases are still wired correctly to the new presets.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`6571c41`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/6571c418578d8d05f9470c3c18fe5a9df5570c58) — ✨ [feat] Update documentation links and configurations for eslint-plugin-stylelint-2

- Updated robots.txt to point to the new sitemap for eslint-plugin-stylelint-2.

- Modified typedoc.config.json to reflect the new hosted base URL.

- Changed rule documentation links in all preset markdown files to use eslint-plugin-stylelint-2.

- Updated package.json to change homepage and issue URLs to eslint-plugin-stylelint-2.

- Adjusted internal rule documentation URLs in the source code to point to eslint-plugin-stylelint-2.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`e0a5b55`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/e0a5b558c0f488da9a91613afed207fb6887213e) — ✨ [feat] Add rules to disallow top-level Stylelint config options

- Introduced `disallow-stylelint-formatter` rule to prevent configuring the `formatter` option in Stylelint config files.

- Introduced `disallow-stylelint-ignore-disables` rule to prevent configuring the `ignoreDisables` option in Stylelint config files.

- Implemented shared rule factory for disallowing top-level Stylelint config options.

- Updated `stylelint2Rules` registry to include new rules.

- Updated package dependencies for `@secretlint` to version `^11.4.1`.

- Enhanced scripts for syncing presets and README rules to include new rules.

- Added tests for both new rules to ensure proper functionality and coverage.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`f6ee840`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/f6ee8401289f513d88857b05c753d7b075fe6846) — ✨ [feat] Add new Stylelint config hygiene rules

- Introduced five new rules: `prefer-stylelint-report-descriptionless-disables`, `prefer-stylelint-report-invalid-scope-disables`, `prefer-stylelint-report-needless-disables`, `prefer-stylelint-report-unscoped-disables`, and `prefer-stylelint-define-config`.

- Each rule enforces specific Stylelint configuration options to improve code quality and reporting.

- Updated documentation to reflect the new rules and their usage.

- Enhanced the rules matrix and presets to include the new rules, ensuring they are part of the recommended configurations.
🧪 [test] Add tests for new Stylelint config hygiene rules

- Created individual test files for each new rule to ensure proper functionality and adherence to expected behaviors.

- Added tests to validate that the rules correctly enforce the required configuration options in various scenarios.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`2b412a3`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/2b412a3bdd82f5a30e40b12af2e7091385b07451) — ✨ [feat] Enhance Stylelint integration and rule definitions

- Introduced support for `ignoreDisables` option in Stylelint rules to allow ignoring disable comments during linting.

- Updated `prefer-stylelint-define-config` rule to enforce usage of `defineConfig()` for Stylelint config modules.

- Improved worker thread handling in `stylelint-runner` for better performance and error management.

- Refactored rule definitions to ensure immutability and better type safety.

- Enhanced documentation for rule options and configurations to provide clearer guidance.
🧪 [test] Expand test coverage for Stylelint rules and configurations

- Added tests for new `ignoreDisables` option and its impact on linting results.

- Updated existing tests to reflect changes in rule behavior and configuration requirements.

- Ensured all tests pass with the latest changes to maintain code integrity.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>



### 🛠️ Other Changes

- [`f717fc4`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/f717fc456256fa529f7ea4c1d294adc2b8629e96) — Initialize project with basic structure and dependencies

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`a030a19`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/a030a19ab6f6c3c50eb7d22f53e2ccbd6cc9eb4c) — Initial commit



### 🎨 Styling

- [`6e86931`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/6e869319c881b41bf517eefdca5bb2f1645dc520) — 🎨 [style] Improve code formatting and documentation clarity

- Adjust typedef formatting in eslint-benchmark-config.mjs for better readability

- Reorder rule registration in rules-registry.ts for consistency

- Update stylelint2-config-references.ts to maintain consistent configuration order

- Ensure configurationPreset is consistently defined in plugin.ts

- Enhance documentation comments in prefer-stylelint-report-descriptionless-disables.ts and prefer-stylelint-report-invalid-scope-disables.ts for clarity

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>



### 🧹 Chores

- [`69076c3`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/69076c3850dc19675f4aea033f0a4ce4cfde34d6) — 🔧 [chore] Update npm-package-json-lint to version 10.0.0

- Upgrade npm-package-json-lint dependency in package.json and package-lock.json

- Adjust node engine requirement to >=22.0.0

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>


- [`7018ecb`](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/commit/7018ecba8ae1b47c5a3eb8369afa935a2ba0264c) — 🔧 [chore] Update dependencies in package.json


- Upgrade "@stylistic/stylelint-plugin" from "^5.0.1" to "^5.1.0" for improved linting capabilities.

- Upgrade "eslint-plugin-copilot" from "^1.0.5" to "^1.0.6" for better integration with GitHub Copilot.

- Upgrade "eslint-plugin-etc-misc" from "^1.0.4" to "^1.0.5" for additional miscellaneous linting rules.

- Upgrade "eslint-plugin-file-progress-2" from "^3.4.3" to "^3.4.4" for enhanced file progress tracking.

- Upgrade "eslint-plugin-github-actions-2" from "^1.0.1" to "^1.0.2" for improved GitHub Actions linting.

- Upgrade "eslint-plugin-immutable-2" from "^1.0.6" to "^1.0.7" for better immutability checks.

- Upgrade "eslint-plugin-package-json" from "^0.91.0" to "^0.91.1" for updated package.json linting rules.

- Upgrade "eslint-plugin-sdl-2" from "^1.0.4" to "^1.0.5" for improved SDL linting.

- Upgrade "eslint-plugin-tsdoc-require-2" from "^1.0.6" to "^1.0.7" for better TSDoc compliance.

- Upgrade "eslint-plugin-typefest" from "^1.0.7" to "^1.0.8" for additional TypeScript utility types.

- Upgrade "eslint-plugin-unicorn" from "^63.0.0" to "^64.0.0" for new unicorn rules and improvements.

- Upgrade "eslint-plugin-write-good-comments-2" from "^1.0.4" to "^1.0.5" for better comment quality checks.

- Upgrade "knip" from "^6.0.6" to "^6.1.0" for improved code analysis and duplication detection.

Signed-off-by: Nick2bad4u <20943337+Nick2bad4u@users.noreply.github.com>






## Contributors
Thanks to all the [contributors](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/graphs/contributors) for their hard work!
## License
This project is licensed under the [MIT License](https://github.com/Nick2bad4u/eslint-plugin-stylelint-2/blob/main/LICENSE)
*This changelog was automatically generated with [git-cliff](https://github.com/orhun/git-cliff).*
