/** @type {import("dependency-cruiser").IConfiguration} */
const dependencyCruiserConfig = {
    forbidden: [
        {
            from: {
                path: "^src",
            },
            name: "no-circular",
            severity: "error",
            to: {
                circular: true,
            },
        },
    ],
    options: {
        doNotFollow: {
            path: "node_modules",
        },
        includeOnly: "^src",
        progress: {
            type: "none",
        },
        tsConfig: {
            fileName: "tsconfig.json",
        },
    },
};

export default dependencyCruiserConfig;
