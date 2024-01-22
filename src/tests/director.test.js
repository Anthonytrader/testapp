const app = require("../app");
const request = require("supertest");

let directorId;

// Prueba GET para traer todos los directores
test("GET /directors debe traer todos los directores", async () => {
  const res = await request(app).get("/directors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

// Prueba POST para crear un director
test("POST /directors debe crear un director", async () => {
  const newDirector = {
    firstname: "Christopher",
    lastname: "Nolan",
    nationality: "Inglaterra",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Christopher_Nolan_Cannes_2018.jpg",
    birthday: "30-07-1970",
  };

  const [day, month, year] = newDirector.birthday.split('-');

  const res = await request(app).post("/directors").send({
    ...newDirector,
    birthday: new Date(`${year}-${month}-${day}`).toISOString(),
  });

  expect(res.status).toBe(201);
  expect(res.body.firstname).toBe(newDirector.firstname);
  expect(res.body.lastname).toBe(newDirector.lastname);
  expect(res.body.nationality).toBe(newDirector.nationality);
  expect(res.body.image).toBe(newDirector.image);
  expect(res.body.birthday).toBe(new Date(`${year}-${month}-${day}`).toISOString());
  expect(res.body.id).toBeDefined();
  directorId = res.body.id; // Guardamos el ID para las pruebas PUT y DELETE
});

// Prueba PUT para actualizar un director existente
test("PUT /directors/:id debe actualizar un director existente", async () => {
  const updatedDirector = {
    firstname: "Updated Christopher",
    lastname: "Updated Nolan",
    nationality: "Estados Unidos",
    image: "https://example.com/updated-christopher-nolan.jpg",
    birthday: "01-01-1980",
  };

  const [day, month, year] = updatedDirector.birthday.split('-');

  const res = await request(app).put(`/directors/${directorId}`).send({
    ...updatedDirector,
    birthday: new Date(`${year}-${month}-${day}`).toISOString(),
  });

  expect(res.status).toBe(200);
  expect(res.body.firstname).toBe(updatedDirector.firstname);
  expect(res.body.lastname).toBe(updatedDirector.lastname);
  expect(res.body.nationality).toBe(updatedDirector.nationality);
  expect(res.body.image).toBe(updatedDirector.image);
  expect(res.body.birthday).toBe(new Date(`${year}-${month}-${day}`).toISOString());
});

// Prueba DELETE para eliminar un director
test("DELETE /directors/:id debe eliminar un director", async () => {
  const res = await request(app).delete(`/directors/${directorId}`);
  expect(res.status).toBe(204);

  // Verifica que el director se haya eliminado
  const getDeletedDirector = await request(app).get(`/directors/${directorId}`);
  expect(getDeletedDirector.status).toBe(404);
});
