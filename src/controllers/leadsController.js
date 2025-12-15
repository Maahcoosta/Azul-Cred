const db = require('../config/db');

const errorResponse = (res, message, err) => {
  console.error(message, err);
  res.status(500).json({ error: message });
};
// CREATE
exports.createLead = (req, res) => {
  const payload = req.body;

  db.query('INSERT INTO leads SET ?', payload, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        // Já existe: atualiza o registro existente (regra de "Atualizar" em caso de contato duplicado)
        return db.query(
          'SELECT id FROM leads WHERE cpf = ? AND matricula = ? LIMIT 1',
          [payload.cpf, payload.matricula],
          (selErr, rows) => {
            if (selErr) return errorResponse(res, 'Erro ao buscar lead existente', selErr);
            const existingId = rows?.[0]?.id;
            if (!existingId) return errorResponse(res, 'Lead duplicado não localizado para atualização', err);

            db.query('UPDATE leads SET ? WHERE id = ?', [payload, existingId], (upErr) => {
              if (upErr) return errorResponse(res, 'Erro ao atualizar lead duplicado', upErr);
              return res.status(200).json({ id: existingId, updated: true });
            });
          }
        );
      }
      return errorResponse(res, 'Erro ao salvar lead', err);
    }
    res.status(201).json({ id: result.insertId, created: true });
  });
};

// READ
exports.getLeadById = (req, res) => {
  db.query('SELECT * FROM leads WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) return errorResponse(res, 'Erro ao buscar lead', err);
    if (!rows.length) return res.status(404).json({ error: 'Lead não encontrado' });
    res.json(rows[0]);
  });
};

// UPDATE
exports.updateLead = (req, res) => {
  db.query('UPDATE leads SET ? WHERE id = ?', [req.body, req.params.id], (err) => {
    if (err) return errorResponse(res, 'Erro ao atualizar lead', err);
    res.json({ ok: true });
  });
};

// DELETE
exports.deleteLead = (req, res) => {
  db.query('DELETE FROM leads WHERE id = ?', [req.params.id], (err) => {
    if (err) return errorResponse(res, 'Erro ao deletar lead', err);
    res.json({ ok: true });
  });
};

