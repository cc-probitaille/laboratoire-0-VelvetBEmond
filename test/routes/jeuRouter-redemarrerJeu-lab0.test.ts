// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import supertest from 'supertest';
import app from '../../src/app'
import { jeuRoutes } from '../../src/routes/jeuRouter';

const request = supertest(app);

const testNom1 = "Jean"
const testNom2 = "Luc"

describe('get(/api/v1/jeu/redemarrerJeu)', () => {
  beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu/').send({ nom: testNom1 });
    await request.post('/api/v1/jeu/demarrerJeu/').send({ nom: testNom2 });
  })
  it('devrait redémarrer le jeu et retourner le code HTTP 200', async() => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu').send();
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });
  it('devrait avoir supprimer tous les joueurs', async() => {
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });
  it('ne devrait plus être jouable sauf si on recrée un autre joueur', async() => {
    const response = await request.get('/api/v1/jeu/jouer/' + testNom1);
    expect(response.status).toBe(404);
  })
});
