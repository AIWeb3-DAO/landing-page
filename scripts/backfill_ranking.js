const admin = require('firebase-admin');

// ⚠️ WARNING: Run this with service account credentials
// This is a reference script for the user to backfill old data.

/*
async function backfillRankingScores() {
  const db = admin.firestore();
  const wishesRef = db.collection('wishes');
  const snapshot = await wishesRef.where('rankingScore', '==', null).get();

  if (snapshot.empty) {
    console.log('No wishes need backfilling.');
    return;
  }

  const batch = db.batch();
  snapshot.forEach(doc => {
    const data = doc.data();
    const timestamp = data.timestamp?.seconds || Math.floor(Date.now() / 1000);
    
    // Base score = log10(1) + (Time / 86400)
    const initialScore = 0 + (timestamp / 86400);
    
    batch.update(doc.ref, { 
      rankingScore: initialScore,
      likesCount: data.likesCount || 0,
      repostsCount: data.repostsCount || 0,
      tipsValue: data.tipsValue || 0
    });
  });

  await batch.commit();
  console.log('Backfill complete!');
}
*/
