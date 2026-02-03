# Upload Clone Voice Sample

This directory contains scripts to upload the Drcao clone voice sample to Firebase Storage.

## Prerequisites

The reference audio file should be located at:
```
/Users/cao/CAO/github/quantTrading/qwen3TTS/cao_sample.wav
```

## Upload Methods

### Method 1: Firebase CLI (Recommended)

1. Install Firebase CLI if not already installed:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Run the upload script:
```bash
chmod +x uploadCloneVoice.sh
./uploadCloneVoice.sh
```

### Method 2: Node.js Script

```bash
node uploadCloneVoice.mjs
```

### Method 3: Manual Upload via Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project (aiweb3)
3. Navigate to Storage
4. Create folder structure: `qwen3TTS/samples/`
5. Upload `cao_sample.wav`

## Expected Result

After successful upload:
- **Storage Path**: `qwen3TTS/samples/cao_sample.wav`
- **GS URL**: `gs://aiweb3.appspot.com/qwen3TTS/samples/cao_sample.wav`
- **Download URL**: Will be generated automatically

## Verification

The API route at `src/app/api/voice-generation/route.ts` is already configured with:
```typescript
const DRCAO_CLONE_CONFIG = {
  refAudioUrl: 'gs://aiweb3.appspot.com/qwen3TTS/samples/cao_sample.wav',
  refText: '大家好，我是曹博士，很久没见到大家了，前段时间我飞到了中国，在中国感受到了一下夏季的炎热，现在总算有点安顿下来了，有空就来聊一聊分享分享。'
};
```

No code changes needed after upload!
