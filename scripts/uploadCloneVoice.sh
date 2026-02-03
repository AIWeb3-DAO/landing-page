#!/bin/bash

# Simple script to upload clone voice sample using Firebase CLI
# Make sure you have firebase-tools installed: npm install -g firebase-tools

echo "📤 Uploading cao_sample.wav to Firebase Storage..."

# Upload file using gsutil or firebase storage
firebase storage:upload /Users/cao/CAO/github/quantTrading/qwen3TTS/cao_sample.wav qwen3TTS/samples/cao_sample.wav

echo "✅ Upload complete!"
echo "📁 Storage path: qwen3TTS/samples/cao_sample.wav"
echo "🔗 GS URL: gs://aiweb3.appspot.com/qwen3TTS/samples/cao_sample.wav"
echo ""
echo "⚠️  Note: Update the DRCAO_CLONE_CONFIG.refAudioUrl in src/app/api/voice-generation/route.ts if needed"
