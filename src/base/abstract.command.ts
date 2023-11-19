import {readFileSync, writeFileSync} from "fs";
import {join} from "path";
import hbs from "handlebars";
import chalk from 'chalk';

export interface BuildOptions {
    data: any;
    templatePath: string;
}

hbs.registerHelper("isNumber", (param) => {
    if (typeof param === "number") {
        return Number(param)
    } else if (typeof param === "boolean") {
        return Boolean(param)
    } else {
        return `"${param}"`
    }
});

export default abstract class AbstractCommand {
    buildOptions: BuildOptions = {} as BuildOptions;

    abstract getFileExtension(): string;

    execute(): void {
        // read template
        const fileContents = readFileSync(join(__dirname, this.buildOptions!.templatePath), "utf-8").toString();

        //create a file name
        const fileName = `${this.buildOptions?.data.className.toLowerCase()}.${this.getFileExtension()}.ts`;
        console.log(chalk.green(
            'Creating file ' +
            chalk.blue.underline.bold(fileName) +
            ' has been successful!'
        ));

        //compile template
        const compiledTemplate = this.compileTemplate(fileContents, this.buildOptions?.data);
        this.writeFileSync(fileName, compiledTemplate)
    }

    protected compileTemplate(fileContent: string, data: any): string {
        return hbs.compile(fileContent)(data);
    }

    protected writeFileSync(fileName: string, template: string) {
        writeFileSync(join(process.cwd(), `${fileName}`), template, "utf-8");
    }

    builder(buildOption: BuildOptions) {
        this.buildOptions!.data = buildOption.data;
        this.buildOptions!.templatePath = buildOption.templatePath

        return this;
    }
}