import request from "supertest";

import {
  expect,
  describe,
  beforeEach,
  beforeAll,
  afterAll,
  afterEach,
  it,
  test,
  jest
} from '@jest/globals'

import app from "../../src/app";
import  connect, { MongodHelper } from "../db-helper";
import { AuthorDocument } from "../../src/models/Author";

const nonExistingAuthoId = '61a9759da3ek1c07c18c3e71'

async function createAuthor(override?: Partial<AuthorDocument>) {
    let author =  { 
      firstName: "MrQ",
      lastName: "Romey",
      biography: "biography"
    }
    if (override) {
      author = { ...author, ...override }
    }
    return await request(app).post('/api/authors').send(author)
  }
  
describe("author controller", () => {
        let mongodHelper: MongodHelper
       
        beforeAll(async () => {
          mongodHelper = await connect()

        })

        beforeEach(() => {
            jest.setTimeout(30000);

          });

          afterEach(async () => {
            await mongodHelper.clearDatabase()
          })

        afterAll(async () => {
            await mongodHelper.closeDatabase()
        })
    // 
      it("should create a author", async () => {
        const res = await createAuthor();
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('_id')
        expect(res.body.firstName).toBe("MrQ");
      });
      
      it("should not create a author with wrong data", async () => {
        const res = await request(app)
         .post('/api/authors')
         .send({ 
            first: "MrQ", // wrong property
            lastName: "Romey",
            biography: "biography"
          })
          
        expect(res.status).toBe(400)
    });

    it('should get back all author', async () => {
        const res1 = await createAuthor({
            firstName: "Danny"
        })
        const res2 = await createAuthor({
            firstName: "Richel"
        })

        const res3 = await request(app).get('/api/authors')

        expect(res3.body.length).toEqual(2)
        expect(res3.body[0]._id).toEqual(res1.body._id)
        expect(res3.body[1]._id).toEqual(res2.body._id)
      })


    it('should get back an existing author', async () => {
        let res = await createAuthor()
        expect(res.status).toBe(200)
    
        const authorId = res.body._id
        res = await request(app).get(`/api/authors/${authorId}`)
    
        expect(res.body._id).toEqual(authorId)
      })

      it('should not get back a non-existing authos', async () => {
        const res = await request(app).get(`/api/authos/${nonExistingAuthoId}`)
        expect(res.status).toBe(404)
      })


      it('should update an existing author', async () => {
        let res = await createAuthor()
        expect(res.status).toBe(200)
    
        const authorId = res.body._id
        const update = {
          firstName: 'Kashokhi',
          publishedYear: 2016,
        }
    
        res = await request(app).put(`/api/authors/${authorId}`).send(update)

        expect(res.status).toEqual(200)
        expect(res.body.name).toEqual('Kashokhi')
        expect(res.body.publishedYear).toEqual(2016)
      })

      it('should delete an existing author', async () => {
        let res = await createAuthor()
        expect(res.status).toBe(200)
        const authorId = res.body._id
    
        res = await request(app).delete(`/api/authors/${authorId}`)
    
        expect(res.status).toEqual(204)
    
        res = await request(app).get(`/api/authors/${authorId}`)
        expect(res.status).toBe(404)
      })

  })
