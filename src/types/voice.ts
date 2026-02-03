import { Timestamp } from 'firebase/firestore';

export interface QwenTask {
    id?: string;
    type: 'custom' | 'clone';
    status: 'pending' | 'processing' | 'completed' | 'failed';
    importance: number;
    text: string;
    speaker?: string;
    language: string;
    instruct?: string;
    refAudioUrl?: string;
    refText?: string;
    userId?: string;
    createdAt: Timestamp;
    resultAudioUrl?: string;
    error?: string;
}

export interface VoiceOption {
    id: string;
    name: string;
    description: string;
    language: string;
}

export const VOICE_OPTIONS: VoiceOption[] = [
    { id: 'Vivian', name: 'Vivian', description: 'Bright, slightly edgy young female voice', language: 'Chinese' },
    { id: 'Serena', name: 'Serena', description: 'Warm, gentle young female voice', language: 'Chinese' },
    { id: 'Uncle_Fu', name: 'Uncle Fu', description: 'Seasoned male voice with a low, mellow timbre', language: 'Chinese' },
    { id: 'Dylan', name: 'Dylan', description: 'Youthful Beijing male voice with a clear, natural timbre', language: 'Chinese (Beijing Dialect)' },
    { id: 'Eric', name: 'Eric', description: 'Lively Chengdu male voice with a slightly husky brightness', language: 'Chinese (Sichuan Dialect)' },
    { id: 'Ryan', name: 'Ryan', description: 'Dynamic male voice with strong rhythmic drive', language: 'English' },
    { id: 'Aiden', name: 'Aiden', description: 'Sunny American male voice with a clear midrange', language: 'English' },
    { id: 'Ono_Anna', name: 'Ono Anna', description: 'Playful Japanese female voice with a light, nimble timbre', language: 'Japanese' },
    { id: 'Sohee', name: 'Sohee', description: 'Warm Korean female voice with rich emotion', language: 'Korean' },
];

export const LANGUAGE_OPTIONS = [
    'English',
    'Chinese',
    'Japanese',
    'Korean',
    'German',
    'French',
    'Russian',
    'Portuguese',
    'Spanish',
    'Italian'
];
