const app = require("../app");
const request = require("supertest");

let genreId;

// Prueba GET para traer todos los géneros
test("GET /genres debe traer todos los géneros", async () => {
  const res = await request(app).get("/genres");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

// Prueba POST para crear un género
test("POST /genres debe crear un género", async () => {
  const newGenre = {
    name: "Rock",
  };

  const res = await request(app).post("/genres").send(newGenre);

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newGenre.name);
  expect(res.body.id).toBeDefined();
  genreId = res.body.id; // Guardamos el ID para las pruebas PUT y DELETE
});

// Prueba PUT para actualizar un género existente
test("PUT /genres/:id debe actualizar un género existente", async () => {
  const updatedGenre = {
    name: "Updated Rock",
  };

  const res = await request(app).put(`/genres/${genreId}`).send(updatedGenre);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe(updatedGenre.name);
});

// Prueba DELETE para eliminar un género
test("DELETE /genres/:id debe eliminar un género", async () => {
  const res = await request(app).delete(`/genres/${genreId}`);
  expect(res.status).toBe(204);

  // Verifica que el género se haya eliminado
  const getDeletedGenre = await request(app).get(`/genres/${genreId}`);
  expect(getDeletedGenre.status).toBe(404);
});


