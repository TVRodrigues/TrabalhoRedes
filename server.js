//Projeto de Redes

//O 'net' é um módulo que provê uma API de rede 
//assincrona para a criação de redes que se comunicam
//utilizando o protocolo TCP.
const net = require('net')

//handleConnection é a constante carrega a função de inicializaçaõ do socket.
const handleConnection = socket => { 

	//socket.write é a função que envia dados no socket.
	socket.write('Seja bem vindo ao servidor!');
	//console.log imprime texto na tela.
	console.log('Alguém se conectou.');
	
	//socket.on inicializa uma função de acordo com o parametro especifico que este requisita, neste caso 'data' ele pega qualquer informação de dados que o servidor receba.	
	socket.on('data',data => {
		//str é uma constante que está capturando dados que sejam do tipo scring.
		const str = data.toString()

		//if e else para pegar diferentes situações de texto presentes no str.
		if(str === 'end'){

			console.log('cliente se desconectou.');
			//socket.end é a função que encerra o socket. Aqui ele é chamado pela requisição do cliente atraés do comando 'end'.
			socket.end();	

		}else 
		if(str === 'data'){

			//Date é o obejto baseado no valor de tempo. var date é o objeto do tipo Date.
			var date = new Date();
			var hora = date.getHours();
			var min = date.getMinutes();
			var data = date.toDateString();
			//aqui temos a hora e data sendo enviadas para o cliente após uma requisição do mesmo através do comando 'data'.
			socket.write('Server: ' + hora + ':' + min);
			socket.write('Server: ' + date.toDateString());
			console.log(hora + ':' + min);
			console.log(date.toDateString());

		}else{
		//Demais comandos enviados pelo cliente são apenas impressos pelo lado do servidor.
		console.log(str);

		}
	})
	//socket.on que inicializa a função de encerramento do socket.
	socket.on('end', function() {
      console.log('Sessão encerrada!');
   });

}

//Server é a constante que recebe o objeto 'net' chamando a função que inicializa um novo serviço TCP
const server = net.createServer(handleConnection)
//listen é a função assincrona que é ativada assim que o servidor começar a rodar.
//Para teste, coloque aqui o IP da maquina que rodar o servidor.
server.listen(4000, '192.168.56.1')

console.log('Server rodando')
