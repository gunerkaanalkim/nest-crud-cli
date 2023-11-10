import AbstractCommand from "../base/abstract.command";

export default class ModuleCommand extends AbstractCommand {
    getFileExtension(): string {
        return "module";
    }

}