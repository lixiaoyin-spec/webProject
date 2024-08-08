import { Controller, Post, Body} from '@midwayjs/core';

@Controller('/')
export class checkController {
    @Post('/check')
    async check(@Body() body: any): Promise<boolean> {
        //添加校验逻辑
        let username: string[] = ["lxy30928", "dzy114514", "ykf23755", "zyf70968"]
        let password: number[] = [30928, 114514, 23755, 70968]
        let istrue: boolean = false

        if (username.includes(body.username) && password.includes(body.password)) {
            istrue = true;
        }
        return istrue
    }
        
}