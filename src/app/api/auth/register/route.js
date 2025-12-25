import crypto from 'crypto';

// In-memory storage (replace with database in production)
const users = new Map();
const verificationCodes = new Map();

export async function POST(request) {
  try {
    const { fullName, email, password, phoneNumber, userType } = await request.json();

    // Validate input
    if (!fullName || !email || !password || !phoneNumber) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if user already exists
    if (users.has(email)) {
      return new Response(
        JSON.stringify({ error: 'User already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate verification code
    const verificationCode = crypto.randomInt(100000, 999999).toString();

    // Store user data temporarily
    users.set(email, {
      fullName,
      email,
      password, // Note: In production, hash the password!
      phoneNumber,
      userType,
      verified: false,
      createdAt: new Date(),
    });

    // Store verification code
    verificationCodes.set(email, {
      code: verificationCode,
      createdAt: new Date(),
      attempts: 0,
    });

    // TODO: Send verification code via email
    // For now, log it to console
    console.log(`Verification code for ${email}: ${verificationCode}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Verification code sent to email',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ error: 'Registration failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
