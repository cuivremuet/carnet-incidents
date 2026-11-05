import test from 'node:test';
import assert from 'node:assert/strict';
import { incidentReport } from './main.mjs';
test('contrat et limite', () => {
  assert.match(incidentReport({ incidents: [] }), /Secondes/);
  assert.throws(() => incidentReport({ incidents: [{ atSeconds: -1, level: 'info', note: 'x' }] }));
});

