const app = require("../app");
const request = require("supertest");

let actorId;

// Prueba GET para traer todos los actores
test("GET /actors debe traer todos los actores", async () => {
  const res = await request(app).get("/actors");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

// Prueba POST para crear un actor
test("POST /actors debe crear un actor", async () => {
  const newActor = {
    firstname: "Jim",
    lastname: "Carrey",
    nationality: "Canadá",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Jim_Carrey_2008.jpg/800px-Jim_Carrey_2008.jpg",
    birthday: "17-01-1992",
  };

  const [day, month, year] = newActor.birthday.split('-');

  const res = await request(app).post("/actors").send({
    ...newActor,
    birthday: new Date(`${year}-${month}-${day}`).toISOString(),
  });

  expect(res.status).toBe(201);
  expect(res.body.firstname).toBe(newActor.firstname);
  expect(res.body.lastname).toBe(newActor.lastname);
  expect(res.body.nationality).toBe(newActor.nationality);
  expect(res.body.image).toBe(newActor.image);
  expect(res.body.birthday).toBe(new Date(`${year}-${month}-${day}`).toISOString());
  expect(res.body.id).toBeDefined();
  actorId = res.body.id; // Guardamos el ID para las pruebas PUT y DELETE
});

// Prueba PUT para actualizar un actor existente
test("PUT /actors/:id debe actualizar un actor existente", async () => {
  const updatedActor = {
    firstname: "Updated Jim",
    lastname: "Updated Carrey",
    nationality: "Estados Unidos",
    image: "https://example.com/updated-jim-carrey.jpg",
    birthday: "18-02-1995",
  };

  const [day, month, year] = updatedActor.birthday.split('-');

  const res = await request(app).put(`/actors/${actorId}`).send({
    ...updatedActor,
    birthday: new Date(`${year}-${month}-${day}`).toISOString(),
  });

  expect(res.status).toBe(200);
  expect(res.body.firstname).toBe(updatedActor.firstname);
  expect(res.body.lastname).toBe(updatedActor.lastname);
  expect(res.body.nationality).toBe(updatedActor.nationality);
  expect(res.body.image).toBe(updatedActor.image);
  expect(res.body.birthday).toBe(new Date(`${year}-${month}-${day}`).toISOString());
});

// Prueba DELETE para eliminar un actor
test("DELETE /actors/:id debe eliminar un actor", async () => {
  const res = await request(app).delete(`/actors/${actorId}`);
  expect(res.status).toBe(204);

  // Verifica que el actor se haya eliminado
  const getDeletedActor = await request(app).get(`/actors/${actorId}`);
  expect(getDeletedActor.status).toBe(404);
});
