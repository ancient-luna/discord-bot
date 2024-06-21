module.exports = class Console {
    static log(content, type = "log") {
        switch (type) {
            case "log": { return console.log(`• [ Log ] ` + "      => " + content) }
            case "warn": { return console.log(`• [ Warn ] ` + "      => " + content) }
            case "error": { return console.log(`• [ Error ] ` + "   => " + content) }
            case "debug": { return console.log(`• [ Debug ] ` + "   => " + content) }
            case "cmd": { return console.log(`• [ Commands ] ` + " => " + content) }
            case "scmd": { return console.log(`• [ Slash ] ` + "    => " + content) }
            case "button": { return console.log(`• [ Button ] ` + "   => " + content) }
            case "event": { return console.log(`• [ Events ] ` + "   => " + content) }
            case "client": { return console.log(`• [ Client ] ` + "   => " + content) }
            case "api": { return console.log(`• [ Api ] ` + "      => " + content) }
            default: throw new TypeError("Logger type must be either warn, debug, log, ready, cmd or error.");
        }
    }
};