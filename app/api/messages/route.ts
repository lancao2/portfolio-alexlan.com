import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    const userName = session.user.name || "Unknown User";
    const userEmail = session.user.email;
    const userImage = session.user.image || null;

    // 1. Save to Database
    const message = await prisma.message.create({
      data: {
        content: content.trim(),
        userName,
        userEmail,
        userImage,
      },
    });

    // 2. Send Email
    // Only attempt if SMTP env vars are present. We won't block DB save if email fails.
    if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail', // Assuming gmail for simplicity, or user can configure host
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        await transporter.sendMail({
          from: `"Portfólio OS" <${process.env.SMTP_EMAIL}>`,
          to: "contato@alexlan.com.br",
          subject: `Nova mensagem de ${userName} (${userEmail})`,
          text: `Você recebeu uma nova mensagem através do app Mensagens do seu portfólio.\n\nNome: ${userName}\nEmail: ${userEmail}\n\nMensagem:\n${content.trim()}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Nova mensagem no Portfólio 🚀</h2>
              <p><strong>De:</strong> ${userName} (${userEmail})</p>
              <div style="background: #f4f4f4; padding: 16px; border-radius: 8px; margin-top: 16px;">
                <p style="margin:0; white-space: pre-wrap;">${content.trim()}</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue, at least it's in the DB
      }
    }

    return NextResponse.json({ success: true, message });
  } catch (error) {
    console.error("Message API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

