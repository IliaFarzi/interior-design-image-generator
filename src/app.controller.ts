import {Body, Controller, Get, Post, Render} from '@nestjs/common';
import {AppService} from './app.service';
import {CreateImageDto} from './dto/create-image.dto';
import {DesignPrompt} from "./prompts/design.prompt";
import {appConfig} from "./config/app.config";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    @Render('index')
    home() {
        return {imageGenerated: false};
    }

    @Post('/generate-image')
    // @Render('index')
    async generateImage(@Body() createImageDto: CreateImageDto) {

        // Construct a prompt based on form data
        let prompt = DesignPrompt(createImageDto);
        console.log(prompt)
        try {
            const imageName = await this.appService.generateImage(prompt);
            return {imageGenerated: true, imageUrl: appConfig().domain + '/public/images/' + imageName};
        } catch (error) {
            return {imageGenerated: false, error: 'Failed to generate image. Please try again.'};
        }
    }
}
