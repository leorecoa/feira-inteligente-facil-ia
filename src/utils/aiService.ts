import { useToast } from "@/components/ui/use-toast";

// This would normally be stored in environment variables or Supabase secrets
// For demonstration, we're using localStorage as a temporary solution
const API_KEY_STORAGE_KEY = "FEIRA_OPENAI_API_KEY";

export interface AIChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIChatRequest {
  messages: AIChatMessage[];
}

export interface AIChatResponse {
  content: string;
  error?: string;
}

// Function to get API key from localStorage
export const getOpenAIApiKey = (): string => {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || "";
};

// Function to set API key to localStorage
export const setOpenAIApiKey = (apiKey: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
};

export const generateAIResponse = async (messages: AIChatMessage[]): Promise<AIChatResponse> => {
  try {
    // Get API key from localStorage
    const apiKey = getOpenAIApiKey();
    
    // Check if OpenAI API key is provided
    if (!apiKey) {
      // Fall back to the local implementation if no API key
      return generateLocalResponse(messages);
    }

    // Real OpenAI API implementation
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Você é um assistente especializado em compras de supermercado e feira. Forneça respostas úteis, concisas e práticas sobre alimentos, receitas, listas de compras e dicas de economia. Quando sugerir listas, use emojis de checklist (✅)."
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("OpenAI API error:", data.error);
      return { 
        content: "", 
        error: data.error.message || "Erro na API do OpenAI" 
      };
    }
    
    return { content: data.choices[0].message.content };
  } catch (error) {
    console.error("Error generating AI response:", error);
    // Fall back to local response if API fails
    return generateLocalResponse(messages);
  }
};

// Local fallback implementation (same as before but now as a separate function)
const generateLocalResponse = async (messages: AIChatMessage[]): Promise<AIChatResponse> => {
  // Simulating API call latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const lastMessage = messages[messages.length - 1];
  const query = lastMessage.content.toLowerCase();
  
  // Predefined responses for common queries
  if (query.includes("almoço de domingo")) {
    return {
      content: `Aqui está uma lista para um almoço de domingo:\n\n✅ Arroz (1kg)\n✅ Feijão (500g)\n✅ Carne para assado (1kg)\n✅ Batatas (1kg)\n✅ Tomates (500g)\n✅ Cebola (3 unidades)\n✅ Alho (1 cabeça)\n✅ Alface (1 unidade)\n✅ Pimentão (2 unidades)\n✅ Azeite (caso precise)\n✅ Limão (3 unidades)\n✅ Farofa pronta (1 pacote)\n\nGostaria de adicionar ou remover algum item?`
    };
  } else if (query.includes("legumes") && query.includes("safra")) {
    const currentMonth = new Date().toLocaleString('pt-BR', { month: 'long' });
    return {
      content: `Em ${currentMonth}, os legumes que estão em safra são:\n\n✅ Abóbora\n✅ Abobrinha\n✅ Batata-doce\n✅ Berinjela\n✅ Beterraba\n✅ Cenoura\n✅ Chuchu\n✅ Pepino\n\nEstes normalmente têm melhor preço e qualidade neste período! Deseja adicionar algum deles à sua lista?`
    };
  } else if (query.includes("intolerância") && query.includes("lactose")) {
    return {
      content: `Aqui está uma lista de feira pensada para quem tem intolerância à lactose:\n\n✅ Leite vegetal (amêndoas, arroz ou aveia)\n✅ Queijo sem lactose\n✅ Iogurte de coco\n✅ Creme vegetal\n✅ Tofu (substituto de queijo em algumas receitas)\n✅ Frutas variadas\n✅ Legumes e verduras\n✅ Carnes magras\n✅ Grãos (arroz, feijão, lentilha)\n\nLembre-se sempre de verificar os rótulos, pois alguns produtos processados podem conter lactose!`
    };
  } else if (query.includes("monte") && query.includes("lista")) {
    return {
      content: `Vou montar uma lista básica para você:\n\n✅ Arroz (5kg)\n✅ Feijão (1kg)\n✅ Macarrão (500g)\n✅ Óleo (1 garrafa)\n✅ Sal (1kg)\n✅ Açúcar (1kg)\n✅ Café (500g)\n✅ Leite (1L)\n✅ Ovos (1 dúzia)\n✅ Pão (1 pacote)\n✅ Frutas da estação (banana, maçã, laranja)\n✅ Legumes básicos (batata, cebola, alho, tomate)\n✅ Carne (1kg)\n✅ Frango (1kg)\n\nEsta é uma lista básica. Deseja adicionar algo mais específico?`
    };
  } else {
    return {
      content: `Entendi seu pedido! Aqui estão algumas sugestões para você:\n\n1. Frutas da estação (mais econômicas e saborosas)\n2. Legumes frescos para sua semana\n3. Proteínas variadas (carnes, ovos, grãos)\n4. Itens básicos de despensa\n\nPosso ajudar com algo mais específico sobre sua lista de compras?`
    };
  }
};
