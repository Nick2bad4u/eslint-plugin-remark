export default {
    plugins: [
        () => (_tree, file) => {
            file.message("Parent config");
        },
    ],
};
