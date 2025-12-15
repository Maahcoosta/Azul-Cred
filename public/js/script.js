// Utilitários locais (unificado)
function onlyDigits(value) {
  return (value || '').replace(/\D/g, '');
}

// Máscara de CPF
function applyCpfMask(input) {
  if (!input) return;
  input.addEventListener('input', (e) => {
    let val = onlyDigits(e.target.value).slice(0, 11);
    val = val
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = val;
  });
}

// Validação de CPF
function isCpfValid(cpf) {
  if (!cpf || cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i], 10) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9], 10)) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i], 10) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10], 10);
}

// Máscara de Telefone
function applyPhoneMask(input) {
  if (!input) return;
  input.addEventListener('input', (e) => {
    let val = onlyDigits(e.target.value).slice(0, 11);
    if (val.length > 6) {
      val = val.replace(/^(\d{2})(\d{5})(\d+)/, '($1) $2-$3');
    } else if (val.length > 2) {
      val = val.replace(/^(\d{2})(\d+)/, '($1) $2');
    } else if (val.length > 0) {
      val = val.replace(/^(\d{0,2})/, '($1');
    }
    e.target.value = val;
  });
}

// Elementos do formulário
const cpfInput = document.getElementById('cpf');
const phoneInput = document.getElementById('telefone');

// Aplicar máscaras e validações
applyCpfMask(cpfInput);
applyPhoneMask(phoneInput);

// Envio do formulário
document.getElementById('formLead').addEventListener('submit', async (e) => {
  e.preventDefault();

  const cpfNumeros = onlyDigits(cpfInput.value);
  // Validação de CPF
  if (!isCpfValid(cpfNumeros)) {
    alert('CPF inválido. Verifique e tente novamente.');
    cpfInput.focus();
    return;
  }

  // Envio dos dados para o servidor
  try {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.cpf = cpfNumeros;
    data.telefone = onlyDigits(phoneInput.value);

    // Envio dos dados para o servidor
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Verificação de resposta do servidor
    if (!res.ok) {
      throw new Error('Erro ao enviar os dados');
    }

    // Recebimento dos dados do servidor
    const json = await res.json();

    // Redirecionamento para a tela de confirmação
    if (json.id) {
      window.location.href = `/confirmacao.html?id=${json.id}`;
    } else {
      // Mensagem de erro
      alert('Erro: ID não retornado pelo servidor');
    }

  } catch (error) {
    // Mensagem de erro
    console.error(error);
    alert('Não foi possível enviar seus dados. Tente novamente.');
  }
});

