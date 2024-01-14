import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationModule } from './config/configuration.module';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { ActivityModule } from './activities/activities.module';
import { RulesModule } from './rules/rules.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'luuductho',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([]),
    UsersModule,
    NewsModule,
    ActivityModule,
    RulesModule,
    FeedbackModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
