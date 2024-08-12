import { Controller, Post, Body, Get} from '@midwayjs/core';
import * as fs from 'fs';

@Controller('/')
export class fileController {
    @Post('/todo')
    async todo(@Body() body: any): Promise<boolean> {
        let istrue: boolean = false;
        let todo: string = body.newproject + '\n';
        await fs.appendFileSync('do.txt', todo, 'utf8');

        let description: string = body.description + '\n';
        await fs.appendFileSync('description.txt', description, 'utf8');
        istrue = true;
        
        return istrue
    }

    @Post('/deletetodo')
    async deletetodo(@Body() body:any):Promise<boolean>{
        let istrue: boolean = false
        const data = fs.readFileSync('do.txt', 'utf8')
        const todoList = data.split('\n');
        const list = todoList.filter(line => line.trim() !== '');
        let deleteitem: string = body.newproject;
        
        await fs.writeFileSync('do.txt', '');
        
        for(let fruit of list){
            if(fruit != deleteitem){
                let fruit2 = fruit + '\n';
                await fs.appendFileSync('do.txt', fruit2, 'utf8');
                istrue = true;
            }
        }
        
        return istrue
    }

    @Post('/deletedescription')
    async deletedescription(@Body() body:any):Promise<boolean>{
        let istrue = true;
        let needDelete: string = body.newDelete;
        const content = fs.readFileSync('description.txt', 'utf8');
        const descriptionList = content.split('\n');
        const contentList = descriptionList.filter(line => line.trim() !== '');
        console.log(contentList)
        console.log(needDelete)
        await fs.writeFileSync('description.txt', '');

        for(let fruit of contentList){
            if(fruit != needDelete){
                let fruit2 = fruit + '\n';
                await fs.appendFileSync('description.txt', fruit2, 'utf8');
            }
        }

        return istrue
    }
    
    @Post('/inprogress')
    async inprogress(@Body() body: any): Promise<boolean> {
        let istrue: boolean = false
        let inprogress: string = body.newproject + '\n';
        await fs.appendFileSync('inprogress.txt', inprogress, 'utf8')
        return istrue
    }

    @Post('/deleteinprogress')
    async deleteinprogress(@Body() body: any):Promise<boolean>{
        let istrue: boolean = false
        const data = fs.readFileSync('inprogress.txt', 'utf8')
        const todoList = data.split('\n');
        let deleteitem: string = body.newproject
        const list = todoList.filter(line => line.trim() !== '');
        await fs.writeFileSync('inprogress.txt', '');
        for(let fruit of list){
            if(fruit != deleteitem){
                let fruit2 = fruit + '\n';
                await fs.appendFileSync('inprogress.txt', fruit2, 'utf8');
                istrue = true;
            }
        }

        
        return istrue
    }

    @Post('/done')
    async done(@Body() body: any): Promise<boolean> {
        let istrue: boolean = false;
        let done: string = body.newproject + '\n';
        await fs.appendFileSync('done.txt', done, 'utf8')
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

        await fs.writeFileSync('done.txt', '');
        for(let fruit of list){
            if(fruit != deleteitem){
                let fruit2 = fruit + '\n';
                await fs.appendFileSync('done.txt', fruit2, 'utf8');
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

    @Get('/descriptiontodo')
    async getdescription1(): Promise<string[]> {
        const data = fs.readFileSync('description.txt', 'utf8');
        const lines = data.split(/\r?\n/);
        let getdescription: string[] = lines;
        return getdescription
    }

    @Post('/store')
    async store1(@Body() body: any): Promise<boolean> {
        const data = body.temp.toString();
        await fs.writeFileSync('tempStore.txt', data, 'utf8');
        let istrue = false;
        istrue = true;
        return istrue
    }

    @Get('/store')
    async store2(): Promise<number> {
        const data = fs.readFileSync('tempStore.txt', 'utf8');
        const number = parseInt(data, 10);
        return number
    }
}