import AbstractCommand from "../base/abstract.command";

export default class ServiceCommand extends AbstractCommand {
    getFileExtension(): string {
        return "service";
    }

}