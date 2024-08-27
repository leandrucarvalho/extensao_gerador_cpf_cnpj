document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("cpfButton")
    .addEventListener("click", () => gerarECopiar("cpf"));
  document
    .getElementById("cnpjButton")
    .addEventListener("click", () => gerarECopiar("cnpj"));
});

function gerarECopiar(tipo) {
  const numero = tipo === "cpf" ? geraCPF() : geraCNPJ();
  const numeroInput = document.getElementById("numero");
  numeroInput.value = numero;
  copiarParaAreaDeTransferencia(numero);
  exibirMensagemCopiado();
}

function geraCPF() {
  const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  const d1 = calculaDigitoVerificador(n, [10, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calculaDigitoVerificador(
    [...n, d1],
    [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]
  );
  n.push(d1, d2);
  return formatarResultado(n, "cpf");
}

function geraCNPJ() {
  const n = [
    ...Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)),
    0,
    0,
    0,
    1,
  ];
  const d1 = calculaDigitoVerificador(n, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const d2 = calculaDigitoVerificador(
    [...n, d1],
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );
  n.push(d1, d2);
  return formatarResultado(n, "cnpj");
}

function calculaDigitoVerificador(numeros, pesos) {
  const soma = numeros.reduce((acc, num, i) => acc + num * pesos[i], 0);
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
}

function formatarResultado(numeros, tipo) {
  if (document.getElementById("mascara").checked) {
    return tipo === "cpf"
      ? `${numeros.slice(0, 3).join("")}.${numeros
          .slice(3, 6)
          .join("")}.${numeros.slice(6, 9).join("")}-${numeros
          .slice(9)
          .join("")}`
      : `${numeros.slice(0, 2).join("")}.${numeros
          .slice(2, 5)
          .join("")}.${numeros.slice(5, 8).join("")}/${numeros
          .slice(8, 12)
          .join("")}-${numeros.slice(12).join("")}`;
  }
  return numeros.join("");
}

function copiarParaAreaDeTransferencia(texto) {
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      console.log("Texto copiado com sucesso!");
    })
    .catch((err) => {
      console.error("Erro ao copiar texto: ", err);
    });
}

function exibirMensagemCopiado() {
  const mensagem = document.getElementById("copiadoMensagem");
  mensagem.classList.add("show");
  setTimeout(() => {
    mensagem.classList.remove("show");
  }, 2000);
}
