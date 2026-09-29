let registrations = 0;

function processorIsolation({ registration }) {
    const probe = this.data("probe");
    let visits = 0;

    return (_tree, file) => {
        visits += 1;
        probe.visits += 1;
        file.message(
            `Registration ${registration}; transformer ${visits}; data ${probe.visits}`
        );
    };
}

export default {
    data: { probe: { visits: 0 } },
    get plugins() {
        registrations += 1;

        return [[processorIsolation, { registration: registrations }]];
    },
};
