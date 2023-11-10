import AbstractCommand from "../base/abstract.command";

export default class MapperCommand extends AbstractCommand {
    getFileExtension(): string {
        return "mapper";
    }

}