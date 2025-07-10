import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import ChatBot from "./components/ChatBot";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { ZoomableImage } from "./components/ZoomableImage";
import { ImageWithFallback } from "./components/shared/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle,
  Plus,
  FileText,
  Lightbulb,
  Tag,
  Headphones,
  History,
  CreditCard,
  DollarSign,
  Banknote,
  Smartphone,
  Truck,
  AlertTriangle,
  TrendingUp,
  ExternalLink,
  BookOpen,
  Clock,
  Award,
  X,
  RefreshCw,
  ArrowRight,
  Menu,
  Receipt,
  Package,
  Info,
  Bike,
  Mail,
  Calculator,
  Palette,
  Printer,
  Video,
  HelpCircle,
  Camera,
  Download,
  ClipboardList,
  Search,
  Globe,
  MousePointer,
  Save,
  Send,
  Edit,
  Settings,
} from "lucide-react";

type Screen =
  | "home"
  | "consulta"
  | "produtos"
  | "produtos-novo"
  | "boadica"
  | "protoner"
  | "suporte-toner-garantia"
  | "cadastro"
  | "simulado"
  | "formas-envio"
  | "formas-envio-boadica"
  | "formas-envio-protoner"
  | "formas-envio-boadica-motoboy"
  | "formas-envio-boadica-correios"
  | "formas-envio-protoner-motoboy"
  | "formas-envio-protoner-correios"
  | "faturamento"
  | "pedidos-sem-postagem"
  | "pedidos-com-postagem"
  | "toner-colorido"
  | "toner-preto"
  | "verificar-pagamento";
type ProductType = "boadica" | "protoner" | null;

interface NavigationState {
  currentScreen: Screen;
  history: Screen[];
  selectedProductType: ProductType;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const screenSteps: Record<Screen, number> = {
  home: 1,
  consulta: 2,
  cadastro: 2,
  produtos: 3,
  "produtos-novo": 3,
  boadica: 4,
  protoner: 4,
  "verificar-pagamento": 5,
  simulado: 1,
  "formas-envio": 1,
  "formas-envio-boadica": 2,
  "formas-envio-protoner": 2,
  "formas-envio-boadica-motoboy": 3,
  "formas-envio-boadica-correios": 3,
  "formas-envio-protoner-motoboy": 3,
  "formas-envio-protoner-correios": 3,
  faturamento: 1,
  "pedidos-sem-postagem": 2,
  "pedidos-com-postagem": 2,
  "suporte-toner-garantia": 1,
  "toner-colorido": 1,
  "toner-preto": 1,
};

// Tela: Toner de Impressora Preta (Monocromática)
const TonerPretoScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => {
  const scrollToStatusSection = () => {
    const statusSection = document.getElementById('status-suprimentos-section-preto');
    if (statusSection) {
      statusSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
  <div className="w-full max-w-4xl mx-auto animate-slide-in-scale">
    {/* Indicador de Progresso */}
    <ProgressIndicator 
      currentStep={2} 
      totalSteps={2} 
      stepLabels={["Suporte a Toner", "Tipo de Toner"]} 
    />
    
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Printer className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          PRETO (IMPRESSORA MONOCROMÁTICA)
        </h1>
      </div>
      <div className="p-10">
        <div className="space-y-8">
          {/* Comprovante de Compra */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-blue-800 mb-6 text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              COMPROVANTE DE COMPRA
            </h3>
            <div className="space-y-4 text-blue-700">
              <div className="bg-blue-100 border border-blue-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Solicitar número do comprovante:</p>
                <ul className="text-sm space-y-1">
                  <li>• Danfe (Nota Fiscal Eletrônica)</li>
                  <li>• Pedido de loja virtual</li>
                  <li>• Pedido balcão</li>
                </ul>
                <p className="text-sm mt-3 font-semibold text-blue-800">Garantia: 90 dias após recebimento do produto</p>
              </div>
              <div className="bg-red-100 border border-red-200 p-4 rounded-xl mt-4">
                <h4 className="font-semibold mb-2 text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Atenção
                </h4>
                <p className="text-red-700 text-sm">
                  Peça foto do produto e dos códigos das etiquetas que estão no produto, veja se confere com o comprovante de compra, e se for nosso prossiga o atendimento, senão for, me informe antes de prosseguir.
                </p>
              </div>
            </div>
          </div>

          {/* Observação sobre tipos de defeito */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-yellow-800 mb-6 text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              OBSERVAÇÃO IMPORTANTE
            </h3>
            <div className="bg-yellow-100 border border-yellow-200 p-4 rounded-xl">
              <p className="text-yellow-700 font-semibold">
                Cada tipo de relato de defeito gera um tipo de teste a ser solicitado. Atenção aos problemas descritos abaixo.
              </p>
            </div>
          </div>

          {/* Problemas que requerem vídeo */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-red-800 mb-6 text-lg flex items-center gap-2">
              <Video className="w-5 h-5" />
              PROBLEMAS QUE REQUEREM VÍDEO
            </h3>
            <div className="space-y-4 text-red-700">
              <div className="bg-red-100 border border-red-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Solicitar pequeno vídeo para:</p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Faz barulho</strong></li>
                  <li>• <strong>Vaza toner</strong></li>
                  <li>• <strong>Não reconhece</strong></li>
                </ul>
                <p className="text-sm mt-3">Peça vídeo mostrando como ocorre com o defeituoso e como funciona com o anterior.</p>
              </div>
              <div className="bg-red-100 border border-red-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Não reconhecer - Detalhes:</p>
                <ul className="text-sm space-y-1">
                  <li>• Quando pede para por toner</li>
                  <li>• Fica com a luz piscando</li>
                  <li>• Mas quando coloca o anterior funciona normalmente</li>
                </ul>
              </div>
              <div className="bg-red-100 border border-red-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Atenção - Toner SEM CHIP:</p>
                <p className="text-sm">
                  Se o toner foi comprado na opção <strong>SEM CHIP</strong>, pergunte se ele colocou o chip, 
                  pois comprou sem chip e tem que por o chip do anterior para funcionar.
                </p>
              </div>
            </div>
          </div>

          {/* Má impressão preta */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 text-lg flex items-center gap-2">
              <Printer className="w-5 h-5" />
              MÁ IMPRESSÃO PRETO
            </h3>
            <div className="space-y-4 text-gray-700">
              <div className="bg-gray-100 border border-gray-200 p-4 rounded-xl">
                <p className="font-semibold mb-4">Solicitar testes em PDF:</p>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="bg-gray-600 hover:bg-gray-700 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto text-xs sm:text-base min-h-[2.5rem] sm:min-h-auto"
                      onClick={() => {
                        window.open('/TESTE_PRETO.pdf', '_blank');
                      }}
                    >
                      <Download className="w-4 h-4 flex-shrink-0" />
                      <span className="text-center leading-none text-xs sm:text-base">Teste Preto</span>
                    </Button>
                    <Button 
                      onClick={scrollToStatusSection}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto text-xs sm:text-base min-h-[2.5rem] sm:min-h-auto"
                    >
                      <Download className="w-4 h-4 flex-shrink-0" />
                      <span className="text-center sm:text-left leading-tight">Página de Status de Suprimentos</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-red-100 border border-red-200 p-4 rounded-xl">
                <p className="font-semibold mb-2 text-red-800">ALERTA:</p>
                <p className="text-red-700 text-sm">
                  Se a impressão estiver muito ruim, não vai dar para pedir as impressões acima, 
                  pois não vai estar nítido. Então peça para enviar a impressão que tem para analisar.
                </p>
              </div>
            </div>
          </div>

          {/* Página de status de suprimentos */}
          <div id="status-suprimentos-section-preto" className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-green-800 mb-6 text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              PÁGINA DE STATUS DE SUPRIMENTOS
            </h3>
            <div className="space-y-4 text-green-700">
              <div className="bg-green-100 border border-green-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Se o cliente não souber fazer:</p>
                <ul className="text-sm space-y-1">
                  <li>• Peça o modelo da impressora</li>
                  <li>• Enviaremos vídeo de como fazer</li>
                </ul>
              </div>
              <div className="bg-green-100 border border-green-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Como encontrar vídeo:</p>
                <p className="text-sm mb-2">Procure no Google digitando:</p>
                <p className="text-sm font-mono bg-gray-200 p-2 rounded">
                  [modelo da impressora] + [marca] + "Página de status de suprimentos"
                </p>
                <div className="text-sm mt-2 space-y-1">
                  <p><strong>Exemplos:</strong></p>
                  <p>• "Brother HL1602 status de suprimentos"</p>
                  <p>• "HP P2035 status de suprimentos"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Impressoras com toner e fotocondutor */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-orange-800 mb-6 text-lg flex items-center gap-2">
              <Camera className="w-5 h-5" />
              IMPRESSORAS COM TONER E FOTOCONDUTOR
            </h3>
            <div className="bg-orange-100 border border-orange-200 p-4 rounded-xl">
              <p className="font-semibold mb-2 text-orange-800">Solicitar fotos nítidas:</p>
              <ul className="text-sm space-y-1 text-orange-700">
                <li>• Rolos de toner</li>
                <li>• Rolo de fotocondutor</li>
              </ul>
              <p className="text-sm mt-3 text-orange-700 italic">Para análise detalhada</p>
            </div>
          </div>

          {/* Atenção Importante */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-yellow-800 mb-6 text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              ATENÇÃO IMPORTANTE
            </h3>
            <div className="bg-yellow-100 border border-yellow-200 p-4 rounded-xl space-y-3">
              <p className="font-medium text-yellow-800 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Impressora passou por manutenção recentemente?
              </p>
              <p className="text-sm text-yellow-700">
                Me avise, pois isso pode estar prejudicando a impressão.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-800 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Se o problema já existia com o toner anterior:
                </p>
                <p className="text-sm text-blue-700">
                  Recomende procurar um técnico especializado.
                </p>
              </div>
            </div>
          </div>

          {/* Casos sem garantia */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 text-lg flex items-center gap-2">
              <X className="w-5 h-5" />
              NÃO TEM GARANTIA
            </h3>
            <div className="space-y-4 text-gray-700">
              <div className="bg-gray-100 border border-gray-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Produto não é nosso:</p>
                <p className="text-sm">
                  Informe que não foi comprado conosco e o produto não bate com o que enviamos. 
                  Explique como identificamos isso.
                </p>
              </div>
              <div className="bg-gray-100 border border-gray-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Prazo vencido:</p>
                <p className="text-sm">
                  Se passou de 90 dias, nem tenta que não tem garantia. 
                  Apenas informe que o prazo de garantia acabou.
                </p>
              </div>
            </div>
          </div>

          {/* Botão Finalizar */}
          <div className="text-center pt-6">
            <Button
              onClick={() => onNavigate("suporte-toner-garantia")}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
            >
              <CheckCircle className="w-6 h-6 mr-2" />
              CONCLUIR
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const stepLabels = [
  "Início",
  "Cliente",
  "Produtos",
  "Procedimento",
  "Pagamento",
];

const envioStepLabels = [
  "Formas de Envio",
  "Escolher Marca",
  "Calculadora",
];

const faturamentoStepLabels = [
  "Faturamento",
  "Postagem",
];

// URLs das imagens de exemplo
const historyExampleImageUrl =
  "https://i.ibb.co/hRR2y3pB/cel.png";
const historyViewImageUrl =
  "https://i.ibb.co/WW73T9Sk/historico.png";
const vendedorExampleImageUrl =
  "https://i.ibb.co/xtDZjTPG/vendedor.png";
const cadastroExampleImageUrl =
  "https://ajuda.bling.com.br/hc/article_attachments/10791100416023";
const protonerLogoUrl =
  "https://images.tcdn.com.br/img/img_prod/730006/1570215196_logo_site_2.png";

// Banco de questões renovado baseado no conteúdo da plataforma
const questionBank: Question[] = [
  {
    id: 1,
    question:
      "Como deve ser feita a pesquisa inicial de cadastro de cliente?",
    options: [
      "Apenas por nome completo",
      "Por nome, telefone fixo ou móvel",
      "Apenas por CPF ou CNPJ",
      "Por endereço residencial",
      "Apenas por email",
    ],
    correctAnswer: 1,
    explanation:
      "A pesquisa deve ser feita consultando o nome ou número de telefone fixo ou móvel para verificar se o cliente possui cadastro.",
  },
  {
    id: 2,
    question:
      "No Bling, para buscar cliente por telefone, qual filtro deve ser usado?",
    options: [
      "Nome/Razão Social",
      "CPF/CNPJ",
      "Telefone/Celular",
      "Email",
      "Endereço",
    ],
    correctAnswer: 2,
    explanation:
      "Deve-se clicar em 'Adicionar Filtros' e escolher a opção 'Telefone/Celular' para buscar o cliente.",
  },
  {
    id: 3,
    question:
      "Como identificar se um cliente é Protoner ou Boa Dica no histórico?",
    options: [
      "Pelo valor da compra",
      "Pelo campo 'Vendedor' no pedido",
      "Pela forma de pagamento",
      "Pelo tipo de produto",
      "Pelo endereço do cliente",
    ],
    correctAnswer: 1,
    explanation:
      "Verifique o campo 'Vendedor' no pedido para identificar o tipo de cliente: 'Protoner' ou 'Boa Dica'.",
  },
  {
    id: 4,
    question:
      "Para cliente Boa Dica, qual é a política de preços?",
    options: [
      "Sempre dar desconto máximo",
      "Veja histórico e mantenha igual ou maior que o anunciado",
      "Usar preço da tabela",
      "Preço livre sem consulta",
      "Sempre cobrar mais caro",
    ],
    correctAnswer: 1,
    explanation:
      "Para Boa Dica: veja histórico e mantenha igual ou maior do que o anunciado no Boa Dica.",
  },
  {
    id: 5,
    question:
      "Para cliente Protoner, onde consultar os preços dos produtos?",
    options: [
      "No histórico do cliente apenas",
      "No site da Protoner (www.protoner.com.br)",
      "Na tabela interna",
      "Com o gerente",
      "No WhatsApp",
    ],
    correctAnswer: 1,
    explanation:
      "Para Protoner: consulte no site da Protoner (www.protoner.com.br) para obter os valores atualizados.",
  },
  {
    id: 6,
    question: "Qual é a taxa adicional para pagamento com PIX?",
    options: ["+5%", "0%", "+10%", "+15%", "+30%"],
    correctAnswer: 0,
    explanation:
      "PIX tem taxa adicional de +5% sobre o valor do produto.",
  },
  {
    id: 7,
    question:
      "Qual é a taxa adicional para pagamento no cartão de crédito?",
    options: ["+5%", "+10%", "+15%", "+20%", "0%"],
    correctAnswer: 1,
    explanation:
      "Cartão de crédito tem taxa adicional de +10% sobre o valor do produto.",
  },
  {
    id: 8,
    question: "Qual é a taxa para entrega?",
    options: ["+5%", "+10%", "30%", "+20%", "+50%"],
    correctAnswer: 2,
    explanation:
      "Para entrega, a taxa é de 30% e deve ser somada ao final do pedido.",
  },
  {
    id: 9,
    question: "Quais formas de pagamento têm taxa zero?",
    options: [
      "PIX e cartão de débito",
      "Dinheiro e boleto",
      "Cartão de crédito",
      "Apenas dinheiro",
      "Todas as formas",
    ],
    correctAnswer: 1,
    explanation:
      "Dinheiro e boleto têm taxa 0%. PIX e débito +5%, crédito +10%, entrega 30%.",
  },
  {
    id: 10,
    question:
      "Para cadastro simples de orçamento, quais dados são obrigatórios?",
    options: [
      "Nome, telefone, CPF e endereço",
      "Apenas nome e telefone",
      "Nome, email e telefone",
      "CPF, nome e endereço",
      "Todos os dados completos",
    ],
    correctAnswer: 1,
    explanation:
      "Para orçamento simples, cadastre apenas NOME e TELEFONE.",
  },
  {
    id: 11,
    question:
      "Para DANFE, onde devem ser verificados os dados do cliente?",
    options: [
      "Apenas no Bling",
      "No SINTEGRA ou SEFAZ",
      "No Google",
      "No WhatsApp",
      "Não precisa verificar",
    ],
    correctAnswer: 1,
    explanation:
      "Para DANFE, adicione CPF/CNPJ e demais dados verificados no SINTEGRA ou SEFAZ.",
  },
  {
    id: 12,
    question:
      "No tipo de vendedor para Boa Dica, qual opção selecionar?",
    options: [
      "Boa Dica",
      "BD centro",
      "Protoner",
      "Vendedor padrão",
      "Cliente especial",
    ],
    correctAnswer: 1,
    explanation:
      "Selecione o TIPO DE VENDEDOR 'BD centro' para clientes Boa Dica.",
  },
  {
    id: 13,
    question: "Quando deve ser separado o pedido?",
    options: [
      "Antes do pagamento",
      "Após o pagamento",
      "Durante o atendimento",
      "No final do dia",
      "Quando der tempo",
    ],
    correctAnswer: 1,
    explanation:
      "Separe o pedido APÓS o pagamento, use o mapa para cada item.",
  },
  {
    id: 14,
    question: "Quando o pedido deve ser 'bipado'?",
    options: [
      "Antes de separar os itens",
      "Após todo material estar separado",
      "Durante a separação",
      "Antes do pagamento",
      "No início do atendimento",
    ],
    correctAnswer: 1,
    explanation:
      "Bipar o pedido APÓS todo o material estar separado.",
  },
  {
    id: 15,
    question:
      "Quantas sacolas no máximo devem ser oferecidas ao cliente?",
    options: [
      "1 sacola",
      "2 sacolas",
      "3 sacolas",
      "4 sacolas",
      "Quantas forem necessárias",
    ],
    correctAnswer: 1,
    explanation:
      "Use no máximo 2 sacolas. Se for mais que isso, ofereça uma caixa.",
  },
  {
    id: 16,
    question: "Qual dica de venda é importante para toners?",
    options: [
      "Perguntar sobre drum se o toner usa drum",
      "Sempre oferecer garantia estendida",
      "Oferecer desconto automático",
      "Recomendar marca mais cara",
      "Vender apenas uma unidade",
    ],
    correctAnswer: 0,
    explanation:
      "Se o toner usa drum, pergunte sobre levar o drum. Se o drum usa toner, pergunte sobre levar o toner.",
  },
  {
    id: 17,
    question: "O que sempre perguntar antes de fechar a conta?",
    options: [
      "Se quer nota fiscal",
      "Se quer algo a mais",
      "Se quer desconto",
      "Se quer entrega",
      "Se quer garantia",
    ],
    correctAnswer: 1,
    explanation:
      "Sempre pergunte se o cliente quer algo a mais antes de fechar a conta.",
  },
  {
    id: 18,
    question:
      "Para múltiplos produtos no Bling, após inserir um produto no frente de caixa para novo cadastro:",
    options: [
      "Clique 'NÃO' para mais produtos ou 'SIM' para finalizar",
      "Clique sempre 'SIM' para continuar",
      "Reinicie o processo",
      "Clique 'Cancelar'",
      "Não aparece pergunta",
    ],
    correctAnswer: 0,
    explanation:
      "Após inserir um produto, clique 'NÃO' para adicionar mais produtos ou 'SIM' para finalizar.",
  },
  {
    id: 19,
    question:
      "Como visualizar histórico de preços do cliente no Bling?",
    options: [
      "Clique no ícone (i) do pedido",
      "Na lista de produtos",
      "No campo observações",
      "No campo vendedor",
      "No valor total",
    ],
    correctAnswer: 0,
    explanation:
      "Clique no ícone (i) para visualizar informações detalhadas dos preços de pedidos anteriores.",
  },
  {
    id: 20,
    question:
      "Como deve ser classificado um cliente novo que diz ter vindo do Google?",
    options: [
      "Cliente Boa Dica",
      "Cliente Protoner",
      "Cliente especial",
      "Cliente padrão",
      "Depende do valor da compra",
    ],
    correctAnswer: 1,
    explanation:
      "Cliente Protoner: QUALQUER resposta (Google, indicação, redes sociais, etc.) que NÃO mencione o 'Boa Dica'.",
  },
  {
    id: 21,
    question:
      "Para cliente Boa Dica com marca não disponível, qual procedimento?",
    options: [
      "Recusar a venda",
      "Ofereça o valor da marca disponível, desconto só se necessário",
      "Sempre dar desconto automático",
      "Cobrar preço da marca mais cara",
      "Pedir autorização sempre",
    ],
    correctAnswer: 1,
    explanation:
      "Não tendo a marca, ofereça o valor da marca disponível em estoque, e só faça desconto se necessário.",
  },
  {
    id: 22,
    question:
      "Na ABA PRODUTO do Bling, qual tipo de pesquisa usar?",
    options: [
      "Pesquisa simples",
      "Pesquisa Avançada",
      "Pesquisa rápida",
      "Busca direta",
      "Qualquer tipo",
    ],
    correctAnswer: 1,
    explanation:
      "Use sempre 'Pesquisa Avançada' para localizar produtos. Após selecionar não esqueça de definir o PREÇO e clicar em 'INSERIR'.",
  },
  {
    id: 23,
    question:
      "Qual condição obrigatória para vender pelo valor anunciado no Boa Dica?",
    options: [
      "Qualquer forma de pagamento",
      "Retirada no balcão com pagamento em espécie",
      "Apenas com cartão",
      "Somente com entrega",
      "Com desconto adicional",
    ],
    correctAnswer: 1,
    explanation:
      "Somos obrigados a vender pelo menos uma unidade com o valor igual ao anunciado, só que isso na condição de retirada no balcão, com pagamento em espécie.",
  },
  {
    id: 24,
    question:
      "Para cliente que menciona especificamente 'Boa Dica', como classificar?",
    options: [
      "Cliente Protoner",
      "Cliente Boa Dica",
      "Cliente especial",
      "Depende do valor",
      "Cliente padrão",
    ],
    correctAnswer: 1,
    explanation:
      "Cliente Boa Dica: APENAS se o cliente disser que veio do 'Boa Dica' ou mencionar especificamente essa marca.",
  },
  {
    id: 25,
    question:
      "Após finalizar venda no Bling, qual sequência de ações seguir?",
    options: [
      "Bipar, separar, entregar",
      "Separar após pagamento, bipar após separação completa",
      "Entregar imediatamente",
      "Separar antes do pagamento",
      "Bipar antes de separar",
    ],
    correctAnswer: 1,
    explanation:
      "Separe o pedido APÓS o pagamento, use o mapa para cada item, e bipar o pedido APÓS todo o material estar separado.",
  },
  {
    id: 26,
    question:
      "Para entrega via Lalamove no centro do Rio, qual é o valor mínimo de frete?",
    options: [
      "R$ 10,00",
      "R$ 15,00",
      "R$ 20,00",
      "R$ 25,00",
      "Sem valor mínimo",
    ],
    correctAnswer: 1,
    explanation:
      "Para centro do Rio até 7km, o valor mínimo é R$ 15,00. Fica grátis para compras a partir de R$ 300,00.",
  },
  {
    id: 27,
    question:
      "A partir de qual valor a entrega no centro do Rio fica grátis?",
    options: [
      "R$ 200,00",
      "R$ 250,00",
      "R$ 300,00",
      "R$ 350,00",
      "R$ 400,00",
    ],
    correctAnswer: 2,
    explanation:
      "Para compras a partir de R$ 300,00, a entrega no centro do Rio fica grátis (quando o frete calculado for até R$ 15,00).",
  },
  {
    id: 28,
    question:
      "Para compras acima de R$ 300,00, o que deve ser feito antes de finalizar?",
    options: [
      "Aplicar desconto automático",
      "Enviar print do pedido com frete calculado para aprovação",
      "Cobrar taxa extra",
      "Recusar a entrega",
      "Nada especial",
    ],
    correctAnswer: 1,
    explanation:
      "Para compras a partir de R$ 300,00, envie print do pedido já com custo de frete calculado para aprovação.",
  },
  {
    id: 29,
    question:
      "Qual garantia é oferecida para toners de impressora?",
    options: [
      "30 dias",
      "60 dias",
      "90 dias após recebimento",
      "120 dias",
      "1 ano",
    ],
    correctAnswer: 2,
    explanation:
      "A garantia para toners é de 90 dias após o recebimento do produto.",
  },
  {
    id: 30,
    question:
      "Para cotação de frete via Correios/Transportadoras no Bling, qual logística selecionar?",
    options: [
      "Logística própria",
      "ENVIO POR MELHOR ENVIOS",
      "Correios direto",
      "Transportadora local",
      "Qualquer opção",
    ],
    correctAnswer: 1,
    explanation:
      "Em Logística, marque a opção 'ENVIO POR MELHOR ENVIOS' para obter cotações de frete.",
  },
  {
    id: 31,
    question:
      "Qual é o prazo para postagem após identificação do pagamento?",
    options: [
      "No mesmo dia sempre",
      "Até 24h úteis, podendo ser no mesmo dia se pago até 13h",
      "48h úteis",
      "72h úteis",
      "1 semana",
    ],
    correctAnswer: 1,
    explanation:
      "Após pagamento identificado até 13h, postamos em até 24h úteis, até no mesmo dia.",
  },
  {
    id: 32,
    question:
      "Para toner colorido, quais documentos podem ser solicitados como comprovante?",
    options: [
      "Apenas nota fiscal",
      "Danfe, pedido de loja virtual ou pedido balcão",
      "Apenas recibo",
      "Apenas cupom fiscal",
      "Qualquer documento",
    ],
    correctAnswer: 1,
    explanation:
      "Pode solicitar: Danfe (Nota Fiscal Eletrônica), pedido de loja virtual ou pedido balcão.",
  },
  {
    id: 33,
    question:
      "Para desconto em múltiplas peças Boa Dica, qual é a regra?",
    options: [
      "Desconto livre",
      "Não pode ultrapassar limite do sistema e precisa autorização",
      "Máximo 10% sempre",
      "Apenas para clientes VIP",
      "Não é permitido desconto",
    ],
    correctAnswer: 1,
    explanation:
      "Desconto para mais de uma peça não pode ultrapassar o próprio limite de sistema e precisa de autorização.",
  },
  {
    id: 34,
    question:
      "Onde encontrar informações sobre envio no site Protoner?",
    options: [
      "www.protoner.com.br/frete",
      "www.protoner.com.br/envio",
      "www.protoner.com.br/entrega",
      "www.protoner.com.br/correios",
      "Não tem essa informação",
    ],
    correctAnswer: 1,
    explanation:
      "As informações sobre envio estão disponíveis em www.protoner.com.br/envio.",
  },
  {
    id: 35,
    question:
      "Para cotações de mais de 1 volume, onde deve ser feita?",
    options: [
      "Apenas no Bling",
      "Diretamente no painel do Melhor Envios",
      "Por telefone",
      "Por WhatsApp",
      "Não é possível",
    ],
    correctAnswer: 1,
    explanation:
      "Cotações para compras de mais de 1 volume somente será feita diretamente no painel do melhor envios, inserindo todos os dados.",
  },
];

export default function App() {
  const [navigation, setNavigation] = useState<NavigationState>(
    {
      currentScreen: "home",
      history: [],
      selectedProductType: null,
    },
  );

  // Estado para a calculadora de frete
  const [freteCalculator, setFreteCalculator] = useState({
    precoLalamove: '',
    precoPedido: '',
    centroRio: false
  });

  // Scroll para o topo quando a página carrega - solução robusta
  useEffect(() => {
    // Força o scroll imediatamente
    window.scrollTo(0, 0);
    
    // Previne a restauração automática do scroll pelo navegador
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Força novamente após um pequeno delay para garantir
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll para o topo sempre que a tela mudar
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [navigation.currentScreen]);

  const navigateTo = (
    screen: Screen,
    productType?: ProductType,
  ) => {
    setNavigation((prev) => ({
      currentScreen: screen,
      history: [...prev.history, prev.currentScreen],
      selectedProductType:
        productType || prev.selectedProductType,
    }));
  };

  const goBack = () => {
    if (navigation.history.length > 0) {
      const previousScreen =
        navigation.history[navigation.history.length - 1];
      setNavigation((prev) => ({
        currentScreen: previousScreen,
        history: prev.history.slice(0, -1),
        selectedProductType: prev.selectedProductType,
      }));
    }
  };

  const restart = () => {
    setNavigation({
      currentScreen: "home",
      history: [],
      selectedProductType: null,
    });
  };

  const canGoBack = navigation.history.length > 0;
  const currentStep = screenSteps[navigation.currentScreen];

  // Função para extrair conteúdo do aplicativo para o chatbot
  // Função para carregar a base de conhecimento do arquivo JSON
  const loadKnowledgeBase = async (): Promise<any> => {
    try {
      const response = await fetch('/dados/knowledge-base.json');
      if (!response.ok) {
        throw new Error('Erro ao carregar base de conhecimento');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao carregar knowledge base:', error);
      return null;
    }
  };

  // Função para converter JSON em texto estruturado
  const formatKnowledgeBase = (kb: any): string => {
    if (!kb || !kb.knowledge_base) {
      return getAppContentFallback();
    }

    const data = kb.knowledge_base;
    let content = '=== TREINAMENTO PROTONER - BASE DE CONHECIMENTO COMPLETA ===\n\n';

    // Cadastro de Cliente
    if (data.cadastro_cliente) {
      content += '## CADASTRO DE CLIENTE\n\n';
      
      if (data.cadastro_cliente.verificacao) {
        content += `### ${data.cadastro_cliente.verificacao.titulo}\n`;
        content += `${data.cadastro_cliente.verificacao.descricao}\n`;
        content += 'Procedimento:\n';
        data.cadastro_cliente.verificacao.procedimento.forEach((step: string, index: number) => {
          content += `${index + 1}. ${step}\n`;
        });
        content += '\n';
      }

      if (data.cadastro_cliente.possui_cadastro) {
        content += `### ${data.cadastro_cliente.possui_cadastro.titulo}\n`;
        data.cadastro_cliente.possui_cadastro.procedimento.forEach((step: string, index: number) => {
          content += `${index + 1}. ${step}\n`;
        });
        
        if (data.cadastro_cliente.possui_cadastro.identificacao_tipo) {
          content += `\n#### ${data.cadastro_cliente.possui_cadastro.identificacao_tipo.titulo}\n`;
          data.cadastro_cliente.possui_cadastro.identificacao_tipo.procedimento.forEach((step: string, index: number) => {
            content += `${index + 1}. ${step}\n`;
          });
        }
        content += '\n';
      }

      if (data.cadastro_cliente.nao_possui_cadastro) {
        content += `### ${data.cadastro_cliente.nao_possui_cadastro.titulo}\n`;
        data.cadastro_cliente.nao_possui_cadastro.procedimento.forEach((step: string) => {
          content += `- ${step}\n`;
        });
        
        if (data.cadastro_cliente.nao_possui_cadastro.cadastro_bling) {
          content += `\n#### ${data.cadastro_cliente.nao_possui_cadastro.cadastro_bling.titulo}\n`;
          data.cadastro_cliente.nao_possui_cadastro.cadastro_bling.procedimento.forEach((step: string, index: number) => {
            content += `${index + 1}. ${step}\n`;
          });
        }
        content += '\n';
      }
    }

    // Boa Dica
    if (data.boa_dica) {
      content += '## BOA DICA - PROCEDIMENTOS\n\n';
      
      if (data.boa_dica.valor) {
        content += `### ${data.boa_dica.valor.titulo}\n`;
        content += `**Regra:** ${data.boa_dica.valor.regra}\n`;
        content += `**Observação:** ${data.boa_dica.valor.observacao}\n\n`;
      }

      if (data.boa_dica.marca) {
        content += `### ${data.boa_dica.marca.titulo}\n`;
        data.boa_dica.marca.regras.forEach((regra: string) => {
          content += `- ${regra}\n`;
        });
        content += '\n';
      }

      if (data.boa_dica.pagamento) {
        content += `### ${data.boa_dica.pagamento.titulo}\n`;
        Object.entries(data.boa_dica.pagamento.taxas).forEach(([forma, taxa]) => {
          content += `- ${forma.charAt(0).toUpperCase() + forma.slice(1)}: ${taxa}\n`;
        });
        content += `**Observação:** ${data.boa_dica.pagamento.observacao}\n\n`;
      }

      // Envio Boa Dica
      if (data.boa_dica.envio) {
        content += '### FORMAS DE ENVIO - BOA DICA\n\n';
        
        if (data.boa_dica.envio.motoboy) {
          content += `#### ${data.boa_dica.envio.motoboy.titulo}\n`;
          data.boa_dica.envio.motoboy.procedimento.forEach((step: string) => {
            content += `- ${step}\n`;
          });
          
          content += '\n**Preços:**\n';
          if (data.boa_dica.envio.motoboy.precos.ate_299) {
            Object.entries(data.boa_dica.envio.motoboy.precos.ate_299).forEach(([local, preco]) => {
              content += `- ${local.replace('_', ' ')}: ${preco}\n`;
            });
          }
          content += `- Acima R$ 300: ${data.boa_dica.envio.motoboy.precos.acima_300}\n\n`;
        }
      }
    }

    // Protoner
    if (data.protoner) {
      content += '## PROTONER - PROCEDIMENTOS\n\n';
      
      if (data.protoner.valor) {
        content += `### ${data.protoner.valor.titulo}\n`;
        content += `**Regra:** ${data.protoner.valor.regra}\n`;
        content += `**Atualização:** ${data.protoner.valor.atualizacao}\n\n`;
      }

      if (data.protoner.marca) {
        content += `### ${data.protoner.marca.titulo}\n`;
        content += `**Regra:** ${data.protoner.marca.regra}\n\n`;
      }
    }

    // Dicas de Venda
    if (data.dicas_venda) {
      content += `## ${data.dicas_venda.titulo.toUpperCase()}\n\n`;
      data.dicas_venda.dicas.forEach((dica: string) => {
        content += `- ${dica}\n`;
      });
      
      content += '\n**Perguntas Importantes:**\n';
      data.dicas_venda.perguntas_importantes.forEach((pergunta: string) => {
        content += `- ${pergunta}\n`;
      });
      
      content += '\n**Finalização:**\n';
      data.dicas_venda.finalizacao.forEach((item: string) => {
        content += `- ${item}\n`;
      });
      content += '\n';
    }

    // Garantia de Toner
    if (data.garantia_toner) {
      content += `## ${data.garantia_toner.titulo.toUpperCase()}\n\n`;
      content += `**Prazo:** ${data.garantia_toner.prazo}\n\n`;
      
      content += '**Comprovantes aceitos:**\n';
      data.garantia_toner.comprovante.forEach((comp: string) => {
        content += `- ${comp}\n`;
      });
      content += '\n';

      if (data.garantia_toner.colorida) {
        content += `### ${data.garantia_toner.colorida.titulo}\n\n`;
        
        if (data.garantia_toner.colorida.problemas_video) {
          content += `#### ${data.garantia_toner.colorida.problemas_video.titulo}\n`;
          content += `**Tipos:** ${data.garantia_toner.colorida.problemas_video.tipos.join(', ')}\n`;
          content += `**Procedimento:** ${data.garantia_toner.colorida.problemas_video.procedimento}\n\n`;
          
          content += '**Não reconhece - Detalhes:**\n';
          data.garantia_toner.colorida.problemas_video.nao_reconhece.forEach((detalhe: string) => {
            content += `- ${detalhe}\n`;
          });
          content += `\n**Atenção:** ${data.garantia_toner.colorida.problemas_video.sem_chip}\n\n`;
        }
      }

      if (data.garantia_toner.sem_garantia) {
        content += `### ${data.garantia_toner.sem_garantia.titulo}\n`;
        content += `- **Produto não nosso:** ${data.garantia_toner.sem_garantia.produto_nao_nosso}\n`;
        content += `- **Prazo vencido:** ${data.garantia_toner.sem_garantia.prazo_vencido}\n\n`;
      }

      content += '**Atenções Importantes:**\n';
      data.garantia_toner.atencoes_importantes.forEach((atencao: string) => {
        content += `- ${atencao}\n`;
      });
      content += '\n';
    }

    // Faturamento
    if (data.faturamento) {
      content += `## ${data.faturamento.titulo.toUpperCase()}\n\n`;
      
      if (data.faturamento.sem_postagem) {
        content += `### ${data.faturamento.sem_postagem.titulo}\n`;
        data.faturamento.sem_postagem.procedimento.forEach((step: string) => {
          content += `${step}\n`;
        });
        content += '\n';
      }

      if (data.faturamento.com_postagem) {
        content += `### ${data.faturamento.com_postagem.titulo}\n`;
        data.faturamento.com_postagem.procedimento.forEach((step: string) => {
          content += `${step}\n`;
        });
        content += '\n';
      }
    }

    content += '=== FIM DA BASE DE CONHECIMENTO ===\n';
    return content;
  };

  // Função de fallback caso o JSON não carregue
  const getAppContentFallback = (): string => {
    return `
    TREINAMENTO PROTONER - BASE DE CONHECIMENTO COMPLETA
    
    === IDENTIFICAÇÃO DE PRODUTOS ===
    BOA DICA:
    - Embalagem: Amarela com logo "Boa Dica"
    - Política: Preço fixo, sem negociação
    - Público: Clientes finais e pequenos revendedores
    - Margem: Menor, mas volume maior
    
    PROTONER:
    - Embalagem: Azul com logo "Protoner"
    - Política: Permite desconto até 10% para clientes especiais
    - Público: Revendedores e empresas
    - Margem: Maior, foco em qualidade
    
    === POLÍTICAS DE PREÇO E DESCONTO ===
    REGRAS GERAIS:
    - Boa Dica: Preço tabelado, sem exceções
    - Protoner: Desconto conforme volume e relacionamento
    - Clientes especiais: Até 10% de desconto (consultar supervisor)
    - Promoções: Seguir campanhas vigentes
    
    CRITÉRIOS PARA DESCONTO:
    - Volume mensal alto (acima de 50 unidades)
    - Cliente fidelizado (mais de 1 ano)
    - Pedidos grandes (acima de R$ 1.000)
    - Pagamento à vista (PIX)
    
    === FORMAS DE PAGAMENTO E TAXAS ===
    PIX:
    - Taxa: 0% (sem custo adicional)
    - Processamento: Instantâneo
    - Recomendação: Sempre oferecer como primeira opção
    
    CARTÃO DE CRÉDITO:
    - Taxa: 3,5% sobre o valor total
    - Parcelamento: Até 12x (consultar política)
    - Verificação: Sempre confirmar limite disponível
    
    CARTÃO DE DÉBITO:
    - Taxa: 2,5% sobre o valor total
    - Processamento: Instantâneo
    - Limite: Conforme saldo em conta
    
    BOLETO BANCÁRIO:
    - Taxa: Conforme banco
    - Prazo: 3 dias úteis para compensação
    - Vencimento: Máximo 7 dias
    
    === FORMAS DE ENVIO DETALHADAS ===
    MOTOBOY EXPRESS (LALAMOVE):
    - Região: Apenas Rio de Janeiro
    - Tempo: 1-3 horas
    - Cálculo: Direto no app Lalamove
    - Procedimento: Sempre confirmar endereço e telefone
    
    CORREIOS (PAC):
    - Prazo: 8-12 dias úteis
    - Custo: Mais econômico
    - Rastreamento: Código fornecido
    - Limite peso: 30kg por volume
    
    CORREIOS (SEDEX):
    - Prazo: 2-5 dias úteis
    - Custo: Mais caro que PAC
    - Urgência: Para pedidos prioritários
    - Seguro: Automático até R$ 100
    
    TRANSPORTADORAS:
    - Prazo: 3-7 dias úteis
    - Custo: Varia por região
    - Volume: Ideal para pedidos grandes
    - Entrega: Até o endereço (conferir acessibilidade)
    
    FRETE GRÁTIS:
    - Condição: Pedidos acima de R$ 300
    - Região: Centro do Rio de Janeiro
    - Cálculo: Frete calculado deve ser <= R$ 15
    - Automático: Sistema aplica automaticamente
    
    === GARANTIA DE TONERS - PROCEDIMENTOS COMPLETOS ===
    PRAZO E CONDIÇÕES:
    - Prazo: 90 dias corridos após recebimento
    - Comprovante: DANFE, pedido loja virtual ou balcão
    - Produto: Deve estar em condições originais
    - Uso: Conforme especificações do fabricante
    
    PROBLEMAS QUE REQUEREM VÍDEO:
    1. FAZ BARULHO:
       - Solicitar vídeo mostrando o ruído
       - Comparar com toner anterior funcionando
       - Verificar se é ruído normal ou anormal
    
    2. VAZA TONER:
       - Vídeo mostrando o vazamento
       - Verificar se é durante uso ou manuseio
       - Analisar se é defeito ou mau uso
    
    3. NÃO RECONHECE:
       - Vídeo da impressora pedindo toner
       - Mostrar que com toner anterior funciona
       - Verificar se é problema de chip
    
    TONER SEM CHIP:
    - Verificar se cliente comprou opção "sem chip"
    - Orientar sobre necessidade do chip do toner anterior
    - Explicar procedimento de transferência do chip
    
    MÁ IMPRESSÃO COLORIDA:
    - Solicitar impressão do PDF de teste colorido
    - Pedir página de status de suprimentos
    - Se impressão muito ruim, solicitar amostra física
    
    IMPRESSORAS COM TONER E FOTOCONDUTOR:
    - Solicitar fotos nítidas dos rolos de toner
    - Solicitar fotos do rolo fotocondutor
    - Analisar desgaste e compatibilidade
    
    CASOS SEM GARANTIA:
    - Produto não é nosso (verificar origem)
    - Prazo vencido (mais de 90 dias)
    - Mau uso ou danos físicos
    - Modificações no produto
    
    === USO DO SISTEMA BLING ===
    ACESSO E LOGIN:
    - Usar credenciais fornecidas pela empresa
    - Sempre fazer logout ao final do expediente
    - Não compartilhar senhas
    
    CONSULTA DE PRODUTOS:
    - Buscar por código ou descrição
    - Verificar estoque em tempo real
    - Confirmar preços atualizados
    - Checar compatibilidade
    
    CRIAÇÃO DE PEDIDOS:
    - Sempre confirmar dados do cliente
    - Verificar endereço de entrega
    - Calcular frete pelo Melhor Envios
    - Aplicar descontos conforme política
    
    MELHOR ENVIOS INTEGRADO:
    - Cálculo automático de frete
    - Múltiplas opções de transportadoras
    - Rastreamento integrado
    - Etiquetas geradas automaticamente
    
    OBSERVAÇÕES IMPORTANTES:
    - Para múltiplos volumes: especificar na observação
    - Produtos frágeis: marcar como tal
    - Endereços comerciais: confirmar horário funcionamento
    - Prazo de postagem: até 2 dias úteis
    
    === PROCEDIMENTOS DE ATENDIMENTO ===
    RECEPÇÃO DO CLIENTE:
    - Cumprimento cordial e profissional
    - Identificar necessidade (Boa Dica ou Protoner)
    - Confirmar dados de contato
    - Registrar interação no sistema
    
    IDENTIFICAÇÃO DE NECESSIDADES:
    - Modelo da impressora
    - Tipo de uso (residencial/comercial)
    - Volume de impressão mensal
    - Urgência da entrega
    
    APRESENTAÇÃO DE PRODUTOS:
    - Explicar diferenças entre linhas
    - Mostrar vantagens de cada opção
    - Confirmar compatibilidade
    - Informar sobre garantia
    
    FECHAMENTO DE VENDAS:
    - Confirmar todos os dados
    - Explicar formas de pagamento
    - Calcular frete
    - Informar prazo de entrega
    
    === FATURAMENTO E DOCUMENTAÇÃO ===
    DADOS PARA DANFE:
    - Razão social completa
    - CNPJ ou CPF
    - Endereço completo
    - Inscrição estadual (se houver)
    
    VERIFICAÇÃO ANTES DE FINALIZAR:
    - Conferir todos os dados
    - Verificar cálculo de impostos
    - Confirmar produtos e quantidades
    - Validar endereço de entrega
    
    CLASSIFICAÇÃO DE CLIENTES:
    - Pessoa física: CPF
    - Pessoa jurídica: CNPJ
    - Revendedor: Cadastro especial
    - Cliente final: Cadastro padrão
    
    === SEPARAÇÃO E EXPEDIÇÃO ===
    PROCEDIMENTOS PÓS-VENDA:
    - Pagamento identificado até 13h: postagem em até 24h úteis
    - Usar mapa de localização para cada item
    - Bipar todos os produtos antes da expedição
    - Embalar adequadamente (máximo 2 sacolas)
    
    === FIM DA BASE DE CONHECIMENTO ===
    `;
  };

  // Função principal para obter conteúdo (agora assíncrona)
  const getAppContent = async (): Promise<string> => {
    const knowledgeBase = await loadKnowledgeBase();
    return formatKnowledgeBase(knowledgeBase);
  };

  // Função síncrona para compatibilidade
  const getAppContentSync = (): string => {
    return getAppContentFallback();
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)",
      }}
    >
      {/* Header com logo */}
      <div className="bg-white/95 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <div className="container mx-auto px-4 py-3 max-w-5xl">
          <div className="flex items-center justify-between">
            {/* Menu Superior Esquerdo */}
            <div className="flex items-center gap-3">
              {/* Menu Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl px-4 py-2 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    <Menu className="w-4 h-4" />
                    Menu
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem
                    onClick={() => navigateTo("formas-envio")}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    Formas de Envio
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigateTo("faturamento")}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Receipt className="w-4 h-4" />
                    Faturamento
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigateTo("suporte-toner-garantia")}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Headphones className="w-4 h-4" />
                    Suporte a Toner - Garantia
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Logo centralizado */}
            <button
              onClick={restart}
              className="hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
              aria-label="Voltar ao início"
            >
              <ImageWithFallback
                src={protonerLogoUrl}
                alt="Logo Protoner"
                className="h-12 w-auto object-contain"
              />
            </button>

            {/* Menu Superior Direito */}
            <div className="flex items-center gap-3">
              {/* Botão Simulado */}
              <Button
                onClick={() => navigateTo("simulado")}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2 shadow-lg transition-all duration-200 hover:scale-105"
              >
                <BookOpen className="w-4 h-4" />
                Simulado
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Progress Indicator - apenas para telas do fluxo principal */}
        {!["simulado", "suporte-toner-garantia", "toner-colorido", "toner-preto"].includes(navigation.currentScreen) && (
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={
              navigation.currentScreen.startsWith("formas-envio") ? 3 :
              ["faturamento", "pedidos-sem-postagem", "pedidos-com-postagem"].includes(navigation.currentScreen) ? 2 : 5
            }
            stepLabels={
              navigation.currentScreen.startsWith("formas-envio") ? envioStepLabels :
              ["faturamento", "pedidos-sem-postagem", "pedidos-com-postagem"].includes(navigation.currentScreen) ? faturamentoStepLabels :
              stepLabels
            }
          />
        )}

        {/* Main Content */}
        <div className="animate-fade-in-up">
          {navigation.currentScreen === "home" && (
            <HomeScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "consulta" && (
            <ConsultaScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "produtos" && (
            <ProdutosScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "produtos-novo" && (
            <ProdutosNovoScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "boadica" && (
            <BoaDicaScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "protoner" && (
            <ProtonerScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen ===
            "verificar-pagamento" && (
            <VerificarPagamentoScreen
              onNavigate={navigateTo}
              selectedProductType={
                navigation.selectedProductType
              }
            />
          )}
          {navigation.currentScreen === "cadastro" && (
            <CadastroScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "simulado" && (
            <SimuladoScreen />
          )}
          {navigation.currentScreen === "formas-envio" && (
            <FormasEnvioScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "formas-envio-boadica" && (
            <FormasEnvioBoaDicaScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "formas-envio-protoner" && (
            <FormasEnvioProtonerScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "formas-envio-boadica-motoboy" && (
            <FormasEnvioBoaDicaMotoboyScreen 
              onNavigate={navigateTo} 
              freteCalculator={freteCalculator}
              setFreteCalculator={setFreteCalculator}
            />
          )}
          {navigation.currentScreen === "formas-envio-boadica-correios" && (
            <FormasEnvioBoaDicaCorreiosScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "formas-envio-protoner-motoboy" && (
            <FormasEnvioProtonerMotoboyScreen 
              onNavigate={navigateTo} 
              freteCalculator={freteCalculator} 
              setFreteCalculator={setFreteCalculator} 
            />
          )}
          {navigation.currentScreen === "formas-envio-protoner-correios" && (
            <FormasEnvioProtonerCorreiosScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "faturamento" && (
            <FaturamentoScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "pedidos-sem-postagem" && (
            <PedidosSemPostagemScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "pedidos-com-postagem" && (
            <PedidosComPostagemScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "suporte-toner-garantia" && (
            <SuporteTonerGarantiaScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "toner-colorido" && (
            <TonerColoridoScreen onNavigate={navigateTo} />
          )}
          {navigation.currentScreen === "toner-preto" && (
            <TonerPretoScreen onNavigate={navigateTo} />
          )}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          variant="outline"
          onClick={goBack}
          disabled={!canGoBack}
          className="flex items-center gap-2 bg-white/95 backdrop-blur-lg border-white/30 text-blue-600 hover:bg-white hover:scale-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg rounded-full w-12 h-12 p-0"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="outline"
          onClick={restart}
          className="flex items-center gap-2 bg-white/95 backdrop-blur-lg border-white/30 text-blue-600 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg rounded-full w-12 h-12 p-0"
          aria-label="Reiniciar"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      {/* ChatBot */}
      <ChatBot appContent={getAppContentSync()} />
   </div>
 );
};

// Tela de Seleção: Formas de Envio
const FormasEnvioScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-2xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Truck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Formas de Envio
        </h1>
      </div>
      <div className="p-10">
        <p className="text-center text-gray-600 mb-8 text-lg leading-relaxed">
          Selecione o tipo de cliente para ver as informações específicas sobre formas de envio.
        </p>

        {/* Observação sobre identificação do cliente */}
        <div className="mb-8 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-r-2xl shadow-sm">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-blue-700 leading-relaxed text-base">
              <p className="mb-2">
                <strong><Lightbulb className="w-4 h-4 inline mr-1" /> Ainda não identificou o tipo de cliente?</strong>
              </p>
              <p>
                Caso ainda não tenha identificado se o cliente é Boa Dica ou Protoner, 
                acesse a página{" "}
                <button 
                  onClick={() => onNavigate("produtos")}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors duration-200 font-semibold"
                >
                  "Identificando"
                  <ExternalLink className="w-3 h-3" />
                </button>
                {" "}para aprender como identificar corretamente o tipo de cliente.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <Button
            onClick={() => onNavigate("formas-envio-boadica", "boadica")}
            className="modern-button w-full py-6 text-lg bg-amber-500 hover:bg-amber-600 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
          >
            <Lightbulb className="w-6 h-6" />
            Boa Dica
          </Button>
          <Button
            onClick={() => onNavigate("formas-envio-protoner", "protoner")}
            className="modern-button w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
          >
            <Tag className="w-6 h-6" />
            Protoner
          </Button>
        </div>
      </div>
    </div>
  </div>
  );

// Tela: Suporte a Toner - Garantia
const SuporteTonerGarantiaScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-4xl mx-auto animate-slide-in-scale">
    {/* Indicador de Progresso */}
    <ProgressIndicator 
      currentStep={1} 
      totalSteps={2} 
      stepLabels={["Suporte a Toner", "Tipo de Toner"]} 
    />
    
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Headphones className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Suporte a Toner - Garantia
        </h1>
      </div>
      <div className="p-10">
        <div className="text-center text-gray-600 mb-12 text-lg leading-relaxed">
          <p className="font-bold">Envie "MSG PADRÃO WHATSAPP" e siga o atendimento selecionando os botões abaixo conforme o item do cliente...</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {/* Botão Toner Colorido */}
          <button 
            onClick={() => onNavigate("toner-colorido")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-8 px-12 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 text-xl w-[320px] h-[180px]"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <Palette className="h-8 w-8" />
              </div>
              <span className="text-center leading-tight">
                TONER DE IMPRESSORA<br />COLORIDA
              </span>
            </div>
          </button>

          {/* Botão Toner Preto */}
          <button 
            onClick={() => onNavigate("toner-preto")}
            className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white font-bold py-8 px-12 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 text-xl w-[320px] h-[180px]">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <Printer className="h-8 w-8" />
              </div>
              <span className="text-center leading-tight">
                PRETO<br />(IMPRESSORA MONOCROMÁTICA)
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Tela: Formas de Envio - Boa Dica (Seleção de Subcategoria)
const FormasEnvioBoaDicaScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-2xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Formas de Envio - Boa Dica
        </h1>
      </div>
      <div className="p-10">
        <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
          Selecione o tipo de envio para ver as informações detalhadas.
        </p>

        <div className="space-y-5">
          <Button
            onClick={() => onNavigate("formas-envio-boadica-motoboy")}
            className="modern-button w-full py-3 sm:py-6 text-xs sm:text-lg bg-green-500 hover:bg-green-600 text-white rounded-2xl flex items-center justify-center gap-1 sm:gap-3 shadow-lg px-2 sm:px-4 min-h-[3rem] sm:min-h-auto"
          >
            <Bike className="w-6 h-6 flex-shrink-0" />
            <span className="text-center leading-none">MOTOBOY EXPRESS - LALAMOVE</span>
          </Button>
          <Button
            onClick={() => onNavigate("formas-envio-boadica-correios")}
            className="modern-button w-full py-3 sm:py-6 text-xs sm:text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-1 sm:gap-3 shadow-lg px-2 sm:px-4 min-h-[3rem] sm:min-h-auto"
          >
            <Mail className="w-6 h-6 flex-shrink-0" />
            <span className="text-center leading-none">CORREIOS E TRANSPORTADORAS</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Tela: Formas de Envio - Protoner (Seleção de Subcategoria)
const FormasEnvioProtonerScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-2xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Tag className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Formas de Envio - Protoner
        </h1>
      </div>
      <div className="p-10">
        <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
          Selecione o tipo de envio para ver as informações detalhadas.
        </p>

        <div className="space-y-5">
          <Button
            onClick={() => onNavigate("formas-envio-protoner-motoboy")}
            className="modern-button w-full py-3 sm:py-6 text-xs sm:text-lg bg-green-500 hover:bg-green-600 text-white rounded-2xl flex items-center justify-center gap-1 sm:gap-3 shadow-lg px-2 sm:px-4 min-h-[3rem] sm:min-h-auto"
          >
            <Bike className="w-6 h-6 flex-shrink-0" />
            <span className="text-center leading-none">MOTOBOY EXPRESS - LALAMOVE</span>
          </Button>
          <Button
            onClick={() => onNavigate("formas-envio-protoner-correios")}
            className="modern-button w-full py-3 sm:py-6 text-xs sm:text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-2xl flex items-center justify-center gap-1 sm:gap-3 shadow-lg px-2 sm:px-4 min-h-[3rem] sm:min-h-auto"
          >
            <Mail className="w-6 h-6 flex-shrink-0" />
            <span className="text-center leading-none">CORREIOS E TRANSPORTADORAS</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Tela: Boa Dica - Motoboy Express
const FormasEnvioBoaDicaMotoboyScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
  freteCalculator: any;
  setFreteCalculator: any;
}> = ({ onNavigate, freteCalculator, setFreteCalculator }) => (
  <div className="w-full max-w-4xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bike className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Motoboy Express - Boa Dica
        </h1>
      </div>
      <div className="p-10">
        <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
          Informações sobre entrega via Motoboy Express - Lalamove.
        </p>

        {/* Calculadora de Frete */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-indigo-800 mb-6 text-lg flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            CALCULADORA DE FRETE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-indigo-700 font-medium mb-2">Preço do Lalamove (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={freteCalculator.precoLalamove}
                  onChange={(e) => setFreteCalculator(prev => ({ ...prev, precoLalamove: e.target.value }))}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="block text-indigo-700 font-medium mb-2">Preço do Pedido (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={freteCalculator.precoPedido}
                  onChange={(e) => setFreteCalculator(prev => ({ ...prev, precoPedido: e.target.value }))}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0,00"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="centroRio"
                  checked={freteCalculator.centroRio}
                  onChange={(e) => setFreteCalculator(prev => ({ ...prev, centroRio: e.target.checked }))}
                  className="w-4 h-4 text-indigo-600 border-indigo-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="centroRio" className="text-indigo-700 font-medium">
                  Fica no centro do Rio?
                </label>
              </div>
            </div>
            <div className="bg-white/50 p-6 rounded-lg">
              <h4 className="font-bold text-indigo-800 mb-4">Resultado do Frete:</h4>
              <div className="text-2xl font-bold text-indigo-900">
                {(() => {
                  const precoLalamove = parseFloat(freteCalculator.precoLalamove) || 0;
                  const precoPedido = parseFloat(freteCalculator.precoPedido) || 0;
                  
                  let resultado = 0;
                  
                  if (freteCalculator.centroRio) {
                    // Centro do Rio: valor mínimo R$ 15
                    resultado = Math.max(15, precoLalamove);
                  } else {
                    // Fora do centro: valor mínimo R$ 15
                    resultado = Math.max(15, precoLalamove);
                  }
                  
                  // Arredondar para cima para não ter centavos
                  resultado = Math.ceil(resultado);
                  
                  // Para pedidos acima de R$ 300, frete só é grátis se for no centro do Rio e o valor calculado for <= R$ 15
                  if (precoPedido >= 300 && freteCalculator.centroRio && resultado <= 15) {
                    return "FRETE GRÁTIS";
                  }
                  
                  return `R$ ${resultado.toFixed(2).replace('.', ',')}`;
                })()}
              </div>
              <div className="mt-2 text-sm text-indigo-600">
                {(() => {
                  const precoLalamove = parseFloat(freteCalculator.precoLalamove) || 0;
                  const precoPedido = parseFloat(freteCalculator.precoPedido) || 0;
                  
                  let resultado = 0;
                  if (freteCalculator.centroRio) {
                    // Centro do Rio: valor mínimo R$ 15
                    resultado = Math.max(15, precoLalamove);
                  } else {
                    // Fora do centro: valor mínimo R$ 15
                    resultado = Math.max(15, precoLalamove);
                  }
                  resultado = Math.ceil(resultado);
                  
                  if (precoPedido >= 300 && freteCalculator.centroRio && resultado <= 15) {
                    return "Frete grátis: R$ 300+ no centro com frete ≤ R$ 15";
                  }
                  if (freteCalculator.centroRio) {
                    if (precoLalamove > 15) {
                      return "Centro do Rio - Lalamove";
                    } else {
                      return "Centro do Rio - Valor mínimo R$ 15";
                    }
                  }
                  return precoLalamove > 15 ? "Lalamove" : "Valor mínimo R$ 15";  
                })()}
              </div>
              {/* Alerta para pedidos >= R$ 300 */}
              {(() => {
                const precoPedido = parseFloat(freteCalculator.precoPedido) || 0;
                if (precoPedido >= 300) {
                  return (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 rounded-lg">
                      <p className="text-red-700 font-medium text-sm">
                        <AlertTriangle className="w-4 h-4 inline mr-1" /> Envie print do pedido já com custo de frete calculado para aprovação
                      </p>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Motoboy Express - Lalamove */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-blue-800 mb-4 text-lg flex items-center gap-2">
              <Bike className="w-5 h-5" />
              MOTOBOY EXPRESS - LALAMOVE
            </h3>
            <div className="text-blue-700 leading-relaxed text-base space-y-3">
              <p>• Inserir dados de entrega (de forma completa) e analisar tamanho do pacote para definir moto ou carro</p>
              <p>• Não entregamos em área de risco, não entregamos em ponto de encontro...</p>
              <p>• Ofereça o cliente mandar coletar sem custos adicionais de frete ao pedido, se for área de risco ou ponto de encontro.</p>
              <p>• Site Lalamove - <a href="https://web.lalamove.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors font-semibold">clique aqui</a></p>
            </div>
          </div>

          {/* Tabela de Preços */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-green-800 mb-4 text-lg">
              <DollarSign className="w-4 h-4 inline mr-1" /> TABELA DE PREÇOS
            </h3>
            <div className="text-green-700 leading-relaxed text-base space-y-3">
              <p><strong>Compras até R$ 299,99</strong></p>
              <p>• CENTRO até 7km - R$ 15,00 (GRÁTIS PRA COMPRA À PARTIR DE R$ 300,00)</p>
              <p>• FORA DO CENTRO DO RIO - VALOR DO SISTEMA LALAMOVE</p>
              <p>• FORA MUNICÍPIO DO RIO - VALOR DO SISTEMA LALAMOVE</p>
              <p>• Calculadora Melhor Envio - <a href="https://melhorenvio.com.br/login?redirect=https://app.melhorenvio.com.br/calculadora" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors font-semibold">clique aqui</a></p>
            </div>
          </div>

          {/* Compras acima de R$ 300 */}
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-amber-800 mb-4 text-lg">
              <AlertTriangle className="w-4 h-4 inline mr-1" /> COMPRAS À PARTIR DE R$ 300,00
            </h3>
            <div className="text-amber-700 leading-relaxed text-base">
              <p><strong>*** Envie print do pedido já com custo de frete calculado para aprovação</strong></p>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
);

// Tela: Boa Dica - Correios e Transportadoras
const FormasEnvioBoaDicaCorreiosScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-4xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Correios e Transportadoras - Boa Dica
        </h1>
      </div>
      <div className="p-10">
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-yellow-800 mb-4 text-lg">
            <ClipboardList className="w-4 h-4 inline mr-1" /> OBSERVAÇÕES IMPORTANTES
          </h3>
          <div className="text-yellow-700 leading-relaxed text-base space-y-3">
            <p><strong><AlertTriangle className="w-4 h-4 inline mr-1" /> Inserir dados de entrega (de forma completa) e SIMULAR NO BLING com MELHOR ENVIOS para definir o valor escolhendo entre correios ou transportadora</strong></p>
            <p><strong>*** Envie print do pedido já com custo de frete calculado para aprovação</strong></p>
            <p>• Calculadora Melhor Envio - <a href="https://app.melhorenvio.com.br/calculadora" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800 underline font-medium">clique aqui</a></p>
            <p>• Envio Site Protoner - <a href="https://www.protoner.com.br/envio" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800 underline font-medium">clique aqui</a></p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-blue-800 mb-4 text-lg">
            <Package className="w-4 h-4 inline mr-1" /> Para realizar a cotação no Bling:
          </h3>
          <div className="text-blue-700 leading-relaxed text-base space-y-3">
            <p>• Clique sobre o pedido de venda ou da nota fiscal</p>
            <p>• Role o mouse para baixo até localizar a seção de "Transportador/Volumes", "Transporte", marque a opção "Transporte com logística cadastrada"</p>
            <p>• Em Logística marque a opção "ENVIO POR MELHOR ENVIOS"</p>
            <p>• Ao lado em "Frete por conta", marque a opção "1-Contratação do frete por conta do destinatário (FOB)"</p>
            <p>• Em "Objetos de postagem", clicar no simbolo do caminhão, e em seguinda insira o valor total de produtos em "Valor declarado (R$)", para saber quais opções de frete agora é só clicar em "OBTER COTAÇÃO"</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            <Camera className="w-4 h-4 inline mr-1" /> Exemplo Visual
          </h3>
          <div className="text-center">
            <img 
              src="https://ajuda.bling.com.br/hc/article_attachments/30823286092823" 
              alt="Exemplo de cotação no Bling" 
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-8 rounded-r-2xl shadow-sm">
          <h3 className="font-bold text-red-800 mb-4 text-lg">
            <AlertTriangle className="w-4 h-4 inline mr-1" /> ATENÇÃO
          </h3>
          <div className="text-red-700 leading-relaxed text-base space-y-3">
            <p><strong>Cotações para compras de mais de 1 volume somente será feita diretamente no painel do melhor envios, inserindo todos os dados.</strong></p>
            <p><strong>Os prazos de entrega são a contar a partir da data que for identificado o pagamento</strong></p>
            <p><strong>Após pagamento identificado até 13h, postamos em até 24h úteis, até no mesmo dia</strong></p>
            <p>Calculadora Melhor Envio - <a href="https://melhorenvio.com.br/login?redirect=https://app.melhorenvio.com.br/calculadora" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors font-semibold">clique aqui</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Tela: Protoner - Motoboy Express
const FormasEnvioProtonerMotoboyScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
  freteCalculator: any;
  setFreteCalculator: any;
}> = ({ onNavigate, freteCalculator, setFreteCalculator }) => (
  <div className="w-full max-w-4xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bike className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Motoboy Express - Protoner
        </h1>
      </div>
      <div className="p-10">
        <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
          Informações sobre entrega via Motoboy Express - Lalamove.
        </p>

        {/* Calculadora de Frete */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-indigo-800 mb-6 text-lg flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            CALCULADORA DE FRETE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-indigo-700 font-medium mb-2">Preço do Lalamove (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={freteCalculator.precoLalamove}
                  onChange={(e) => setFreteCalculator(prev => ({ ...prev, precoLalamove: e.target.value }))}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="block text-indigo-700 font-medium mb-2">Preço do Pedido (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={freteCalculator.precoPedido}
                  onChange={(e) => setFreteCalculator(prev => ({ ...prev, precoPedido: e.target.value }))}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0,00"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="centroRio"
                  checked={freteCalculator.centroRio}
                  onChange={(e) => setFreteCalculator(prev => ({ ...prev, centroRio: e.target.checked }))}
                  className="w-4 h-4 text-indigo-600 border-indigo-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="centroRio" className="text-indigo-700 font-medium">
                  Fica no centro do Rio?
                </label>
              </div>
            </div>
            <div className="bg-white/50 p-6 rounded-lg">
              <h4 className="font-bold text-indigo-800 mb-4">Resultado do Frete:</h4>
              <div className="text-2xl font-bold text-indigo-900">
                {(() => {
                  const precoLalamove = parseFloat(freteCalculator.precoLalamove) || 0;
                  const precoPedido = parseFloat(freteCalculator.precoPedido) || 0;
                  
                  let resultado = 0;
                  
                  if (freteCalculator.centroRio) {
                    // Centro do Rio: valor mínimo R$ 15
                    resultado = Math.max(15, precoLalamove);
                  } else {
                    // Fora do centro: valor mínimo R$ 15
                    resultado = Math.max(15, precoLalamove);
                  }
                  
                  // Arredondar para cima para não ter centavos
                  resultado = Math.ceil(resultado);
                  
                  // Para pedidos a partir de R$ 120, frete só é grátis se for no centro do Rio e o valor calculado for <= R$ 15
                  if (precoPedido >= 120 && freteCalculator.centroRio && resultado <= 15) {
                    return "FRETE GRÁTIS";
                  }
                  
                  return `R$ ${resultado.toFixed(2).replace('.', ',')}`;
                })()}
              </div>
              <div className="mt-2 text-sm text-indigo-600">
                {(() => {
                  const precoLalamove = parseFloat(freteCalculator.precoLalamove) || 0;
                  const precoPedido = parseFloat(freteCalculator.precoPedido) || 0;
                  
                  let resultado = 0;
                  if (freteCalculator.centroRio) {
                    // Centro do Rio: valor mínimo R$ 15
                    resultado = Math.max(15, precoLalamove);
                  } else {
                    // Fora do centro: valor mínimo R$ 15
                    resultado = Math.max(15, precoLalamove);
                  }
                  
                  resultado = Math.ceil(resultado);
                  
                  if (precoPedido >= 120 && freteCalculator.centroRio && resultado <= 15) {
                    return "Frete grátis: R$ 120+ no centro até R$ 15";
                  }
                  
                  if (freteCalculator.centroRio) {
                     if (precoLalamove > 15) {
                       return "Lalamove";
                     } else {
                       return "Valor mínimo R$ 15";
                     }
                   } else {
                     return "Lalamove";
                   }
                })()}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Motoboy Express - Lalamove */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-blue-800 mb-4 text-lg flex items-center gap-2">
              <Bike className="w-5 h-5" />
              <Bike className="w-4 h-4 inline mr-1" /> MOTOBOY EXPRESS - LALAMOVE
            </h3>
            <div className="text-blue-700 leading-relaxed text-base space-y-3">
              <p>• Inserir dados de entrega (de forma completa) e analisar tamanho do pacote para definir moto ou carro</p>
              <p>• Não entregamos em área de risco, não entregamos em ponto de encontro...</p>
              <p>• Ofereça o cliente mandar coletar sem custos adicionais de frete ao pedido, se for área de risco ou ponto de encontro.</p>
              <p>• Site Lalamove - <a href="https://web.lalamove.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors font-semibold">clique aqui</a></p>
            </div>
          </div>

          {/* Tabela de Preços */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-green-800 mb-4 text-lg">
              <DollarSign className="w-4 h-4 inline mr-1" /> TABELA DE PREÇOS
            </h3>
            <div className="text-green-700 leading-relaxed text-base space-y-4">
              <div>
                <p><strong>Compras até R$ 119,99</strong></p>
                <p>RIO E FORA DO MUNICIPIO DO RIO - VALOR DO SISTEMA LALAMOVE</p>
              </div>
              <div>
                <p><strong>Compras à partir de R$ 120,00</strong></p>
                <p>CENTRO até 7km - GRÁTIS (na rota do dia)</p>
                <p>RIO E FORA DO MUNICIPIO DO RIO - VALOR DO SISTEMA LALAMOVE.</p>
                <p>• Calculadora Melhor Envio - <a href="https://melhorenvio.com.br/login?redirect=https://app.melhorenvio.com.br/calculadora" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors font-semibold">clique aqui</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Tela: Protoner - Correios e Transportadoras
const FormasEnvioProtonerCorreiosScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-4xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Correios e Transportadoras - Protoner
        </h1>
      </div>
      <div className="p-10">
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-yellow-800 mb-4 text-lg">
            <ClipboardList className="w-4 h-4 inline mr-1" /> OBSERVAÇÕES IMPORTANTES
          </h3>
          <div className="text-yellow-700 leading-relaxed text-base space-y-3">
            <p><strong><AlertTriangle className="w-4 h-4 inline mr-1" /> Inserir dados de entrega (de forma completa) e SIMULAR NO BLING com MELHOR ENVIOS para definir o valor escolhendo entre correios ou transportadora</strong></p>
            <p><strong>*** Envie print do pedido já com custo de frete calculado para aprovação</strong></p>
            <p>• Calculadora Melhor Envio - <a href="https://app.melhorenvio.com.br/calculadora" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800 underline font-medium">clique aqui</a></p>
            <p>• Envio Site Protoner - <a href="https://www.protoner.com.br/envio" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-800 underline font-medium">clique aqui</a></p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-green-800 mb-4 text-lg">
            <DollarSign className="w-4 h-4 inline mr-1" /> VALORES DE FRETE
          </h3>
          <div className="text-green-700 leading-relaxed text-base space-y-3">
            <p><strong>Compras até R$ 119,99</strong> - o cliente paga o valor que o sistema informar</p>
            <p><strong>Compras à partir de R$ 120,00 (SUL E SUDESTE)</strong> - GRÁTIS</p>
            <p><strong>*** em ambos os casos veja senão vale a pena enviar por MOTOBOY EXPRESS - LALAMOVE</strong></p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-orange-800 mb-4 text-lg">
            <Globe className="w-4 h-4 inline mr-1" /> OUTRAS REGIÕES
          </h3>
          <div className="text-orange-700 leading-relaxed text-base space-y-3">
            <p><strong>NORTE - NORDESTE - CENTRO OESTE</strong> - o cliente paga o valor que o sistema informar</p>
            <p><a href="http://www.protoner.com.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors font-semibold">http://www.protoner.com.br</a></p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-purple-800 mb-4 text-lg">
            <Lightbulb className="w-4 h-4 inline mr-1" /> DICAS
          </h3>
          <div className="text-purple-700 leading-relaxed text-base space-y-3">
            <p>Avise ao cliente PROTONER que existe frete grátis a partir de R$ 120,00 (correios ou transportadora)</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-blue-800 mb-4 text-lg">
            <Package className="w-4 h-4 inline mr-1" /> Para realizar a cotação no Bling:
          </h3>
          <div className="text-blue-700 leading-relaxed text-base space-y-3">
            <p>• Clique sobre o pedido de venda ou da nota fiscal</p>
            <p>• Role o mouse para baixo até localizar a seção de "Transportador/Volumes", "Transporte", marque a opção "Transporte com logística cadastrada"</p>
            <p>• Em Logística marque a opção "ENVIO POR MELHOR ENVIOS"</p>
            <p>• Ao lado em "Frete por conta", marque a opção "1-Contratação do frete por conta do destinatário (FOB)"</p>
            <p>• Em "Objetos de postagem", clicar no simbolo do caminhão, e em seguinda insira o valor total de produtos em "Valor declarado (R$)", para saber quais opções de frete agora é só clicar em "OBTER COTAÇÃO"</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            <Camera className="w-4 h-4 inline mr-1" /> Exemplo Visual
          </h3>
          <div className="text-center">
            <img 
              src="https://ajuda.bling.com.br/hc/article_attachments/30823286092823" 
              alt="Exemplo de cotação no Bling" 
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-8 rounded-r-2xl shadow-sm">
          <h3 className="font-bold text-red-800 mb-4 text-lg">
            <AlertTriangle className="w-4 h-4 inline mr-1" /> ATENÇÃO
          </h3>
          <div className="text-red-700 leading-relaxed text-base space-y-3">
            <p><strong>Cotações para compras de mais de 1 volume somente será feita diretamente no painel do melhor envios, inserindo todos os dados.</strong></p>
            <p><strong>Os prazos de entrega são a contar a partir da data que for identificado o pagamento</strong></p>
            <p><strong>Após pagamento identificado até 13h, postamos em até 24h úteis, até no mesmo dia</strong></p>
            <p>Calculadora Melhor Envio - <a href="https://melhorenvio.com.br/login?redirect=https://app.melhorenvio.com.br/calculadora" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-colors font-semibold">clique aqui</a></p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Tela: Faturamento
const FaturamentoScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-4xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Receipt className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Faturamento
        </h1>
      </div>
      <div className="p-10">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-8 rounded-r-2xl shadow-sm mb-8">
          <h3 className="font-bold text-blue-800 mb-4 text-lg">
            <ClipboardList className="w-4 h-4 inline mr-1" /> INFORMAÇÕES IMPORTANTES
          </h3>
          <div className="text-blue-700 leading-relaxed text-base">
            <p>Após emissão do pedido com dados devidamente preenchidos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => onNavigate("pedidos-sem-postagem")}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center justify-center gap-3">
              <Package className="w-6 h-6" />
              <span className="text-lg">Pedidos sem postagem</span>
            </div>
          </button>

          <button 
            onClick={() => onNavigate("pedidos-com-postagem")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-6 h-6" />
              <span className="text-lg">Pedidos com postagem</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Tela: Pedidos com Postagem
const PedidosComPostagemScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-6xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Truck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Pedidos com Postagem
        </h1>
      </div>
      <div className="p-8">
        {/* Seção 1: Gerar Nota Fiscal */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">1. Gerar Nota Fiscal</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <MousePointer className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <p className="text-blue-700 font-semibold">Escolha o pedido a ser emitido, clique 3 pontinhos, clique "Gerar nota fiscal".</p>
              </div>
            </div>
            
            <div className="my-4 flex justify-center">
              <img 
                src="https://ajuda.bling.com.br/hc/article_attachments/4404110585239" 
                alt="Guia visual para gerar nota fiscal" 
                className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
              />
            </div>
            
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <p className="text-yellow-700 font-semibold">Veja senão há dados para inserir em "Informações complementares"</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <Save className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-green-700 font-semibold">Em seguida clique em "Salvar".</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 2: Cotar Frete no MELHOR ENVIOS */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">2. Cotar Frete dentro da Nota Fiscal</h2>
          </div>
          
          <div className="grid gap-4">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <p className="text-gray-700 font-semibold">Role o mouse para baixo até localizar a seção de "Transportador/Volumes", "Transporte", marque a opção "Transporte com logística cadastrada".</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <p className="text-purple-700 font-semibold">Em Logística marque a opção "ENVIO POR MELHOR ENVIOS".</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <p className="text-blue-700 font-semibold">Ao lado em "Frete por conta", marque a opção "1-Contratação do frete por conta do destinatário (FOB)".</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <div>
                  <p className="text-orange-700 font-semibold">Em "Objetos de postagem", clicar no símbolo do caminhão, e em seguida insira o valor total de produtos em "Valor declarado (R$)".</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Truck className="w-4 h-4 text-orange-600" />
                    <DollarSign className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                <div>
                  <p className="text-green-700 font-semibold">Clicar em "OBTER COTAÇÃO", escolha o frete entendendo melhor preço, menor prazo disponível e viabilidade de envio.</p>
                  <div className="mt-2 p-2 bg-yellow-100 border border-yellow-400 rounded flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-yellow-700 font-bold text-sm">OBSERVAÇÃO: O preço pode variar até 10% que não terá diferença de um para o outro.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 border-l-4 border-teal-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">6</span>
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <p className="text-teal-700 font-semibold">Para a emissão desta danfe, clique em "Enviar nota fiscal" após ter salvo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção 3: Múltiplos Volumes ou Cotação Manual */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">3. Se houver mais de 1 volume ou cotação manual no "MELHOR ENVIOS"</h2>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
              <p className="text-yellow-800 text-sm font-semibold">OBSERVAÇÃO: Etiqueta deverá ser emitida com o uso dos dados desta danfe.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <div className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p className="text-blue-700 font-semibold">Coloque o nome da transportadora de forma manual.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <div className="flex items-start gap-2">
                  <Settings className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-red-700 font-semibold">Informe sobre frete - "Transportador/Volumes" - "Transporte" - "Inserir transportadora manualmente" - colocar nome da transportadora.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-400 p-4 rounded-r-lg shadow-sm">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                  <p className="text-indigo-700 font-semibold">Frete por conta - Opção 1 - Contratação do frete por conta do destinatário (FOB).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Tela: Pedidos sem Postagem
const PedidosSemPostagemScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-4xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Pedidos sem Postagem
        </h1>
      </div>
      <div className="p-10">
        <div className="space-y-8">
          
          {/* Seção 1: Gerar Nota Fiscal */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h2 className="text-xl font-bold text-blue-800">Gerar Nota Fiscal</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <MousePointer className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-700 font-semibold">Escolha o pedido a ser emitido, clique 3 pontinhos, clique "Gerar nota fiscal".</p>
                </div>
              </div>
              
              <div className="flex justify-center my-4">
                <img 
                  src="https://ajuda.bling.com.br/hc/article_attachments/4404110585239" 
                  alt="Exemplo de como gerar nota fiscal" 
                  className="max-w-full h-auto rounded-lg shadow-md border border-gray-200"
                />
              </div>
              
              <div className="bg-white border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-700 font-semibold">Veja senão há dados para inserir em "Informações complementares"</p>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-blue-400 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <Save className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-700 font-semibold">Em seguida clique em "Salvar".</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Seção 2: Informar sobre Frete */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h2 className="text-xl font-bold text-green-800">Informar sobre Frete</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-green-400 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-700 font-semibold">"Transportador/Volumes" - "Transporte" - "Não haverá transporte".</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-green-400 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-700 font-semibold">Frete por conta - Opção 9 - Sem ocorrência de transporte.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-green-400 p-4 rounded-r-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-700 font-semibold">Para a emissão desta danfe, clique em "Enviar nota fiscal"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Observação sobre Impressão */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-yellow-800 font-semibold text-sm">OBSERVAÇÃO:</p>
                <p className="text-yellow-700 text-sm">Para impressão em 2 vias clique nos 3 pontinhos "IMPRIMIR DANFE", uma o cliente assina e a gente guarda e a outra via fica com o cliente.</p>
              </div>
            </div>
          </div>
          
        </div>


      </div>
    </div>
  </div>
);

// Componente do Simulado
const SimuladoScreen: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<
    number | null
  >(null);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const [isActive, setIsActive] = useState(false);

  // Randomizar e selecionar 10 questões
  const shuffleQuestions = () => {
    const shuffled = [...questionBank].sort(
      () => Math.random() - 0.5,
    );
    setQuestions(shuffled.slice(0, 10));
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResults(false);
    setTimeLeft(300);
    setIsActive(true);
  };

  // Inicializar questões ao carregar
  useEffect(() => {
    shuffleQuestions();
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0 && !showResults) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      handleFinish();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleFinish();
      }
    }
  };

  const handleFinish = () => {
    // Salvar a resposta atual se houver uma selecionada
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
    }

    setIsActive(false);
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index]?.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 9) return "Excelente!";
    if (score >= 7) return "Muito bom!";
    if (score >= 5) return "Bom!";
    return "Precisa estudar mais!";
  };

  if (questions.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto animate-slide-in-scale">
        <div className="modern-card p-8 text-center">
          <div className="animate-pulse">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <p>Carregando simulado...</p>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="w-full max-w-3xl mx-auto animate-slide-in-scale">
        <div className="modern-card overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-center">
            <Award className="w-16 h-16 text-white mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white">
              Resultado do Simulado
            </h1>
          </div>
          <div className="p-10">
            <div className="text-center mb-8">
              <div
                className={`text-6xl font-bold mb-4 ${getScoreColor(score)}`}
              >
                {score}/10
              </div>
              <div className="text-2xl font-semibold mb-2">
                {getScoreMessage(score)}
              </div>
              <div className="text-gray-600">
                Você acertou {score} de {questions.length}{" "}
                questões
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect =
                  userAnswer !== undefined &&
                  userAnswer === question.correctAnswer;
                const wasAnswered = userAnswer !== undefined;

                return (
                  <div
                    key={question.id}
                    className={`p-6 rounded-xl border-l-4 ${
                      isCorrect
                        ? "border-green-400 bg-green-50"
                        : "border-red-400 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      ) : (
                        <X className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">
                          {index + 1}. {question.question}
                        </h3>
                        {!isCorrect && (
                          <div className="space-y-2 text-sm">
                            <p className="text-red-700">
                              <strong>Sua resposta:</strong>{" "}
                              {wasAnswered
                                ? question.options[userAnswer]
                                : "Não respondida"}
                            </p>
                            <p className="text-green-700">
                              <strong>Resposta correta:</strong>{" "}
                              {
                                question.options[
                                  question.correctAnswer
                                ]
                              }
                            </p>
                            <p className="text-gray-700">
                              <strong>Explicação:</strong>{" "}
                              {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={shuffleQuestions}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Novo Simulado
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-in-scale">
      <div className="modern-card overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">
                  Simulado de Treinamento
                </h1>
                <p className="text-green-100">
                  Questão {currentQuestion + 1} de{" "}
                  {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl">
              <Clock className="w-5 h-5" />
              <span className="font-mono font-bold">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-10">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progresso</span>
              <span>
                {Math.round(
                  (currentQuestion / questions.length) * 100,
                )}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(currentQuestion / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswer === index
                      ? "border-green-500 bg-green-50 text-green-800"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedAnswer === index && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="font-medium text-sm mr-2">
                      {String.fromCharCode(65 + index)})
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {answers.filter((a) => a !== undefined).length} de{" "}
              {questions.length} respondidas
            </div>

            <div className="flex gap-3">
              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleFinish}
                  disabled={selectedAnswer === null}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl disabled:opacity-50"
                >
                  Conferir Resultado
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl disabled:opacity-50"
                >
                  Próxima
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente wrapper para usar ZoomableImage com ImageWithFallback
const ZoomableImageWithFallback: React.FC<{
  src: string;
  alt: string;
  className?: string;
  zoomLevel?: number;
  lensSize?: number;
}> = ({
  src,
  alt,
  className,
  zoomLevel = 2.5,
  lensSize = 120,
}) => {
  const [isZooming, setIsZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageRect, setImageRect] = useState<DOMRect | null>(
    null,
  );
  const imageRef = React.useRef<HTMLImageElement>(null);

  const handleMouseEnter = React.useCallback(() => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setImageRect(rect);
      setIsZooming(true);
    }
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setIsZooming(false);
  }, []);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!imageRect || !imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });
    },
    [imageRect],
  );

  const getLensStyle = () => {
    if (!imageRect) return {};

    const lensX = mousePos.x - lensSize / 2;
    const lensY = mousePos.y - lensSize / 2;

    const maxX = imageRect.width - lensSize;
    const maxY = imageRect.height - lensSize;
    const clampedX = Math.max(0, Math.min(maxX, lensX));
    const clampedY = Math.max(0, Math.min(maxY, lensY));

    return {
      left: `${clampedX}px`,
      top: `${clampedY}px`,
      width: `${lensSize}px`,
      height: `${lensSize}px`,
    };
  };

  const getZoomStyle = () => {
    if (!imageRect) return {};

    const backgroundX = -(
      mousePos.x * zoomLevel -
      lensSize / 2
    );
    const backgroundY = -(
      mousePos.y * zoomLevel -
      lensSize / 2
    );

    return {
      backgroundImage: `url(${src})`,
      backgroundSize: `${imageRect.width * zoomLevel}px ${imageRect.height * zoomLevel}px`,
      backgroundPosition: `${backgroundX}px ${backgroundY}px`,
      backgroundRepeat: "no-repeat",
    };
  };

  return (
    <div className="relative inline-block">
      <ImageWithFallback
        ref={imageRef}
        src={src}
        alt={alt}
        className={`${className} cursor-crosshair`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        draggable={false}
      />

      {/* Lens overlay */}
      {isZooming && imageRect && (
        <>
          {/* Lens circle */}
          <div
            className="absolute pointer-events-none border-2 border-blue-400 rounded-full shadow-lg opacity-80 transition-opacity duration-200"
            style={getLensStyle()}
          />

          {/* Zoomed content */}
          <div
            className="absolute pointer-events-none border-2 border-blue-400 rounded-full shadow-2xl z-10 transition-opacity duration-200"
            style={{
              ...getLensStyle(),
              ...getZoomStyle(),
            }}
          />

          {/* Lens effect overlay */}
          <div
            className="absolute pointer-events-none rounded-full shadow-inner transition-opacity duration-200"
            style={{
              ...getLensStyle(),
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(0.5px)",
              border: "3px solid rgba(59, 130, 246, 0.6)",
              boxShadow:
                "0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)",
            }}
          />
        </>
      )}

      {/* Instruction hint */}
      {!isZooming && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
            <Search className="w-4 h-4 inline mr-1" /> Passe o mouse para ampliar
          </div>
        </div>
      )}
    </div>
  );
};

// Tela 1: Página Inicial
const HomeScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-2xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      {/* Header com ícone */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent"></div>
        <div className="relative">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Headphones className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            ATENDIMENTO - Balcão e WhatsApp
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-10">
        <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
          Veja se tem cadastro consultando o nome, ou número de
          telefone fixo ou móvel.
        </p>
        <div className="space-y-5">
          <Button
            onClick={() => onNavigate("consulta")}
            className="modern-button w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
          >
            <CheckCircle className="w-6 h-6" />
            Possui Cadastro
          </Button>
          <Button
            onClick={() => onNavigate("cadastro")}
            className="modern-button w-full py-6 text-lg bg-gray-500 hover:bg-gray-600 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
          >
            <Plus className="w-6 h-6" />
            Não Possui Cadastro
          </Button>
        </div>

        {/* Exemplo de como pesquisar no Bling */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h3 className="text-center text-gray-700 mb-6 font-semibold">
            <Lightbulb className="w-4 h-4 inline mr-1" /> Exemplo: Como pesquisar cadastro pelo número de
            telefone no Bling
          </h3>
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-blue-700 text-sm leading-relaxed">
                  <strong>1.</strong> Acesse Pedidos de Venda no
                  Bling
                </p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-amber-700 text-sm leading-relaxed">
                  <strong>2.</strong> Clique em "Adicionar
                  Filtros" em busca customizada e escolha a
                  opção "Telefone/Celular"
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <p className="text-green-700 text-sm leading-relaxed">
                  <strong>3.</strong> Digite o número do celular
                  para buscar o cliente
                </p>
              </div>
            </div>
            <div className="mt-6">
              <ZoomableImageWithFallback
                src={historyExampleImageUrl}
                alt="Tela do Bling mostrando como adicionar filtros para pesquisar por celular"
                className="w-full h-auto rounded-lg shadow-md border border-gray-200"
                zoomLevel={2.5}
                lensSize={120}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Tela 2: Consulte o Cadastro
const ConsultaScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-2xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <History className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Consulte o Cadastro
        </h1>
      </div>
      <div className="p-10">
        <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
          Consulte os dados do cliente no sistema para verificar
          as informações de cadastro e histórico.
        </p>
        <Button
          onClick={() => onNavigate("produtos")}
          className="modern-button w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
        >
          <FileText className="w-6 h-6" />
          Identificando o Cliente
        </Button>

        {/* Exemplo de como visualizar histórico */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h3 className="text-center text-gray-700 mb-6 font-semibold">
            <ClipboardList className="w-4 h-4 inline mr-1" /> Exemplo: Como visualizar histórico de compras do
            cliente
          </h3>
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-blue-700 text-sm leading-relaxed">
                  <strong>1.</strong> Clique no pedido do
                  cliente na lista
                </p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-amber-700 text-sm leading-relaxed">
                  <strong>2.</strong> Clique no ícone (i) para
                  visualizar informações detalhadas dos preços
                  de pedidos anteriores
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <p className="text-green-700 text-sm leading-relaxed">
                  <strong>3.</strong> Analise o histórico de
                  compras e valores anteriores
                </p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                <p className="text-purple-700 text-sm leading-relaxed">
                  <strong>4.</strong> Use essas informações para
                  manter consistência nos preços
                </p>
              </div>
            </div>
            <div className="mt-6">
              <ZoomableImageWithFallback
                src={historyViewImageUrl}
                alt="Tela do Bling mostrando como visualizar histórico clicando no ícone (i) do pedido"
                className="w-full h-auto rounded-lg shadow-md border border-gray-200"
                zoomLevel={2.5}
                lensSize={120}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Tela 3: Inserir Produtos (para clientes com cadastro)
const ProdutosScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-2xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-center">
        <h1 className="text-2xl font-bold text-white">
          Identificando
        </h1>
      </div>
      <div className="p-10">
        <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
          Identifique se o cliente é protoner ou boa dica pra
          poder passar os preços corretos.
        </p>
        <div className="space-y-5">
          <Button
            onClick={() => onNavigate("boadica", "boadica")}
            className="modern-button w-full py-6 text-lg bg-amber-500 hover:bg-amber-600 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
          >
            <Lightbulb className="w-6 h-6" />
            Boa Dica
          </Button>
          <Button
            onClick={() => onNavigate("protoner", "protoner")}
            className="modern-button w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
          >
            <Tag className="w-6 h-6" />
            Protoner
          </Button>
        </div>

        {/* Exemplo de como identificar o tipo de cliente */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h3 className="text-center text-gray-700 mb-6 font-semibold">
            <Search className="w-4 h-4 inline mr-1" /> Exemplo: Como identificar se o cliente é Protoner
            ou Boa Dica
          </h3>
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <p className="text-blue-700 text-sm leading-relaxed">
                  <strong>1.</strong> Consulte o histórico de
                  compras do cliente conforme mostrado
                  anteriormente
                </p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-amber-700 text-sm leading-relaxed">
                  <strong>2.</strong> Verifique a opção
                  "Vendedor" no pedido para identificar o tipo
                  de cliente
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <p className="text-green-700 text-sm leading-relaxed">
                  <strong>3.</strong> Se aparecer "Protoner" no
                  campo vendedor = cliente Protoner
                </p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                <p className="text-purple-700 text-sm leading-relaxed">
                  <strong>4.</strong> Se aparecer "Boa Dica" no
                  campo vendedor = cliente Boa Dica
                </p>
              </div>
            </div>
            <div className="mt-6">
              <ZoomableImageWithFallback
                src={vendedorExampleImageUrl}
                alt="Tela do Bling mostrando como verificar o campo vendedor para identificar se é cliente Protoner ou Boa Dica"
                className="w-full h-auto rounded-lg shadow-md border border-gray-200"
                zoomLevel={2.5}
                lensSize={120}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Tela 3b: Inserir Produtos (para clientes novos/sem cadastro)
const ProdutosNovoScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-2xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-center">
        <h1 className="text-2xl font-bold text-white">
          Inserir Produtos - Novo Cliente
        </h1>
      </div>
      <div className="p-10">
        <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
          Inserir produtos e passar os preços conforme a
          classificação do cliente, escolha a classificação para
          mais detalhes.
        </p>
        <div className="space-y-5">
          <Button
            onClick={() => onNavigate("boadica", "boadica")}
            className="modern-button w-full py-6 text-lg bg-amber-500 hover:bg-amber-600 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
          >
            <Lightbulb className="w-6 h-6" />
            Boa Dica
          </Button>
          <Button
            onClick={() => onNavigate("protoner", "protoner")}
            className="modern-button w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
          >
            <Tag className="w-6 h-6" />
            Protoner
          </Button>
        </div>

        {/* Exemplo completo de cadastro no Bling */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h3 className="text-center text-gray-700 mb-6 font-semibold">
            <FileText className="w-4 h-4 inline mr-1" /> Exemplo: Como cadastrar cliente e criar pedido no
            Bling direto do "FRENTE DE CAIXA"
          </h3>
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                <div className="text-blue-700 text-sm leading-relaxed space-y-3">
                  <p>
                    <strong>1. ABA CLIENTE:</strong> Cadastre
                    apenas NOME e TELEFONE, para Orçamento
                    simples.
                  </p>
                  <p>
                    Para DANFE, adicione CPF/CNPJ e demais dados
                    de forma completa e verificada no{" "}
                    <a
                      href="http://www.sintegra.gov.br/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors duration-200"
                    >
                      SINTEGRA
                      <ExternalLink className="w-3 h-3" />
                    </a>{" "}
                    ou{" "}
                    <a
                      href="https://www.sefaz.rs.gov.br/dfe/Consultas/Ccc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors duration-200"
                    >
                      SEFAZ
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                <p className="text-purple-700 text-sm leading-relaxed">
                  <strong>2. ABA PRODUTO:</strong> Use sempre
                  "Pesquisa Avançada" para localizar produtos.
                  Após selecionar não esqueça de definir o PREÇO
                  e clicar em "INSERIR".
                </p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-amber-700 text-sm leading-relaxed">
                  <strong>3. MÚLTIPLOS PRODUTOS:</strong> Após
                  inserir um produto, aparecerá uma pergunta.
                  Clique "NÃO" para adicionar mais produtos ou
                  "SIM" para finalizar e ser direcionado para
                  aba "pagamento".
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                <p className="text-green-700 text-sm leading-relaxed">
                  <strong>4. ABA PAGAMENTO:</strong> Selecione a
                  forma de pagamento e o TIPO DE VENDEDOR
                  (Protoner ou BD centro). Depois clique em
                  "Finalizar Venda".
                </p>
              </div>
            </div>
            <div className="mt-6">
              <ZoomableImageWithFallback
                src={cadastroExampleImageUrl}
                alt="Tela do Bling mostrando o processo completo de cadastro de cliente e criação de pedido"
                className="w-full h-auto rounded-lg shadow-md border border-gray-200"
                zoomLevel={2.5}
                lensSize={120}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Tela 4: Detalhe Boa Dica (agora sem botão concluir)
const BoaDicaScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-in-scale">
      <div className="modern-card overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Boa Dica — Procedimento de Valor e Marca
          </h1>
        </div>
        <div className="p-10">
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-400 p-8 rounded-r-2xl shadow-sm">
              <h3 className="font-bold text-amber-800 mb-4 text-lg">
                <DollarSign className="w-4 h-4 inline mr-1" /> VALOR
              </h3>
              <p className="text-amber-700 leading-relaxed text-base">
                Veja histórico e mantenha igual ou maior do que
                o anunciado.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-8 rounded-r-2xl shadow-sm">
              <h3 className="font-bold text-blue-800 mb-4 text-lg">
                <Info className="w-4 h-4 inline mr-1" /> OBSERVAÇÃO
              </h3>
              <p className="text-blue-700 leading-relaxed text-base">
                Se o cliente informar o valor do BoaDica e
                tivermos a marca, pode fazer sem problemas,
                seguindo os critérios do preço conforme entrega
                e pagamento como mencionado nos passos
                anteriores.
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-8 rounded-r-2xl shadow-sm">
              <h3 className="font-bold text-green-800 mb-4 text-lg">
                <Tag className="w-4 h-4 inline mr-1" /> MARCA
              </h3>
              <div className="text-green-700 leading-relaxed text-base space-y-3">
                <p>
                  Não tendo a marca, ofereça o valor da marca
                  disponível em estoque, e só faça desconto se
                  necessário:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>
                    • Somos obrigados a vender pelo menos uma
                    unidade com o valor igual ao anunciado mesmo
                    entregando a marca mais cara, só que isso na
                    condição de retirada no balcão, com
                    pagamento em espécie;
                  </li>
                  <li>
                    • Desconto para mais de uma peça não pode
                    ultrapassar o próprio limite de sistema e
                    precisa de autorização.
                  </li>
                </ul>
              </div>
            </div>

            {/* Nova seção Dicas de Venda */}
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 border-l-4 border-cyan-400 p-8 rounded-r-2xl shadow-sm">
              <h3 className="font-bold text-cyan-800 mb-4 text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <Lightbulb className="w-4 h-4 inline mr-1" /> DICAS DE VENDA
              </h3>
              <div className="text-cyan-700 leading-relaxed text-base space-y-2">
                <p>
                  • Se o toner usa drum, pergunte sobre levar o
                  drum.
                </p>
                <p>
                  • Se o drum usa toner, pergunte sobre levar o
                  toner.
                </p>
                <p>
                  • Sempre pergunte se o cliente quer algo a
                  mais antes de fechar a conta.
                </p>
              </div>
            </div>

            {/* Botão Continuar */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={() =>
                  onNavigate("verificar-pagamento")
                }
                className="modern-button py-4 px-8 text-lg bg-amber-600 hover:bg-amber-700 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
              >
                <ArrowRight className="w-6 h-6" />
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tela 5: Detalhe Protoner (agora sem botão concluir)
const ProtonerScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-in-scale">
      <div className="modern-card overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Protoner — Procedimento de Valor e Marca
          </h1>
        </div>
        <div className="p-10">
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-8 rounded-r-2xl shadow-sm">
              <h3 className="font-bold text-blue-800 mb-4 text-lg">
                <DollarSign className="w-4 h-4 inline mr-1" /> VALOR
              </h3>
              <p className="text-blue-700 leading-relaxed text-base">
                <a
                  href="https://www.protoner.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 hover:decoration-blue-800 transition-colors duration-200"
                >
                  Consulte no site
                  <ExternalLink className="w-4 h-4" />
                </a>
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-8 rounded-r-2xl shadow-sm">
              <h3 className="font-bold text-green-800 mb-4 text-lg">
                <RefreshCw className="w-4 h-4 inline mr-1" /> ATUALIZAÇÃO
              </h3>
              <p className="text-green-700 leading-relaxed text-base">
                Use o valor do site atualizado.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-400 p-8 rounded-r-2xl shadow-sm">
              <h3 className="font-bold text-purple-800 mb-4 text-lg">
                <Tag className="w-4 h-4 inline mr-1" /> MARCA
              </h3>
              <p className="text-purple-700 leading-relaxed text-base">
                Use a marca mais barata ou a solicitada.
              </p>
            </div>

            {/* Nova seção Dicas de Venda */}
            <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 border-l-4 border-cyan-400 p-8 rounded-r-2xl shadow-sm">
              <h3 className="font-bold text-cyan-800 mb-4 text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <Lightbulb className="w-4 h-4 inline mr-1" /> DICAS DE VENDA
              </h3>
              <div className="text-cyan-700 leading-relaxed text-base space-y-2">
                <p>
                  • Se o toner usa drum, pergunte sobre levar o
                  drum.
                </p>
                <p>
                  • Se o drum usa toner, pergunte sobre levar o
                  toner.
                </p>
                <p>
                  • Sempre pergunte se o cliente quer algo a
                  mais antes de fechar a conta.
                </p>
              </div>
            </div>

            {/* Botão Continuar */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={() =>
                  onNavigate("verificar-pagamento")
                }
                className="modern-button py-4 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
              >
                <ArrowRight className="w-6 h-6" />
                Continuar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tela 6: Verificar Forma de Pagamento (agora com botão concluir e popup)
const VerificarPagamentoScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
  selectedProductType: ProductType;
}> = ({ onNavigate, selectedProductType }) => {
  const [valor, setValor] = useState<string>("");
  const [formaPagamento, setFormaPagamento] =
    useState<string>("");
  const [showAttentionPopup, setShowAttentionPopup] =
    useState(false);

  // Configuração das taxas de cada forma de pagamento
  const taxasPagamento: Record<string, number> = {
    dinheiro: 0,
    pix: 5,
    debito: 5,
    credito: 10,
    boleto: 0,
    entrega: 30,
  };

  // Calcular valor final
  const calcularValorFinal = (): number => {
    if (!valor || !formaPagamento) return 0;

    const valorNumerico = parseFloat(valor.replace(",", "."));
    if (isNaN(valorNumerico)) return 0;

    const taxa = taxasPagamento[formaPagamento] || 0;
    return valorNumerico * (1 + taxa / 100);
  };

  const valorFinal = calcularValorFinal();

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-in-scale">
      <div className="modern-card overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Verificar Forma de Pagamento
          </h1>
        </div>
        <div className="p-10">
          <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
            Verifique qual é a forma de pagamento preferida do
            cliente para definir o valor de cada item.
          </p>

          {/* Indicador da escolha anterior */}
          {selectedProductType && (
            <div className="mb-8 p-6 bg-gray-50 rounded-2xl border-l-4 border-blue-400">
              <div className="flex items-center gap-3 mb-6">
                {selectedProductType === "boadica" ? (
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                ) : (
                  <Tag className="w-6 h-6 text-blue-500" />
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    Tipo selecionado:{" "}
                    {selectedProductType === "boadica"
                      ? "Boa Dica"
                      : "Protoner"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedProductType === "boadica"
                      ? "Preencha o valor e selecione a forma de pagamento para calcular o valor final."
                      : "Siga as instruções específicas do Protoner para definir preços e condições."}
                  </p>
                </div>
              </div>

              {/* Formulário de valor - apenas para Boa Dica */}
              {selectedProductType === "boadica" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4 inline mr-1" /> Valor do produto (R$)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={valor}
                        onChange={(e) =>
                          setValor(e.target.value)
                        }
                        placeholder="0,00"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Opções de pagamento */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      <CreditCard className="w-4 h-4 inline mr-1" /> Forma de pagamento
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          key: "dinheiro",
                          label: "Dinheiro",
                          icon: Banknote,
                          taxa: "0%",
                        },
                        {
                          key: "pix",
                          label: "PIX",
                          icon: Smartphone,
                          taxa: "+5%",
                        },
                        {
                          key: "debito",
                          label: "Débito",
                          icon: CreditCard,
                          taxa: "+5%",
                        },
                        {
                          key: "credito",
                          label: "Crédito",
                          icon: CreditCard,
                          taxa: "+10%",
                        },
                        {
                          key: "boleto",
                          label: "Boleto",
                          icon: FileText,
                          taxa: "0%",
                        },
                        {
                          key: "entrega",
                          label: "Entrega",
                          icon: Truck,
                          taxa:
                            selectedProductType === "boadica"
                              ? "30%"
                              : "+30%",
                        },
                      ].map(
                        ({ key, label, icon: Icon, taxa }) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() =>
                              setFormaPagamento(key)
                            }
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              formaPagamento === key
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <Icon className="w-6 h-6" />
                              <span className="text-sm font-medium">
                                {label}
                              </span>
                              <span className="text-xs opacity-70 text-center">
                                {taxa}
                                {key === "entrega" &&
                                  selectedProductType ===
                                    "boadica" && (
                                    <div className="mt-1 font-medium text-red-600">
                                      Ao final do pedido some o
                                      valor do frete
                                    </div>
                                  )}
                              </span>
                            </div>
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Resultado calculado */}
                  {valor && formaPagamento && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                      <p className="text-sm font-medium text-green-700 mb-2">
                        Valor final:
                      </p>
                      <p className="text-3xl font-bold text-green-800">
                        R${" "}
                        {valorFinal.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      {taxasPagamento[formaPagamento] > 0 && (
                        <p className="text-xs text-green-600 mt-1">
                          Inclui{" "}
                          {taxasPagamento[formaPagamento]}% de
                          acréscimo
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                <ClipboardList className="w-4 h-4 inline mr-1" /> Perguntas importantes:
              </h3>
              <ul className="text-blue-700 text-sm space-y-2">
                <li>• Qual será a forma de pagamento?</li>
                <li>• À vista ou parcelado?</li>
                <li>• Cartão, PIX, dinheiro ou boleto?</li>
                <li>
                  • Para pedido a partir de clonagem, veja se
                  não tem desconto do pedido anterior definido,
                  para não repetir desconto sem motivo.
                </li>
              </ul>
            </div>

            <Button
              onClick={() => setShowAttentionPopup(true)}
              className="modern-button w-full py-6 text-lg bg-green-600 hover:bg-green-700 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg"
            >
              <CheckCircle className="w-6 h-6" />
              Concluir
            </Button>
          </div>
        </div>
      </div>

      {/* Popup de Atenção */}
      <AlertDialog
        open={showAttentionPopup}
        onOpenChange={setShowAttentionPopup}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">⚠️ Atenção Importante</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Instruções importantes para finalizar o atendimento corretamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-6 rounded-r-2xl shadow-sm">
            <div className="text-yellow-700 leading-relaxed text-base space-y-3">
              <p className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">📦</span>
                <span>Separe o pedido após o pagamento</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">🗺️</span>
                <span>Use o mapa para cada item</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">📱</span>
                <span>Bipar o pedido após todo o material estar separado</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">🛍️</span>
                <span>Use no máximo 2 sacolas. Ofereça uma caixa se for mais que isso</span>
              </p>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowAttentionPopup(false)}
            >
              ✅ Entendi, Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Tela 7: Cadastrar Novo Cliente
const CadastroScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => (
  <div className="w-full max-w-2xl mx-auto animate-slide-in-scale">
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Cadastrar Novo Cliente
        </h1>
      </div>
      <div className="p-10">
        <p className="text-center text-gray-600 mb-10 text-lg leading-relaxed">
          Pergunte se viu o preço em algum lugar ou como
          encontrou a nossa loja.
        </p>

        {/* Observação importante sobre classificação de clientes */}
        <div className="mb-10 p-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-2xl shadow-sm">
          <h3 className="font-bold text-amber-800 mb-3 text-lg">
            <AlertTriangle className="w-4 h-4 inline mr-1" /> IMPORTANTE - Classificação do Cliente
          </h3>
          <div className="space-y-3">
            <div className="bg-amber-100 border border-amber-200 p-4 rounded-xl">
              <p className="text-amber-800 text-sm leading-relaxed">
                <strong>🟡 Cliente Boa Dica:</strong> APENAS se
                o cliente disser que veio do "Boa Dica" ou
                mencionar especificamente essa marca.
              </p>
            </div>
            <div className="bg-blue-100 border border-blue-200 p-4 rounded-xl">
              <p className="text-blue-800 text-sm leading-relaxed">
                <strong>🔵 Cliente Protoner:</strong> QUALQUER
                outra resposta (Google, indicação, redes
                sociais, etc.) que NÃO mencione o "Boa Dica".
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => onNavigate("produtos-novo")}
          className="modern-button w-full py-6 text-lg bg-green-600 hover:bg-green-700 text-white rounded-2xl flex items-center justify-center gap-3 shadow-lg mb-10"
        >
          <FileText className="w-6 h-6" />
          Inserir no Pedido
        </Button>
      </div>
    </div>
  </div>
);

// Tela: Toner de Impressora Colorida
const TonerColoridoScreen: React.FC<{
  onNavigate: (
    screen: Screen,
    productType?: ProductType,
  ) => void;
}> = ({ onNavigate }) => {
  const scrollToStatusSection = () => {
    const statusSection = document.getElementById('status-suprimentos-section');
    if (statusSection) {
      statusSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
  <div className="w-full max-w-4xl mx-auto animate-slide-in-scale">
    {/* Indicador de Progresso */}
    <ProgressIndicator 
      currentStep={2} 
      totalSteps={2} 
      stepLabels={["Suporte a Toner", "Tipo de Toner"]} 
    />
    
    <div className="modern-card overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">
          Toner de Impressora Colorida
        </h1>
      </div>
      <div className="p-10">
        <div className="space-y-8">
          {/* Comprovante de Compra */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-blue-800 mb-6 text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              COMPROVANTE DE COMPRA
            </h3>
            <div className="space-y-4 text-blue-700">
              <div className="bg-blue-100 border border-blue-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Solicitar número do comprovante:</p>
                <ul className="text-sm space-y-1">
                  <li>• Danfe (Nota Fiscal Eletrônica)</li>
                  <li>• Pedido de loja virtual</li>
                  <li>• Pedido balcão</li>
                </ul>
                <p className="text-sm mt-3 font-semibold text-blue-800">Garantia: 90 dias após recebimento do produto</p>
              </div>
              <div className="bg-red-100 border border-red-200 p-4 rounded-xl mt-4">
                <h4 className="font-semibold mb-2 text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Atenção
                </h4>
                <p className="text-red-700 text-sm">
                  Peça foto do produto e dos códigos das etiquetas que estão no produto, veja se confere com o comprovante de compra, e se for nosso prossiga o atendimento, senão for, me informe antes de prosseguir.
                </p>
              </div>
            </div>
          </div>

          {/* Observação sobre tipos de defeito */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-yellow-800 mb-6 text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              OBSERVAÇÃO IMPORTANTE
            </h3>
            <div className="bg-yellow-100 border border-yellow-200 p-4 rounded-xl">
              <p className="text-yellow-700 font-semibold">
                Cada tipo de relato de defeito gera um tipo de teste a ser solicitado. Atenção aos problemas descritos abaixo.
              </p>
            </div>
          </div>

          {/* Problemas que requerem vídeo */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-red-800 mb-6 text-lg flex items-center gap-2">
              <Video className="w-5 h-5" />
              PROBLEMAS QUE REQUEREM VÍDEO
            </h3>
            <div className="space-y-4 text-red-700">
              <div className="bg-red-100 border border-red-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Solicitar pequeno vídeo para:</p>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Faz barulho</strong></li>
                  <li>• <strong>Vaza toner</strong></li>
                  <li>• <strong>Não reconhece</strong></li>
                </ul>
                <p className="text-sm mt-3">Peça vídeo mostrando como ocorre com o defeituoso e como funciona com o anterior.</p>
              </div>
              <div className="bg-red-100 border border-red-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Não reconhecer - Detalhes:</p>
                <ul className="text-sm space-y-1">
                  <li>• Quando pede para por toner</li>
                  <li>• Fica com a luz piscando</li>
                  <li>• Mas quando coloca o anterior funciona normalmente</li>
                </ul>
              </div>
              <div className="bg-red-100 border border-red-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Atenção - Toner SEM CHIP:</p>
                <p className="text-sm">
                  Se o toner foi comprado na opção <strong>SEM CHIP</strong>, pergunte se ele colocou o chip, 
                  pois comprou sem chip e tem que por o chip do anterior para funcionar.
                </p>
              </div>
            </div>
          </div>

          {/* Má impressão colorida */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-purple-800 mb-6 text-lg flex items-center gap-2">
              <Printer className="w-5 h-5" />
              MÁ IMPRESSÃO COLORIDA
            </h3>
            <div className="space-y-4 text-purple-700">
              <div className="bg-purple-100 border border-purple-200 p-4 rounded-xl">
                <p className="font-semibold mb-4">Solicitar testes em PDF:</p>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto text-xs sm:text-base min-h-[2.5rem] sm:min-h-auto"
                      onClick={() => {
                        window.open('/TESTE_COLORIDO.pdf', '_blank');
                      }}
                    >
                      <Download className="w-4 h-4 flex-shrink-0" />
                      <span className="text-center leading-none text-xs sm:text-base">Teste Colorido</span>
                    </Button>
                    <Button 
                      onClick={scrollToStatusSection}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-1 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto text-xs sm:text-base min-h-[2.5rem] sm:min-h-auto"
                    >
                      <Download className="w-4 h-4 flex-shrink-0" />
                       <span className="text-center leading-none text-[10px] sm:text-base break-words">Página de Status de Suprimentos</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-red-100 border border-red-200 p-4 rounded-xl">
                <p className="font-semibold mb-2 text-red-800">ALERTA:</p>
                <p className="text-red-700 text-sm">
                  Se a impressão estiver muito ruim, não vai dar para pedir as impressões acima, 
                  pois não vai estar nítido. Então peça para enviar a impressão que tem para analisar.
                </p>
              </div>
            </div>
          </div>

          {/* Página de status de suprimentos */}
          <div id="status-suprimentos-section" className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-green-800 mb-6 text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              PÁGINA DE STATUS DE SUPRIMENTOS
            </h3>
            <div className="space-y-4 text-green-700">
              <div className="bg-green-100 border border-green-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Se o cliente não souber fazer:</p>
                <ul className="text-sm space-y-1">
                  <li>• Peça o modelo da impressora</li>
                  <li>• Enviaremos vídeo de como fazer</li>
                </ul>
              </div>
              <div className="bg-green-100 border border-green-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Como encontrar vídeo:</p>
                <p className="text-sm mb-2">Procure no Google digitando:</p>
                <p className="text-sm font-mono bg-gray-200 p-2 rounded">
                  [modelo da impressora] + [marca] + "Página de status de suprimentos"
                </p>
                <div className="text-sm mt-2 space-y-1">
                  <p><strong>Exemplos:</strong></p>
                  <p>• "Brother HL1602 status de suprimentos"</p>
                  <p>• "HP P2035 status de suprimentos"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Impressoras com toner e fotocondutor */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-orange-800 mb-6 text-lg flex items-center gap-2">
              <Camera className="w-5 h-5" />
              IMPRESSORAS COM TONER E FOTOCONDUTOR
            </h3>
            <div className="bg-orange-100 border border-orange-200 p-4 rounded-xl">
              <p className="font-semibold mb-2 text-orange-800">Solicitar fotos nítidas:</p>
              <ul className="text-sm space-y-1 text-orange-700">
                <li>• Rolos de toner</li>
                <li>• Rolo de fotocondutor</li>
              </ul>
              <p className="text-sm mt-3 text-orange-700 italic">Para análise detalhada</p>
            </div>
          </div>

          {/* Atenção Importante */}
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-yellow-800 mb-6 text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              ATENÇÃO IMPORTANTE
            </h3>
            <div className="bg-yellow-100 border border-yellow-200 p-4 rounded-xl space-y-3">
              <p className="font-medium text-yellow-800 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Impressora passou por manutenção recentemente?
              </p>
              <p className="text-sm text-yellow-700">
                Me avise, pois isso pode estar prejudicando a impressão.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-blue-800 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Se o problema já existia com o toner anterior:
                </p>
                <p className="text-sm text-blue-700">
                  Recomende procurar um técnico especializado.
                </p>
              </div>
            </div>
          </div>

          {/* Casos sem garantia */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-400 p-8 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 text-lg flex items-center gap-2">
              <X className="w-5 h-5" />
              NÃO TEM GARANTIA
            </h3>
            <div className="space-y-4 text-gray-700">
              <div className="bg-gray-100 border border-gray-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Produto não é nosso:</p>
                <p className="text-sm">
                  Informe que não foi comprado conosco e o produto não bate com o que enviamos. 
                  Explique como identificamos isso.
                </p>
              </div>
              <div className="bg-gray-100 border border-gray-200 p-4 rounded-xl">
                <p className="font-semibold mb-2">Prazo vencido:</p>
                <p className="text-sm">
                  Se passou de 90 dias, nem tenta que não tem garantia. 
                  Apenas informe que o prazo de garantia acabou.
                </p>
              </div>
            </div>
          </div>

          {/* Botão Finalizar */}
          <div className="text-center pt-6">
            <Button
              onClick={() => onNavigate("suporte-toner-garantia")}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 text-lg"
            >
              <CheckCircle className="w-6 h-6 mr-2" />
              CONCLUIR
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
