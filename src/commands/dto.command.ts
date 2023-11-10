import AbstractCommand from "../base/abstract.command";

export default class DtoCommand extends AbstractCommand {
    getFileExtension(): string {
        return "dto";
    }

}