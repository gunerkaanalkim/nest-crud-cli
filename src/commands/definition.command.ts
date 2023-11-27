import AbstractCommand from "../base/abstract.command";

export default class DefinitionCommand extends AbstractCommand {
    getFileExtension(): string {
        return "definition";
    }
}