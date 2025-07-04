import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import { cn } from './ui/utils';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  appContent: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ appContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Mensagem inicial padrão
  const initialMessage: Message = {
    id: '1',
    text: 'Olá! Sou seu assistente de treinamento Protoner. Posso ajudar com dúvidas sobre procedimentos, políticas de preço, formas de envio, uso do Bling e muito mais. Como posso ajudar você hoje?',
    isUser: false,
    timestamp: new Date()
  };
  
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Função para limpar o cache da base de conhecimento
  const clearKnowledgeBaseCache = () => {
    setKnowledgeBase(null);
  };

  // Função para limpar o contexto quando o chat é fechado
  const handleChatClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Limpar histórico e resetar para mensagem inicial quando fechar
      setMessages([{
        ...initialMessage,
        id: Date.now().toString(),
        timestamp: new Date()
      }]);
      setInputText('');
      setIsLoading(false);
      // Limpar cache da base de conhecimento para garantir dados atualizados
      clearKnowledgeBaseCache();
    }
  };

  // Carregar base de conhecimento dos arquivos TXT
  const loadKnowledgeBase = async (forceReload: boolean = false) => {
    if (knowledgeBase && !forceReload) return knowledgeBase;
    
    try {
      const txtFiles = [
        'IDENTIFICANDO CLIENTE.txt',
        'Protoner — Procedimento de Valor e Marca.txt',
        'Boa Dica — Procedimento de Valor e Marca.txt',
        'CONSULTANDO CADASTRO.txt',
        'VERIFICANDO SE CLIENTE TEM CADASTRO.txt',
        'NÃO POSSUI CADASTRO.txt',
        'Formas de Envio - Protoner.txt',
        'Formas de Envio - Boa Dica.txt',
        'Verificar Forma de Pagamento PROTONER.txt',
        'Verificar Forma de Pagamento BOA DICA.txt',
        'Suporte a Toner - Garantia.txt',
        'Faturamento.txt',
        'MARKETPLACE.txt'
      ];

      const knowledgeData: { [key: string]: string } = {};
      
      // Carregar cada arquivo TXT com cache busting para garantir versão mais recente
      for (const fileName of txtFiles) {
        try {
          const cacheBuster = Date.now(); // Mais agressivo para forçar reload
          const response = await fetch(`/dados/${fileName}?v=${cacheBuster}&t=${Math.random()}`);
          if (response.ok) {
            const content = await response.text();
            knowledgeData[fileName] = content;
          }
        } catch (error) {
          console.warn(`Erro ao carregar ${fileName}:`, error);
        }
      }
      
      setKnowledgeBase(knowledgeData);
      return knowledgeData;
    } catch (error) {
      console.error('Erro ao carregar base de conhecimento:', error);
      return null;
    }
  };

  // Formatar base de conhecimento para o prompt
  const formatKnowledgeBase = (kb: any): string => {
    if (!kb || Object.keys(kb).length === 0) return appContent; // Fallback para conteúdo original
    
    let formatted = 'TREINAMENTO PROTONER - BASE DE CONHECIMENTO\n\n';
    
    // Processa cada arquivo TXT carregado
    Object.entries(kb).forEach(([fileName, content]) => {
      if (content && typeof content === 'string') {
        formatted += `=== ${fileName.replace('.txt', '').toUpperCase()} ===\n`;
        formatted += `${content}\n\n`;
      }
    });
    
    return formatted;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      setIsLoading(true);
      
      // Carregar base de conhecimento TXT com dados atualizados
      const kb = await loadKnowledgeBase(true); // Force reload para garantir dados mais recentes
      const formattedContent = formatKnowledgeBase(kb);
      
      // Construir histórico da conversa (excluindo a mensagem inicial de boas-vindas)
      const conversationHistory = messages
        .filter(msg => msg.id !== '1' && !msg.text.includes('Olá! Sou seu assistente'))
        .map(msg => `${msg.isUser ? 'FUNCIONÁRIO' : 'ASSISTENTE'}: ${msg.text}`)
        .join('\n');
      
      const prompt = `Você é um assistente especializado e amigável da empresa Protoner, criado para ajudar funcionários com procedimentos internos, políticas e uso de sistemas da empresa.

BASE DE CONHECIMENTO DA PROTONER:
${formattedContent}

INSTRUÇÕES DE RESPOSTA:
- Você está conversando com um funcionário da Protoner, seja natural e prestativo
- Use a base de conhecimento acima como referência principal para responder
- Seja conversacional e empático, não apenas técnico
- Pode usar exemplos práticos quando apropriado
- Se algo não estiver claro na base, use conhecimento geral sobre atendimento e vendas para complementar
- Adapte sua linguagem ao contexto da pergunta
- Pode sugerir dicas extras ou melhores práticas
- Se não souber algo específico da Protoner, seja honesto e oriente a consultar o Orlando
- IMPORTANTE: Mantenha o contexto da conversa anterior e responda de forma natural, sem cumprimentos repetitivos
- Sempre priorize as informações específicas dos arquivos de treinamento da Protoner

${conversationHistory ? `HISTÓRICO DA CONVERSA:
${conversationHistory}

` : ''}PERGUNTA ATUAL DO FUNCIONÁRIO: ${userMessage}

RESPOSTA (seja útil, natural e completa, baseando-se principalmente na base de conhecimento da Protoner):`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBIXUr06KQ1KtalUijP6tmyCtQaj08W-L4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Resposta inválida da API');
      }
      
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      
      // Fallback para respostas baseadas em palavras-chave se a API falhar
      const message = userMessage.toLowerCase();
      
      if (message.includes('toner') || message.includes('cartucho') || message.includes('identificar')) {
        return 'Para identificar toners: verifique o modelo da impressora, consulte o manual ou etiqueta do equipamento. Use nosso sistema de busca por modelo de impressora. Sempre confirme compatibilidade antes de indicar ao cliente.';
      }
      
      if (message.includes('preço') || message.includes('valor') || message.includes('custo') || message.includes('tabela')) {
        return 'Procedimento de preços: consulte sempre a tabela atualizada no sistema. Para descontos especiais, verifique a política de vendas. Clientes com volume alto têm condições diferenciadas - consulte seu supervisor.';
      }
      
      if (message.includes('frete') || message.includes('entrega') || message.includes('envio') || message.includes('calculadora')) {
        return 'Como calcular frete: use a calculadora integrada no sistema, sempre confirme o CEP com o cliente, explique as opções de envio (PAC, SEDEX, transportadora). Para pedidos urgentes, priorize SEDEX.';
      }
      
      if (message.includes('garantia') || message.includes('troca') || message.includes('defeito')) {
        return 'Procedimento de garantia: verifique o prazo no sistema, solicite nota fiscal, analise o problema relatado. Para trocas, siga o protocolo de devolução e sempre documente o motivo.';
      }
      
      if (message.includes('bling') || message.includes('sistema') || message.includes('pedido')) {
        return 'Como usar o Bling: acesse com seu login, consulte estoque em tempo real, registre todos os pedidos no sistema, atualize status de entrega. Sempre sincronize dados ao final do dia.';
      }
      
      return 'Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente em alguns instantes ou consulte seu supervisor para dúvidas específicas.';
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    const botResponse = await generateResponse(inputText);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <div className="fixed bottom-20 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Abrir chat de ajuda"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>

      {/* Modal do chat */}
      <Dialog open={isOpen} onOpenChange={handleChatClose}>
        <DialogContent className="max-w-md h-[600px] p-0 gap-0 flex flex-col">
          <DialogHeader className="p-4 pb-2 border-b bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <DialogTitle className="text-white font-semibold">
                Assistente Protoner
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* Área de mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.isUser ? "justify-end" : "justify-start"
                )}
              >
                {!message.isUser && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg text-sm",
                    message.isUser
                      ? "bg-blue-500 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-900 rounded-bl-sm"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <span className={cn(
                    "text-xs mt-1 block",
                    message.isUser ? "text-blue-100" : "text-gray-500"
                  )}>
                    {message.timestamp.toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                {message.isUser && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg rounded-bl-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Área de input */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta sobre o treinamento..."
                className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;