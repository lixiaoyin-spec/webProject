import { Controller, Post, Body, Get} from '@midwayjs/core';
import * as fs from 'fs';

@Controller('/')
export class fileController {
    @Post('/todo')
    async todo(@Body() body: any): Promise<boolean> {
        // 添加到do.txt
        let istrue: boolean = false;
        let todo: string = body.newproject + '\n';
        fs.appendFileSync('do.txt', todo, 'utf8');

        // 添加到description.txt
        let description: string = body.description + '\n';
        fs.appendFileSync('description.txt', description, 'utf8');
        istrue = true;
        
        return istrue
    }

    @Post('/deletetodo')
    async deletetodo(@Body() body:any):Promise<boolean>{
        let istrue: boolean = false
        const data = fs.readFileSync('do.txt', 'utf8')
        const todoList = data.split('\n');
        let deleteitem: string = body.newproject
        const list = todoList.filter(line => line.trim() !== '');

        fs.writeFileSync('do.txt', '');
        for(let fruit of list){
            if(fruit != deleteitem){
                let fruit2 = fruit + '\n';
                fs.appendFileSync('do.txt', fruit2, 'utf8');
                istrue = true;
            }
        }
        return istrue

    }
    
    @Post('/inprogress')
    async inprogress(@Body() body: any): Promise<boolean> {
        // 添加到inprogress.txt
        let istrue: boolean = false
        let inprogress: string = body.newproject + '\n';
        fs.appendFileSync('inprogress.txt', inprogress, 'utf8')
        istrue = true
        
        return istrue
    }

    @Post('/deleteinprogress')
    async deleteinprogress(@Body() body: any):Promise<boolean>{
        let istrue: boolean = false
        const data = fs.readFileSync('inprogress.txt', 'utf8')
        const todoList = data.split('\n');
        let deleteitem: string = body.newproject
        const list = todoList.filter(line => line.trim() !== '');

        fs.writeFileSync('inprogress.txt', '');
        for(let fruit of list){
            if(fruit != deleteitem){
                let fruit2 = fruit + '\n';
                fs.appendFileSync('inprogress.txt', fruit2, 'utf8');
                istrue = true;
            }
        }
        return istrue
    }

    @Post('/done')
    async done(@Body() body: any): Promise<boolean> {
        // 添加到done.txt
        let istrue: boolean = false;
        let done: string = body.newproject + '\n';
        fs.appendFileSync('done.txt', done, 'utf8')
        istrue = true;
        
        
        return istrue
    }

    @Post('/deletedone')
    async deletedone(@Body() body: any): Promise<boolean> {
        let istrue: boolean = false
        const data = fs.readFileSync('done.txt', 'utf8')
        const todoList = data.split('\n');
        let deleteitem: string = body.newproject
        const list = todoList.filter(line => line.trim() !== '');

        fs.writeFileSync('done.txt', '');
        for(let fruit of list){
            if(fruit != deleteitem){
                let fruit2 = fruit + '\n';
                fs.appendFileSync('done.txt', fruit2, 'utf8');
            }
        }

        const content = fs.readFileSync('description.txt', 'utf8');
        const contentList = content.split('\n');
        let deleteDescription: string = body.newdescription
        const list2 = contentList.filter(line => line.trim() !== '');

        fs.writeFileSync('description.txt', '');
        for(let fruit of list2){
            if(fruit != deleteDescription){
                let fruit2 = fruit + '\n';
                fs.appendFileSync('description.txt', fruit2, 'utf8');
            }
        }

        istrue = true;
        return istrue
    }

    @Get('/todo')
    async gettodo(): Promise<string[]> {
        const data = fs.readFileSync('do.txt', 'utf8');
        const lines = data.split(/\r?\n/);
        let gettodo: string[] = lines;
        return gettodo
    }

    @Get('/inprogress')
    async getinprogress(): Promise<string[]> {
        const data = fs.readFileSync('inprogress.txt', 'utf8');
        const lines = data.split(/\r?\n/);
        let getinprogress: string[] = lines;
        return getinprogress
    }

    @Get('/done')
    async getdone(): Promise<string[]> {
        const data = fs.readFileSync('done.txt', 'utf8');
        const lines = data.split(/\r?\n/);
        let getdone: string[] = lines;
        return getdone
    }

    @Get('/description')
    async getdescription(): Promise<string[]> {
        const data = fs.readFileSync('description.txt', 'utf8');
        const lines = data.split(/\r?\n/);
        let getdescription: string[] = lines;
        return getdescription
    }
}