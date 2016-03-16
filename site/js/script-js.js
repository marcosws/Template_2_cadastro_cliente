
function validaFormulario(){

	var valida = true;

	var nome_id = document.getElementById('nome');
	var cpf_cnpj_id = document.getElementById('cpf_cnpj');
	var idade_id = document.getElementById('idade');
	var email_id = document.getElementById('email');
	
	var nome = nome_id.value;
	var cpf_cnpj = cpf_cnpj_id.value;
	var idade = idade_id.value;
	var email = email_id.value;
	
	var msg = "";
	var cont = 0;
	
	/* verifica se os campos estão preenchidos */
	if(nome === ""){
		msg = "Nome";
		cont = 1;
	}
	if(cpf_cnpj === ""){
		if(cont === 0){
			msg = "CPF/CNPJ";
		}
		else{
			msg +=  ", CPF/CNPJ";
		}
		cont += 1;
	}
	if(idade === ""){
		if(cont === 0){
			msg = "Idade";
		}
		else{
			msg += ", Idade";
		}
		cont += 1;
	}
	if(email === ""){
		if(cont === 0){
			msg = "Email";
		}
		else{
			msg += ", Email";
		}
		cont += 1;
	}
	
	if(cont !== 0){
		if(cont === 1){
			alert("O campo " + msg + " Deve ser preenchido !");
		}
		else{
			alert("Os campos " + msg + " Devem ser preenchidos !");
		}
		valida = false;
	}
	
	/* Vaz a validação do CPF ou CNPJ */
	var cpf_cnpj_aux = cpf_cnpj.replace(/[^0-9]/g, '');
	if(cpf_cnpj_aux.length === 11){
		if(!validaCpf(cpf_cnpj)){
			alert("CPF Inválido !");
			valida = false;
		}
	}
	else if(cpf_cnpj_aux.length === 14){
		if(!validaCnpj(cpf_cnpj)){
			alert("CNPJ Inválido !");
			valida = false;
		}
	}
	else{
		alert("Formato de CPF / CNPJ Inválido !");
		valida = false;
	}
	
	/*  Verifica se o campo idade está preechido com numeros */
	if(!validaNumero(idade)){
		alert("O Campo Idade deve ser preenchido apenas com numeros !");
		valida = false;
	}
	
	
	/* Verfica se o formato do e-mail é valido */
	if(!validaEmail(email)){
		alert("Formato de e-mail inválido !");
		valida = false;
	}
	
	return valida;
	
}
function validaEmail(email){

	/* Fonte: Expressão regular para validação de email: 
	http://www.devmedia.com.br/validando-formularios-usando-regular-expression/12042 */
	var res = email.match(/^([\w\-]+\.)*[\w\- ]+@([\w\- ]+\.)+([\w\-]{2,3})$/g);
	if(res === null){
		return false;
	}
	else{
		return true;
	}

}
function validaNumero(numero){

	var res = numero.match(/[^0-9]/g);
	if(res === null){
		return true;
	}
	else{
		return false;
	}

}
function validaCpf(cpf){

	cpf = cpf.toString();
	cpf = cpf.replace(/[^0-9]/g, '');
	
	if(cpf.length != 11){
		return false;
	}
	
	var rep = 0;
	for(var r = 0; r < 10; r++){
		if(cpf.substr(r,1) === cpf.substr(10,1)){
			rep += 1
		}
		if(rep === 10){
			return false;
		}
	}
	
	var soma = 0;
	var valida = false;
	var peso_mult1 = [10,9,8,7,6,5,4,3,2];
	var peso_mult2 = [11,10,9,8,7,6,5,4,3,2];
	
	for(var i = 0; i < 9; i++){
		soma += peso_mult1[i] * parseInt(cpf.substr(i,1));
	}
	
	var resto = soma % 11;
	if(resto < 2){
		resto = 0;
	}
	else{
		resto = 11 - resto;
	}
	
	var digito = resto.toString();
	var parc_cpf = cpf.substr(0,9) + digito;
	soma = 0;
	
	for(var j = 0; j < 10; j++){
		soma += peso_mult2[j] * parseInt(parc_cpf.substr(j,1));
	}
	
	resto = soma % 11;
	if(resto < 2){
		resto = 0;
	}
	else{
		resto = 11 - resto;
	}
	
	digito += resto.toString();
	if(cpf.substr(9,2) === digito){
		valida = true;
	}

	return valida;

}
function validaCnpj(cnpj){

	cnpj = cnpj.toString();
	cnpj = cnpj.replace(/[^0-9]/g, '');
	
	if(cnpj.length != 14){
		return false;
	}
	
	var rep = 0;
	for(var r = 0; r < 13; r++){
		if(cnpj.substr(r,1) === cnpj.substr(13,1)){
			rep += 1
		}
		if(rep === 13){
			return false;
		}
	}
	
	var soma = 0;
	var valida = false;
	var peso_mult1 = [5,4,3,2,9,8,7,6,5,4,3,2];
	var peso_mult2 = [6,5,4,3,2,9,8,7,6,5,4,3,2];
	
	for(var i = 0; i < 12; i++){
		soma += peso_mult1[i] * parseInt(cnpj.substr(i,1));
	}

	var resto = soma % 11;
	if(resto < 2){
		resto = 0;
	}
	else{
		resto = 11 - resto;
	}
	
	var digito = resto.toString();
	var parc_cnpj = cnpj.substr(0,12) + digito;
	soma = 0;
	
	for(var j = 0; j < 13; j++){
		soma += peso_mult2[j] * parseInt(parc_cnpj.substr(j,1));
	}
	
	resto = soma % 11;
	if(resto < 2){
		resto = 0;
	}
	else{
		resto = 11 - resto;
	}
	
	digito += resto.toString();
	if(cnpj.substr(12,2) === digito){
		valida = true;
	}

	return valida;
	
}