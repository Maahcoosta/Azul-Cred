const params = new URLSearchParams(window.location.search);
const id = params.get('id');
// Fetch dos dados do lead

fetch(`/api/leads/${id}`)
  .then(res => res.json())
  .then(data => {
    const telefoneMasc = maskPhone(data.telefone);
    // Exibição dos dados do lead
    document.getElementById('dados').innerHTML = `
      <div class="resume-grid">
        <div><p><b>Nome:</b> ${data.nome || '-'}</p></div>
        <div><p><b>CPF:</b> ${maskCpf(data.cpf) || '-'}</p></div>
        <div><p><b>Telefone:</b> ${telefoneMasc || '-'}</p></div>
        <div><p><b>Banco:</b> ${data.banco_recebe || '-'}</p></div>
        <div><p><b>Fonte de renda:</b> ${convertFonteRenda(data.fonte_renda) || '-'}</p></div>
        <div><p><b>Matrícula/Benefício:</b> ${data.matricula || '-'}</p></div>
        <div class="full"><p><b>Motivo:</b> ${data.motivo || '-'}</p></div>
        <div><p><b>Valor desejado:</b> ${formatCurrency(data.valor_desejado)}</p></div>
        <div><p><b>Parcelas:</b> ${data.parcelas || '-'}</p></div>
        <div><p><b>Valor da parcela:</b> ${formatCurrency(data.valor_parcela)}</p></div>
      </div>
    `;
  });

// Máscara de CPF
function maskCpf(cpf) {
  if (!cpf) return '';
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

// Máscara de Telefone
function maskPhone(tel) {
  if (!tel) return '';
  const digits = tel.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 11) {
    return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }
  if (digits.length === 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  }
  return tel;
}

// Formatação de moeda
function formatCurrency(v) {
  if (v === null || v === undefined || v === '') return '-';
  const num = Number(v);
  if (Number.isNaN(num)) return v;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Edição dos dados do lead volta para a tela de formulário
function editar() {
  window.history.back();
}

// Exclusão dos dados do lead
function excluir() {
  fetch(`/api/leads/${id}`, { method: 'DELETE' })
    .then(() => window.location.href = '/index.html');
}

// Confirmação dos dados do lead
function confirmar() {
  window.location.href = `/final.html?id=${id}`;
}
// Conversão de fonte de renda para o nome completo
function convertFonteRenda(fonte) {
  switch (fonte) {
    case 'Aposentado_INSS':
      return 'Aposentado INSS';
    case 'Servidor_Federal':
      return 'Servidor Federal';
    case 'Servidor_Estadual':
      return 'Servidor Estadual';
    case 'Servidor_Municipal':
      return 'Servidor Municipal';
  }
}