import crypto from 'crypto';

// In-memory storage (same as register/route.js - should be in database)
const users = new Map();
const verificationCodes = new Map();

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if user exists
    if (!users.has(email)) {
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate new verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    // Update verification code
    verificationCodes.set(email, {
      code: verificationCode,
      createdAt: new Date(),
      attempts: 0,
    });

    // TODO: Send verification code via email
    // For now, log it to console
    console.log(`New verification code for ${email}: ${verificationCode}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Verification code resent to email',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Resend code error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to resend code' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
