import { expect, describe, beforeAll, afterAll, afterEach,it, test } from '@jest/globals';

import Book from '../../src/models/Book'
import BookService from '../../src/services/book'
import connect, { MongodHelper } from '../db-helper'

const nonExistingbookId = '5e57b77b5744fa0b461c7906'

async function createbook() {
  const book = new Book({
    ISBN: "2114414141487",
    title: "Book989",
    publisherName: "annad prokashani",
    authorName: ["61a9759da3eb1c07c18c3e71"],
    publishedYear: 1966,
    genres:['action'],
    description: 'description',
    edition: 'last',
    pageCount: 123,
    img: 'https://images.unsplash.com/photo-1532348374062-fee19177e98f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  
  })
  return await BookService.create(book)
}

describe('book service', () => {
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
    const book = await createbook()
    expect(book).toHaveProperty('_id')
    expect(book).toHaveProperty('title', 'Book989')
    expect(book).toHaveProperty('PageCount', 123)
  })

  it('should get a book with id', async () => {
    const book = await createbook()
    const found = await BookService.findByIdAndPopulate(book._id)
    expect(found.title).toEqual(book.title)
    expect(found._id).toEqual(book._id)
  })

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  it('should not get a non-existing book', async () => {
    expect.assertions(1)
    return BookService.findByIdAndPopulate(nonExistingbookId).catch((e) => {
      expect(e.message).toMatch(`book ${nonExistingbookId} not found`)
    })
  })

  it('should update an existing book', async () => {
    const book = await createbook()
    const update = {
      title: 'WorldWarZ',
      publishedYear: 2001,
    }
    const updated = await BookService.update(book._id, update)
    expect(updated).toHaveProperty('_id', book._id)
    expect(updated).toHaveProperty('title', 'WorldWarZ')
    expect(updated).toHaveProperty('publishedYear', 2001)
  })

  it('should not update a non-existing book', async () => {
    expect.assertions(1)
    const update = {
      title: 'WorldWarZ',
      publishedYear: 2001,
    }

    return BookService.update(nonExistingbookId, update).catch((e) => {
      expect(e.message).toMatch(`book ${nonExistingbookId} not found`)
    })
  })

  it('should delete an existing book', async () => {
    expect.assertions(1)
    const book = await createbook()
    await BookService.deleteBook(book._id)
    return BookService.findByIdAndPopulate(book._id).catch((e) => {
      expect(e.message).toBe(`book ${book._id} not found`)
    })
  })
})
