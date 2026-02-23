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

        let fileInfo = "";
        if (type === "error") {
            try {
                let stack = content instanceof Error ? content.stack : new Error().stack;
                if (stack) {
                    let stackLines = stack.split('\n');
                    let targetLine = content instanceof Error ? stackLines[1] : stackLines[2];
                    if (!targetLine && stackLines.length > 1) {
                        targetLine = stackLines[stackLines.length - 1];
                    }

                    if (targetLine) {
                        let parts = targetLine.split('at ');
                        if (parts.length > 1) {
                            let pathInfo = parts[1].trim();
                            if (pathInfo.endsWith(')')) {
                                let openParenIndex = pathInfo.lastIndexOf('(');
                                pathInfo = pathInfo.substring(openParenIndex + 1, pathInfo.length - 1);
                            }
                            const filepath = pathInfo.split(/[/\\]/);
                            const fileAndLine = filepath[filepath.length - 1];
                            const filename = fileAndLine.split(':')[0];
                            fileInfo = ` ${filename}`;
                        }
                    }
                }
            } catch (e) { }
        }

        let message = content;
        if (content instanceof Error) {
            message = content.stack ? content.stack.split('\n')[0] : content.message;
        }

        return console.log(`• [ ${label.padEnd(9)} ] => ${message}${fileInfo}`);
    }
};