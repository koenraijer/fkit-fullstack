import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import pkg from "firebase-admin";
const FB_PROJECT_ID = "fkit-course-49691";
const FB_CLIENT_EMAIL = "firebase-adminsdk-ztsa6@fkit-course-49691.iam.gserviceaccount.com";
const FB_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDRXMiwJSEZj5MH\nUOVXnbdPHTzIviEYbAQPUdo2m4fnEHViLp5mVhqm087sHkaJmOWCjeqGa2PB+LYi\nHKQWWaydjHCHcDafDY5U6IFAqxrfPTRocGoOx2cAaiC14czHmsSalN+/VrSAEhJu\n4TMwCcOatmH+e4rtQHvzNcTBa18vKEz+Hzjyta0w8/TyW56pXax9etcAomYbBhUd\nNq3+ZfAzkLo05TaJgw/pPlxsw5gIjTN7R4nGKZUTI3InU1DQ3ahiz/HXIrIl2FL0\nF7DSi82RSiNj//Y/wMVpoUnNqeG1iBlnaw82HcWhczTxePL/9EeESMhgwCwNeyQF\neX9aBc5dAgMBAAECggEAE0evXpNIwU0YveF8AU3PofxACv+BVjmqRQvlY8Z+ZS+9\nk5lV8ngm86qJQXLHTagUKKnviUnt8aC5CxqmnL1M2WRjv4E8sniB3T1dG8q2Co1d\nHGoPxkUkLeRYF0/QNyiARvkDQuBV9n5Tjrzz5Q5dIkv96bzQTil0ULEoqaQ8639o\nhmIiOYtjJI7wcMmS2TYrou7UfHoQ3HezXcqzMxWHkf/UD12ljZHS9Br1ENYbO/kt\n50Ww1/k4P6wBxR9g9NCFXgOHAJiDmS+OLFnV4PuN4r+GrSdV2wL97FQS1xnX44Dd\nkcDvS7aCKrTslCuIECFN1IyOuB0+hCGnZAkdLblnOQKBgQD+JnayVEEioycJWc1a\n3oKno6mEaTRca6ed9bzY0GFlYvHXg4pgwyRBpzubGthoe8fpsDA6eqPGmJIvXnH3\n8SWwQaw1MiFDD46AsqoKtjJTXBI4UsbviaQKgcs+L+Nh17auPfVFI6oos2WzoADr\nhLWFkN8AztRO1Uqgnum07RVMWQKBgQDS4t75hTOU38+oATLx4f5Ty8Svhpk3D0hq\nWC3PdmolkC6leeVU3qCzQxtW5Im30Ab3YNTQwboTn7QkHzmtnaTPYBopFF84qC/z\n4BngD4rTN/1qygu2n4Kb5/PxSfNgqhGM/B2cqG1G1aM8vxTeVxm6lkeh+xjU6+pq\n4BOweRFBpQKBgQCms74JjKBIwvF4/bFoGCllIkGvu33/3RFN2ADtygkIgpUVApAC\nlh0y/ylmvH4UUpS3YLzRrt28Bxlj/rQMqN1Ktljpb59HqG2VVxuX+Rgbe3nr/cfF\nGOhDiA0zFiA0blTCB5vYpOMY3UspPhs8YIjcOkE7+25g4yCXKIUtCpF8yQKBgFTi\n1XYC0/x9Co1JzkPnAASi5QzyVQIAuNl1nRsBQ0DThLM/GbzL0EvYG00iuPywU92H\nsKJHGKuFgXF40DK+XfTLbjxS4vFfYc38yu2R1AOpaexuX8Cm/F/dQihB6CFk06O4\naAMDGNmGbSqqj6/fx49/pl3hQOGUBMv4XnSOhw+xAoGAC+NNkhfl8cYuGmMcH9EU\nMFPNbAbQH/JdWZhJJmHGGO28lTBUYOcX/B9FUWsJtjX2IPu5/pBQdnr0xCN+thFg\nBYrx9XQKFLnW7ZPgFzusV/dBK10DQF/S+GUXSVd7QrX73cRTTidXz34cQX3RFhiv\neaUUpYgIXyJ4ydDewL4TQX8=\n-----END PRIVATE KEY-----\n";
try {
  pkg.initializeApp({
    credential: pkg.credential.cert({
      projectId: FB_PROJECT_ID,
      clientEmail: FB_CLIENT_EMAIL,
      privateKey: FB_PRIVATE_KEY
    })
  });
} catch (err) {
  if (!/already exists/u.test(err.message)) {
    console.error("Firebase Admin Error: ", err.stack);
  }
}
const adminDB = getFirestore();
const adminAuth = getAuth();
export {
  adminAuth as a,
  adminDB as b
};
