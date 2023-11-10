import AbstractCommand from "../base/abstract.command";

export default class ControllerCommand extends AbstractCommand {
    getFileExtension(): string {
        return "controller";
    }
}