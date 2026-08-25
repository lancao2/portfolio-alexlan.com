import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.email !== "lancao.af@gmail.com") {
    redirect("/");
  }

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8 text-slate-900 dark:text-slate-100 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-slate-500">Caixa de entrada do portfólio</p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-sm">
            {session.user?.image && (
              <Image src={session.user.image} alt="Admin" width={32} height={32} className="rounded-full" />
            )}
            <span className="text-sm font-medium">{session.user?.email}</span>
          </div>
        </header>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-slate-500">Nenhuma mensagem recebida ainda.</div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {messages.map((msg) => (
                <div key={msg.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {msg.userImage ? (
                        <Image src={msg.userImage} alt={msg.userName} width={40} height={40} className="rounded-full" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          {msg.userName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-sm">{msg.userName}</h3>
                        <a href={`mailto:${msg.userEmail}`} className="text-xs text-blue-500 hover:underline">{msg.userEmail}</a>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      {new Date(msg.createdAt).toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div className="text-sm bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700 whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

