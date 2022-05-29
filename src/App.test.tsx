import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { App } from "./App";
import { PersonList } from "./components/PersonList";
import { Toolbar } from "./components/Toolbar";
import { Filter } from "./types";
import "./__mocks__/intersectionObserverMock";

describe("Test", () => {
  let originalFetch: typeof global.fetch;
  const data = [
    {
      name: "Peter Jackson",
      office: "Lund",
      gitHub: "pj",
      twitter: "pj",
      linkedIn: "pj",
      imagePortraitUrl: "https://i.1337co.de/profile/1",
      email: "",
      phoneNumber: "",
      highlighted: true,
      imageWallOfLeetUrl: "",
      mainText: "",
      manager: "",
      orgUnit: "",
      published: true,
      stackOverflow: "",
    },
    {
      name: "Mark Jackson",
      office: "London",
      gitHub: "mj",
      twitter: "mj",
      linkedIn: "mj",
      imagePortraitUrl: "https://i.1337co.de/profile/2",
      email: "",
      phoneNumber: "",
      highlighted: true,
      imageWallOfLeetUrl: "",
      mainText: "",
      manager: "",
      orgUnit: "",
      published: true,
      stackOverflow: "",
    },
    {
      name: "Peter Falk",
      office: "Paris",
      gitHub: "pf",
      twitter: "pf",
      linkedIn: "pf",
      imagePortraitUrl: "https://i.1337co.de/profile/3",
      email: "",
      phoneNumber: "",
      highlighted: true,
      imageWallOfLeetUrl: "",
      mainText: "",
      manager: "",
      orgUnit: "",
      published: true,
      stackOverflow: "",
    },
  ];

  beforeEach(() => {
    originalFetch = global.fetch;
    const mockFetch = Promise.resolve({
      json: () =>
        Promise.resolve(data),
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetch);
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("cities appears in correct order", () => {
    render(
      <Toolbar
        cbList={["Paris", "London", "Lund"]}
        updateFilter={(filter: Filter) => console.log()}
      />
    );
    const offices = screen.getAllByTestId("office-list");
    expect(within(offices[0]).queryByText("London")).toBeInTheDocument();
    expect(within(offices[1]).queryByText("Lund")).toBeInTheDocument();
    expect(within(offices[2]).queryByText("Paris")).toBeInTheDocument();
  });

  test("cards appear", async () => {
    await act(async () => {
      render(<PersonList persons={data} />);
    });
    waitFor(async () => {
      const cards = screen.findAllByTestId("person-card");
      expect((await cards).length).toEqual(3);
    });
  });

  test("fetch is called", async () => {
    render(<App />);
    waitFor(() => {
      expect(fetch).toBeCalledTimes(1);
    });
  });

  test("person filter works", async () => {
    render(<App />);
    const inp = screen.getByTestId("user-input");
    fireEvent.change(inp, { target: { value: "ja" } });
    waitFor(async () => {
      const cards = screen.findAllByTestId("person-card");
      expect((await cards).length).toEqual(2);
    });
  });

  test("office filter works", async () => {
    render(<App />);

    const cbs = screen.findAllByTestId("user-cb");
    (await cbs).forEach((cb, i) => {
      fireEvent.click(cb);
    });

    waitFor(async () => {
      const cards = screen.findAllByTestId("person-card");
      expect((await cards).length).toEqual(0);
    });
    (await cbs).forEach((cb, i) => {
      if (i % 2 == 0) {
        fireEvent.click(cb);
      }
    });
    waitFor(async () => {
      const cards = screen.findAllByTestId("person-card");
      expect((await cards).length).toEqual(2);
    });
  });
});
