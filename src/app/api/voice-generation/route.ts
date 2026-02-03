import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { FB_DB } from '@/lib/fbClient';

// Hardcoded clone voice configuration
const DRCAO_CLONE_CONFIG = {
    refAudioUrl: 'gs://aiweb3.appspot.com/qwen3TTS/samples/cao_sample.wav', // Will update after upload
    refText: '大家好，我是曹博士，很久没见到大家了，前段时间我飞到了中国，在中国感受到了一下夏季的炎热，现在总算有点安顿下来了，有空就来聊一聊分享分享。'
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { text, voice, language, mode = 'custom', userId } = body;

        // Validation
        if (!text || !language) {
            return NextResponse.json(
                { error: 'Missing required fields: text, language' },
                { status: 400 }
            );
        }

        // Prepare task data
        let taskData: any = {
            type: mode,
            status: 'pending',
            importance: 5,
            text,
            language,
            userId: userId || null,
            createdAt: serverTimestamp()
        };

        if (mode === 'clone') {
            // Use hardcoded Drcao configuration
            taskData = {
                ...taskData,
                speaker: 'Drcao',
                refAudioUrl: DRCAO_CLONE_CONFIG.refAudioUrl,
                refText: DRCAO_CLONE_CONFIG.refText
            };
        } else {
            // Custom voice mode
            if (!voice) {
                return NextResponse.json(
                    { error: 'Voice is required for custom mode' },
                    { status: 400 }
                );
            }
            taskData = {
                ...taskData,
                speaker: voice,
                // Optional: Add instruct field based on voice
                instruct: getVoiceInstruction(voice)
            };
        }

        // Add task to Firestore
        const docRef = await addDoc(collection(FB_DB, 'qwen3TTS'), taskData);

        return NextResponse.json({
            success: true,
            taskId: docRef.id
        });

    } catch (error: any) {
        console.error('Voice generation API error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create voice generation task' },
            { status: 500 }
        );
    }
}

// Helper function to get voice instruction based on voice selection
function getVoiceInstruction(voice: string): string | undefined {
    const instructions: Record<string, string> = {
        'Vivian': '体现明亮、略带锋芒的年轻女声',
        'Serena': '体现温暖、温柔的年轻女声',
        'Uncle_Fu': '体现成熟男性声音，低沉圆润的音色',
        'Dylan': '体现年轻的北京男声，清晰自然的音色',
        'Eric': '体现活泼的成都男声，略带沙哑的明亮感',
        'Ryan': '体现充满活力的男声，节奏感强',
        'Aiden': '体现阳光的美国男声，中音清晰',
        'Ono_Anna': '体现俏皮的日本女声，轻盈灵动的音色',
        'Sohee': '体现温暖的韩国女声，情感丰富'
    };

    return instructions[voice];
}
