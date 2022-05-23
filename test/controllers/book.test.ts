import request from 'supertest'
import { expect, describe, beforeAll, afterAll, afterEach,it, test } from '@jest/globals';

import { BookDocument } from '../../src/models/book'
import app from '../../src/app'
import connect, { MongodHelper } from '../db-helper'

const nonExistingbookId = '5e57b77b5744fa0b461c7906'

async function createbook(override?: Partial<BookDocument>) {
  let book = {
    ISBN: "2114414141434",
    title: "Book98",
    publisherName: "annad prokashani",
    authorName: ["61a9759da3eb1c07c18c3e71"],
    publishedYear: 1966,
    genres:['action'],
    description: 'description',
    edition: 'last',
    pageCount: 123,
    img: 'https://images.unsplash.com/photo-1532348374062-fee19177e98f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  }

  if (override) {
    book = { ...book, ...override }
  }

  return await request(app).post('/api/books').send(book)
}

describe('book controller', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should create a book', async () => {
    const res = await createbook()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.title).toBe('Book98')
  })

  it('should not create a book with wrong data', async () => {
    const res = await request(app)
      .post('/api/books')
      .send({
        // incomplete or worng data type
        ISBN: "2114414141434",
        title: "Book98",
        genres:'',
        description: 'description',
      })
    expect(res.status).toBe(400)
  })

  it('should get back an existing book', async () => {
    let res = await createbook()
    expect(res.status).toBe(200)

    const bookId = res.body._id
    res = await request(app).get(`/api/books/${bookId}`)

    expect(res.body._id).toEqual(bookId)
  })

  it('should not get back a non-existing book', async () => {
    const res = await request(app).get(`/api/books/${nonExistingbookId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all book', async () => {
    const res1 = await createbook({
      ISBN: "2114414141430",
      title: "Book981",
      publisherName: "annad prokashani",
      authorName: ["61a9759da3eb1c07c18c3e71"],
      publishedYear: 1967,
      genres:['action'],
      description: 'description',
      edition: 'last',
      pageCount: 124,
    })
    const res2 = await createbook({
      ISBN: "2114414141433",
      title: "Book982",
      publisherName: "annad prokashani",
      authorName: ["61a9759da3eb1c07c18c3e71"],
      publishedYear: 1968,
      genres:['action'],
      description: 'description',
      edition: 'last',
      pageCount: 126,
    })

    const res3 = await request(app).get('/api/books')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing book', async () => {
    let res = await createbook()
    expect(res.status).toBe(200)

    const bookId = res.body._id
    const update = {
      title: 'Book983',
      publishedYear: 1969,
    }

    res = await request(app).put(`/api/books/${bookId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.title).toEqual('Book983')
    expect(res.body.publishedYear).toEqual(1969)
  })

  it('should delete an existing book', async () => {
    let res = await createbook()
    expect(res.status).toBe(200)
    const bookId = res.body._id

    res = await request(app).delete(`/api/books/${bookId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/books/${bookId}`)
    expect(res.status).toBe(404)
  })
})
