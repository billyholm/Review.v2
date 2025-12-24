import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, googleReviewsLink } = body;

    if (!businessName || !googleReviewsLink) {
      return NextResponse.json(
        { error: "Företagsnamn och Google Reviews-länk krävs" },
        { status: 400 }
      );
    }

    // Generate slug from business name
    const slug = businessName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    // Check if slug already exists, if so, append a number
    let finalSlug = slug;
    let counter = 1;
    
    while (true) {
      const { data: existing } = await supabase
        .from("short_links")
        .select("slug")
        .eq("slug", finalSlug)
        .single();

      if (!existing) {
        break; // Slug is available
      }
      
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    // Insert or update the link in Supabase
    const { data, error } = await supabase
      .from("short_links")
      .upsert(
        {
          slug: finalSlug,
          original_url: googleReviewsLink,
          business_name: businessName,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "slug",
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Kunde inte spara länk i databasen", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        slug: finalSlug,
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error saving link:", error);
    return NextResponse.json(
      {
        error: "Ett fel uppstod",
        details: error.message || "Okänt fel",
      },
      { status: 500 }
    );
  }
}

