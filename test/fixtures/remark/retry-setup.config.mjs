let failSetup = true;

export default {
    get plugins() {
        if (failSetup) {
            failSetup = false;
            throw new Error("First config setup failed");
        }

        return [
            () => (_tree, file) => {
                file.message("Config setup recovered");
            },
        ];
    },
};
