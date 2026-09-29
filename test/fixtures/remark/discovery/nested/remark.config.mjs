export default {
    plugins: [
        () => (_tree, file) => {
            file.message("Nested config");
        },
    ],
};
