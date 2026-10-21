import { describe, expect, it } from "vitest";
import { filterBooks, type BookFiltersState } from "../App";
import { books } from "../data/books";

const defaultFilters: BookFiltersState = {
  searchTerm: "",
  selectedGenre: "all",
  readingStatus: "all"
};

describe("filterBooks", () => {
  it("matches title and author searches without depending on letter case", () => {
    const searchTitles = (searchTerm: string) =>
      filterBooks(books, { ...defaultFilters, searchTerm }).map((book) => book.title);

    expect(searchTitles("HOBBIT")).toEqual(searchTitles("hobbit"));
    expect(searchTitles("hobbit")).toEqual(["The Hobbit"]);
    expect(searchTitles("TOLKIEN")).toEqual(searchTitles("tolkien"));
    expect(searchTitles("tolkien")).toEqual(["The Hobbit"]);
  });

  it("filters by genre and reading status together", () => {
    const results = filterBooks(books, {
      ...defaultFilters,
      selectedGenre: "Fantasy",
      readingStatus: "unread"
    });

    expect(results.map((book) => book.title)).toEqual(["The Night Circus"]);
  });
});
