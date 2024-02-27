import { INestApplication }  from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('Contest API')
        .setDescription('The Contest API description')
        .setVersion('1.0')
        .addTag('contest')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
}
