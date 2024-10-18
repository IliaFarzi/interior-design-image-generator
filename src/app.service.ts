import {Injectable} from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import {OpenAI} from 'openai';
import {generateIdUtil} from "./utils/generate-id.util";
import {appConfig} from "./config/app.config";

@Injectable()
export class AppService {
    private readonly client = new OpenAI({
        apiKey: appConfig().fluxApiKey,
        baseURL: "https://api.together.xyz/v1",
    });

    // Function to generate the image based on the prompt
    async generateImage(prompt: string): Promise<string> {
        const response = await this.client.images.generate({
            prompt: prompt,
            model: "black-forest-labs/FLUX.1-schnell",
            n: 1,
        });

        // Get the image URL from the response
        const imageUrl = response.data[0].url;

        // Generate a unique image name
        const imageName = `${generateIdUtil(12)}.png`;
        const imageDir = path.join(__dirname, '..', 'public', 'images');
        const imagePath = path.join(imageDir, imageName);

// Ensure the directory exists, if not, create it
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir, {recursive: true}); // Creates the directory and any necessary parent directories
        }

        const imageResponse = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream',
        });

// Write the image to the file system
        const writer = fs.createWriteStream(imagePath);
        imageResponse.data.pipe(writer);

// Wait for the file to be fully written
        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        return imageName;
    }
}
