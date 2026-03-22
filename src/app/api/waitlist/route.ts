import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { nome, negocio, porte, sistema, qual_sistema, dificuldade, whatsapp } = body;

  if (!nome || !negocio || !porte || !sistema || !dificuldade || !whatsapp) {
    return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
  }

  const { error } = await supabase.from("waitlist").insert({
    nome,
    negocio,
    porte,
    sistema,
    qual_sistema: qual_sistema || null,
    dificuldade,
    whatsapp,
  });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Erro ao salvar. Tente novamente." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
