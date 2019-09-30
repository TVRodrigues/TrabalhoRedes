//O 'net' é um módulo que provê uma interface para 
//assincrona para a criação de redes que se comunicam
//utilizando o protocolo TCP.
const net = require('net')
//O 'net' é um módulo que provê uma interface para 
//ler dados de um fluxo legivel, uma linha por vez.
const readline = require('readline')

//Cliente é uma constante que recebe o objeto net chamando a função Socket que cria um canal de interação com um servidor. 
const cliente = new net.Socket()

// rl recebe a criação de uma instancia que captura o evento 'line'.
const rl = readline.createInterface({
	input: process.stdin, 
	output: process.stdout
})

//função de iniciação da conecção.
//Aqui deve haver a porta e o IP da maquina servidor.
cliente.connect(4000, '192.168.56.1', () =>{
	console.log('conectou')
	//Leitura do que é escrito na tela.
	//neste projeto há apenas tres situações funcionais.
	//1: digite 'data' -> terá a hora e a data do servidor como retorno.
	//2: digite qualquer palavra -> esta palavra aparecerá do lado do servidor.
	//3: digite 'end' -> a comunicação do servidor e do cliente é encerrado.
	rl.addListener('line', line=>{
		cliente.write(line)
		
	})


})

//Cliente.on inicializa a preparação dos dados em formato String para enviar ao servidor.
cliente.on('data', function(data) {
	console.log(data.toString());
});

//Cliente.on inicializa a função de fechamento da comunicação do cliente.
cliente.on('end', function() { 
   console.log('desconectado do servidor');
});