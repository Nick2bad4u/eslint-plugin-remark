function compilerProbe() {
    const compile = this.compiler;

    this.compiler = (tree, file) => {
        file.message("Compiler invoked");

        return compile(tree, file);
    };

    return async (_tree, file) => {
        await Promise.resolve();
        file.message("Async transformer completed");
    };
}

export default {
    plugins: [compilerProbe],
};
