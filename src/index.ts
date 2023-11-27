#!/usr/bin/env node
import EntityCommand from "./commands/entity.command";
import ControllerCommand from "./commands/controller.command";
import DtoCommand from "./commands/dto.command";
import ServiceCommand from "./commands/service.command";
import ModuleCommand from "./commands/module.command";
import MapperCommand from "./commands/mapper.command";
import chalk from "chalk";
import {program} from 'commander';
import fs from 'fs';
import path, {join} from "path";
import DefinitionCommand from "./commands/definition.command";

let className = "";

function commands(columns: string) {
    new EntityCommand().builder({
        data: {
            className: className,
            entityName: `${className.toLowerCase()}s`,
            columns: JSON.parse(columns)
        },
        templatePath: "../../templates/entity.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute();

    new ControllerCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            dtoName: `${className}DTO`,
            dtoFileName: `./${className.toLowerCase()}.dto`,
            mapperName: `${className}Mapper`,
            mapperVariableName: `${className.toLowerCase()}Mapper`,
            mapperFileName: `./${className.toLowerCase()}.mapper`,
            serviceName: `${className}Service`,
            serviceVariableName: `${className.toLowerCase()}Service`,
            serviceFileName: `./${className.toLowerCase()}.service`,
            controllerPathName: `${className.toLowerCase()}s`
        },
        templatePath: "../../templates/controller.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute();

    new DtoCommand().builder({
        data: {
            className: className,
            columns: JSON.parse(columns)
        },
        templatePath: "../../templates/dto.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute();

    new ServiceCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            dtoName: `${className}DTO`,
            dtoFileName: `./${className.toLowerCase()}.dto`,
            mapperName: `${className}Mapper`,
            mapperVariableName: `${className.toLowerCase()}Mapper`,
            mapperFileName: `./${className.toLowerCase()}.mapper`,
            serviceName: `${className}Service`,
            repositoryName: `${className.toLowerCase()}Repository`
        },
        templatePath: "../../templates/service.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute();

    new ModuleCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            mapperName: `${className}Mapper`,
            mapperFileName: `./${className.toLowerCase()}.mapper`,
            serviceName: `${className}Service`,
            serviceFileName: `./${className.toLowerCase()}.service`,
            controllerName: `${className.charAt(0).toUpperCase() + className.slice(1)}Controller`,
            controllerFileName: `./${className.toLowerCase()}.controller`,
            moduleName: `${className.charAt(0).toUpperCase() + className.slice(1)}Module`,
        },
        templatePath: "../../templates/module.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute((err: any) => {
        updateDefinitions();
    });

    new MapperCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            dtoName: `${className}DTO`,
            dtoFileName: `./${className.toLowerCase()}.dto`,
            mapperName: `${className}Mapper`,
            columns: JSON.parse(columns)
        },
        templatePath: "../../templates/mapper.template.hbs",
        outDir: `${className.toLowerCase()}`
    }).execute();
}


const getAllFiles = function (dirPath: any, arrayOfModules?: any) {
    let files = fs.readdirSync(dirPath)

    arrayOfModules = arrayOfModules || []

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfModules = getAllFiles(dirPath + "/" + file, arrayOfModules)
        } else {
            if (file.includes('.module.') && !file.includes('app.module.') && !file.includes('content-type.')) {
                const rawModuleName = file.split('.')[0];
                const preparedModuleName = `${rawModuleName.charAt(0).toUpperCase() + rawModuleName.slice(1)}Module`

                arrayOfModules.push({
                    rawModuleName: rawModuleName,
                    preparedModuleName: preparedModuleName,
                    path: `./${rawModuleName}/${rawModuleName}.module`
                })
            }
        }
    })

    return arrayOfModules
}

function updateDefinitions() {
    const moduleDefinitions = getAllFiles(join(process.cwd()));

    new DefinitionCommand().builder({
        data: {
            className: 'module',
            modules: moduleDefinitions
        },
        templatePath: "../../templates/definition.template.hbs",
        outDir: "./"
    }).execute();
}

async function commandRunner() {
    program
        .name('nest-crud-cli')
        .description('nest-crud-cli')
        .version('0.0.28');

    program
        .option('-n, --name', 'entity name', 'SampleCLIEntity')
        .option('-c, --columns', 'entity columns')
        .option('-s, --sync', 'sync modules');

    program.parse(process.argv);
    const options = program.opts();

    className = program.args[0];
    const columns= program.args[1];

    if (options.sync) {
        updateDefinitions();
        return;
    }

    const folderPath = path.join(process.cwd(), `${className.toLowerCase()}`);

    if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, {recursive: true});
    }

    fs.mkdir(folderPath, (err) => {
        if (err) {
            return console.log(chalk.red(`-----Module Folder Creation Error----- : ${err}`));
        }

        commands(columns);

        fs.writeFile(path.join(process.cwd(), `${className.toLowerCase()}/${className.toLowerCase()}.schema.json`), columns, function(err){
            if(err) {
                console.log(chalk.red(`-----Schema Creation Error----- : ${err}`));
            }

            console.log(chalk.green(
                'Creating file ' +
                chalk.blue.underline.bold(`${className.toLowerCase()}.schema.json`) +
                ' has been successful!'
            ));
        });
    });

    console.log(chalk.yellow(`Working directory is ${process.cwd()}`));
}

commandRunner();
