/**
 * @packageDocumentation
 * Workspace dependency lookup helpers for Stylelint config validation rules.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { arrayFirst, isDefined, objectKeys, stringSplit } from "ts-extras";

type DependencyRecord = Readonly<Record<string, string>>;

type PackageJsonLike = Readonly<{
    dependencies?: DependencyRecord;
    devDependencies?: DependencyRecord;
    optionalDependencies?: DependencyRecord;
    peerDependencies?: DependencyRecord;
}>;

const nearestPackageJsonCache = new Map<string, string | undefined>();
const dependencyNameSetCache = new Map<
    string,
    ReadonlySet<string> | undefined
>();

const getNearestPackageJsonPath = (
    startDirectory: string
): string | undefined => {
    const normalizedStartDirectory = path.resolve(startDirectory);

    if (nearestPackageJsonCache.has(normalizedStartDirectory)) {
        return nearestPackageJsonCache.get(normalizedStartDirectory);
    }

    let currentDirectory = normalizedStartDirectory;

    while (true) {
        const packageJsonPath = path.resolve(currentDirectory, "package.json");

        // eslint-disable-next-line n/no-sync, security/detect-non-literal-fs-filename -- Path is assembled from resolved directories under lint control.
        if (existsSync(packageJsonPath)) {
            nearestPackageJsonCache.set(
                normalizedStartDirectory,
                packageJsonPath
            );

            return packageJsonPath;
        }

        const parentDirectory = path.dirname(currentDirectory);

        if (parentDirectory === currentDirectory) {
            nearestPackageJsonCache.set(normalizedStartDirectory, undefined);

            return undefined;
        }

        currentDirectory = parentDirectory;
    }
};

const toDependencyNameSet = (
    packageJson: PackageJsonLike
): ReadonlySet<string> => {
    const dependencyNames = new Set<string>();

    const dependencyRecords: readonly (DependencyRecord | undefined)[] = [
        packageJson.dependencies,
        packageJson.devDependencies,
        packageJson.peerDependencies,
        packageJson.optionalDependencies,
    ];

    for (const dependencyRecord of dependencyRecords) {
        if (!isDefined(dependencyRecord)) {
            continue;
        }

        for (const dependencyName of objectKeys(dependencyRecord)) {
            dependencyNames.add(dependencyName);
        }
    }

    return dependencyNames;
};

const readDependencyNamesFromPackageJson = (
    packageJsonPath: string
): ReadonlySet<string> | undefined => {
    if (dependencyNameSetCache.has(packageJsonPath)) {
        return dependencyNameSetCache.get(packageJsonPath);
    }

    try {
        // eslint-disable-next-line n/no-sync, security/detect-non-literal-fs-filename -- Path comes from nearest package.json discovery in this module.
        const packageJsonText = readFileSync(packageJsonPath, "utf8");
        const parsedPackageJson = JSON.parse(packageJsonText) as unknown;

        if (
            parsedPackageJson === null ||
            typeof parsedPackageJson !== "object"
        ) {
            dependencyNameSetCache.set(packageJsonPath, undefined);

            return undefined;
        }

        const dependencyNameSet = toDependencyNameSet(parsedPackageJson);

        dependencyNameSetCache.set(packageJsonPath, dependencyNameSet);

        return dependencyNameSet;
    } catch {
        dependencyNameSetCache.set(packageJsonPath, undefined);

        return undefined;
    }
};

/**
 * Resolve dependency names from the nearest package.json for a linted file.
 *
 * @param physicalFilename - ESLint physical filename.
 * @param cwd - ESLint execution cwd.
 *
 * @returns Dependency-name set or `undefined` when unavailable.
 */
export const getDependencyNamesForFile = (
    physicalFilename: string,
    cwd: string
): ReadonlySet<string> | undefined => {
    const startDirectory = path.isAbsolute(physicalFilename)
        ? path.dirname(physicalFilename)
        : cwd;
    const candidatePackageJsonPaths = new Set<string>();
    const nearestPackageJsonPath = getNearestPackageJsonPath(startDirectory);

    if (isDefined(nearestPackageJsonPath)) {
        candidatePackageJsonPaths.add(nearestPackageJsonPath);
    }

    const cwdPackageJsonPath = getNearestPackageJsonPath(path.resolve(cwd));

    if (isDefined(cwdPackageJsonPath)) {
        candidatePackageJsonPaths.add(cwdPackageJsonPath);
    }

    const processCwdPackageJsonPath = getNearestPackageJsonPath(
        path.resolve(process.cwd())
    );

    if (isDefined(processCwdPackageJsonPath)) {
        candidatePackageJsonPaths.add(processCwdPackageJsonPath);
    }

    const dependencyNames = new Set<string>();

    for (const packageJsonPath of candidatePackageJsonPaths) {
        const dependencyNameSet =
            readDependencyNamesFromPackageJson(packageJsonPath);

        if (!isDefined(dependencyNameSet)) {
            continue;
        }

        for (const dependencyName of dependencyNameSet) {
            dependencyNames.add(dependencyName);
        }
    }

    if (dependencyNames.size === 0) {
        return undefined;
    }

    return dependencyNames;
};

/**
 * Get package name root from a package specifier or subpath.
 *
 * @param specifier - Package specifier from Stylelint extends/plugins entry.
 *
 * @returns Package name root (for example `stylelint-order`) when parsable.
 */
export const getPackageNameFromSpecifier = (
    specifier: string
): string | undefined => {
    if (specifier.length === 0 || specifier.startsWith("node:")) {
        return undefined;
    }

    if (specifier.startsWith("@")) {
        const [scope, packageName] = stringSplit(specifier, "/");

        if (!isDefined(scope) || !isDefined(packageName)) {
            return undefined;
        }

        return `${scope}/${packageName}`;
    }

    return arrayFirst(stringSplit(specifier, "/"));
};
