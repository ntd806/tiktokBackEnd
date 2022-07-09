import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { generateRandomSixDigitsNumber } from './randon-number';
import { RedisCacheService } from './redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
    public constructor(
        @InjectTwilio() private readonly client: TwilioClient,
        private redisCacheService: RedisCacheService
    ) {}

    async sendSMS(phoneNumber: string) {
        const recipientPhoneNumber = phoneNumber;
        const randomNumber = generateRandomSixDigitsNumber();
        const message = `Hello from TopTop! Your verification code is: ${randomNumber}`;
        await this.redisCacheService.setCode(
            recipientPhoneNumber,
            randomNumber
        );

        try {
            return await this.client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phoneNumber
            });
        } catch (e) {
            return e;
        }
    }

    async verifyCode(recipientPhoneNumber: string, smsCode: string) {
        const value = await this.redisCacheService.get(recipientPhoneNumber);
        const smsCodeReceived = smsCode;

        if (value !== `${smsCodeReceived}`) {
            return false;
        }

        await this.redisCacheService.del(recipientPhoneNumber);

        return true;
    }
}
