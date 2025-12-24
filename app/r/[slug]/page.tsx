import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function ShortLinkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    // Fetch the original URL from Supabase
    const { data, error } = await supabase
      .from("short_links")
      .select("original_url")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      console.error("Error fetching link:", error);
      redirect("/");
    }

    // Redirect to the original URL
    redirect(data.original_url);
  } catch (error) {
    console.error("Error:", error);
    redirect("/");
  }
}

