import {readFileSync, writeFile, writeFileSync} from "fs";
import {join} from "path";
import hbs from "handlebars";
import chalk from 'chalk';

export interface BuildOptions {
    data: any;
    templatePath: string;
    outDir: string;
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

hbs.registerHelper("removeNonColumnAttribute", (param) => {
    console.log(param)
});

export default abstract class AbstractCommand {
    buildOptions: BuildOptions = {} as BuildOptions;

    abstract getFileExtension(): string;

    execute(successHandler?: Function): void {
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

        if (this.buildOptions.outDir!) {
            this.writeFile(`${this.buildOptions.outDir}/${fileName}`, compiledTemplate, successHandler)
        } else {
            this.writeFile(fileName, compiledTemplate, successHandler)
        }
    }

    protected compileTemplate(fileContent: string, data: any): string {
        return hbs.compile(fileContent)(data);
    }

    protected writeFile(fileName: string, template: string, successHandler?: Function) {
        writeFile(join(process.cwd(), `${fileName}`), template, (err)=> {
            successHandler?.call(err);
        });
    }

    builder(buildOption: BuildOptions) {
        this.buildOptions!.data = buildOption.data;
        this.buildOptions!.templatePath = buildOption.templatePath
        this.buildOptions!.outDir = buildOption.outDir

        return this;
    }
}