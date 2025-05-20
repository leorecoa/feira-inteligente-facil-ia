
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

export const generateAIResponse = async (messages: AIChatMessage[]): Promise<AIChatResponse> => {
  try {
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
  } catch (error) {
    console.error("Error generating AI response:", error);
    return {
      content: "",
      error: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente."
    };
  }
};
