import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, businessName, reviewLink, shortLink } = body;

    // Validate required fields
    if (!phoneNumber || !businessName) {
      return NextResponse.json(
        { error: "Telefonnummer och företagsnamn krävs" },
        { status: 400 }
      );
    }

    // Get Twilio credentials from environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

    // Debug: Log which variables are found/missing (without exposing values)
    console.log("=== Twilio Environment Variables Check ===");
    console.log("TWILIO_ACCOUNT_SID:", accountSid ? "✓ Found (length: " + accountSid.length + ")" : "✗ Missing");
    console.log("TWILIO_AUTH_TOKEN:", authToken ? "✓ Found (length: " + authToken.length + ")" : "✗ Missing");
    console.log("TWILIO_PHONE_NUMBER:", twilioPhoneNumber ? "✓ Found: " + twilioPhoneNumber : "✗ Missing");
    console.log("==========================================");

    // Debug: Log which variables are missing (without exposing values)
    const missingVars: string[] = [];
    if (!accountSid) missingVars.push("TWILIO_ACCOUNT_SID");
    if (!authToken) missingVars.push("TWILIO_AUTH_TOKEN");
    if (!twilioPhoneNumber) missingVars.push("TWILIO_PHONE_NUMBER");

    if (missingVars.length > 0) {
      console.error("Missing Twilio credentials:", missingVars.join(", "));
      return NextResponse.json(
        { 
          error: "Serverkonfiguration saknas",
          details: `Saknade miljövariabler: ${missingVars.join(", ")}. Kontrollera din .env.local fil.`
        },
        { status: 500 }
      );
    }

    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    // Generate short link with proper domain
    // Use VERCEL_URL (includes protocol) or NEXT_PUBLIC_SITE_URL or fallback to localhost
    let domain = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    
    if (process.env.VERCEL_URL) {
      // VERCEL_URL doesn't include protocol, so add it
      domain = `https://${process.env.VERCEL_URL}`;
    }
    
    // Extract slug from shortLink if provided (format: /r/slug), or generate from businessName
    let slug = "";
    if (shortLink) {
      const match = shortLink.match(/\/r\/([^\/]+)$/);
      if (match) {
        slug = match[1];
      } else if (shortLink.startsWith("/r/")) {
        slug = shortLink.replace("/r/", "");
      }
    }
    
    // If no slug found, generate from businessName
    if (!slug && businessName) {
      slug = businessName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    }
    
    const finalShortLink = `${domain}/r/${slug}`;

    // Create SMS message with short link
    const message = `Hej! Tack för att du valde ${businessName}! Ge oss gärna ett omdöme här: ${finalShortLink}`;

    // Send SMS
    const twilioResponse = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    return NextResponse.json(
      {
        success: true,
        messageSid: twilioResponse.sid,
        message: "SMS skickat framgångsrikt",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending SMS:", error);
    return NextResponse.json(
      {
        error: "Kunde inte skicka SMS",
        details: error.message || "Okänt fel",
      },
      { status: 500 }
    );
  }
}

