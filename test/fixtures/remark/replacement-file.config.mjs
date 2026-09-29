import { VFile } from "vfile";

function replaceFile() {
    return (tree, file, next) => {
        const replacement = new VFile({ path: file.path });
        replacement.message("Replacement file diagnostic");
        next(undefined, tree, replacement);
    };
}

export default {
    plugins: [replaceFile],
};
