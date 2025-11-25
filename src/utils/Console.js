module.exports = class Console {
    static log(content, type = "log") {
        const types = {
            log: "Log",
            warn: "Warn",
            error: "Error",
            debug: "Debug",
            cmd: "Commands",
            scmd: "Slash",
            button: "Button",
            event: "Events",
            client: "Client",
            api: "Api",
            role: "Role",
            scheduler: "Scheduler"
        };

        const label = types[type];
        if (!label) throw new TypeError(`Logger type must be either ${Object.keys(types).join(", ")}.`);

        return console.log(`• [ ${label.padEnd(9)} ] => ${content}`);
    }
};