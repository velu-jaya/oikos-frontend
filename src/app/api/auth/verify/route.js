// In-memory storage (same as register/route.js - should be in database)
const users = new Map();
const verificationCodes = new Map();

export async function POST(request) {
  try {
    const { email, code } = await request.json();

    // Validate input
    if (!email || !code) {
      return new Response(
        JSON.stringify({ error: 'Email and code are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if verification code exists
    const verificationData = verificationCodes.get(email);
    if (!verificationData) {
      return new Response(
        JSON.stringify({ error: 'No verification code found for this email' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if code is correct
    if (verificationData.code !== code) {
      verificationData.attempts += 1;
      if (verificationData.attempts >= 3) {
        verificationCodes.delete(email);
        return new Response(
          JSON.stringify({ error: 'Too many failed attempts. Please request a new code.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      return new Response(
        JSON.stringify({ error: 'Invalid verification code' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if code is expired (15 minutes)
    const codeAge = Date.now() - verificationData.createdAt.getTime();
    if (codeAge > 15 * 60 * 1000) {
      verificationCodes.delete(email);
      return new Response(
        JSON.stringify({ error: 'Verification code has expired' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Mark user as verified
    const user = users.get(email);
    if (user) {
      user.verified = true;
      user.verifiedAt = new Date();
    }

    // Clean up verification code
    verificationCodes.delete(email);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email verified successfully',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return new Response(
      JSON.stringify({ error: 'Verification failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
