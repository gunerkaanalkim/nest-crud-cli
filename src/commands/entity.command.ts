import AbstractCommand from "../base/abstract.command";

export default class EntityCommand extends AbstractCommand {
    getFileExtension(): string {
        return "entity";
    }
}