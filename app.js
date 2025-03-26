const qrcode = require("qrcode-terminal");
const { Client, MessageMedia } = require("whatsapp-web.js");
const client = new Client();

// Exibe o QR Code no terminal para autenticação
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

// Avisa quando o cliente está pronto
client.on("ready", () => {
  console.log("Cliente do WhatsApp está pronto!");
});

// Função para diagnóstico de problemas técnicos
const diagnosticarProblema = async (message) => {
  await client.sendMessage(
    message.from,
    "Parece que você está enfrentando um problema técnico. Vamos fazer um diagnóstico rápido! 😊"
  );
  await client.sendMessage(
    message.from,
    "Primeiro, qual dispositivo você está usando? Digite 1 para computador, 2 para notebook, 3 para smartphone."
  );
};

// Evento para receber mensagens e responder automaticamente
client.on("message", async (message) => {
  const messageBody = message.body.toLowerCase();

  // Resposta padrão para "Boa noite"
  if (messageBody === "lk") {
    const menuMessage = `
Olá, seja bem-vindo à nossa empresa de informática! 😊
Como posso te ajudar hoje? Escolha uma opção:
1️⃣ Saber mais sobre a empresa
2️⃣ Conhecer nossos produtos
3️⃣ Falar com um atendente
4️⃣ Falar com um vendedor
5️⃣ Consultar perguntas frequentes
6️⃣ Enviar catálogo de produtos
7️⃣ Suporte técnico
8️⃣ Agendar atendimento

Digite o número da opção desejada ou digite 'sair' para encerrar a conversa.`;
    await client.sendMessage(message.from, menuMessage);
  }

  // Diagnóstico de problemas técnicos
  if (messageBody === "7") {
    await diagnosticarProblema(message);
  }

  // Respostas baseadas nas opções escolhidas
  if (messageBody === "1") {
    const response =
      "A nossa empresa foi fundada em 2021 e está comprometida com a inovação e qualidade em soluções tecnológicas!";
    await client.sendMessage(message.from, response);
  }

  if (messageBody === "2") {
    const response =
      "Oferecemos uma gama de produtos tecnológicos, desde computadores, notebooks, componentes e acessórios até itens para uso diário. Veja mais no nosso catálogo!";
    await client.sendMessage(message.from, response);
  }

  if (messageBody === "3") {
    const response =
      "Você está falando com o atendente virtual. Como posso te ajudar? Se precisar de ajuda com algo específico, digite sua dúvida.";
    await client.sendMessage(message.from, response);
  }

  if (messageBody === "4") {
    const response =
      "Nosso vendedor virtual pode te ajudar com qualquer dúvida sobre nossos produtos ou te apresentar promoções. Como posso te ajudar?";
    await client.sendMessage(message.from, response);
  }

  if (messageBody === "5") {
    const faqMessage = `
Perguntas Frequentes:
1️⃣ Como posso entrar em contato com o suporte técnico?
2️⃣ Quais formas de pagamento a empresa aceita?
3️⃣ Onde posso comprar os produtos?
4️⃣ Como faço para cancelar um pedido?

Escolha uma opção digitando o número da pergunta ou 'voltar' para retornar ao menu principal.`;
    await client.sendMessage(message.from, faqMessage);
  }

  if (messageBody === "6") {
    const catalog = MessageMedia.fromFilePath("./catalogo.pdf");
    await client.sendMessage(message.from, catalog);
  }

  if (messageBody === "8") {
    const response =
      "Gostaria de agendar um atendimento técnico? Por favor, envie o dia e horário de sua preferência e um atendente confirmará o agendamento.";
    await client.sendMessage(message.from, response);
  }

  // Diagnóstico detalhado de problemas
  if (messageBody === "1" || messageBody === "2" || messageBody === "3") {
    const deviceType =
      messageBody === "1"
        ? "computador"
        : messageBody === "2"
        ? "notebook"
        : "smartphone";
    await client.sendMessage(
      message.from,
      `Você está usando um ${deviceType}. Agora, me diga qual é o problema que você está enfrentando. Exemplo: "não liga", "erro de sistema", "não conecta à internet" etc.`
    );
  }

  if (
    messageBody.includes("não liga") ||
    messageBody.includes("erro de sistema") ||
    messageBody.includes("não conecta à internet")
  ) {
    const response = `
Entendi, parece que você está enfrentando um problema técnico com o seu dispositivo. Vamos tentar algumas soluções:

1️⃣ Se o dispositivo não liga, por favor, verifique se está conectado à tomada ou se a bateria está carregada.
2️⃣ Se o erro de sistema for relacionado a algum software, tente reiniciar o dispositivo.
3️⃣ Para problemas de conexão, verifique se o Wi-Fi ou cabo de rede está funcionando corretamente.

Se esses passos não resolverem, posso te ajudar a agendar um atendimento ou fornecer mais soluções!`;
    await client.sendMessage(message.from, response);
  }

  // Feedback do usuário
  if (messageBody === "feedback") {
    const response = "Obrigado pelo seu feedback! O que podemos melhorar?";
    await client.sendMessage(message.from, response);
  }

  // Redirecionamento ao menu principal
  if (messageBody === "voltar") {
    const menuMessage = `
Olá, seja bem-vindo à nossa empresa de informática! 😊
Como posso te ajudar hoje? Escolha uma opção:
1️⃣ Saber mais sobre a empresa
2️⃣ Conhecer nossos produtos
3️⃣ Falar com um atendente
4️⃣ Falar com um vendedor
5️⃣ Consultar perguntas frequentes
6️⃣ Enviar catálogo de produtos
7️⃣ Suporte técnico
8️⃣ Agendar atendimento

Digite o número da opção desejada ou digite 'sair' para encerrar a conversa.`;
    await client.sendMessage(message.from, menuMessage);
  }
  ("");
  // Finaliza a conversa
  if (messageBody === "sair") {
    const response = "Obrigado por entrar em contato. Até logo! 😊";
    await client.sendMessage(message.from, response);
  }

  // Caso a mensagem não seja reconhecida
  if (
    messageBody !== "lk" &&
    !["1", "2", "3", "4", "5", "6", "7", "8", "voltar", "sair"].includes(
      messageBody
    )
  ) {
    const response =
      "Desculpe, não entendi sua mensagem. Por favor, digite 'lk' para ver as opções.";
    await client.sendMessage(message.from, response);
  }
});

// Inicializa o cliente do WhatsApp Web
client.initialize();
