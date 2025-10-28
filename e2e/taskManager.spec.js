// tests/taskManager.spec.js
import { test, expect } from '@playwright/test';

test.describe('Task Manager App', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8082'); // URL do front
  });

  test('devrait afficher le titre principal', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Liste des tâches');
  });

  test('devrait ajouter une nouvelle tâche', async ({ page }) => {
    const input = page.locator('input[placeholder="Nouvelle tâche"]');
    const addButton = page.locator('button', { hasText: 'Ajouter' });

    await input.fill('Ma tâche de test');
    await addButton.click();

    await expect(page.locator('tbody tr')).toContainText('Ma tâche de test');
  });

  test('devrait compléter et supprimer une tâche', async ({ page }) => {
    const row = page.locator('tbody tr').first();
    const completeButton = row.locator('button', { hasText: 'Terminer' });
    const deleteButton = row.locator('button', { hasText: 'Supprimer' });

    // Marcar como terminée
    await completeButton.click();
    await expect(row.locator('td:nth-child(3)')).toHaveText('terminée');

    // Deletar a task
    await deleteButton.click();
    await expect(row).toHaveCount(0);
  });

});
