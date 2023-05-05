import { renderHtmlStatement, statement } from "./statement";
import games from "./data/games";

describe("statement", () => {
  it("should return statement", function () {
    console.log(
      statement(
        {
          customer: "TEST",
          matches: [
            {
              gameID: "csgo",
              players: 10,
            },
            {
              gameID: "nfs",
              players: 9,
            },
            {
              gameID: "csgo",
              players: 50,
            },
            {
              gameID: "nfs",
              players: 50,
            },
          ],
        },
        games
      )
    );

    expect(
      statement(
        {
          customer: "TEST",
          matches: [
            {
              gameID: "csgo",
              players: 10,
            },
            {
              gameID: "nfs",
              players: 9,
            },
            {
              gameID: "csgo",
              players: 50,
            },
            {
              gameID: "nfs",
              players: 50,
            },
          ],
        },
        games
      )
    ).toEqual(
      "Statement for TEST\n" +
        " Counter Strike: Global Offense: $4.00 (10 players)\n" +
        " Need For Speed: Unbound: $3.27 (9 players)\n" +
        " Counter Strike: Global Offense: $6.00 (50 players)\n" +
        " Need For Speed: Unbound: $7.00 (50 players)\n" +
        "Amount owed is $20.27\n" +
        "You earned 45 credits\n"
    );
  });
});

describe("Html Statement test", () => {
  it("should render Html statement", () => {
    expect(
      renderHtmlStatement({
        customer: "Test",
        matches: [
          {
            players: 10,
            gameID: "csgo",
            amount: 50,
            game: games["csgo"],
            gameCredits: 5,
          },
        ],
        totalAmount: 20,
        totalGameCredits: 30,
      })
    ).toStrictEqual(
      "<h1>Statement for <b>Test</b></h1>" +
        "<table><thead><tr><th>Game</th><th>Players</th><th>Cost</th></tr></thead>" +
        "<tbody><tr><td>Counter Strike: Global Offense</td><td>10</td><td>$0.50</td></tbody></table>" +
        "<p>Amount owed is <em>$0.20</em></p<p>You earned <em>30</em> credits</p>"
    );
  });
});
