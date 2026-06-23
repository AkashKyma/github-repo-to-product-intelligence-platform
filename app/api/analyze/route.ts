import { NextResponse } from "next/server";
import { z } from "zod";

import { getRepositoryAnalysis } from "@/lib/analyzer";

const payloadSchema = z.object({
  repo: z.string().min(3, "Enter a GitHub repository URL or owner/repo."),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = payloadSchema.parse(json);
    const analysis = await getRepositoryAnalysis(payload.repo);

    return NextResponse.json(analysis);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? "Invalid repository input." }, { status: 400 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to analyze repository." },
      { status: 500 },
    );
  }
}
