import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// 1. Resolve directory path for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read Service Account Key
const serviceAccountPath = join(__dirname, 'serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// 2. Read Mock Data JSON File
const dataPath = join(__dirname, 'data.json');
const rawData = readFileSync(dataPath, 'utf8');
const records = JSON.parse(rawData);

// 3. Upload Data to Firestore
async function seedFirestore() {
  const collectionName = 'pet_services';

  for (const item of records) {
    await db.collection(collectionName).doc(item.id).set(item);
    console.log(`Successfully added document: ${item.id}`);
  }
  console.log('--- All data imported to Firestore! ---');
}

seedFirestore().catch(console.error);