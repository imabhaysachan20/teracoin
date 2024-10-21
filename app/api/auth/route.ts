
import crypto from 'crypto';
import { NextRequest,NextResponse } from 'next/server';

function validateRequest(userData: Record<string, string>): boolean {
    console.log(userData);
    
    const botToken = process.env.BOT_TOKEN;
    const hashFromTelegram = userData.hash;
    delete userData.hash;

    const sortedKeys = Object.keys(userData).sort();
    const dataCheckString = sortedKeys
        .map(key => `${key}=${userData[key]}`)
        .join('\n');
    console.log(dataCheckString);
    
    if (!botToken) {
        throw new Error('Bot token is not defined.');
    }
console.log(dataCheckString);

    const secretKey = crypto
        .createHmac('sha256', botToken)
        .update('WebAppData')
        .digest();

    const computedHash = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

    return computedHash === hashFromTelegram;
}

export async function  POST(req: NextRequest) {
    const { userData } = await req.json()
    console.log(userData);
    
    if (!userData) {
        return NextResponse.json({ status: 'error', message: 'userData is required' });
    }

    try {
        if (validateRequest(userData)) {
            return NextResponse.json({ status: 'good' });
        } else {
            return NextResponse.json({ status: 'gone' });
        }
    } catch (error) {
        console.error('Error validating request:', error);
        return NextResponse.json({ status: 'error', message: 'Internal Server Error' });
    }
}
