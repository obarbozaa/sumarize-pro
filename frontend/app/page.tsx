"use client"
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function Home() {
  const [url, setUrl] = useState('')
  const [resumo, setResumo] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch(`sumarize-pro-production.up.railway.app=${encodeURIComponent(url)}`)
      const data = await response.json()
      setResumo(data.resumo)
    } catch (error) {
      alert("Erro ao conectar no servidor!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Header Minimalista */}
      <nav className="p-6 border-b border-white/5 flex justify-between items-center">
        <span className="text-xl font-black tracking-tighter">SUMMARIZE<span className="text-blue-500">.PRO</span></span>
        <button className="text-sm bg-white/5 hover:bg-white/10 py-2 px-4 rounded-full transition-all">Versão Beta 1.0</button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-6xl font-black tracking-tight leading-none">
            Transforme vídeos em <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Conteúdo de Elite.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto">
            Cole a URL e deixe nossa IA criar seus posts de LinkedIn, Instagram e resumos executivos em segundos.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-[#111] border border-white/10 p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2">
          <input 
            type="text" 
            placeholder="Link do vídeo do YouTube..." 
            className="flex-1 bg-transparent p-4 outline-none text-lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={handleSummarize}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? "Processando..." : "Gerar Conteúdo"}
          </button>
        </div>

        {/* Resultado com Markdown */}
        {resumo && (
          <div className="mt-12 bg-[#111] border border-white/10 rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-500">
            <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
              <span className="text-sm font-medium text-gray-400">Resultado da Inteligência Artificial</span>
              <button 
                onClick={() => navigator.clipboard.writeText(resumo)}
                className="text-xs bg-blue-600/20 text-blue-400 py-1 px-3 rounded-md hover:bg-blue-600/30"
              >
                Copiar Tudo
              </button>
            </div>
            <div className="p-8 prose prose-invert prose-blue max-w-none">
              <ReactMarkdown>{resumo}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}