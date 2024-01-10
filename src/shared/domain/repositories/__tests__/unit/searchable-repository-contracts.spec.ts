import {
  SearchParams,
  SearchResult,
} from '../../searchable-repository-contracts'

describe('Searchable Repository unit tests', () => {
  describe('SearchParams tests', () => {
    it('page prop', () => {
      const params = [
        { page: null as any, expected: 1 },
        { page: undefined as any, expected: 1 },
        { page: '' as any, expected: 1 },
        { page: 'test' as any, expected: 1 },
        { page: 0 as any, expected: 1 },
        { page: -1 as any, expected: 1 },
        { page: 5.5 as any, expected: 1 },
        { page: true as any, expected: 1 },
        { page: false as any, expected: 1 },
        { page: {} as any, expected: 1 },
        { page: 1 as any, expected: 1 },
        { page: 2 as any, expected: 2 },
      ]

      params.forEach(param => {
        const sut = new SearchParams({ page: param.page })
        expect(sut.page).toBe(param.expected)
      })
    })

    it('perPage prop', () => {
      const params = [
        { perPage: null as any, expected: 15 },
        { perPage: undefined as any, expected: 15 },
        { perPage: '' as any, expected: 15 },
        { perPage: 'test' as any, expected: 15 },
        { perPage: 0 as any, expected: 15 },
        { perPage: -1 as any, expected: 15 },
        { perPage: 5.5 as any, expected: 15 },
        { perPage: true as any, expected: 15 },
        { perPage: false as any, expected: 15 },
        { perPage: {} as any, expected: 15 },
        { perPage: 1 as any, expected: 1 },
        { perPage: 2 as any, expected: 2 },
        { perPage: 25 as any, expected: 25 },
      ]

      params.forEach(param => {
        const sut = new SearchParams({ perPage: param.perPage })
        expect(sut.perPage).toBe(param.expected)
      })
    })

    it('sort prop', () => {
      const params = [
        { sort: null as any, expected: null },
        { sort: undefined as any, expected: null },
        { sort: '', expected: null },
        { sort: 'test', expected: 'test' },
        { sort: 0 as any, expected: '0' },
        { sort: -1 as any, expected: '-1' },
        { sort: 5.5 as any, expected: '5.5' },
        { sort: true as any, expected: 'true' },
        { sort: false as any, expected: 'false' },
        { sort: {} as any, expected: '[object Object]' },
        { sort: 1 as any, expected: '1' },
        { sort: 2 as any, expected: '2' },
        { sort: 25 as any, expected: '25' },
      ]

      params.forEach(param => {
        const sut = new SearchParams({ sort: param.sort })
        expect(sut.sort).toBe(param.expected)
      })
    })

    it('sortDir prop', () => {
      let sut = new SearchParams()
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: null })
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: undefined })
      expect(sut.sortDir).toBeNull()

      sut = new SearchParams({ sort: '' })
      expect(sut.sortDir).toBeNull()

      const params = [
        { sortDir: null as any, expected: 'desc' },
        { sortDir: undefined as any, expected: 'desc' },
        { sortDir: '', expected: 'desc' },
        { sortDir: 'test', expected: 'desc' },
        { sortDir: 0 as any, expected: 'desc' },
        { sortDir: 'asc' as any, expected: 'asc' },
        { sortDir: 'desc' as any, expected: 'desc' },
        { sortDir: 'ASC' as any, expected: 'asc' },
        { sortDir: 'DESC' as any, expected: 'desc' },
      ]

      params.forEach(param => {
        const sut = new SearchParams({ sort: 'field', sortDir: param.sortDir })
        expect(sut.sortDir).toBe(param.expected)
      })
    })

    it('filter prop', () => {
      const params = [
        { filter: null as any, expected: null },
        { filter: undefined as any, expected: null },
        { filter: '', expected: null },
        { filter: 'test', expected: 'test' },
        { filter: 0 as any, expected: '0' },
        { filter: -1 as any, expected: '-1' },
        { filter: 5.5 as any, expected: '5.5' },
        { filter: true as any, expected: 'true' },
        { filter: false as any, expected: 'false' },
        { filter: {} as any, expected: '[object Object]' },
        { filter: 1 as any, expected: '1' },
        { filter: 2 as any, expected: '2' },
        { filter: 25 as any, expected: '25' },
      ]

      params.forEach(param => {
        const sut = new SearchParams({ filter: param.filter })
        expect(sut.filter).toBe(param.expected)
      })
    })
  })

  describe('SearchResult tests', () => {
    it('constructor props', () => {
      let sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      })

      expect(sut.toJSON()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      })

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'test',
      })

      expect(sut.toJSON()).toStrictEqual({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
        sort: 'name',
        sortDir: 'asc',
        filter: 'test',
      })

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc',
        filter: 'test',
      })

      expect(sut.lastPage).toBe(1)

      sut = new SearchResult({
        items: ['test1', 'test2', 'test3', 'test4'] as any,
        total: 54,
        currentPage: 1,
        perPage: 10,
        sort: 'name',
        sortDir: 'asc',
        filter: 'test',
      })

      expect(sut.lastPage).toBe(6)
    })
  })
})
